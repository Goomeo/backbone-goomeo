'use strict';

const BaseView = require('./base');

require('../../../components/form/input.tag');
require('../../../components/form/textarea.tag');

module.exports = BaseView.extend({
    validForm : function validForm(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        this.preValidAction();

        this.$('form').parsley().destroy();

        if (this.$('form').parsley().validate()) {
            this.sendForm(this.$('form'));
        } // else {
        // cas des erreurs dans les tabs.
        //@todo à voir comment faire avec la nouvelle API
        // }
    },
    _mountBasicTags : function _mountBasicTags() {
        BaseView.prototype._mountBasicTags.call(this);

        this.mountTags({
            tag : 'material-input'
        });
        this.mountTags({
            tag : 'material-textarea'
        });
    },
    preValidAction  : function preValidateAction() {},
    sendForm        : function sendForm() {}
});
