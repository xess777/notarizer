var NebPay = require('nebpay');

(function($) {
    var dappAddress = 'n1pk5D11G9cH74zcUb484p4etgZxHyGoZ1L';
    var serialNumber = null;
    var nebPay = new NebPay();

    function errorHandler(event) {
        switch (event.target.error.code) {
            case event.target.error.NOT_FOUND_ERR:
                alert('File Not Found!');
                break;
            case event.target.error.NOT_READABLE_ERR:
                alert('File is not readable');
                break;
            case event.target.error.ABORT_ERR:
                break;
            default:
                alert('An error occurred reading this file.');
        }
        ;
    }

    function loadHandler(event) {
        var buffer = event.target.result;
        var digest = sha256(buffer);
        $('#fileDigest').val(digest);
        var $btnSubmit = $('#saveDigestBtn');
        $btnSubmit.removeClass('disabled');
        $btnSubmit.attr('disabled', false);
    }

    function readFile(file) {
        var reader = new FileReader();
        reader.onerror = errorHandler;
        reader.onload = loadHandler;
        reader.readAsArrayBuffer(file);
    }

    function saveDigestListener(response) {
    }

    function createQRContainer() {
        var canvas = $('<canvas>', {
            className: 'qrcode',
            css: {
                boxShadow: '2px 2px 12px lightgray',
            },
        })[0]

        $('.qrcode-wrapper').show();
        $('.qrcode-container').empty().append(canvas);

        return canvas;
    };

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
                showQRCode: true,
                container: createQRContainer(),
            },
            listener: saveDigestListener,
        }

        serialNumber = nebPay.call(dappAddress, 0, 'set', args, options);
    });
}(jQuery));