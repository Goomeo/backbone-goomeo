<material-textarea>
    <div class="input-field">
        <i if="{ opts.icon }" class="material-icons prefix { opts.icon }">{ opts.material ? '' : opts.icon }</i>
        <textarea id="{ opts.dataId }"
               name="{ opts.dataName }"
               class="materialize-textarea"
               disabled="{ opts.disabled }"
                >{ opts.value }</textarea>
        <label if="{ !opts.noLabel }" for="{ opts.dataId }" class="{ opts.isActive ? 'active' : '' }"><i18n word="{ opts.label || 'name' }" /></label>
    </div>

    <script type="text/babel">
        var parsleyMixin = require('../../libs/riot/mixins/parsley');

        this.mixin(parsleyMixin);

        if (this.opts.value && this.opts.value.length > 0) {
            this.opts.isActive = true;
        }
    </script>
</material-textarea>