<material-nouislider>
    <div class="slider-wrapper"></div>

    <script>
        var noUiSlider = require('materialize-css/extras/noUiSlider/nouislider');

        this.on('mount', function () {
            noUiSlider.create(this.root.querySelector('.slider-wrapper'), this.opts.slider);
        });

        /*
        this.mountTags({
            tag : 'material-nouislider',
            options : {
                slider : {
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
                }
            }
        });
         */
    </script>
</material-nouislider>