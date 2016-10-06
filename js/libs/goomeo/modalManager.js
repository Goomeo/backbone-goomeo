'use strict';

const $             = require('jquery');
const _             = require('underscore');
const Backbone      = require('backbone');
const viewManager   = require('../backbone/viewManager');

module.exports = {
    defaultParams : {

    },
    /**
     * Permet de crér une modale à partir d'HTML ou d'une vue backbone.
     *
     * **Atention** : Popur marcher en html vous devez avoir la structure totale d'une modal.
     * Pour les vue, la classe de votre vue doit être celle de base de la modal.
     *
     * A noter que si vous avez déjà une modal, elle est détruite pour laisser se crér la nouvelle.
     *
     * @param {object}          params              Function params
     * @param {string}          [params.html]       Modale en html
     * @param {Backbone.View}   [params.view]       Instance de vue Backbone
     * @param {object}          [params.options]    Options de la fonction `openModal` fournies par materialize-css.
     */
    open : function open(params) {
        params.options = _.extend({}, this.defaultParams, params.options);

        this.close();

        if (!_.isEmpty(params.html)) {
            $('body').append(params.html);

            $('body .modal').openModal(params.options);

            if (_.isFunction(params.options.complete)) {
                params.options.complete = _.wrap(params.options.complete, function (complete) {
                    complete();
                    $('body .modal').remove();
                });
            } else {
                params.options.complete = function () {
                    $('body .modal').remove();
                };
            }
        }

        if (params.view instanceof Backbone.View) {
            params.view.once('render:finish', function () {
                if (_.isFunction(params.options.complete)) {
                    params.options.complete = _.wrap(params.options.complete, function (complete) {
                        complete();
                        params.view.dispose();
                    });
                } else {
                    params.options.complete = function () {
                        params.view.dispose();
                    };
                }

                $('body .modal').openModal(params.options);
            });

            $('body').append(params.view.render().$el);
        }
    },
    /**
     * Ferme toutes les modals de disponibles dans le DOM.
     * Normalement si vous passez qu'avec ce manager, vous ne devriez en avoir qu'une maximum.
     *
     * @param {object}          [params]            Function params
     * @param {object}          [params.options]    Options de la fonction `closeModal` fournies par materialize-css.
     * @param {string}          [params.name]       Nom de la vue backbone associée s'il y en a une
     */
    close : function close(params) {
        if (_.isUndefined(params)) {
            params = {};
        }

        params.options = _.extend({}, this.defaultParams, params.options);

        if (_.isFunction(params.options.complete)) {
            params.options.complete = _.wrap(params.options.complete, function (complete) {
                complete();

                if (!_.isEmpty(params.name)) {
                    viewManager.dispose(params.name);
                }

                $('body .modal').remove();
            });
        } else {
            params.options.complete = function () {
                if (!_.isEmpty(params.name)) {
                    viewManager.dispose(params.name);
                }

                $('body .modal').remove();
            };
        }

        $('body .modal').closeModal(params.options);
    }
};