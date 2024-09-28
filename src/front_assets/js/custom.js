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

var audio, canPlay, player, audioInfo, audioObject, list, index, is_slide, filename, activeStation, activeStationMedia;


document.getElementById('player-audio').addEventListener("change", function(event) {
	audio.volume = event.target.value;
	setCookie('volume', event.target.value, 7); // Set a cookie named 'username' with value 'john_doe' that expires in 7 days
}) ;	

jQuery(document).on('click', '.start-station', function (i, el) {
	
	jQuery('#station-app-cover').removeClass('hidden')
	const stationId = jQuery(this).data('station'); 
		
	loadStation(stationId)

	let val = jQuery('#startions-interval').val();
	
	setInterval(function(){
		loadStation(stationId)
	}, val > 1000  ? val : 5000);
});

var a;

async function loadStation(stationId, play = true)
{
	const response  = await $.get('/station_json/'+stationId);
	const chunkTimerVal  = jQuery('#station_media_chunk').val() > 5 ? (jQuery('#station_media_chunk').val() - 5) : 55 ;
	const chunkTimer  = chunkTimerVal > 5 ? chunkTimerVal : 58 ;

	activeStation = JSON.parse(response);
	let rand = Math.random();

	if (activeStationMedia && activeStation.active_item && activeStation.active_item.media_id == activeStationMedia.media_id)
	{
		a = 'same'
		if (audio.currentTime > chunkTimer) {
			a = 'new'
		}
	} else if (activeStation.active_item == null) {
		a = null;
	} else {
		a = 'new'
	}
	activeStationMedia = activeStation.active_item;

	if (a == 'new' && play)
	{
		audio.src = '/stream_station?station_id='+ stationId+'&hash='+ rand;
		audio.load();
		audio.play();
	}

	jQuery('#station-album-name').html(activeStationMedia.media ? activeStationMedia.media.name : activeStationMedia.title)
	jQuery('#station-stream-name').html(activeStationMedia.media ? activeStationMedia.media.name  : activeStationMedia.title)
	jQuery('#station-track-name').html(activeStation.name ?? 'UNKNOWN')
	activeStationMedia.media ? jQuery('#station-track-poster').attr( 'src', activeStationMedia.media.picture) : activeStation.picture;

}

jQuery(document).on('click', '.start-player', function (i, el) {
	player = jQuery(this);
	list = JSON.parse(player.attr('data-list'))
	index = parseInt(player.attr('data-index'))
	if (player.hasClass('start-player')) {
		audioObject = list[index] ?? {};
		console.log(audioObject)
		filename = audioObject.main_file ? audioObject.main_file.filename : audioObject.filename;
		console.log(filename)
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
});

jQuery(document).on('click', '.start-single-player', function (i, el) {
	player = jQuery(this);
	list = JSON.parse(player.attr('data-list'))
	index = player.attr('data-index')
	if (player.hasClass('start-single-player')) {
		audioObject = list[index];
		filename = audioObject.main_file ? audioObject.main_file.filename : audioObject.filename;
		audioInfo = player.find('.slide__audio-player');
		audio = mainAudio[0];
		audio.src = '/stream_audio?audio='+ filename;
		audio.load()
		initAudioPlayer()
		playStyles()
		jQuery('#player-previous').addClass('hidden')
		jQuery('#player-next').addClass('hidden')
	} 
});


jQuery('#player-pause-button').on("click", function(event) {
	if (audio.paused ) {
		playStyles();
	} else  {
		pauseStyles();
	}

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
	filename = audioObject.main_file ? audioObject.main_file.filename : audioObject.filename;
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
		
		updateAudio(e.handle.value, $elem);
		$this.addClass('active');
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
	document.getElementById('track-name').innerHTML = audioObject.artist ? audioObject.artist.name : ''; 
	document.getElementById('track-poster').src = audioObject.picture ?? ''; 
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

	// console.log(circle)


	circle.attr({
		'stroke-dasharray': totalLength,
		'stroke-dashoffset': totalLength,
	});

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

	mainAudio.on('timeupdate', (e) => {

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
		console.log(slider)
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

		let indx = player.attr('data-index'); 
		let media = list[indx+1] ?? {};
		jQuery('#media-'+media.media_id)[0].click()

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

	
}




function convertToTime(num) {
    if (typeof num !== 'number' || num < 0) {
      return "00:00";
    }
  
    const hours = Math.floor(num / 60);
    const minutes = Math.floor(num % 60);
  
    const hoursText = hours < 10 ? `0${hours}` : `${hours}`;
    const minutesText = minutes < 10 ? `0${minutes}` : `${minutes}`;
  
    return `${hoursText}:${minutesText}`;
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

// includeFiles('header', 'main-header');
// includeFiles('sidebar', 'sidebar');
// includeFiles('playing', 'side-playing');
// includeFiles('authors_list', 'top-authors');
// includeFiles('channel_list', 'channel_list');
// includeFiles('genres_list', 'top-charts');
// includeFiles('tracks-list', 'tracks-list');
// includeFiles('public-playlists', 'public-playlists');
// includeFiles('playlist-items', 'playlist-items-list');
// includeFiles('playlist-items', 'playlist-items-list2');




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
			console.log(1)
		} else {
			console.log(2)
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