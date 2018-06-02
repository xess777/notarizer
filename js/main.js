var NebPay = require('nebpay');

(function($) {
    var dappAddress = 'n1vrq258dYUwe8Y5RqffimwzDM2nv5CFjEF';
    var serialNumber = null;
    var nebPay = new NebPay();

    function onReadFileEndHandler(event) {
        var buffer = event.target.result;
        var digest = sha256(buffer);
        $('#fileDigest').val(digest);
        var $btnSubmit = $('#saveDigestBtn');
        $btnSubmit.removeClass('disabled');
        $btnSubmit.attr('disabled', false);
    }

    function readFile(file) {
        var reader = new FileReader();

        reader.onloadend = onReadFileEndHandler;

        reader.onerror = function(event) {
            alert('Can not read file! Code: ' + event.target.error.code);
        };

        reader.readAsArrayBuffer(file);
    }

    function saveDigestListener(response) {
    }

    $('#certifiedFile').on('change', function(event) {
        if(this.files == undefined || this.files.length == 0) {
            return;
        }
        var file = this.files[0];
        readFile(file);
    });

    $('#saveDigestBtn').on('click', function () {
        var args = JSON.stringify([$('#fileDigest').val()]);
        var options = {
            qrcode: {
                showQRCode: false
            },
            listener: saveDigestListener,
        }
        serialNumber = nebPay.call(dappAddress, 0, 'set', args, options);
    });
}(jQuery));