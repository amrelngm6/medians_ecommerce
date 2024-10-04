$(function(){
    const videoPlayer = document.getElementById('videoPlayer');
    const bufferingIndicator = document.getElementById('bufferingIndicator');
    let mediaSource;
    let sourceBuffer;
    let isSourceOpen = false;

    function fetchCurrentVideoInfo(channelId) {
        fetch(`/channel_json/`+channelId)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    loadVideoPartially(data.active_item);
                } else {
                    console.log('No video currently playing');
                }
            })
            .catch(error => console.error('Error:', error));
    }

    function loadVideoPartially(media) {
        
        var a = new Date(media.start);
        var b = new Date();
        var startPosition = parseInt((b - a) / 1000);
        var startPosition = parseInt(((b - a) / 1000) - 3600);
        // var startPosition = 130;

        const videoUrl = '/stream_video?video=' +media.filename;
        
        if (mediaSource) {
            if (mediaSource.readyState === 'open') {
                mediaSource.endOfStream();
            }
            URL.revokeObjectURL(videoPlayer.src);
        }

        mediaSource = new MediaSource();
        videoPlayer.src = URL.createObjectURL(mediaSource);

        mediaSource.addEventListener('sourceopen', function() {
            isSourceOpen = true;
            sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
            sourceBuffer.mode = 'segments';
            
            fetchInitSegment(videoUrl).then(() => {
                videoPlayer.currentTime = startPosition;
            });

            videoPlayer.addEventListener('seeking', onSeeking);
        });

        mediaSource.addEventListener('sourceended', function() {
            isSourceOpen = false;
        });
        videoPlayer.play()
    }

    function fetchInitSegment(url) {
        return fetch(url, { headers: { 'Range': 'bytes=0-' } })
            .then(response => response.arrayBuffer())
            .then(data => {
                sourceBuffer.appendBuffer(data);
                return new Promise(resolve => {
                    sourceBuffer.addEventListener('updateend', resolve, { once: true });
                });
            });
    }

    function onSeeking() {
        const currentTime = videoPlayer.currentTime;
        const buffered = videoPlayer.buffered;

        if (isTimeBuffered(currentTime, buffered)) {
            return;
        }

        bufferingIndicator.style.display = 'block';
        abortCurrentRequests();
        fetchSegmentAtTime(videoPlayer.currentTime);
    }

    function isTimeBuffered(time, buffered) {
        for (let i = 0; i < buffered.length; i++) {
            if (time >= buffered.start(i) && time <= buffered.end(i)) {
                return true;
            }
        }
        return false;
    }

    function abortCurrentRequests() {
        // Implement logic to abort any ongoing fetch requests
    }

    function fetchSegmentAtTime(time) {
        // In a real implementation, you would calculate the byte range for the segment containing 'time'
        // This is a simplified version
        const estimatedByteOffset = Math.floor(time * 1000000); // Very rough estimate
        
        fetch(videoPlayer.src, {
            headers: { 'Range': `bytes=${estimatedByteOffset}-` }
        })
        .then(response => response.arrayBuffer())
        .then(data => {
            sourceBuffer.appendBuffer(data);
            bufferingIndicator.style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching video segment:', error);
            bufferingIndicator.style.display = 'none';
        });
    }

})
