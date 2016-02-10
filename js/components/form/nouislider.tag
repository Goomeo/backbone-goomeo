<material-nouislider>
    <div class="slider-wrapper"></div>

    <script>
        var _           = require('underscore'),
            noUiSlider  = require('materialize-css/extras/noUiSlider/nouislider');

        this.on('mount', function () {
            var defaultOptions = {
                start: [20, 80],
                connect: true,
                step: 1,
                range: {
                    'min': 0,
                    'max': 100
                },
                format: {
                    to: function ( value ) {
                        return value;
                    },
                    from: function ( value ) {
                        return value.replace(',-', '');
                    }
                }
            };

            this.slider = noUiSlider.create(this.root.querySelector('.slider-wrapper'), _.extend({}, defaultOptions, this.opts.slider));

            this.slider.noUiSlider.on('update', function (values, handle) {
                this.trigger('nouislider:update', values, handle);
            }.bind(this));

            this.slider.noUiSlider.on('slide', function () {
                this.trigger('nouislider:slide');
            }.bind(this));

            this.slider.noUiSlider.on('set', function () {
                this.trigger('nouislider:set');
            }.bind(this));

            this.slider.noUiSlider.on('change', function () {
                this.trigger('nouislider:change');
            }.bind(this));

            this.slider.noUiSlider.on('start', function () {
                this.trigger('nouislider:start');
            }.bind(this));

            this.slider.noUiSlider.on('end', function () {
                this.trigger('nouislider:end');
            }.bind(this));
            this.slider.noUiSlider.on('hover', function (value) {
                this.trigger('nouislider:hover', value);
            }.bind(this));
        });

        this.get = function get() {
            return this.slider.get();
        };

        this.set = function set(params) {
            this.slider.set(params);
        };

    </script>
</material-nouislider>