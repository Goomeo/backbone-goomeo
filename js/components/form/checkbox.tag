<material-checkbox>
    <input class="{ opts.isfilled ? 'filled-in' : '' }"
           name="{ opts.dataName }"
           type="checkbox"
           id="{ opts.dataId }"
           disabled="{ opts.disabled }"
           value="{ opts.value }"
           checked="{ opts.checked }"
            />
    <label for="{ opts.dataId }"><i18n word="{ opts.label }" /></label>

    <script>
        var parsleyMixin = require('../../libs/riot/mixins/parsley');

        this.mixin(parsleyMixin);
    </script>
</material-checkbox>