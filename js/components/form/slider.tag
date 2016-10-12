<material-slider>
    <p class="range-field">
        <input type="range"
               id="{ opts.dataId }"
               min="{ opts.min || 0 }"
               max="{ opts.max || 100 }"
               name="{ opts.dataName }"
               value="{ opts.value || opts.min || 0 }"
               disabled="{ opts.disabled }"
                />
    </p>

    <script type="text/babel">
        var parsleyMixin = require('../../libs/riot/mixins/parsley');

        this.mixin(parsleyMixin);
    </script>
</material-slider>