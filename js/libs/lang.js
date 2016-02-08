'use strict';

var _           = require('underscore'),
    config      = require('../config'),
    Globalize   = require('globalize'),
    moment      = require('moment');

module.exports = {
    config : config,
    init   : function init(config) {
        if (!_.isUndefined(config)) {
            this.config = config;
        }

        var locale  = this.getLocale();

        this._initGlobalize(locale);
        this._initMoment(locale);
        this._initParsley(locale);
    },
    _initGlobalize : function initGlobalize(locale) {
        // loading globalize files
        this.globalize = Globalize;
        this.globalize.load(
            require('cldr-data/supplemental/likelySubtags'),
            require('cldr-data/supplemental/numberingSystems'),
            require('cldr-data/supplemental/plurals'),
            require('cldr-data/supplemental/ordinals'),
            require('cldr-data/supplemental/currencyData'),

            require('cldr-data/main/en/numbers'),
            require('cldr-data/main/en/currencies'),
            require('cldr-data/main/en/units'),

            require('cldr-data/main/fr/numbers'),
            require('cldr-data/main/fr/currencies'),
            require('cldr-data/main/fr/units'),

            require('cldr-data/main/de/numbers'),
            require('cldr-data/main/de/currencies'),
            require('cldr-data/main/de/units')
        );

        this.globalize.loadMessages(_.extend({},
            require('../nls/en.json'),
            require('../nls/fr.json'),
            require('../nls/de.json')
        ));

        this.globalize.locale(locale);
    },
    _initMoment : function initMoment(locale) {
        moment.locale('fr', require('moment/locale/fr'));
        moment.locale('de', require('moment/locale/de'));

        moment.locale(locale);
    },
    _initParsley : function initParsley(locale) {
        require('parsleyjs/dist/i18n/en');
        require('parsleyjs/dist/i18n/de');
        require('parsleyjs/dist/i18n/fr');

        window.Parsley.setLocale(locale);
    },
    changeLocale : function changeLocale(locale) {
        var newLocale       = locale,
            currentLocale   = localStorage.getItem('locale');

        if (!_.contains(this.config.locale.availables, locale)) {
            newLocale = 'en';
        }

        if (newLocale != currentLocale) {
            moment.locale(newLocale);
            localStorage.setItem('locale', newLocale);

            // @todo gestion de la langue dans l'url
        }
    },
    getLocale : function getLocale() {
        var defaultLocale = this.config.locale.default,
            navigatorLang = (navigator.language || navigator.browserLanguage || navigator.userLanguage || navigator.systemLanguage).substring(0, 2),
            currentLocale = localStorage.getItem('locale');

        if (_.isEmpty(currentLocale)) {
            this.changeLocale(navigatorLang);
            return;
        }

        return _.contains(this.config.locale.availables, navigatorLang) ? navigatorLang : defaultLocale;
    },
    /**
     * Translate keyword with numberFormat. See wiki for full usage.
     *
     * @param   {String}            keyword                 Message key
     * @param   {Array | Object}    [options]               Variables in message with options if format needed
     * @param   {Object}            [options.root]          Root config for format (use if no specific format on the variable)
     * @param   {object}            [options.variables]     Array of variables object
     * @param   {string}            [options.locale]        Forcer une locale à Globalize
     * @returns {String}
     */
    i18n : function i18n(keyword, options) {
        var currentGlobalize;

        if (options && !_.isEmpty(options.locale)) {
            currentGlobalize = this.globalize(options.locale);
        } else {
            currentGlobalize = this.globalize(this.getLocale());
        }

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
                }.bind(this));

                return msgFormatter(variablesMsg);
            }
        } catch (err) {
            if (err.code == 'E_MISSING_MESSAGE') {
                console.warn('No traduction for : ' + keyword);
            } else {
                console.warn('Error translating : ' + keyword);
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
    }
};
