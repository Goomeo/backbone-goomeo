'use strict';

var _       = require('underscore');

module.exports = {
    init : function init() {
        this._extendConfig();
        this._initValidators();
    },
    _extendConfig : function extendConfig() {
        var Parsley = window.Parsley;

        Parsley.options.classHandler = function (el) {
            var result = el;

            if (el.$element.parent().hasClass('input-field')) {
                result = el.$element.closest('.input-field');
            }
            return result;
        };

        Parsley.options.classHandler = function (el) {
            return el.$element.closest('.input-field');
        }
    },
    _initValidators : function initValidators() {
        var Parsley = window.Parsley;

        if (!Parsley) {
            return;
        }

        var validators = [
            require('./parsley/multi')
        ];

        _.each(validators, function (validator) {
            validator(Parsley);
        });
    }
};
