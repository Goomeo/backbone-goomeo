'use strict';

const _             = require('underscore');
const Backbone      = require('backbone');
const socketManager = require('../../goomeo/socketManager');
const functions     = require('../functions');

var Collection = Backbone.Collection.extend(functions);

module.exports = Collection.extend({
    constructor : function constructor() {
        this._initSockets();

        Collection.apply(this, arguments);
    },
    /**
     * Permet d'initialiser les événements sockets propres à la collection
     *
     * @private
     */
    _initSockets : function initSockets() {
        if (!this.socketEvents) {
            return;
        }

        if (this.socketEvents && !_.isEmpty(this.socket)) {
            this._socketUrl = this.socket;
            this.socket     = socketManager.create(this.socket);

            _.each(this.socketEvents.default, (funcName, event) => {
                if (_.isFunction(this[funcName])) {
                    _.bindAll(this, funcName);
                    this.socket.on(event, this[funcName]);
                }
            });
        }

        this._socketsUrl = this.sockets;
        _.each(this.sockets, (url, socketName) => {
            this.sockets[socketName] = socketManager.create(url);

            _.each(this.socketEvents[socketName], (funcName, event) => {
                if (_.isFunction(this[funcName])) {
                    _.bindAll(this, funcName);
                    this.sockets[socketName].on(event, this[funcName]);
                }
            });
        });
    },
    /**
     * Supprime tous les événements sockets du model
     *
     * @private
     */
    _unbindSockets : function unbindSocket() {
        if (this.socket) {
            socketManager.unbind({
                url         : this._socketUrl,
                listeners   : _.mapObject(this.socketEvents.default, (funcName) => {
                    return this[funcName];
                })
            });
        }

        _.each(this.sockets, (socket, name) => {
            socketManager.unbind({
                url         : this._socketsUrl[name],
                listeners   : _.mapObject(this.socketEvents[name], (funcName) => {
                    return this[funcName];
                })
            });
        });
    }
});
