<material-input>
    <div class="input-field { opts.col ? 'col ' + opts.col : '' }">
        <i if="{ opts.icon }" class="material-icons prefix">{ opts.icon }</i>
        <input id="{ opts.dataId }"
               name="{ opts.dataName }"
               type="{ opts.type || 'text' }"
               disabled="{ opts.disabled }"
               value="{ opts.value }"
        >
        <label if="{ !opts.noLabel }" for="{ opts.dataId }" class="{ opts.isActive ? 'active' : '' }"><i18n word="{ opts.label || 'name' }" /></label>
    </div>

    <script>
        var parsleyMixin = require('../../libs/riot/mixins/parsley');

        this.mixin(parsleyMixin);

        if (this.opts.value && this.opts.value.length > 0) {
            this.opts.isActive = true;
        }
    </script>
</material-input>