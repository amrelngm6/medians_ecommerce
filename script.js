        const videoPlayer = document.getElementById('video-player');
        const timelineContainer = document.getElementById('timeline-thumbnails');
        const timelineCursor = document.getElementById('timeline-cursor');
        const timeRange = document.getElementById('time-range');
        const thumbnailCount = 10;
        const thumbnailWidth = 142;
        const thumbnailHeight = 80;

        videoPlayer.addEventListener('loadedmetadata', () => {
            generateThumbnails();
            setInterval(updateCursorPosition, 100);
        });

        async function generateThumbnails() {
            const duration = videoPlayer.duration;
            const interval = duration / thumbnailCount;

            for (let i = 0; i < thumbnailCount; i++) {
                const thumbnailTime = interval * i;
                const thumbnail = await createThumbnail(thumbnailTime);
                timelineContainer.appendChild(thumbnail);
            }
        }

        function createThumbnail(time) {
            return new Promise((resolve) => {
                const canvas = document.createElement('canvas');
                canvas.width = thumbnailWidth;
                canvas.height = thumbnailHeight;
                canvas.className = 'thumbnail';

                const ctx = canvas.getContext('2d');
                
                videoPlayer.currentTime = time;
                videoPlayer.onseeked = () => {
                    ctx.drawImage(videoPlayer, 0, 0, thumbnailWidth, thumbnailHeight);
                    videoPlayer.onseeked = null;
                    setTimeout(function(){

                        resolve(canvas);
                    }, 1000)
                };
            });
        }

        function updateCursorPosition() {
            const progress = videoPlayer.currentTime / videoPlayer.duration;
            const position = progress * (thumbnailWidth * thumbnailCount);
            timelineCursor.style.left = `${position}px`;
            timeRange.value = progress * 100;
        }

        timelineContainer.addEventListener('click', (e) => {
            const rect = timelineContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const progress = x / (thumbnailWidth * thumbnailCount);
            videoPlayer.currentTime = progress * videoPlayer.duration;
        });

        timeRange.addEventListener('input', () => {
            const progress = timeRange.value / 100;
            videoPlayer.currentTime = progress * videoPlayer.duration;
        });