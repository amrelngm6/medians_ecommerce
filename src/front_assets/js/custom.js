/**
 * 
 * Slider loop carousel
 * 
 */
function runSlide()
{
	const slider = document.querySelector('.channel-slider');
	const images = document.querySelectorAll('.channel-slider > div');
	if (slider)
	{
		slider.style.width = `${images.length * 100}%`;
		// If you want to stop the continuous loop on hover, you can add event listeners
		slider.addEventListener('mouseenter', () => {
			slider.style.animationPlayState = 'paused';
		});

		slider.addEventListener('mouseleave', () => {
			slider.style.animationPlayState = 'running';
		});
	}
}



var mainAudio = jQuery('audio');

var audio, canPlay, player, audioInfo, audioObject, list, index, is_slide, filename, activeChannel, activeChannelMedia, activeStation, activeStationMedia, stationInterval;


document.getElementById('player-audio').addEventListener("change", function(event) {
	audio.volume = event.target.value;
	setCookie('volume', event.target.value, 7); // Set a cookie named 'username' with value 'john_doe' that expires in 7 days
}) ;	

document.getElementById('station-player-audio').addEventListener("change", function(event) {
	audio.volume = event.target.value;
	setCookie('volume', event.target.value, 7); // Set a cookie named 'username' with value 'john_doe' that expires in 7 days
}) ;	

jQuery(document).on('click', '.start-station', function (i, el) {

	audio ? audio.pause() : null

	jQuery('#station-player-audio').val(getCookie('volume'))
	jQuery('#station-player-pause-button').addClass('active')
	jQuery('#station-app-cover').removeClass('hidden')
	jQuery('#app-cover').addClass('hidden')
	const stationId = jQuery(this).data('station'); 
		
	loadStation(stationId)

	let val = jQuery('#startions-interval').val();
	
	stationInterval = setInterval(function(){
		loadStation(stationId)
	}, val > 1  ? (val * 1000) : 30000);
});

async function loadStationJson(stationId)
{
	const response  = await $.get('/station_json/'+stationId);

	activeStation = JSON.parse(response)

	return activeStation;
}

async function loadChannelJson(channelId)
{
	const response  = await $.get('/channel_json/'+channelId);

	activeChannel = JSON.parse(response)

	return activeChannel;
}

var streamingStatus;

async function loadStation(stationId, play = true)
{
	// const chunkTimerVal  = jQuery('#station_media_chunk').val() > 5 ? (jQuery('#station_media_chunk').val() - 5) : 55 ;
	// const chunkTimer  = chunkTimerVal > 1 ? chunkTimerVal : 58 ;
	
	activeStation = await loadStationJson(stationId);
	let rand = Math.random();

	if (activeStationMedia && activeStation.active_item && activeStation.active_item.media_id == activeStationMedia.media_id)
	{
		streamingStatus = 'same'
		if ((audio.duration - audio.currentTime) < 5) {
			streamingStatus = 'new'
		}
	} else if (activeStation.active_item == null) {
		streamingStatus = null;
	} else {
		streamingStatus = 'new'
	}
	activeStationMedia = activeStation.active_item;

	if (streamingStatus == 'new' && play)
	{
		audio.src = '/stream_station?station_id='+ stationId+'&hash='+ rand;
		audio.load();
		audio.play();
		audio.volume = getCookie('volume')
	}

	if (activeStationMedia)
	{
		jQuery('#station-album-name').html((activeStationMedia && activeStationMedia.media) ? activeStationMedia.media.name : activeStationMedia.title)
		jQuery('.station-stream-name').html((activeStationMedia && activeStationMedia.media) ? activeStationMedia.media.name  : activeStationMedia.title)
		jQuery('.station-streaming-picture'+activeStation.station_id).attr((activeStationMedia.media) ? activeStationMedia.media.picture  : activeStation.picture)
		jQuery('#station-track-name').html(activeStation.name ?? 'UNKNOWN')
		
	} else {
		
		jQuery('#station-album-name').html('Offline')
		jQuery('.station-stream-name').html("Offline")
		jQuery('#station-track-name').html('UNKNOWN')
		if (audio)
			audio.pause()
	}
	jQuery('.station-streaming-picture'+activeStation.station_id).attr( 'src', (activeStationMedia && activeStationMedia.media) ? activeStationMedia.media.picture : activeStation.picture);
	jQuery('#station-track-poster').attr( 'src', (activeStationMedia && activeStationMedia.media) ? activeStationMedia.media.picture : activeStation.picture);

}


async function loadChannel(stationId, play = true)
{
	// const chunkTimerVal  = jQuery('#station_media_chunk').val() > 5 ? (jQuery('#station_media_chunk').val() - 5) : 55 ;
	// const chunkTimer  = chunkTimerVal > 1 ? chunkTimerVal : 58 ;
	
	activeChannel = await loadStationJson(stationId);
	
}


jQuery(document).on('click', '.start-player', function (i, el) {
	jQuery('#station-app-cover').addClass('hidden')
	audio ? audio.pause() : null
	player = jQuery(this);
	list = JSON.parse(player.attr('data-list'))
	index = parseInt(player.attr('data-index'))
	if (player.hasClass('start-player')) {
		audioObject = list[index] ?? {};
		filename = audioObject.file ?? audioObject.filename;
		audioInfo = player.find('.slide__audio-player');
		audio = mainAudio[0];
		audio.src = '/stream_audio?audio='+ filename;
		audio.load()
		initAudioPlayer()
		playStyles()
		player.removeClass('start-player')
		jQuery('#player-previous').removeClass('hidden')
		jQuery('#player-next').removeClass('hidden')

	} 
	if (stationInterval) {
		clearInterval(stationInterval)
	}
});

jQuery(document).on('click', '.start-single-player', function (i, el) {
	player = jQuery(this);
	audio.pause()
	jQuery('#station-app-cover').addClass('hidden')
	list = JSON.parse(player.attr('data-list'))
	index = player.attr('data-index')
	if (player.hasClass('start-single-player')) {
		audioObject = list[index];
		filename = audioObject.file ?? audioObject.filename;
		audioInfo = player.find('.slide__audio-player');
		audio = mainAudio[0];
		audio.src = '/stream_audio?audio='+ filename;
		audio.load()
		initAudioPlayer()
		playStyles()
		jQuery('#player-previous').addClass('hidden')
		jQuery('#player-next').addClass('hidden')
	} 
	if (stationInterval) {
		clearInterval(stationInterval)
	}

});


jQuery('#player-pause-button').on("click", function(event) {
	if (audio.paused ) {
		playStyles();
	} else  {
		pauseStyles();
	}
});

jQuery('#station-player-pause-button').on("click", function(event) {
	if ( audio.paused ) {
		loadStation(activeStation.station_id)
		audio.play()
	} else  {
		audio.pause();
		if (stationInterval) {
			clearInterval(stationInterval)
		}
	}
	jQuery(this).toggleClass('active')
});

jQuery('#player-previous').on("click", function(event) {
	index = index ? (index - 1) : 0; 
	if (list[index])
	{
		handleFile();
	}

});
jQuery('#player-next').on("click", function(event) {
	index = list[index + 1] ? (index + 1) : index; 
	if (list[index])
	{
		handleFile();
	}

});

jQuery('#volume-mute-img').on("click", function(event) {
	audio.muted = !audio.muted;
}) ;

function moveItem(array, fromIndex, direction) {
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;

    // Ensure the new index is within bounds
    if (toIndex < 0 || toIndex >= array.length) {
        return array; // No movement, return original array
    }

    // Swap the elements
    const temp = array[toIndex];
    array[toIndex] = array[fromIndex];
    array[fromIndex] = temp;

    return array; // Updated array
}


function handleFile()
{
	audioObject = list[index] ?? {};
	filename = audioObject.file ?? audioObject.filename;
	player = jQuery('#media-'+(audioObject.media_file_id ?? audioObject.media_id));
	audioInfo = player.find('.slide__audio-player');
	audio.src = '/stream_audio?audio='+ filename;
	audio.load()
	playStyles()
}

function runAudio()
{

	jQuery('.audio__slider').roundSlider({
		radius: 50,
		value: 0,
		startAngle: 90,
		width: 5,
		handleSize: '+2',
		handleShape: 'round',
		sliderType: 'min-range'
	});
	jQuery(document).on('drag, change', '.audio__slider', function (e) {
		let $this = $(this);
		let $elem = $this.closest('.js-audio');
		
		$this.addClass('active');
		updateAudio(e.handle.value, $elem);
	});

	

}

function pauseStyles() {
		
	audio.pause();
	player.removeClass('playing');
	player.parent().removeClass('active');
	player.addClass('paused');
	player.parent().parent().find('.wave-frame').addClass('hidden');
	document.getElementById('album-art').classList.remove('active') 
	document.getElementById('player-pause-button').classList.remove('active') 
	document.getElementById('player-track').classList.remove('active') 
}

function playStyles() {
	
	$('.js-audio').removeClass('playing');
	$('.js-audio').parent().removeClass('active');
	
	player.removeClass('paused');
	player.addClass('playing');
	player.parent().addClass('active');
	jQuery('.wave-frame').addClass('hidden');
	player.parent().parent().find('.wave-frame').removeClass('hidden');
	document.getElementById('album-art').classList.add('active') 
	document.getElementById('player-pause-button').classList.add('active') 
	
	document.getElementById('app-cover').classList.remove('hidden') 
	document.getElementById('album-name').innerHTML = audioObject.name ?? (audioObject.title ?? ''); 
	document.getElementById('track-name').innerHTML = audioObject.artist ?? ''; 
	document.getElementById('track-poster').src = '/stream?thumbnail=100&image='+ audioObject.poster ?? ''; 
	document.getElementById('track-poster').classList.add('active') 
	document.getElementById('player-track').classList.add('active') 

	setTimeout(function(){
		audio.play();
	}, 100)
}

function updateAudio(e, $elem) {

	let value = e;
	var play = $elem.find('.play-pause'),
		maxduration = audio.duration;

	var y = (value / 100) * maxduration;

	audio.currentTime = y;

}

function initAudioPlayer() {

	jQuery('#player-audio').val(getCookie('volume'))
	audio.volume = getCookie('volume')

	let play = player.find('.play-pause'),
		circle = player.find('#seekbar-'+audioInfo.attr('data-id')),
		getCircle = circle.get(0),
		totalLength = getCircle.getTotalLength();

	mainAudio.on('loadedmetadata', function() {
		const duration = audio.duration;
		if (isFinite(duration)) {
			// playStyles()
		} else {
		}
	});

	
	play.on('click', () => {
		
		if (audio.src != rootURL+audioInfo.attr('data-path'))
		{
			audio.src = audioInfo.attr('data-path');
			audio.load()
			playStyles()

		} else {
			(!audio.paused ) ?  pauseStyles() : playStyles()
		}
	});

	circle.attr({
		'stroke-dasharray': totalLength,
	});

	mainAudio.on('timeupdate', (e) => {
		circle = jQuery('#seekbar-'+audioInfo.attr('data-id'))
		circle.attr({
			'stroke-dasharray': totalLength,
		});
		console.log(circle)
		console.log(audioInfo.attr('data-id'))
		console.log(audioInfo)
		let currentTime = audio.currentTime,
		maxduration = audio.duration,
		calc = totalLength - (currentTime / maxduration * totalLength);

		document.getElementById('track-length').innerHTML = convertToTime(maxduration) 
		document.getElementById('current-time').innerHTML = convertToTime(currentTime) 

		circle.attr('stroke-dashoffset', calc);
		
		let value = (isNaN(maxduration) ? 0 : ((currentTime / maxduration) * 100));

		$('#'+jQuery(audioInfo).attr('data-wave-overlay')).css('right', '0')
		$('#'+jQuery(audioInfo).attr('data-wave-overlay')).css('left', 'auto')
		$('#'+jQuery(audioInfo).attr('data-wave-overlay')).css('width', (100 - value)+'%')
		$('#seek-bar').css('width', (value)+'%')

		var slider = '#circle-'+jQuery(audioInfo).attr('data-id');
		
		value ? jQuery(slider).roundSlider('setValue', value) : '';
	});

	mainAudio.on('play', (e) => {
		playStyles()
	});

	mainAudio.on('ended', () => {
		player.removeClass('playing');
        player.parent().removeClass('active');
		circle.attr('stroke-dashoffset', totalLength);
		document.getElementById('album-art').classList.remove('active') 

		jQuery('#player-next').click()

	});

	jQuery(document).on('click', '#' + jQuery(audioInfo).attr('data-wave-overlay'), function(event){
		const imageElement = document.getElementById(jQuery(audioInfo).attr('data-wave-id'));
		const imageRect = imageElement.getBoundingClientRect(); // Get image position and size
		const clickX = event.clientX - imageRect.left; // Calculate X position relative to the image
		
		var percentage = (clickX / imageElement.clientWidth) * 100;
		
		let $elem = jQuery(event.target.parentNode.parentNode).find('.js-audio');
		
		updateAudio(percentage.toFixed(2), $elem);
	
	});

	
	
	jQuery(document).on('click', '#' + jQuery(audioInfo).attr('data-wave-id'), function(event){
		const imageElement = document.getElementById(jQuery(audioInfo).attr('data-wave-id'));
		const imageRect = imageElement.getBoundingClientRect(); // Get image position and size
		const clickX = event.clientX - imageRect.left; // Calculate X position relative to the image
		
		var percentage = (clickX / imageElement.clientWidth) * 100;
		
		let $elem = jQuery(event.target.parentNode.parentNode).find('.js-audio');
		
		updateAudio(percentage.toFixed(2), $elem);
	
	});

	jQuery(document).on('click', '#s-area', function(){
		const imageElement = document.getElementById('s-area');
		const imageRect = imageElement.getBoundingClientRect(); // Get image position and size
		const clickX = event.clientX - imageRect.left; // Calculate X position relative to the image
		
		var percentage = (clickX / imageElement.clientWidth) * 100;
		audio.currentTime = (percentage / 100) * audio.duration;
	})
	
}

/**
 * Convert Date to time
 * @param {*} val  
 */
function dateToTime(d)
{
	return (d.getHours() > 9 ? d.getHours() : '0'+d.getHours() ) +':'+ (d.getMinutes() > 9 ? d.getMinutes() : '0'+d.getMinutes() ) + ':' + (d.getSeconds() > 9 ? d.getSeconds() : '0'+d.getSeconds() );
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



function convertToTime(num) {
	return toHHMMSS(num);
}


/**
 * Load Ajax
 */
function includeFiles(file, id)
{
	
	const check = document.getElementById(id);

	if (!check)
		return null;

	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			document.getElementById(id).innerHTML = this.responseText;
		}
	};
	xhr.open("GET", "includes/"+file+".html", true);
	xhr.send();
}




function stickyScroll()
{
	const sidebar = document.querySelector('#filter-side');
	const container = document.querySelector('#filter-parent');
	
	if (!sidebar || !container)
		return null;

	function fixSidebar() {
	const rect = sidebar.getBoundingClientRect();
	const containerRect = container.getBoundingClientRect();
	const distanceFromBottom = containerRect.bottom - rect.height + 400; // Adjust with the top value

	if (window.scrollY >= distanceFromBottom && window.innerWidth > 1000)  {
		sidebar.style.position = 'fixed';
		sidebar.style.bottom = '0';
		sidebar.style.width = '13rem';
	} else {
		sidebar.style.position = 'relative';
		sidebar.style.top = '0px'; // Adjust with the top value
		sidebar.style.width = '100%';
	}
	}

	window.addEventListener('scroll', fixSidebar);
	window.addEventListener('resize', fixSidebar);
}


jQuery(document).on('click', '.active-parent', function(item){

	jQuery(this).parent().toggleClass('active')
})


jQuery(document).on('click', '.active-child', function(item){

	jQuery(this).parent().toggleClass('active')
})

// const activeParents = document.querySelectorAll('.active-parent');
// activeParents.forEach((item, i) => {
// 	item.addEventListener('click',function(i){
		
// 	})
// })

// const activeChilds = document.querySelectorAll('.active-child');
// activeChilds.forEach((item, i) => {
// 	item.addEventListener('click',function(i){
// 		item.parentElement.classList.toggle('active')
// 	})
// })

function stickyPlaylist()
{
	const sidebar = document.querySelector('#playlist-side');
	const container = document.querySelector('#playlist-parent');
	
	if (!sidebar || !container)
		return null;

	function fixSidebar() {
	const rect = sidebar.getBoundingClientRect();
	const containerRect = container.getBoundingClientRect();
	const distanceFromBottom = containerRect.top + 80; // Adjust with the top value
	
	if (window.innerWidth > 1024)
	{

		if (window.scrollY >= distanceFromBottom) {
			sidebar.style.position = 'fixed';
			sidebar.style.top = '10px';
		} else {
			sidebar.style.position = 'relative';
		}
	}
	}

	window.addEventListener('scroll', fixSidebar);
	window.addEventListener('resize', fixSidebar);
}


// jQuery('html').removeClass('dark') 


setTimeout(function() {
	reloadFuncs()
}, 1000);


function reloadFuncs() 
{
	
	const currentURL = window.location.href;
	const page = currentURL.split("/")
	const a =  ((page[page.length - 1]).replace('.html', ''))

	stickyScroll()
	runAudio()
	stickyPlaylist();
	runSlide()
    showSlides()
	handleSlides()

}

jQuery(document).on('change', '#imageInput', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
    }
    
    if (file) {
        reader.readAsDataURL(file);
    }
});

jQuery(document).on('click','.pCard_add', function () {
	jQuery('#'+jQuery(this).attr('data-id')).toggleClass('pCard_on');
});


// Vanilla javascript
window.addEventListener('popstate', function (e) {
	e.preventDefault()
    var state = e.state;
    if (state !== null) {
		loadPage(e.target.location.pathname)
    }
});






















/**
 * Video Picture-in-picture player
 */
$(function(){
	var myVideo;
	var playFrame;
	const processor = {
	timerCallback(myVideo) {
		if (!playFrame || myVideo.ended )   {
			playFrame = null;
			return;
		}
		this.computeFrame(myVideo);
		setTimeout(() => {
			playFrame ? this.timerCallback(myVideo) : '';
		}, 16); // roughly 60 frames per second
	},

	doLoad(myVideo) {
        jQuery(videoCanvas).removeClass('hidden')
		playFrame = true;
		this.c1 = document.getElementById("videoCanvas");
		
		this.ctx1 = this.c1.getContext("2d"); 

		let isDragging = false;
		let offsetX = 0;
		let offsetY = 0;

		videoCanvas.addEventListener('mousedown', function (e) {
			isDragging = true;
			videoCanvas.style.cursor = 'grabbing';

			// Calculate offset position to handle dragging smoothly
			offsetX = e.clientX - videoCanvas.getBoundingClientRect().left;
			offsetY = e.clientY - videoCanvas.getBoundingClientRect().top;
		});

		videoCanvas.addEventListener('ondragstart', function(){
			isDragging = true;
			videoCanvas.style.cursor = 'grabbing';
		}) 
		
		// Function to stop dragging
		window.addEventListener('mouseup', function () {
			isDragging = false;
			videoCanvas.style.cursor = 'grab';
		});
		
		// Function to drag the canvas
		window.addEventListener('mousemove', function (e) {
			if (isDragging) {
				// Calculate the new position
				const left = e.clientX - offsetX;
				const top = e.clientY - offsetY;

				// Update canvas position
				videoCanvas.style.left = `${left}px`;
				videoCanvas.style.top = `${top + 10}px`;

				// Set the position to absolute once dragging starts
				videoCanvas.style.position = 'fixed';
				videoCanvas.style.transform = 'none';
			}
		});

		
		
        this.width = 300;
        this.height =  200;
		this.timerCallback(myVideo)

	},

	computeFrame(myVideo) {
		this.ctx1.drawImage(myVideo, 0, 0, this.width, this.height);
		const frame = this.ctx1.getImageData(0, 0, this.width, this.height);
		const l = frame.data.length / 4;

		for (let i = 0; i < l; i++) {
		const grey =
			(frame.data[i * 4 + 0] +
			frame.data[i * 4 + 1] +
			frame.data[i * 4 + 2]) /
			3;
		}
		this.ctx1.putImageData(frame, 0, 0);

		return;
	},
	};
	
	jQuery(document).on('click', '.video-side-popup', function(){
    	myVideo = document.getElementById("footer-video");
		if (myVideo.canPlayType("video/mp4")) {
			myVideo.setAttribute("src", jQuery(this).data('path'));
			processor.doLoad(myVideo);
			myVideo.play()
			
		}
	})

	// jQuery(document).on('click', '.start-channel', async function(){
		// jQuery(this).attr('disabled', true)
    	// try {
		// 	myVideo = document.getElementById("footer-video");
		// 	let channelId = jQuery(this).attr('data-channel');
		// 	await loadChannelJson(channelId);

		// 	if (activeChannel && activeChannel.active_item)
		// 	{
		// 		activeChannelMedia = activeChannel.active_item;
		// 	}

		// 	if (myVideo.canPlayType("video/mp4")) {
		// 		var a = new Date(activeChannelMedia.start);
		// 		var b = new Date();
		// 		var difference = parseInt((b - a) / 1000);

		// 		myVideo.setAttribute("src", '/stream_channel?channel_id='+channelId);
		// 		myVideo.currentTime = difference;
		// 		processor.doLoad(myVideo);
		// 		myVideo.play()
		// 	}
	
		// 	jQuery(this).attr('disabled', false)

		// } catch (error) {
		// 	jQuery(this).attr('disabled', false)
		// }
	// })

	jQuery(document).on('click', '.pause-video, .pause-channel', function(){
    	myVideo = document.getElementById(jQuery(this).attr('data-player')  );
		playVideo(myVideo)
	})
	jQuery(document).on('click', '.play-video, .play-channel', function(){
    	myVideo = document.getElementById(jQuery(this).attr('data-player')  );
		playVideo(myVideo)
	})

	/** On Play video */
	jQuery(document).on( "click", "video", function() {
		myVideo = document.getElementById(jQuery(this).attr('id') );
		dataContainer = jQuery(this).attr('data-container');
		if (dataContainer) {
			playVideo(myVideo)
		}
		
	});

	jQuery(document).on('change', '#video-volume, #channel-volume', function(){
    	myVideo = document.getElementById(jQuery(this).attr('data-player')  );
		myVideo.volume = jQuery(this).val()
		setCookie('volume', myVideo.volume, 7); // Set a cookie named 'username' with value 'john_doe' that expires in 7 days
	})
	jQuery(document).on('click', '.fullscreen', function(){
		videoContainer = document.getElementById(jQuery(this).attr('data-container'));
		return	(window.innerWidth == screen.width && window.innerHeight == screen.height) 
			? document.exitFullscreen()
			: videoContainer.requestFullscreen();
	})

	jQuery(document).on('dblclick', '#videoCanvas,video', function(){
		videoContainer = document.getElementById(jQuery(this).attr('data-container'));
		return	(window.innerWidth == screen.width && window.innerHeight == screen.height) 
			? document.exitFullscreen()
			: videoContainer.requestFullscreen();
	})


	/** On change current time */
	jQuery(document).on('click', 'progress', (e) => {
		let progress = document.getElementById('progress')
		const rect = progress.getBoundingClientRect();
		const pos = (e.pageX - rect.left) / progress.offsetWidth;
		myVideo = document.getElementById(e.target.dataset.player);
		myVideo.currentTime = pos * myVideo.duration;
		myVideo.play()
	});

	function playVideo(myVideo)
	{	
		if (!myVideo)
			return;

		

		if (myVideo.paused) {
			myVideo.play()
			jQuery(`#${myVideo.dataset.container} .play-video`).hide().parent().find('.pause-video').fadeIn(200)
			jQuery('#channelContainer .play-channel').hide().parent().find('.pause-channel').fadeIn(200)
			jQuery('#video-overlay').fadeOut(200)
			jQuery('#channelContainer').css('z-index',  50)
		} else {
			jQuery(`#${myVideo.dataset.container} .pause-video`).hide().parent().find('.play-video').fadeIn(200)
			jQuery('#channelContainer .pause-channel').hide().parent().find('.play-channel').fadeIn(200)
			jQuery('#video-overlay').fadeIn(200)
			myVideo.pause()
			jQuery('#channelContainer').css('z-index',  0)
		} 	
		jQuery('#video-duration-page').html(convertToTime(myVideo.duration))
		jQuery('#videoContainer progress').attr("max", myVideo.duration);

		
		/** On time update */
		myVideo.addEventListener(
			"timeupdate",
			() => {
				jQuery(`#${myVideo.dataset.container} #current-time-page`).html(convertToTime(myVideo.currentTime));
				jQuery(`#${myVideo.dataset.container} progress`).val(myVideo.currentTime);

			})
			
			
		/** On Play video */
		myVideo.addEventListener(
		"play",
		() => {
			jQuery(`${myVideo.dataset.container} #video-duration-page`).html(convertToTime(myVideo.duration))
			jQuery(`${myVideo.dataset.container} progress`).attr("max", myVideo.duration);
			
			jQuery('#video-overlay').fadeOut(200)
			jQuery(`${myVideo.dataset.container}`).css('z-index',  999)
		},
		false,
		);
			
		/** On Pause video */
		myVideo.addEventListener(
		"pause",
		() => {
			jQuery('#video-overlay').fadeIn(200)
			jQuery(`${myVideo.dataset.container}`).css('z-index',  0)
		},
		false,
		);
	}

})





	/**
	 * Append selected item for calendar date range
	 * 
	 * @param {String} elementId 
	 */
	function appendRangeSelectedItem(elementId, type = 'channel')
	{
		jQuery(`#selected_media_list`).append(jQuery(elementId).html())
		
		let elements = jQuery('#selected_media_list').find('.range-selected-media');
		let element;
		jQuery('#'+type+'-range-selected-duration').val('0')

		for (var i = 0; i < elements.length; i++) {
			element = elements[i].dataset;
			handleSelectedDuration(element.id, element.uniqueId, element.duration)
		}
	}
	
	
	/**
	 * Remove selected date range item
	 */
	function removeRangeSelectedItem(elementId, type = 'channel')
	{
		jQuery(elementId).remove()
		
		let elements = jQuery('#selected_media_list').find('.range-selected-media');
		let element;
		jQuery('#'+type+'-range-selected-duration').val('0')

		for (var i = 0; i < elements.length; i++) {
			element = elements[i].dataset;
			handleSelectedDuration(element.id, element.uniqueId, element.duration)
		}
	}

	/**
	 * Handle selected date range item
	 */
	function handleSelectedDuration(id, uniqueId, duration, type = 'channel')
	{

		let dateTime = jQuery(`#${type}-range-date`).val() +' '+ jQuery(`#${type}-range-start`).val();
		console.log(dateTime)
		var d = new Date(dateTime);
		d.setSeconds(d.getSeconds() + parseInt(jQuery(`#${type}-range-selected-duration`).val()));
		var from = dateToTime(d)
		console.log(from)
		jQuery(`#selected-start-at-${id}-${uniqueId}`).val( from )
		jQuery(`#${type}-range-selected-duration`).val( parseInt(jQuery(`#${type}-range-selected-duration`).val()) + parseInt(duration) )
		var d = new Date(dateTime);
		d.setSeconds(d.getSeconds() + parseInt(jQuery(`#${type}-range-selected-duration`).val()));
		var to = dateToTime(d)

		jQuery(`#selected-playing-duration-${id}-${uniqueId}`).html(from+' | '+to)

		jQuery(`#${type}-range-selected-duration-text`).html(toHHMMSS(jQuery(`#${type}-range-selected-duration`).val()))

		jQuery(`#video-list-${id}-${uniqueId}`).remove()
		jQuery(`#range-item-submit-button`).removeClass(`hidden`);
	}








