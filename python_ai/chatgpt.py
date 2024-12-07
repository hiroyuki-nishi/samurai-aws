import json
import base64
import boto3
from openai import OpenAI

s3_client = boto3.client('s3', region_name='ap-northeast-1')
client = OpenAI(
    api_key=""
)

def download_image_from_s3(bucket_name, object_key, image_path):
    s3_client.download_file(bucket_name, object_key, image_path)

def encode_image(image_path):
  with open(image_path, 'rb') as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

def lambda_handler(event, context):
    # print(event)
    body = event["Records"][0]["body"]
    body_data = json.loads(body)
    s3 = body_data["Records"][0]["s3"]
    bucket_name = s3["bucket"]["name"]
    print(bucket_name)
    object_key = s3["object"]["key"]
    print(object_key)
    image_path = f"/tmp/{object_key}"
    download_image_from_s3(bucket_name, object_key, f"/tmp/{object_key}")
    base64_image = encode_image(image_path)

    prompt = (
        "The user has provided an image containing a brand label. "
        "Analyze the image and identify the brand name visible on the label."
    )
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
            "role": "system",
            "content": "あなたは服のブランドに詳しいギャルです。ギャルの口調で質問に答えてください。"
            },
            {
            "role": "user",
            "content": [
                {
                    "type": "text", 
                    "text": "提供された画像について説明してください。"
                },
                {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{base64_image}"
                }
                }
            ]
            }
        ],
        max_tokens=300
    )

    print(response.choices[0].message.content)
