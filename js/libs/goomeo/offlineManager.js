'use strict';

const EventManager  = require('../backbone/eventManager');

require('offline-js/js/offline');

module.exports = {
    init : function init(params) {
        this.isInit = true;

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
    },
    getState : function getState() {
        return this.isInit === true ? window.Offline.state : 'up';
    },
    checkState : function checkState() {
        window.Offline.check();
        return this.isInit === true ? window.Offline.state : 'up';
    }
};
