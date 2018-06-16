from flask import Flask, render_template

from helpers import timestamp2str
from neb import get_last_digests

app = Flask(__name__)


@app.route('/')
def index():
    last_digests = get_last_digests()
    for item in last_digests:
        item.update({'timestamp': timestamp2str(item['timestamp'])})

    context = {
        'last_digests': last_digests,
    }

    return render_template('index.html', **context)


if __name__ == '__main__':
    app.run()
