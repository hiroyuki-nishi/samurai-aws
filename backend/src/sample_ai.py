from openai import OpenAI


client = OpenAI(
    # 自分のAPIキーをここに入れてください
    api_key=''
)

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": "こんにちは！",
        }
    ],
    model="gpt-4",  # 使用するモデルを指定 (gpt-3.5-turboやgpt-4など)
)

# 応答内容を取得して表示
assistant_reply = chat_completion.choices[0].message.content
print(assistant_reply)
