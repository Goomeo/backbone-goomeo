'use strict';

const _               = require('underscore');
const View            = require('backbone-goomeo/js/libs/backbone/views/base');
const tpl             = require('../../../tpl/common/modals/network.html');

require('backbone-goomeo/js/components/form/input.tag');

module.exports = View.extend({
    events : {
        'click .cancel' : 'cancelAction'
    },
    className   : 'modal small',
    render      : function render(done) {
        this.$el.html(this.template(tpl));

        done();
    },
    cancelAction : function cancelAction() {
        if (_.isFunction(this.cancelCallback)) {
            this.cancelCallback();
        }
        this.modal.close({
            name : this.name
        });
    }
});
