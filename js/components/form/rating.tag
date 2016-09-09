<rating>
    <div class="input-field">
        <div class="rating-content valign-wrapper">
            <span each="{ v, i in num }" onclick="{ click }">
                <i class="material-icons { parent.value >= i + 1 ? 'star' : 'star_border' }">{ parent.value >= i + 1 ? 'star' : 'star_border' }</i>
                <br/>
                <label if="{ !parent.opts.noStarLabel }">{ i + 1 }</label>
            </span>
            <input type="text" style="display: none;" id="{ opts.dataId }" name="{ opts.dataName }" value="{ value }"/>
        </div>
        <label if="{ !opts.noLabel }" class="active"><i18n word="{ opts.label || 'rating' }" /></label>
    </div>
    <script>
        var parsleyMixin = require('../../libs/riot/mixins/parsley');

        this.mixin(parsleyMixin);

        this.num     = Array.apply(null, { length : this.opts.num || 5 }).map(Number.call, Number);
        this.value   = this.opts.value;

        this.click = function (e) {
            this.parent.value = this.i + 1;

            this.parent.trigger('change', this.parent.value);
        }
    </script>
</rating>