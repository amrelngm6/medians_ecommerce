document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById('mainVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const markStartBtn = document.getElementById('markStartBtn');
    const markEndBtn = document.getElementById('markEndBtn');
    const createShortBtn = document.getElementById('createShortBtn');
    const screenshotStrip = document.getElementById('screenshotStrip');

    let startTime = 0;
    let endTime = 0;

    // Play / Pause
    playPauseBtn.addEventListener('click', function() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });

    // Mark Start
    markStartBtn.addEventListener('click', function() {
        startTime = video.currentTime;
        console.log(`Start marked at: ${startTime}`);
    });

    // Mark End
    markEndBtn.addEventListener('click', function() {
        endTime = video.currentTime;
        console.log(`End marked at: ${endTime}`);
    });

    // Create Short - logic to create a clip between start and end
    createShortBtn.addEventListener('click', function() {
        if (startTime && endTime && startTime < endTime) {
            console.log(`Creating short from ${startTime} to ${endTime}`);
            // Implement your short creation logic here
        } else {
            alert('Please mark valid start and end times.');
        }
    });

    // Generate thumbnails for timeline
    video.addEventListener('loadeddata', function() {
        const duration = video.duration;
        const thumbnailInterval = Math.floor(duration / 10); // Generate 10 screenshots

        var i = 1
        setInterval(function(){
            if (i > 20)
            {
                return;
            }

            i++;
            captureScreenshot(video, i * thumbnailInterval);
        }, 1000);
    });

    function captureScreenshot(videoElement, time) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        videoElement.currentTime = time;
        videoElement.addEventListener('seeked', function() {
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            const img = new Image();
            img.src = canvas.toDataURL();
            screenshotStrip.appendChild(img);
        }, { once: true });
    }
});
