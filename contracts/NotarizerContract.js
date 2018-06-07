'use strict';

var NotarizerContract = function () {
    LocalContractStorage.defineMapProperty(this, 'storage');
};

NotarizerContract.prototype = {
    init: function () {
    },

    set: function (digest) {
        this._checkDigest(digest);
        if (this.storage.get(digest)) {
            throw new Error('File digest already exist.');
        }

        var data = this._prepareData();
        this.storage.set(digest, data);

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

    _checkDigest: function(digest) {
        if (!digest) {
            throw new Error('No file digest before.');
        }
    },

    _prepareData: function () {
        var data = {
            'txHash': Blockchain.transaction.hash,
            'from': Blockchain.transaction.from,
            'timestamp': Blockchain.transaction.timestamp,
        }

        return data;
    }
};

module.exports = NotarizerContract;