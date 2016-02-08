'use strict';

module.exports = {
    components : {
        empty   : require('./js/components/empty.tag'),
        i18n    : require('./js/components/i18n.tag'),
        raw     : require('./js/components/raw.tag'),
        form : {
            datepicker  : require('./js/components/form/datepicker.tag'),
            input       : require('./js/components/form/input.tag'),
            textarea    : require('./js/components/form/textarea.tag'),
            buttons : {
                pending : require('./js/components/form/buttons/pending.tag')
            }
        },
        loaders : {
            spinner : require('./js/components/loaders/spinner.tag')
        }
    },
    libs : {
        lang        : require('./js/libs/lang'),
        backbone    : {
            eventManager    : require('./js/libs/backbone/eventManager'),
            viewManager     : require('./js/libs/backbone/viewManager'),
            collections     : {
                base            : require('./js/libs/backbone/collections/base'),
                normal          : require('./js/libs/backbone/collections/base.normal'),
                pageable        : require('./js/libs/backbone/collections/base.pageable')
            },
            models : {
                base : require('./js/libs/backbone/models/base')
            },
            router : {
                base        : require('./js/libs/backbone/router/base'),
                router      : require('./js/libs/backbone/router/base.router'),
                subrouter   : require('./js/libs/backbone/router/base.subrouter')
            },
            views : {
                base : require('./js/libs/backbone/views/base'),
                form : require('./js/libs/backbone/views/base.form')
            }
        },
        goomeo : {
            panelManager : require('./js/libs/goomeo/panelManager')
        },
        parsley     : {
            config : require('./js/libs/parsley'),
            validators : {
                multi : require('./js/libs/parsley/multi')
            }
        },
        riot : {
            mixins : {
                parsley : require('./js/libs/riot/mixins/parsley')
            }
        }
    }
};
