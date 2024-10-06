$(function () {

    var player = document.getElementById('video-player');
    var duration;

    player.addEventListener('timeupdate', () => {
        player.pause();
    })


    player.addEventListener('loadedmetadata', () => {
        duration = player.duration;
        setIONrangeSlider();
        checkDomainAndStop();
    });


    /*
     IONrangeSlider
     */
    var fromOld = 0;
    var toOld = duration;
    function setIONrangeSlider() {

        var slider = document.getElementById('range');

        noUiSlider.create(slider, {
            start: [0, duration], // Handle start position
            step: 1, // Slider moves in increments of '1'
            margin: 10, // Handles must be more than '3' apart
            limit: 60, // Handles must be more than '3' apart
            connect: true, // Display a colored bar between the handles
            behaviour: 'tap-drag', // Move handle on tap, bar is draggable
            range: { // Slider can select '0' to 'duration'
                'min': 0,
                'max': duration
            }
        });

        var valueInput = document.getElementById('value-input'),
            valueSpan = document.getElementById('value-span');
        var readValue;
        // When the slider value changes, update the input and span
        slider.noUiSlider.on('update', function (values, handle) {
            if (handle) {
                readValue = values[handle] | 0;
                valueSpan.innerHTML = toHHMMSS(values[handle]);

                if (toOld != readValue) {
                    toOld = readValue;
                }

            } else {
                readValue = values[handle] | 0;
                valueInput.innerHTML = toHHMMSS(values[handle]);

                if (fromOld != readValue) {
                    fromOld = readValue;
                    player.currentTime = readValue;
                    player.pause();
                    player.play();
                }
            }
        });

        // When the input changes, set the slider value
        valueInput.addEventListener('change', function () {
            slider.noUiSlider.set([null, this.value]);
        });
    }

    /*
     Player Bar
     */
    function updatePlayerBar() {
        var curTime = player.currentTime;

        var cutLeft = fromOld * 100 / duration;
        var cutRigth = (duration - toOld) * 100 / duration;

        var played = (curTime - fromOld) * 100 / duration;

        var toPlay = 100 - played - cutLeft - cutRigth;


        document.getElementById("cut-left").style.width = cutLeft + "%";
        document.getElementById("cut-right").style.width = cutRigth + "%";
        document.getElementById("played").style.width = played + "%";
        document.getElementById("toPlay").style.width = toPlay + "%";
    }

    /*
     Updates the playback quality
     */
    function checkDomainAndStop() {

        var curTime = player.currentTime;
        document.getElementById('curTime').innerHTML = toHHMMSS(curTime.toString()) + " / " + toHHMMSS(duration.toString());
        var result = toHHMMSS((toOld - fromOld).toString());
        if (result != "NaN:NaN:NaN") {
            document.getElementById('finalDuration').innerHTML = result;
        }
        if (curTime < fromOld) {
            player.currentTime = fromOld;
        }
        if (curTime > toOld) {
            player.currentTime = fromOldtoOld;
            player.pause();
        }

        updatePlayerBar();

        // recursively call it.
        setTimeout(checkDomainAndStop, 100);
    }

    /*
     converts String to hh:mm:ss or mm:ss
     */
    function toHHMMSS(val) {
        var sec_num = parseInt(val, 10);
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }

        // only mm:ss
        if (hours == "00") {
            var time = minutes + ':' + seconds;
        }
        else {
            var time = hours + ':' + minutes + ':' + seconds;
        }

        return time;
    }


})