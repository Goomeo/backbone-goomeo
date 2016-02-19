'use strict';

var _               = require('underscore'),
    stringFunctions = require('../goomeo/stringFunctions');

module.exports = {
    templates   : {},
    /**
     * Compile le template passé en paramètre et retourne la fonction généré par `_.template()`.
     * Si le template passé a déjà été compilé, retourne directement le résultat de `_.template` stocké en mémoire.
     *
     * @param   {string}              template                  Template à compiler
     * @returns {function}                                      Résultat de `_.compile()`
     */
    compile     : function compile(template) {
        var hash = stringFunctions.hashCode(template);

        if (!this.templates[hash]) {
            this.templates[hash] = _.template(template);
        }

        return this.templates[hash];
    },
    /**
     * Supprime le template passé en paramètre de la mémoire du templateManager pour permettre une nouvelle
     * compilation de zéro au prochain appel de `compile()`
     *
     * @param {string}              template                Template à compiler
     */
    remove : function remove(template) {
        var hash = stringFunctions.hashCode(template);

        if (this.templates[hash]) {
            delete this.templates[hash];
        }
    }
};