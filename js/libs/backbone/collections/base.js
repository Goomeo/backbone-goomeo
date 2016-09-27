'use strict';

const _         = require('underscore');
const Backbone  = require('backbone');
const io        = require('socket.io-client');
const functions = require('../functions');

var Collection = Backbone.Collection.extend(functions);

module.exports = Collection.extend({
    constructor : function constructor() {
        this._initSockets();

        Collection.apply(this, arguments);
    },
    /**
     * Permet d'initialiser les événements sockets propres à la vue
     *
     * @private
     */
    _initSockets : function initSockets() {
        if (!this.socketEvents) {
            return;
        }

        if (this.socketEvents && !_.isEmpty(this.socket)) {
            this.socket = io(this.socket);

            _.each(this.socketEvents.default, function (funcName, event) {
                if (_.isFunction(this[funcName])) {
                    _.bindAll(this, funcName);
                    this.socket.on(event, this[funcName]);
                }
            }, this);
        }

        _.each(this.sockets, function (url, socketName) {
            this.sockets[socketName] = io(url);

            _.each(this.socketEvents[socketName], function (funcName, event) {
                if (_.isFunction(this[funcName])) {
                    _.bindAll(this, funcName);
                    this.sockets[socketName].on(event, this[funcName]);
                }
            }, this);
        }, this);
    },
    /**
     * Supprime tous les événements sockets de la vue
     */
    unbindSockets : function unbindSocket() {
        if (this.socket) {
            this.socket.removeAllListeners();
            this.socket.disconnect();
        }

        _.each(this.sockets, function (socket) {
            socket.removeAllListeners();
            socket.disconnect();
        });
    }
});
