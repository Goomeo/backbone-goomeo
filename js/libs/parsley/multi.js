'use strict';

const _       = require('underscore');
const langs   = require('../lang');

module.exports = function validator(ParsleyValidator, config) {
    var validator = ParsleyValidator.addValidator('multi', function multi(value, requirement) {
        var group   = $('input[data-parsley-multi="'+ requirement +'"],textarea[data-parsley-multi="'+ requirement +'"]'),
            isEmpty = _.isEmpty(value),
            isValid = true;

        $(group).each(function (index, elem) {
            if (!_.isEmpty($(elem).val()) && isEmpty) {
                isValid = false;
            }
        });
        return isValid;
    }, 32);

    _.each(config.locale.availables, function (locale) {
        validator.addMessage(locale, 'multi', langs.i18n('validatorMulti', { locale : locale }));
    });
};
