'use strict';

const _  = require('underscore');
const io = require('socket.io-client');

module.exports = {
    sockets : {},
    create  : function create(url) {
        let socket = this.sockets[url];

        if (_.isEmpty(socket)) {
            socket = io(url);
            this.sockets[url] = socket;
        }

        return socket;
    },
    unbind : function unbind(params) {
        let socket = this.sockets[params.url];

        if (!_.isEmpty(socket)) {
            _.each(params.listeners, (func, event) => {
                socket.removeListener(event, func);
            });
        }
    },
    disconnect : function disconnect(url) {
        let socket = this.sockets[url];

        if (!_.isEmpty(socket)) {
            socket.removeAllListeners();
            socket.disconnect();
        }
    }
};
