'use strict';

const _     = require('underscore');

/**
 * Functions to use the HTML5 LocalStorage
 *
 * @type {{isSupported : Function, get: Function, set: Function, reset: Function, removeItem: Function}}
 */
const localstorage = {
    /**
     * Is localstorage supported by browser
     *
     * @returns {boolean}   true if localstorage is supported
     */
    isSupported : function isSupported() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');

            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    },

    /**
     * Get localstorage element
     *
     * @param   key     Key to find
     * @returns {*}     Localstorage element
     */
    get         : function get(key) {
        if (this.isSupported()) {
            return localStorage[key];
        }

        return undefined;
    },

    /**
     * Set localStorage element
     * @param   key         Element key
     * @param   value       Element value
     */
    set         : function set(key, value) {
        if (this.isSupported()) {
            return localStorage[key] = value;
        }

        return undefined;
    },

    /**
     * Reset localstorage
     */
    reset       : function reset() {
        if (this.isSupported()) {
            localStorage.clear();
        }
    },

    /**
     * Remove an element from localstorage
     *
     * @param   key     Element key
     */
    removeItem  : function removeItem(key) {
        if (this.isSupported()) {
            localStorage.removeItem(key);
        }
    }
};

/**
 * JSON utilities
 *
 * @type {{setValue: Function}}
 */
const json = {
    /**
     * Set JSON value with path
     *
     * @param {string}  path        JSON path to set value
     * @param {*}       val         Value to set
     * @param {object}  obj         JSON Object
     */
    setValue : function setValue(path, val, obj) {
        var fields = path.split('.');
        var result = obj;

        for (var i = 0, n = fields.length; i < n && result !== undefined; i++) {
            var field = fields[i];

            if (i === n - 1) {
                result[field] = val;
            } else {
                if (typeof result[field] === 'undefined' || !_.isObject(result[field])) {
                    result[field] = {};
                }
                result = result[field];
            }
        }
    }
};

/**
 * Encrypt functions
 *
 * @type {{getRandomInt: Function, uid: Function}}
 */
const encrypt = {
    /**
     * Return a random int, used by `utils.uid()`
     *
     * @param   {number}    min             min range for random
     * @param   {number}    max             max range for ramdom
     * @return  {number}                    random number between min and max
     */
    getRandomInt : function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Return a unique identifier with the given `len`.
     *
     * @example
     *     utils.uid(10);
     *     // => "FDaS435D2z"
     *
     * @param   {number}    len             Length of uid String
     * @return  {String}                    Uid String result
     */
    uid : function uid(len) {
        var buf     = [],
            chars   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            charlen = chars.length;

        for (var i = 0; i < len; ++i) {
            buf.push(chars[encrypt.getRandomInt(0, charlen - 1)]);
        }

        return buf.join('');
    }
};

/**
 * Convert Object to String Query
 *
 * @param   {object}      obj               Object to convert
 * @param   {string}      [prefix]          Variables prefix
 * @returns {string}                        Query String
 */
const objectToUrlQuery = function objectToUrlQuery(obj, prefix) {
    var str = [];

    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + '[' + p + ']' : p,
                v = obj[p];

            str.push(typeof v == 'object' ? serialize(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
        }
    }
    return str.join('&');
};

module.exports = {
    localstorage        : localstorage,
    json                : json,
    encrypt             : encrypt,
    objectToUrlQuery    : objectToUrlQuery
}