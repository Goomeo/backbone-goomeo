<i18n>
    <raw content="{ lang }" />

    <script>
        var _       = require('underscore'),
                _str    = require('underscore.string'),
                lang    = require('../libs/lang'),
                config  = {
                    variables : []
                };

        _.each(this.opts, function (item, key) {
            if (_str.startsWith(key, 'var')) {
                var tempoKey = _str.underscored(key).split('_')[1];

                config.variables.push({
                    key     : tempoKey,
                    value   : item
                });
            }
        });

        if (this.opts.locale) {
            config.locale = this.opts.locale;
        }

        this.lang = lang.i18n(opts.word, config);
    </script>
</i18n>
