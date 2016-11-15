'use strict';

const _                     = require('underscore');
const functions             = require('../functions');
const log                   = require('loglevel');
const loglevelMessagePrefix = require('loglevel-message-prefix');

module.exports = _.extend({}, functions, {
    /**
     * Permet de récupérer le logger de la vue
     */
    getLogger : function getLogger() {
        if (!this._logger) {
            this._logger = log.getLogger(this.name);

            loglevelMessagePrefix(this._logger, {
                staticPrefixes : [ this.name ]
            });
        }

        return this._logger;
    }
});