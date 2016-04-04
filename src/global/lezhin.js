!function(window, document, undefined) {
    'use strict';

    if (!window.lc) {
        window.lc = {};
    }

    var $window = $(window);
    var $body = $('body');

    lc.util = {
        init: function() {
            console.log('util init');
        },
        show: function() {
            console.log('util show');
        }
    }
}(window, document);