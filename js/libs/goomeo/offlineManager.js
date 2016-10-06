'use strict';

const EventManager  = require('../backbone/eventManager');

require('offline-js/js/offline');

module.exports = {
    init : function init(params) {
        window.Offline.on('up', function () {
            EventManager.trigger('offline:up');
        });
        window.Offline.on('down', function () {
            EventManager.trigger('offline:down');
        });
        window.Offline.options = params;
        window.Offline.check();
        setInterval(function () {
            window.Offline.check();
        }, 30000);
    }
};