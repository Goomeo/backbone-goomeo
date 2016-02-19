'use strict';

var _               = require('underscore'),
    View            = require('backbone-goomeo/js/libs/backbone/views/base'),
    tpl             = require('../../../tpl/common/modals/delete.html');

require('backbone-goomeo/js/components/form/input.tag');

module.exports = View.extend({
    events : {
        'click .cancel' : 'cancelAction',
        'click .accept' : 'acceptAction'
    },
    className   : 'modal small',
    initialize  : function initialize(options) {
        this.message            = options.message || 'deleteMessage';
        this.title              = options.title || 'deleteTitle';
        this.accept             = options.accept || 'delete';
        this.cancel             = options.cancel || 'cancel';
        this.icon               = options.icon || 'delete';
        this.labelDoubleVerif   = options.labelDoubleVerif || 'deleteDoubleVerif';
        this.hasDoubleVerif     = options.hasDoubleVerif || false;
        this.validateCallback   = options.validateCallback || function () {};
        this.cancelCallback     = options.cancelCallback || function () {};
    },
    render : function render(done) {
        this.$el.html(this.template(tpl, {
            message             : this.message,
            title               : this.title,
            accept              : this.accept,
            cancel              : this.cancel,
            icon                : this.icon,
            hasDoubleVerif      : this.hasDoubleVerif,
            labelDoubleVerif    : this.labelDoubleVerif
        }));

        this.mountTags({
            tag : 'material-input'
        });

        if (this.hasDoubleVerif === true) {
            this.$el.find('.accept')
                .removeClass('modal-action')
                .removeClass('modal-close');
        }

        done();
    },
    cancelAction : function cancelAction() {
        if (_.isFunction(this.cancelCallback)) {
            this.cancelCallback();
        }
        this.modal.close({
            name : this.name
        });
    },
    acceptAction : function acceptAction(evt) {
        if (this.hasDoubleVerif === true) {
            evt.preventDefault();
            evt.stopPropagation();

            if (this.$el.find('input[name="verif"]').val() == 'OK') {
                if (_.isFunction(this.validateCallback)) {
                    this.validateCallback();
                }
            }
            return;
        }

        if (_.isFunction(this.validateCallback)) {
            this.validateCallback();
        }
    }
});
