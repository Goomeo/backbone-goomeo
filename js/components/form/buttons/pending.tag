<btn-pending>
    <button
            type="{ opts.type || 'submit' }"
            id="{ opts.dataId || 'submit' }"
            disabled="{ disabled }"
            >
        <spinner
                if="{ spinner }"
                size="button"
                color="spinner-white-only"
                ></spinner>
        <i18n word="{ opts.label || 'validate' }" />
    </button>

    <script>
        const $ = require('jquery');

        this.on('start', () => {
            $(this.root).attr('disabled', 'disabled');
            this.disabled = true;
            this.spinner = true;

            this.update();
        });

        this.on('stop', () => {
            $(this.root).removeAttr('disabled');
            this.disabled = false;
            this.spinner = false;

            this.update();

        });
    </script>
</btn-pending>