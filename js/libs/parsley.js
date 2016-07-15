'use strict';

const _       = require('underscore');

module.exports = {
    init : function init(config) {
        this._extendConfig();
        this._initValidators(config);
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
    _initValidators : function initValidators(config) {
        var Parsley = window.Parsley;

        if (!Parsley) {
            return;
        }

        var validators = [
            require('./parsley/multi')
        ];

        validators = this.addValidators(validators);

        _.each(validators, function (validator) {
            validator(Parsley, config);
        });
    },
    addValidators : function addValidators(validators) {
        return validators;
    }
};
