<material-nouislider>
    <material-input
        if="{ type == 'multiple' }"
        data-name="{ opts.dataName || 'slider' }[]"
        value="{ sliderParams.start[0] }"
        no-label="true"
        data-type="number"
        name="slider-start"
    ></material-input>
    <div class="slider-wrapper"></div>
    <material-input
        data-name="{ opts.dataName || 'slider' }[]"
        value="{ sliderParams.start.length > 1 ? sliderParams.start[1] : sliderParams.start[0] }"
        no-label="true"
        data-type="number"
        name="slider-end"
    ></material-input>

    <script>
        var _               = require('underscore'),
            $               = require('jquery'),
            noUiSlider      = require('materialize-css/extras/noUiSlider/nouislider'),
            defaultOptions  = {
                start: [ 0, 100 ],
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

        this.sliderParams  = _.extend({}, defaultOptions, this.opts.slider);

        if (this.sliderParams.start.length > 1) {
            this.type = "multiple"
        } else {
            this.type = "simple"
        }

        this.on('mount', function () {
            this.slider = this.root.querySelector('.slider-wrapper');

            noUiSlider.create(this.slider, this.sliderParams);

            this.slider.noUiSlider.on('update', function (values, handle) {
                var inputsList = this.root.querySelectorAll('input');

                inputsList.item(0).value = values[0];

                if (values.length > 1) {
                    inputsList.item(1).value = values[1];
                }

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

            if (this.type == 'multiple') {
                $('input:first', this.root).on('keypress', function (e) {
                    console.log($(e.currentTarget).val());
                    this.slider.noUiSlider.set([ $(e.currentTarget).val(), null ]);
                }.bind(this));
                $('input:last', this.root).on('keypress', function (e) {
                    this.slider.noUiSlider.set([ null, $(e.currentTarget).val() ]);
                }.bind(this));
            } else if (this.type == 'simple') {
                $('input', this.root).on('keypress', function (e) {
                    this.slider.noUiSlider.set($(e.currentTarget).val());
                }.bind(this));
            }
        });

        this.get = function get() {
            return this.slider.get();
        };

        this.set = function set(params) {
            this.slider.set(params);
        };

    </script>
</material-nouislider>