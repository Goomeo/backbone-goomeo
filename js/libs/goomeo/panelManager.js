'use strict';

const $                 = require('jquery');
const _                 = require('underscore');
const Backbone          = require('backbone');
const eventManager      = require('../backbone/eventManager');
const viewManager       = require('../backbone/viewManager');
const offlineManager    = require('./offlineManager');
const modalManager      = require('./modalManager');
const networkModal      = require('../../modules/common/modals/network');

module.exports = _.extend({
    defaultParams : {
        closeOnClickOutside : false,                    // True : ferme le panel quand on clic en dehors. (default : False)
        openNew             : true,                     // True : ouvre un nouveau slide qui remplace l'ancien. False : Ajoute un slide par dessus
        sizeClass           : 'medium'                  // Classe du slidePannel pour savoir sa taille
    },
    /**
     * Fonction appelée pour ouvrir un slidePannel
     *
     * @param {object}          params                              Function params
     * @param {boolean}         params.openNew                      True : ouvre un nouveau slide qui remplace l'ancien. False : Ajoute un slide par dessus
     * @param {string}          params.sizeClass                    Classe du slidePannel pour savoir sa taille
     * @param {Backbone.View}   [params.view]                       Instance de vue Backbone
     * @param {string}          [params.html]                       Contenu HTML
     * @param {boolean}         params.closeOnClickOutside          True : ferme le panel quand on clic en dehors. (default : False)
     * @param {boolean}         params.keepConnection               True : Affiche le slidePanel même s'il n'y a pas de connexion réseau
     *
     * full         -> 100%
     * medium       -> 2/3
     * low          -> 1/3
     */
    open : function open(params) {
        params = _.extend({}, this.defaultParams, params);

        if (params.keepConnection !== true) {
            if (offlineManager.getState() == 'down') {
                this._showNetworkModal();
                return;
            }
        }

        var $html       = $('html'),
            $panel      = $('.slidepanels');

        if ($panel.length == 0) {
            $panel = this._initPanel(params);
        }

        var $content    = $panel.find('> .slidepanel-content'),
            oldBrowser  = $html.hasClass('ie6') || $html.hasClass('ie7') || $html.hasClass('ie8') || $html.hasClass('ie9');

        if (!_.isEmpty(params.view)) {
            if (!(params.view instanceof Backbone.View)) {
                throw new Error('parameter view must be Backbone.View instance');
            }

            this._currentType  = 'view';
            this._currentPanel = params.view;
        }

        if (!_.isEmpty(params.html)) {
            this._currentType = 'html';
            this._currentPanel = params.html;
        }

        $panel.addClass(params.sizeClass);

        this._afterOpen(params, $panel, $content);

        eventManager.trigger('slidepanel:open:before');

        this._openMain({
            $panel      : $panel,
            oldBrowser  : oldBrowser
        });

        this._showTopBar({
            $panel      : $panel,
            $title      : $panel.find('> .slidepanel-close'),
            options     : params.options || {}
        });

        $('.slidepanel-close').unbind('click').click(function (evt) {
            evt.preventDefault();
            this.close();
        }.bind(this));
    },
    close : function close() {
        eventManager.trigger('slidepanel:close:before');

        var $html       = $('html'),
            oldBrowser  = $html.hasClass('ie6') || $html.hasClass('ie7') || $html.hasClass('ie8') || $html.hasClass('ie9');

        $('.slidepanel-fade').remove();

        if (oldBrowser) {
            $('.slidepanels').remove();
            if (this._currentPanel && this._currentPanel instanceof Backbone.View) {
                viewManager.dispose(this._currentPanel.name);
            }

            this._currentPanel = null;

            //$('body').css('overflow', 'auto');
            eventManager.trigger('multislide:close:after');
        } else {
            $('.slidepanels').addClass('animate-close');
            $('.slidepanels').off('webkitAnimationEnd mozAnimationEnd oanimationend animationend MSAnimationEnd');
            $('.slidepanels').one('webkitAnimationEnd mozAnimationEnd oanimationend animationend MSAnimationEnd', function(){
                $('.slidepanels').remove();
                if (this._currentPanel && this._currentPanel instanceof Backbone.View) {
                    viewManager.dispose(this._currentPanel.name);
                }

                this._currentPanel = null;

                //$('body').css('overflow', 'auto');
                eventManager.trigger('multislide:close:after');
            }.bind(this));
        }
    },
    _initPanel : function initPanel(params) {
        var $title      = $('<a href="#" class="slidepanel-close back-button waves-effect waves-light" ><i class="material-icons">close</i></a>'),
            $content    = $('<div class="slidepanel-content"></div>'),
            $panel      = $('<div class="slidepanels z-depth-3"></div>'),
            $fade       = $('<div class="slidepanel-fade animated"></div>'),
            $body       = $('body');

        $panel.append($title).append($content);
        $body.append($panel);
        $body.append($fade);

        if (params.closeOnClickOutside === true) {
            $fade.click(function () {
                this.close();
            }.bind(this));
        }

        return $panel;
    },
    _afterOpen : function afterOpen(params, $panel, $content) {
        this.once('slide:open:after', function() {
            if (this._currentType == 'view') {
                $content.html(params.view.render().$el);
            } else {
                $content.html(params.html);
            }

            this._showTopBar({
                $panel      : $panel,
                $title      : $panel.find('> .slidepanel-close'),
                options     : params.options || {}
            });
        }, this);
    },
    _openMain : function openMain(params) {
        if (params.oldBrowser === true) {
            this._afterOpenMain(params);
        } else {
            params.$panel.addClass('animate-open');
            params.$panel.off('webkitAnimationEnd mozAnimationEnd oanimationend animationend MSAnimationEnd');
            params.$panel.one('webkitAnimationEnd mozAnimationEnd oanimationend animationend MSAnimationEnd', function () {
                this._afterOpenMain(params);
            }.bind(this));
        }
    },
    _afterOpenMain : function afterOpenMain(params) {
        var $body = $('body');

        params.$panel.removeClass('animate-open');
        params.$panel.addClass('isOpen');

        $body.css('overflow', 'hidden');

        eventManager.trigger('multislide:open:after');

        this.trigger('slide:open:after');
    },
    _showTopBar : function showTopBar(params) {
        // top Bar
        if (params.$panel.find('.top-bar').length == 0) {
            params.$panel.prepend('<div class="top-bar"><div class="actions"></div><div class="title ellipsis"></div></div>');
        }

        params.$panel.find('.top-bar .title').html(params.options.title);
    },
    _showNetworkModal : function showNetworkModal() {
        modalManager.open({
            view : this.createSubView('modal:network', networkModal)
        });
    }
}, Backbone.Events);
