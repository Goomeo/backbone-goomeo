'use strict';

const _                       = require('underscore');
const Globalize               = require('globalize');
const moment                  = require('moment');
const log                     = require('loglevel');
const loglevelMessagePrefix   = require('loglevel-message-prefix');

module.exports = {
    config : {
        locale : {
            default : 'en',
            availables : [ 'en' ]
        }
    },
    init   : function init(config) {
        if (!_.isUndefined(config)) {
            this.config = config;
        }

        this._initGlobalize();
        this._initMoment();
        this._initParsley();

        var locale  = this.getLocale();

        moment.locale(this._getLocaleForMoment(locale));
        window.Parsley.setLocale(this._getLocaleForParsley(locale));
        this.globalize.locale(this._getLocaleForGlobalize(locale));

        this._logger = log.getLogger('i18n');

        loglevelMessagePrefix(this._logger, {
            staticPrefixes : [ 'i18n' ]
        });
    },
    _initGlobalize : function initGlobalize() {
        // loading globalize files
        this.globalize = Globalize;
        this.globalize.load(
            require('cldr-data/supplemental/likelySubtags'),
            require('cldr-data/supplemental/numberingSystems'),
            require('cldr-data/supplemental/plurals'),
            require('cldr-data/supplemental/ordinals'),
            require('cldr-data/supplemental/currencyData')
        );

        this._initMainData();
        this._initMessages();
    },
    _initMoment     : function initMoment() { },
    _initParsley    : function initParsley() {},
    _initMainData   : function initMainData() {},
    _initMessages   : function initMessages() {},
    changeLocale    : function changeLocale(locale) {
        var newLocale       = locale,
            currentLocale   = localStorage.getItem('locale');

        if (!_.contains(this.config.locale.availables, locale)) {
            newLocale = 'en';
        }

        if (newLocale != currentLocale) {
            moment.locale(this._getLocaleForMoment(newLocale));
            this.globalize.locale(this._getLocaleForGlobalize(newLocale));
            window.Parsley.setLocale(this._getLocaleForParsley(newLocale));

            localStorage.setItem('locale', newLocale);

            // @todo gestion de la langue dans l'url
        }
    },
    getLocale : function getLocale() {
        var defaultLocale = this.config.locale.default,
            navigatorLang = (navigator.language || navigator.browserLanguage || navigator.userLanguage || navigator.systemLanguage).substring(0, 2),
            currentLocale = localStorage.getItem('locale');

        if (_.isEmpty(currentLocale)) {
            var newLocal = _.contains(this.config.locale.availables, navigatorLang) ? navigatorLang : defaultLocale;

            this.changeLocale(newLocal);
            return newLocal;
        }

        return currentLocale;
    },
    /**
     * Traduit le mot clé passé en paramètre en utilisant globalize. Compatible pluralize, numberFormat, ...
     *
     * @param   {String}            keyword                 mot clé à traduire
     * @param   {object}            [options]               Options de la fonction i18n
     * @param   {object}            [options.root]          Root config for format (use if no specific format on the variable)
     * @param   {object}            [options.variables]     Variables de remplacement dans la phrase à traduire
     * @param   {string}            [options.locale]        Forcer une locale à Globalize
     * @returns {String}
     */
    i18n : function i18n(keyword, options) {
        var currentGlobalize,
            locale;

        if (options && !_.isEmpty(options.locale)) {
            locale = options.locale;
        } else {
            locale = this.getLocale();
        }

        currentGlobalize = this.globalize(this._getLocaleForGlobalize(locale));

        try {
            var msgFormatter = currentGlobalize.messageFormatter(keyword);

            // message simple sans variable ni option
            if (!options) {
                return msgFormatter();
            }

            // format simple avec les variables passées en tableau ou en objet de type {clé : valeur ...)
            if (options && (_.isArray(options) || !_.has(options, 'variables'))) {
               var numberFormatter = currentGlobalize.numberFormatter({ style : 'decimal' });

               options = _.each(options, function (option, key) {
                   if (_.isNumber(option)) {
                       options[key] = numberFormatter(option);
                   }
               });
               return msgFormatter(options);
            }

            // format avec options spécifiques
            if (options && options.variables) {
                var formatter       = {},
                    variablesMsg    = {},
                    numberParser    = currentGlobalize.numberParser();

                // chargement des options par défaut
                if (options.root) {
                    _.each(options.root, function (rootConfig) {
                        formatter[rootConfig.type] = currentGlobalize[rootConfig.type].apply(currentGlobalize, this._getFormatOpts(rootConfig));
                    }.bind(this));
                }

                // format pour chaque variable
                _.each(options.variables, function (variable, index) {
                    // pas de format
                    // le plural utilise le messageFormatter donc on ne le traite pas
                    if ((_.has(variable, 'useFormat') && !variable.useFormat) || variable.type == 'plural' || !_.has(variable, 'type')) {
                        variablesMsg[variable.key || index] = variable.value;
                        return;
                    }

                    if ((variable.type == 'currencyFormatter' ||
                        variable.type == 'unitFormatter' ||
                        variable.type == 'numberFormatter') && !_.isNumber(variable.value)) {
                        variable.value = numberParser(variable.value);
                    }

                    // pas de format spécifié mais il y a une config par défaut => on prend le format par défaut
                    if (!_.has(variable, 'config') && formatter[variable.type]) {
                        variablesMsg[variable.key || index] = formatter[variable.type](variable.value);
                        return;
                    }

                    variablesMsg[variable.key || index] = currentGlobalize[variable.type].apply(currentGlobalize, this._getFormatOpts(variable))(variable.value);
                }, this);

                return msgFormatter(variablesMsg);
            }

            return msgFormatter();
        } catch (err) {
            if (err.code == 'E_MISSING_MESSAGE') {
                this._logger.warn('No traduction for : ' + keyword);
            } else {
                this._logger.warn('Error translating : ' + keyword);
            }
        }

        return keyword;
    },
    _getFormatOpts : function _getFormatOpts(format) {
        var opts = [];

        if (format.type == 'currencyFormatter' && format.currency) {
            opts.push(format.currency);
        }
        if (format.type == 'unitFormatter' && format.unit) {
            opts.push(format.unit);
        }
        if (format.config) {
            opts.push(format.config);
        }

        return opts;
    },
    _getLocaleForMoment : function _getLocaleForMoment(locale) {
        if (locale == 'cn') {
            return 'zh-cn';
        }
        return locale;
    },
    _getLocaleForGlobalize : function _getLocaleForGlobalize(locale) {
        if (locale == 'cn') {
            return 'zh-cn';
        }
        return locale;
    },
    _getLocaleForParsley : function _getLocaleForParsley(locale) {
        // special case for Parsley locales : cn => zh_cn, pt => pt-pt
        if (locale == 'cn') {
            return 'zh-cn';
        }
        if (locale == 'pt') {
            return 'pt-pt';
        }
        return locale;
    }
};
