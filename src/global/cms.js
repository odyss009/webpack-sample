!function(window, document, undefined) {
    'use strict';

    if (!window.lc) {
        window.lc = {};
    }

    var $window = $(window);
    var $body = $('body');

    lc.util.init();

    lc.cms = {
        noti: function() {
            console.log('cms noti');
        }
    };
}(window, document);