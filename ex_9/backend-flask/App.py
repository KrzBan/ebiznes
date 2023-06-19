from flask import Flask
import gpt4all

app = Flask(__name__)

@app.route('/')
def get_best_polish_cities():
    gptj = gpt4all.GPT4All("ggml-gpt4all-j-v1.3-groovy")
    messages = [{"role": "user", "content": "Name 3 best polish cities"}]
    completion = gptj.chat_completion(messages)

    return completion["choices"][0]["message"]["content"]

if __name__ == '__main__':
    app.run()

