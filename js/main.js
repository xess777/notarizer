(function($) {
    'use strict';

    function onReadFileEndHandler(event) {
        var buffer = event.target.result;
        var digest = sha256(buffer);
        $('#fileDigest').val(digest);
        var $btnSubmit = $('button:submit');
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

    $('#certifiedFile').on('change', function(event) {
        if(this.files == undefined || this.files.length == 0) {
            return;
        }
        var file = this.files[0];
        readFile(file);
    });
}(jQuery));