<material-select>
    <div class="input-field { opts.col ? 'col ' + opts.col : '' }">
        <select
            id="{ opts.dataId }"
            name="{ opts.dataName }"
            disabled="{ opts.disabled }"
            multiple="{ opts.multiple }"
            >
            <option if="{ opts.default }" value="">{ opts.default }</option>
            <option each={ opts.items } value="{ value }" selected="{ selected }">{ name }</option>
        </select>
        <label if="{ !opts.noLabel }" for="{ opts.dataId }"><i18n word="{ opts.label || 'choice' }" /></label>
    </div>

    <script>
        var $               = require('jquery'),
            parsleyMixin    = require('../../libs/riot/mixins/parsley');

        this.mixin(parsleyMixin);

        this.on('updated', function () {
            // obligé de faire comme ceci ici à cause de l'implementation de dropdown par les types de materialize
            $('select', this.root).material_select('destroy');
            $('select', this.root).material_select();
        });
    </script>
</material-select>