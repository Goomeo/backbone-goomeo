<material-progress>
    <div class="progress">
        <div if="{ isdeterminate }" class="determinate" style="width: { progress || 0 }%"></div>
        <div if="{ !isdeterminate }" class="indeterminate"></div>
    </div>

    <script>
        this.progress       = opts.progress;
        this.isdeterminate  = opts.isdeterminate;

        this.on('progress', function (progress) {
            this.progress = progress;
            this.update();
        });

        this.on('update', function (options) {
            if (options && options.progress) {
                this.progress = options.progress;
            }
        });
    </script>
</material-progress>