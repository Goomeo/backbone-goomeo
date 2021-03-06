<colorpicker>
    <div class="input-field">
        <div class="chip">
            <span class="color-container material-icons palette" style="background-color: { backgroundColor || 'inherit' }; color: { textColor || 'inherit' };">palette</span>
            <span class="color-name">{ opts.color }<i18n if="{ !opts.color }" word="{ opts.libelle || 'colorpickerChooseColor' }" /></span>
        </div>
        <input type="text" id="{ opts.dataId }" name="{ opts.dataName }" value="{ opts.color }"/>
    </div>


    <script type="text/babel">
        var _            = require('underscore'),
            $            = require('jquery'),
            tinycolor    = require('tinycolor2'),
            parsleyMixin = require('../../libs/riot/mixins/parsley'),
            $fade;

        this.mixin(parsleyMixin);

        if (this.opts.color) {
            this.backgroundColor = this.opts.color;
            this.textColor       = tinycolor.mostReadable(this.opts.color, ['#000000', '#FFFFFF']).toHexString();
        }

        this.on('mount', function () {
            var options = _.extend({
                showInitial     : true,
                showInput       : true,
                preferredFormat : 'hex'
            }, this.opts.spectrum, { color : this.opts.color });

            if (options.preferredFormat == 'hex') {
                if (options.showAlpha === true) {
                    options.preferedFormat = 'hex8';
                } else {
                    options.preferedFormat = 'hex';
                }
            }

            $(".chip", this.root).spectrum(options);

            this.$container = $(".chip", this.root).spectrum("container");

            $(".chip", this.root).on('change.spectrum', function(e, color) {
                $('.color-container', this.root).css({
                    'background-color'  : color.toHexString(),
                    color               : tinycolor.mostReadable(color.toHexString(), ['#000000', '#FFFFFF']).toHexString()
                });

                var strColor = color.toHexString();

                if (options.showAlpha === true) {
                    strColor = color.toHex8String();
                }

                $('input', this.root).val(strColor);
                $('.color-name').html(strColor);

                this.trigger('change.spectrum', color);
            }.bind(this));
            $(".chip", this.root).on('move.spectrum', function(e, color) {
                this.trigger('move.spectrum', color);
            }.bind(this));
            $(".chip", this.root).on('show.spectrum', function(e, color) {
                $fade = $('<div class="colorpicker-fade"></div>');
                $fade.insertAfter(this.$container);
                this.trigger('show.spectrum', color);
            }.bind(this));
            $(".chip", this.root).on('hide.spectrum', function(e, color) {
                $fade.remove();
                this.trigger('hide.spectrum', color);
            }.bind(this));
            $(".chip", this.root).on('beforeShow.spectrum', function(e, color) {
                this.trigger('beforeShow.spectrum', color);
            }.bind(this));
            $(".chip", this.root).on('dragstart.spectrum', function(e, color) {
                this.trigger('dragstart.spectrum', color);
            }.bind(this));
            $(".chip", this.root).on('dragstop.spectrum', function(e, color) {
                this.trigger('dragstop.spectrum', color);
            }.bind(this));
        });

        this.on('before-unmount', function () {
            this.$container.remove();
        });
    </script>
</colorpicker>