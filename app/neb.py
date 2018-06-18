import json

from nebpysdk.src.client.Api import Api
from requests import RequestException
from werkzeug.contrib.cache import FileSystemCache

from config import Config


def get_last_digests():
    cache = FileSystemCache(Config.CACHE_DIR, default_timeout=0)
    cache_key = 'last_digests'

    api = Api(host=Config.HOST)
    contract = {
        'args': '["5"]',
        'function': 'getLast',
    }
    try:
        response = api.call(
            from_addr=Config.ADDRESS,
            to_addr=Config.ADDRESS,
            value='0',
            nonce=0,
            gasprice=Config.GASPRICE,
            gaslimit=Config.GASLIMIT,
            contract=contract)
    except RequestException:
        result = cache.get(cache_key)
    else:
        if response.status_code == 200:
            result = response.json().get('result', {}).get('result', '{}')
            result = json.loads(result)
            if isinstance(result, str):
                result = json.loads(result)
                cache.set(cache_key, result)

    return result
