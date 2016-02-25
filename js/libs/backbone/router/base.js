'use strict';

var log                     = require('loglevel'),
    loglevelMessagePrefix   = require('loglevel-message-prefix');

module.exports = {
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
};