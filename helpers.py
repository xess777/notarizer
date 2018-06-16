import datetime


def timestamp2str(timestamp):
    result = ''
    if isinstance(timestamp, int):
        dt = datetime.datetime.fromtimestamp(timestamp)
        result = dt.strftime('%Y-%m-%d %H:%M:%S')

    return result
