<i18n>
    <raw content="{ lang }" />

    <script>
        var _       = require('underscore'),
                _str    = require('underscore.string'),
                lang    = require('../libs/lang'),
                config  = {
                    variables : {}
                };

        _.each(this.opts, function (item, key) {
            if (_str.startsWith(key, 'var')) {
                var tempoKey = _str.underscored(key).split('_')[1];

                config.variables[tempoKey] = item;
            }
        });

        this.lang = lang.i18n(opts.word, config);
    </script>
</i18n>
