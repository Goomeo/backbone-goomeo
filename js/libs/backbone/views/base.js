'use strict';

const $                         = require('jquery');
const _                         = require('underscore');
const async                     = require('async');
const Backbone                  = require('backbone');
const functions                 = require('../functions');
const log                       = require('loglevel');
const loglevelMessagePrefix     = require('loglevel-message-prefix');
const Materialize               = global.Materialize;
const moment                    = require('moment');
const riot                      = require('riot');
const viewManager               = require('../viewManager');
const eventManager              = require('../eventManager');
const templatesManager          = require('../templatesManager');
const panelManager              = require('../../goomeo/panelManager');
const modalManager              = require('../../goomeo/modalManager');

// extensiosn de backbone.view
require('backbone.stickit');

// chargement des tags communs
require('../../../components/i18n.tag');
require('../../../components/raw.tag');
require('../../../components/empty.tag');
require('../../../components/loaders/spinner.tag');

Backbone.$ = $;

var View = Backbone.View.extend(functions);

module.exports = View.extend({
    constructor : function constructor(options) {
        Backbone.View.apply(this, arguments);

        _.bindAll(this, 'render', 'mountTags', 'template', 'beforeRender', 'afterRender', '_mountBasicTags', 'createSubView', 'dispose');

        this.models             = options.models || {};
        this.collections        = options.collections || {};
        this.subviews           = {};
        this.name               = options.name;
        this.tags               = {};

        this._initGlobalEvents();

        this.render = _.wrap(this.render, function wrapRender(render) {
            async.series([
                function (done) {
                    this.waitingRender(function () {
                        this.trigger('render:waiting');
                        this.global.trigger(this.name + ':render:waiting');
                        done();
                    }.bind(this));
                }.bind(this),
                function (done) {
                    this.beforeRender(function () {
                        this.trigger('render:before');
                        this.global.trigger(this.name + ':render:before');
                        done();
                    }.bind(this));
                }.bind(this),
                function (done) {
                    render(function () {
                        this.trigger('render');
                        this.global.trigger(this.name + ':render');
                        done();
                    }.bind(this));
                }.bind(this),
                function (done) {
                    this.afterRender(function () {
                        this.trigger('render:after');
                        this.global.trigger(this.name + ':render:after');
                        done();
                    }.bind(this));
                }.bind(this)
            ], function () {
                this._mountBasicTags();
                this._initStickit();
                this._domContentLoaded();

                if (_.isFunction($.fn.tooltip)) {
                    this.$('[data-tooltip]').tooltip({
                        delay : 50
                    });
                }

                this.trigger('render:finish');
                this.global.trigger(this.name + ':render:finish');
            }.bind(this));

            return this;
        }.bind(this));
    },
    global : {
        on : function on() {
            eventManager.on.apply(this, arguments);
        },
        off : function off() {
            eventManager.off.apply(this, arguments);
        },
        trigger : function trigger() {
            eventManager.trigger.apply(this, arguments);
        },
        once : function once() {
            eventManager.once.apply(this, arguments);
        },
        listenTo : function listenTo() {
            eventManager.listenTo.apply(this, arguments);
        },
        stopListening : function stopListening() {
            eventManager.stopListening.apply(this, arguments);
        },
        listenToOnce : function listenToOnce() {
            eventManager.listenToOnce.apply(this, arguments);
        }
    },
    panels : {
        open : function open() {
            panelManager.open.apply(panelManager, arguments);
        },
        close : function close() {
            panelManager.close.apply(panelManager, arguments);
        }
    },
    toasts : {
        success : function (params) {
            var $content = $('<span class="valign-wrapper"><i class="material-icons">check_circle</i>&nbsp;&nbsp;'+ params.message + '</span>');

            this.show({
                message     : $content,
                duration    : params.duration,
                style       : params.style,
                callback    : params.callback
            });
        },
        error : function (params) {
            var $content = $('<span class="valign-wrapper"><i class="material-icons">error</i>&nbsp;&nbsp;'+ params.message + '</span>');

            this.show({
                message     : $content,
                duration    : params.duration,
                style       : params.style,
                callback    : params.callback
            });
        },
        info : function (params) {
            var $content = $('<span class="valign-wrapper"><i class="material-icons">info</i>&nbsp;&nbsp;'+ params.message + '</span>');

            this.show({
                message     : $content,
                duration    : params.duration,
                style       : params.style,
                callback    : params.callback
            });
        },
        warn : function (params) {
            var $content = $('<span class="valign-wrapper"><i class="material-icons">warning</i>&nbsp;&nbsp;'+ params.message + '</span>');

            this.show({
                message     : $content,
                duration    : params.duration,
                style       : params.style,
                callback    : params.callback
            });
        },
        show : function (params) {
            Materialize.toast(params.message, params.duration || 3000, params.style, params.callback);
        }
    },
    modal : {
        open : function open(params) {
            modalManager.open(params);
        },
        close : function close(params) {
            modalManager.close(params);
        }
    },
    /**
     * Permet de créer une sous vue et de la rattacher directement à cette vue-ci.
     *
     * @param   {string}            name                Nom de la vue. Attention si le nom existe déjà, l'ancienne vue est supprimée
     * @param   {object}            view                Vue Backbone
     * @param   {object}            [options]           Options à passer à la vue
     * @return  {object}                                Instance de la vue Backbone
     */
    createSubView : function createSubView(name, view, options) {
        var subView = viewManager.create(name, view, options);

        this.subviews[name] = subView;

        return subView;
    },
    /**
     * Permet de compiler un template en fonction des paramètres passés
     *
     * @param   {string}            template            Template à compiler
     * @param   {object}            [params]            Paramètres du template
     * @return  {string}                                Template compilé
     */
    template : function template(template, params) {
        var compile = templatesManager.compile(template);

        params = _.extend({}, params, {
            moment : moment
        });

        return compile(params);
    },
    /**
     * Supprime la vue et tout ce qui s'y rapporte en événements et en tags
     */
    dispose : function dispose() {
        eventManager.trigger('view:before:dispose:' + this.name);

        if (typeof this.subviews != 'undefined') {
            _.each(this.subviews, function (view) {
                if (view instanceof Backbone.View) {
                    view.dispose();
                }
            }, this);
        }

        if (this.collections) {
            delete this.collections;
        }
        if (this.models) {
            _.each(this.models, function (model) {
                this.unstickit(model);
            }, this);
            delete this.models;
        }

        viewManager.remove(this.name);

        this.unstickit();
        this.undelegateEvents();
        this.unbind();
        this.unmountAllTags();
        this._unbindStikits();
        this._removeGlobalEvents();
        $(this.el).remove();
        this.remove();
        Backbone.View.prototype.remove.call(this);

        eventManager.trigger('view:after:dispose:' + name);
    },
    /**
     * Permet de monter des tags RIOT dans notre vue
     *
     * @param   {object}            params              Paramètres
     * @param   {string}            params.tag          Tag à monter
     * @param   {string}            [params.selector]   Selecteur CSS valide (ex : 'div#monid > span')
     * @param   {domNode}           [params.domNode]    Node DOM qui sera remplacée par le tag à charger
     * @param   {object}            [params.options]    Options du tag
     * @return  {object[]}                              Liste des instances de tags montés. Null si rien n'est monté
     */
    mountTags : function mountTag(params) {
        var tags = null;

        if (_.isString(params.selector) && !_.isEmpty(params.selector)) {
            tags = riot.mount(this.el.querySelectorAll(params.selector), params.tag, params.options);
        } else if (!_.isEmpty(params.domNode)) {
            tags = riot.mount(params.domNode, params.tag, params.options);
        } else if (_.isEmpty(params.selector) && _.isEmpty(params.domNode)) {
            tags = riot.mount(this.el.querySelectorAll(params.tag), params.tag, params.options);
        }

        _.each(tags, function (tag) {
            this.tags[tag._riot_id] = tag;

            tag.on('unmount', function () {
                delete this.tags[tag._riot_id];
                tag = null;
            }.bind(this));
        }, this);

        this._initTagEvents(tags);

        return tags;
    },
    /**
     * Supprime tous les tags Riot de notre Vue
     */
    unmountAllTags : function unmountAllTags() {
        _.each(this.tags, function (tag) {
            tag.unmount();
        });
    },
    /**
     * Monte tous les tags communs à toutes les vues parmis les suivants :
     * - i18n
     *
     * @private
     */
    _mountBasicTags : function mountBasicTags() {
        this.mountTags({
            tag : 'i18n'
        });
        this.mountTags({
            tag : 'empty'
        });
    },
    /**
     * Initialise les events liés aux tags par rapport à ceux que l'on a renseigné à notre vue
     *
     * @param   {object[]}      tags                Riot Tags Collection
     * @private
     */
    _initTagEvents : function initTagEvents(tags) {
        _.each(tags, function (tag) {
            if (!_.has(this.tagEvents, tag.root.localName)) {
                return;
            }

            var events = this.tagEvents[tag.root.localName];

            _.each(events, function (callback, key) {
                var eventParts  = key.split(' '),
                    event       = eventParts[0],
                    search      = eventParts.length > 1 ? eventParts[1] : null;

                if (!_.isEmpty(search)) {
                    var matches = 'matches';

                    if (_.isFunction(tag.root.webkitMatchesSelector)) {
                        matches = 'webkitMatchesSelector';
                    } else if (_.isFunction(tag.root.mozMatchesSelector)) {
                        matches = 'mozMatchesSelector';
                    } else if (_.isFunction(tag.root.msMatchesSelector)) {
                        matches = 'msMatchesSelector';
                    } else if (_.isFunction(tag.root.oMatchesSelector)) {
                        matches = 'oMatchesSelector';
                    }

                    if (!tag.root[matches](search)) {
                        return;
                    }
                }

                this[callback] = _.bind(this[callback], this);
                tag.on(event, function () {
                    var args = Array.prototype.slice.call(arguments);

                    args.unshift(tag);

                    this[callback].apply(this, args);
                }.bind(this));
            }, this);
        }, this);
    },
    /**
     * Permet d'imitialiser les événements globaux renseignés sur notre vue.
     * Remplace l'ancien mediator.
     *
     * @private
     */
    _initGlobalEvents : function initGlobalEvents() {
        _.each(this.globalEvents, function (func, event) {
            this.global.on(event, this[func], this);
        }, this);
    },
    /**
     * Supprime les listeners d'événements globaux rattachés à notre vue.
     * Appelé lors de la suppression de la vue.
     *
     * @private
     */
    _removeGlobalEvents : function removeGlobalEvents() {
        _.each(this.globalEvents, function (func, event) {
            this.global.off(event, this[func], this);
        }, this);
    },
    /**
     * Initialise les événements stickit sur le model principal et sur tous les autres models de notre vue
     *
     * @private
     */
    _initStickit : function initStickit() {
        if (!_.isEmpty(this.bindings) && !_.isUndefined(this.model)) {
            this.stickit();
        }

        _.each(this.models, function (model, modelName) {
            var bindingName = modelName + 'Bindings';

            if (_.has(this, bindingName)) {
                this.stickit(model, this[bindingName]);
            }
        }, this);
    },
    /**
     * Supprime les événements stickit sur le model principal et sur tous les autres models de notre vue.
     * Appelé lors de la suppression de la vue
     *
     * @private
     */
    _unbindStikits : function unbindStikits() {
        if (_.has(this, 'bindings') && !_.isUndefined(this.model)) {
            this.unstickit();
        }

        _.each(this.models, function (model, modelName) {
            var bindingName = modelName + 'Bindings';

            if (_.has(this, bindingName)) {
                this.unstickit(model, this[bindingName]);
            }
        }, this);
    },
    _domContentLoaded : function DomContentLoaded() {
        var domContentLoadedEvent = document.createEvent("Event");

        domContentLoadedEvent.initEvent("DOMContentLoaded", true, true);
        window.document.dispatchEvent(domContentLoadedEvent);
    },
    /**
     * Permet de récupérer le logger de la vue
     */
    getLogger : function getLogger() {
        if (!this._logger) {
            this._logger = log.getLogger(this.name);

            loglevelMessagePrefix(this._logger, {
                staticPrefixes : [ this.name ]
            });
        }

        return this._logger;
    },
    // fonctions de base vides
    render              : function render() {},
    beforeRender        : function beforeRender(callback) { callback(); },
    afterRender         : function afterRender(callback) { callback(); },
    waitingRender       : function waitingRender(callback) { callback(); }
});
