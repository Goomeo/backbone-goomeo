<survey>
    <div class="input-field">
        <div class="survey-content valign-wrapper">
            <button each="{ v, i in num }"
                    onclick="{ click }"
                    class="btn { parent.value == i + 1 ? 'active' : '' }">{ i + 1 }</button>
            <input type="text" style="display: none;" id="{ opts.dataId }" name="{ opts.dataName }" value="{ value }"/>
        </div>
        <label if="{ !opts.noLabel }" class="active"><i18n word="{ opts.label || 'survey' }" /></label>
    </div>


    <script type="text/babel">
        var parsleyMixin = require('../../libs/riot/mixins/parsley');

        this.mixin(parsleyMixin);

        this.num     = Array.apply(null, { length : 10 }).map(Number.call, Number);
        this.value   = this.opts.value;

        this.click = function (e) {
            e.preventDefault();

            this.parent.value = this.i + 1;

            this.parent.trigger('change', this.parent.value);
        }
    </script>
</survey>