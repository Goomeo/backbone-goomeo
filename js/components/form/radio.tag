<material-radio>
    <input class="{ opts.isgap ? 'with-gap' : '' }"
           name="{ opts.dataName }"
           type="radio"
           id="{ opts.dataId }"
           disabled="{ opts.disabled }"
           value="{ opts.value }"
            />
    <label for="{ opts.dataId }"><i18n word="{ opts.label }" /></label>

    <script type="text/babel">
        var parsleyMixin = require('../../libs/riot/mixins/parsley');

        this.mixin(parsleyMixin);
    </script>
</material-radio>