<material-datepicker>
    <div class="input-field { opts.col ? 'col ' + opts.col : '' }">
        <i if="{ opts.icon }" class="material-icons prefix">{ opts.icon }</i>
        <input id="{ opts.dataId }"
               name="{ opts.dataName }"
               type="date"
               class="datepicker"
               value="{ opts.value }"
                >
        <label for="{ opts.dataId }" class="{ isActive ? 'active' : '' }"><i18n word="{ opts.label || 'date' }" /></label>
    </div>

    <script>
        var $               = require('jquery'),
            _               = require('underscore'),
            parsleyMixin    = require('../../libs/riot/mixins/parsley'),
            defaultOptions  = {
                container       : 'body'
            };

        this.mixin(parsleyMixin);

        this.on('mount', function () {
            var $datePicker = $('.datepicker', this.root).pickadate(_.extend({}, defaultOptions, this.opts.datePicker)),
                datePicker  = $datePicker.pickadate('picker');

            if (!datePicker) {
                return;
            }

            datePicker.on({
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
    </script>
</material-datepicker>