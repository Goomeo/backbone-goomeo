<i18n>
    <raw content="{ lang }" />

    <script>
        var _       = require('underscore'),
            lang    = require('../libs/lang'),
            config;

        _.each(opts, function (item, key) {
            var current = key.split('_');

            if (current.length <= 1) {
                return;
            }

            if (current[0] == 'var' && !_.isUndefined(current[1])) {
                var index = parseInt(current[1]);
                if (!_.isNaN(index)) {
                    // par index
                    if (!config) {
                        config = [];
                    }

                    config.splice(current[1], 0, item);
                } else {
                    // variables nommées
                    if (!config) {
                        config = {};
                    }

                    config[current[1]] = item;
                }
            }
        });

        this.lang = lang.i18n(opts.word, config);
    </script>
</i18n>
