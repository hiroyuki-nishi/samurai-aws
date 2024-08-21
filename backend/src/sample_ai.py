import openai

# OpenAI APIキーを設定
openai.api_key = 'your-api-key-here'  # 自分のAPIキーをここに入れてください

# ChatGPT APIにリクエストを送信
response = openai.ChatCompletion.create(
    model="gpt-4",  # 使用するモデルを指定 (gpt-3.5-turboやgpt-4など)
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "PythonでChatGPT APIを呼び出すコードを書いてください。"}
    ],
    max_tokens=150,  # 応答のトークン数の最大値を指定
    n=1,  # 応答の数を指定
    stop=None,  # 応答の終了条件 (指定がない場合はモデルの設定に従う)
    temperature=0.7,  # 応答の多様性を制御 (0.0 - 1.0)
)

# 応答内容を取得して表示
assistant_reply = response['choices'][0]['message']['content']
print(assistant_reply)
