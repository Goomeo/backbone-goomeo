<material-textarea-lang>
    <virtual each="{ v, i in opts.langs }">
        <div class="input-field { parent.opts.col ? 'col ' + parent.opts.col : '' }">
            <i class="material-icons prefix flag-icon flag-icon-{ v }"></i>
            <textarea
                    class="materialize-textarea"
                    id="{ parent.opts.dataId + '.' + v }"
                    name="{ parent.opts.dataName + '.' + v }"
                    disabled="{ parent.opts.disabled }"
                    data-parsley-multi="{ parent.opts.dataId }"
                    data-parsley-validate-if-empty
                    >{ parent.opts.value[v] }</textarea>
            <label for="{ parent.opts.dataId + '.' + v }" class="{ parent.opts.isActive ? 'active' : '' }"><i18n word="{ parent.opts.label || 'name' }" /></label>
        </div>
    </virtual>

    <script>
        var parsleyMixin = require('../../libs/riot/mixins/parsley');

        this.mixin(parsleyMixin);

        if (this.opts.value && this.opts.value.length > 0) {
            this.opts.isActive = true;
        }

        // @todo rajouter un appel vers une fonction de récupération de la langue principale si besoin
    </script>
</material-textarea-lang>