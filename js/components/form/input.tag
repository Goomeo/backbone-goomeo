<material-input>
    <div class="input-field { opts.col ? 'col ' + opts.col : '' }"
        >
        <i if="{ opts.icon }" class="material-icons prefix">{ opts.icon }</i>
        <input id="{ opts.dataId }"
               name="{ opts.dataName }"
               type="{ opts.type || 'text' }"
               value="{ opts.value }"
        >
        <label for="{ opts.dataId }" class="{ isActive ? 'active' : '' }"><i18n word="{ opts.label || 'name' }" /></label>
    </div>

    <script>
        var parsleyMixin = require('../../libs/riot/mixins/parsley');

        this.mixin(parsleyMixin);
    </script>
</material-input>