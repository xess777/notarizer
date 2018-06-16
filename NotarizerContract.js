'use strict';

var NotarizerContract = function () {
    this.DIGEST_LEN = 64;

    LocalContractStorage.defineMapProperty(this, 'storage');
    LocalContractStorage.defineMapProperty(this, 'digestIndexes');
    LocalContractStorage.defineProperty(this, 'count');
};

NotarizerContract.prototype = {
    init: function () {
        this.count = 0;
    },

    set: function (digest) {
        this._checkDigest(digest);
        if (this.storage.get(digest)) {
            throw new Error('File digest already exist.');
        }

        var data = this._prepareData(digest);
        this.storage.set(digest, data);
        this.digestIndexes.set(this.count, digest);
        this.count +=1;

        return JSON.stringify(data);
    },

    get: function (digest) {
        this._checkDigest(digest);
        var data = this.storage.get(digest);
        if (!data) {
            throw new Error('File digest not found.');
        }

        return JSON.stringify(data);
    },

    getLast: function (limit) {
        var result = [];
        var limit = parseInt(limit);

        if (this.count > 0) {
            for (var i = this.count - 1; i >= 0 && i >= this.count - limit; i--) {
                var key = this.digestIndexes.get(i);
                var data = this.storage.get(key);
                result.push(data);
            }
        }

        return JSON.stringify(result);
    },

    _checkDigest: function(digest) {
        if (!digest) {
            throw new Error('No file digest before.');
        } else if (digest.length != this.DIGEST_LEN) {
            throw new Error('Invalid digest.');
        }
    },

    _prepareData: function (digest) {
        var data = {
            'digest': digest,
            'txHash': Blockchain.transaction.hash,
            'from': Blockchain.transaction.from,
            'timestamp': Blockchain.transaction.timestamp,
        }

        return data;
    }
};

module.exports = NotarizerContract;