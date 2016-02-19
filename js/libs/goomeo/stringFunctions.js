'use strict';

module.exports = {
    /**
     * Permet de récupérer le hash d'un String
     *
     * @param   {string}         s                  Le string à convertir
     * @returns {string}                            Le hash du string
     */
    hashCode : function hashCode(s) {
        return s
            .split('')
            .reduce(function (a, b) {
                a = ((a<<5)-a)+b.charCodeAt(0);
                return a&a;
            }, 0);
    }
};