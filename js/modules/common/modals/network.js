'use strict';

const _               = require('underscore');
const View            = require('../../../libs/backbone/views/base');
const tpl             = require('../../../tpl/common/modals/network.html');

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
        this.modal.close({
            name : this.name
        });
    }
});
