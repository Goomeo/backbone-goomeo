<btn>
    <button class="waves-effect waves-light btn { opts.color || 'green' }"
            type="{ opts.type || 'button' }" id="{ opts.dataId || 'button' }"
            disabled="{ disabled }">
        <i if="{ opts.icon }" class="material-icons { opts.iconSide || 'left' } { opts.icon }">{ opts.material ? '' : opts.icon }</i>
        <i18n word="{ root._innerHTML || 'validate' }" />
    </button>
</btn>