<material-datepicker>
    <div class="input-field { opts.col ? 'col ' + opts.col : '' }">
        <i if="{ opts.icon }" class="material-icons prefix { opts.icon }">{ opts.icon }</i>
        <input id="{ opts.dataId }"
               name="{ opts.dataName }"
               type="date"
               class="datepicker"
               value="{ opts.value }"
               data-value="{ opts.value }"
               disabled="{ opts.disabled }"
                >
        <label if="{ !opts.noLabel }" for="{ opts.dataId }" class="{ opts.isActive ? 'active' : '' }"><i18n word="{ opts.label || 'date' }" /></label>
    </div>

    <script>
        var $               = require('jquery'),
            _               = require('underscore'),
            lang            = require('../../libs/lang'),
            parsleyMixin    = require('../../libs/riot/mixins/parsley'),
            defaultOptions  = {
                container           : 'body',
                "monthsFull"        : lang.i18n('monthsFull'),
                "monthsShort"       : lang.i18n('monthsShort'),
                "weekdaysFull"      : lang.i18n('weekdaysFull'),
                "weekdaysShort"     : lang.i18n('weekdaysShort'),
                "today"             : lang.i18n('today'),
                "clear"             : lang.i18n('clear'),
                "close"             : lang.i18n('close'),
                "firstDay"          : lang.i18n('firstDay'),
                "format"            : lang.i18n('format'),
                "formatSubmit"      : lang.i18n('formatSubmit'),
                "labelMonthNext"    : lang.i18n('labelMonthNext'),
                "labelMonthPrev"    : lang.i18n('labelMonthPrev'),
                "labelMonthSelect"  : lang.i18n('labelMonthSelect'),
                "labelYearSelect"   : lang.i18n('labelYearSelect')
            };

        console.log(defaultOptions);

        this.mixin(parsleyMixin);

        if (this.opts.value) {
            this.opts.isActive = true;
        }

        this.on('mount', function () {
            var $datePicker = $('.datepicker', this.root).pickadate(_.extend({}, defaultOptions, this.opts.datepicker));

            this.datePicker  = $datePicker.pickadate('picker');

            if (!this.datePicker) {
                return;
            }

            this.datePicker.on({
                open : function () {
                    $('label', this.root).addClass('active');
                    this.trigger('datepicker:open');
                }.bind(this),
                close : function () {
                    if (_.isEmpty($('.datepicker', this.root).val())) {
                        $('label', this.root).removeClass('active');
                    } else {
                        $('label', this.root).addClass('active');
                    }

                    this.trigger('datepicker:close');
                }.bind(this),
                render : function () {
                    this.trigger('datepicker:render');
                }.bind(this),
                start : function () {
                    this.trigger('datepicker:start');
                }.bind(this),
                stop : function () {
                    this.trigger('datepicker:stop');
                }.bind(this),
                set : function (thingSet) {
                    this.trigger('datepicker:set', thingSet);
                }.bind(this)
            });
        });

        this.on('before-unmount', function () {
            this.datePicker.stop();
        });
    </script>
</material-datepicker>