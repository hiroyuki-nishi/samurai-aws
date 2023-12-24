import json

def handler(event, context):
    # 以下のようにLambdaプロキシ統合の場合、必要なパラメータを付与して返す必要がある
    # https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/how-to-cors.html
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps('Hello from Lambda!')
    }
