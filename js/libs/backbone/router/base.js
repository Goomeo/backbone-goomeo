'use strict';

var log                     = require('loglevel'),
    loglevelMessagePrefix   = require('loglevel-message-prefix');

module.exports = {
    /**
     * Permet de récupérer le logger de la vue
     */
    getLogger : function getLogger() {
        var logger = log.getLogger(this.name || 'Router');

        loglevelMessagePrefix(log, {
            staticPrefixes : [ this.name || 'Router' ]
        });

        return logger;
    }
};