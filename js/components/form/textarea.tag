<material-textarea>
    <div class="input-field { opts.col ? 'col ' + opts.col : '' }"
            >
        <i if="{ opts.icon }" class="material-icons prefix">{ opts.icon }</i>
        <textarea id="{ opts.dataId }"
               name="{ opts.dataName }"
               class="materialize-textarea"
                >{ opts.value }</textarea>
        <label for="{ opts.dataId }" class="{ isActive ? 'active' : '' }"><i18n word="{ opts.label || 'name' }" /></label>
    </div>

    <script>
        var parsleyMixin = require('../../libs/riot/mixins/parsley');

        this.mixin(parsleyMixin);
    </script>
</material-textarea>