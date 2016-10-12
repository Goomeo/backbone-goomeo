<chips>
    <div class="chip">
        <img if="{ opts.img }" src="{ opts.img }" alt="chips icon">
        <i18n word="{ opts.content }" />
        <i if="{ opts.close }" onclick="{ close }" class="material-icons close">close</i>
    </div>

    <script type="text/babel">
        function close() {
            this.trigger('close');
            this.unmount();
        }
    </script>
</chips>