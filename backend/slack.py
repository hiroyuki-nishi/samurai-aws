import json
import os
from typing import Dict, Any

import boto3
import urllib3
import logging
from dotenv import load_dotenv
from langchain.chains import RetrievalQA
from langchain_community.chat_models import BedrockChat
from langchain_community.retrievers import AmazonKnowledgeBasesRetriever

logger = logging.getLogger()
logger.setLevel(os.getenv('LOG_LEVEL', 'INFO'))
http = urllib3.PoolManager()
s3 = boto3.client('s3')
bedrock = boto3.client('bedrock-agent')
load_dotenv('.env')
KNOWLEDGE_BASE_ID = os.getenv('KNOWLEDGE_BASE_ID', 'xxxx')
WEB_HOOK_URL = os.getenv('WEB_HOOK_URL', '')
SLACK_CHANEL = "#{任意のチャンネル}"
SUPPORT_FILE_TYPES = ['markdown']


def request(message: str, url: str, method: str = 'POST'):
    try:
        return http.request(method, url, body=message)
    except Exception as e:
        logger.error(e)
        return e


def knowledge(query: str) -> Dict[str, Any]:
    try:
        llm = BedrockChat(model_id="anthropic.claude-3-sonnet-20240229-v1:0", model_kwargs={"temperature": 1})
        retriever = AmazonKnowledgeBasesRetriever(
            knowledge_base_id=KNOWLEDGE_BASE_ID,
            retrieval_config={
                "vectorSearchConfiguration": {
                    # 検索結果をコンテキストとして回答生成LLMへ放り込む数.多くすればヒット数が上がるが、精度が下がる可能性がある
                    "numberOfResults": 100
                }
            }
        )
        qa = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type='stuff',
            retriever=retriever,
            verbose=True
        )
        return qa.invoke(query)
    except Exception as e:
        logger.error(e)


def is_slack_retry(event: Dict[str, Any]) -> bool:
    try:
        request_header = event["headers"]
        keys = request_header.keys()
        return "x-slack-retry-num" in keys and "x-slack-retry-reason" in keys and request_header[
            "x-slack-retry-reason"] == "http_timeout"
    except KeyError as e:
        logger.error(e)
        return False


def upload_from_slack_to_s3(body: Dict, bucket_name: str):
    try:
        files = body['event']['files']
        for file in files:
            if file['filetype'] in SUPPORT_FILE_TYPES:
                res = http.request('GET', file['url_private_download'], headers={'Authorization': 'Bearer ' + os.environ['SLACK_ACCESS_TOKEN']})
                file_name = file['name']
                tmp_file = f'/tmp/${file_name}'
                with open(tmp_file, 'wb') as wf:
                    wf.write(res.data)
                s3.upload_file(tmp_file, bucket_name, file_name)
            else:
                request(url=WEB_HOOK_URL, message=json.dumps({
                    "channel": SLACK_CHANEL,
                    "text": 'このファイル形式は対応していませんわ！（markdownのみ対応してましてよ。）',
                }))
    except Exception as e:
        logger.error(e)
        return e


def sync_s3_to_bedrock():
    try:
        bedrock.start_ingestion_job(
            knowledgeBaseId=KNOWLEDGE_BASE_ID,
            dataSourceId=os.getenv('DATA_SOURCE_ID')
        )
    except Exception as e:
        logger.error(e)
        return e


def lambda_handler(event: Dict[str, Any], context):
    try:
        if is_slack_retry(event):
            return {'statusCode': 200, 'body': {'message': 'No need to resend'}}
        logger.info(event)
        body = json.loads(event['body'])

        # NOTE: Slackのエンドポイント検証
        if "challenge" in body:
            challenge = body['challenge']
            return {
                "statusCode": 200,
                "body": json.dumps({"challenge": challenge})
            }

        if 'files' in body['event']:
            request(url=WEB_HOOK_URL, message=json.dumps({
                "channel": SLACK_CHANEL,
                "text": '処理を受けつけましたわ〜',
            }))
            upload_from_slack_to_s3(body=body, bucket_name=os.environ['KNOWLEDGE_S3_BUCKET'])
            sync_s3_to_bedrock()
            request(url=WEB_HOOK_URL, message=json.dumps({
                "channel": SLACK_CHANEL,
                "text": 'アップロード完了しましてよ！',
            }))
        elif 'text' in body['event']:
            request(url=WEB_HOOK_URL, message=json.dumps({
                "channel": SLACK_CHANEL,
                "text": '考え中ですわ〜。少しお待ちくださいまし〜。',
            }))
            input_text = body["event"]["blocks"][0]["elements"][0]["elements"][1]["text"]
            logger.info(input_text)
            result = knowledge(input_text)['result']
            request(url=WEB_HOOK_URL, message=json.dumps({
                "channel": SLACK_CHANEL,
                "text": f"{result}",
            }))
        else:
            logger.info("No files or text in the event body")
    except Exception as e:
        logger.error(e)
        return e
