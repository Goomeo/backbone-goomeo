'use strict';

const Offline       = require('offline-js');
const EventManager  = require('../backbone/eventManager');


module.exports = {
    init : function init(params) {
        Offline.on('up', function () {
            EventManager.trigger('offline:up');
        });
        Offline.on('down', function () {
            EventManager.trigger('offline:down');
        });
        Offline.options = params;
        Offline.check();
        setInterval(function () {
            Offline.check();
        }, 30000);
    }
};