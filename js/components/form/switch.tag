<material-switch>
    <div class="switch">
        <label>
            <i18n if="{ !opts.nolabel }" word="{ opts.off || 'off' }" />
            <input type="checkbox"
                   value="{ opts.value }"
                   name="{ opts.dataName }"
                   id="{ opts.dataId }"
                   disabled="{ opts.disabled }"
                   checked="{ opts.checked }"
                    >
            <span class="lever"></span>
            <i18n if="{ !opts.nolabel }" word="{ opts.on || 'on' }" />
        </label>
    </div>

    <script>
        var parsleyMixin = require('../../libs/riot/mixins/parsley');

        this.mixin(parsleyMixin);
    </script>
</material-switch>