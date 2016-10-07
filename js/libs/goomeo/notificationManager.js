'use strict';

const _     = require('underscore');
const $     = require('jquery');
const lang  = require('../lang');

module.exports = {
    defaultParams : {
        time : 5000,
        type : 'success'
    },
    /**
     * Permet d'afficher la notification
     *
     * @param {object}      options                      Function params
     * @param {string}      options.message              Message à afficher, peut être la phrase directe ou un code i18n
     * @param {string}      [options.type]               Type de notification (info,warning,success,error). Default : 'success'
     * @param {number}      [options.time]               Durée d'affichage de la notification en ms. Default : 5000
     * @param {object}      [options.action]             Action possible sur la notification
     * @param {string}      [options.action.label]       Label du bouton d'action,  peut être la phrase directe ou un code i18n
     * @param {function}    [options.action.callback]    Fonction appelée lors du clic sur l'action.
     */
    show : function show(options) {
        let params          = _.extend({}, this.defaultParams, options);
        let $notification   = $('<div class="goomeo-notification animated bounceInLeft"></div>');

        this._close();

        if (params.type) {
            $notification.addClass(params.type);
        }

        $notification.append('<div class="notification-content">'+ lang.i18n(params.message) +'</div>');

        $notification.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
            $notification.removeClass('animated bounceInLeft');
        });

        $('body').prepend($notification);

        setTimeout(() => {
            this._close();
        }, params.time);
    },
    _close : function close() {
        let $notification = $('#goomeo-notification');

        $notification.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
            $notification.remove();
        });
        $notification.addClass('animated bounceOutLeft');
    }
};
