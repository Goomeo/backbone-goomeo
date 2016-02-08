'use strict';

var _       = require('underscore'),
    $       = require('jquery'),
    _str    = require('underscore.string');

module.exports = {
    init : function init() {
        this.on('update', function update() {
            this.parsley = {};

            var keys = _.keys(this.opts);

            _.each(keys, function each(key) {
                if (_str.startsWith(key, 'parsley')) {
                    var propName = key.replace('parsley', '');

                    this.parsley[_str(propName).decapitalize().dasherize().value()] = this.opts[key];
                }
            }, this);
        });

        this.on('mount', function mount() {
            _.each(this.parsley, function each(rule, key) {
                $('input', this.root).attr('data-parsley-' + key, rule);
            }, this);
        });
    }
};
