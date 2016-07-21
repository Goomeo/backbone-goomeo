<btn>
    <button class="waves-effect waves-light btn { opts.color || 'green' }"
            type="{ opts.type || 'button' }" id="{ opts.dataId || 'button' }"
            disabled="{ disabled }">
        <i if="{ opts.icon }" class="material-icons { opts.iconSide || 'left' } { opts.icon }">{ opts.icon }</i>

        <div hide="true" id="wordDiv"><yield /></div>
        <i18n word="{ this.word || 'validate' }" />
    </button>

    <script>
        this.word = this.wordDiv.innerHtml;
    </script>
</btn>