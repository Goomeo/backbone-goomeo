<btn-pending>
    <button
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

    <script type="text/babel">
        const $ = require('jquery');

        this.on('start', () => {
            $(this.root).attr('disabled', 'disabled');
            $(this.root).addClass('disabled');
            this.disabled = true;
            this.spinner = true;

            this.update();
        });

        this.on('stop', () => {
            $(this.root).removeAttr('disabled');
            $(this.root).removeClass('disabled');
            this.disabled = false;
            this.spinner = false;

            this.update();

        });
    </script>
</btn-pending>