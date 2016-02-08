<btn-pending>
    <button
            class="waves-effect waves-light btn { opts.color || 'green' }"
            type="{ opts.type || 'submit' }"
            id="{ opts.dataId || 'submit' }"
            disabled="{ disabled }"
            >
        <spinner
                if="{ spinner }"
                size="button"
                color="spinner-grey-only"
                ></spinner>
        <i18n word="{ opts.label || 'validate' }" />
    </button>

    <script>
        var $           = require('jquery');

        this.on('start', function () {
            this.disabled = true;
            this.spinner = true;

            this.update();
        });

        this.on('stop', function () {
            this.disabled = false;
            this.spinner = false;

            this.update();

        });
    </script>
</btn-pending>