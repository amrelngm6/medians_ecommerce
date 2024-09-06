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




var audio;




function runAudio()
{

	jQuery('.js-audio').each(function (index, el) {
		
		initAudioPlayer(jQuery(this), index);
	});
	
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


function updateAudio(e, $elem) {

	let value = e;
	var play = $elem.find('.play-pause'),
		maxduration = audio.duration;

		
	var y = Math.floor((value / 100) * maxduration);

	audio.pause()
	audio.currentTime = y;
	audio.play()

}

function initAudioPlayer(player, index) {

	let mainAudio = player.find('audio');

	audio = mainAudio[0];
	audio.load()
	// getAudioBlog(audio.src)

	let play = player.find('.play-pause'),
		circle = player.find('#seekbar'),
		getCircle = circle.get(0),
		totalLength = getCircle.getTotalLength();

		
	circle.attr({
		'stroke-dasharray': totalLength,
		'stroke-dashoffset': totalLength,
	});

	mainAudio.on('loadedmetadata', function() {
		const duration = audio.duration;
		if (isFinite(duration)) {
			console.log('Duration:', duration);
		} else {
			console.error('Duration is not available or is Infinity.');
		}
	});
	
	play.on('click', () => {
		console.log('Clicked')
		if (audio.paused) {
			$('audio').each((index, el) => {
				$('audio')[index].pause();
			});
			$('.js-audio').removeClass('playing');
			$('.js-audio').parent().removeClass('active');
			audio.play();
			player.removeClass('paused');
			player.addClass('playing');
			player.parent().addClass('active');
		} else {

			audio.pause();
			player.removeClass('playing');
			player.parent().removeClass('active');
			player.addClass('paused');
		}
	});

	mainAudio.on('error', (e) => {
		console.log(e)
	});

	mainAudio.on('seeked', (e) => {
		console.log('seeked')
	});

	mainAudio.on('timeupdate', (e) => {

		let currentTime = audio.currentTime,
		maxduration = audio.duration,
		calc = totalLength - (currentTime / maxduration * totalLength);

		console.log(maxduration);
		console.log(convertToTime( parseInt(currentTime)));
		
		circle.attr('stroke-dashoffset', calc);
		
		let value = (currentTime / maxduration) * 100;
		console.log(value);

		$('#'+jQuery(audio).data('wave-id')).css('right', '0')
		$('#'+jQuery(audio).data('wave-id')).css('left', 'auto')
		$('#'+jQuery(audio).data('wave-id')).css('width', (100 - value)+'%')

		var slider = mainAudio.closest('.js-audio').find('.audio__slider');
		$(slider).roundSlider('setValue', value);
	});

	mainAudio.on('play', (e) => {
		console.log(e)
		console.log('playing')
	});

	mainAudio.on('ended', () => {
		console.log('ended')
		player.removeClass('playing');
        player.parent().removeClass('active');
		circle.attr('stroke-dashoffset', totalLength);

	});

	document.getElementById(jQuery(audio).data('wave-id')).addEventListener("click", function(event) {
		// Get the width of the element
		var elementWidth = this.clientWidth;
		
		// Get the position of the click relative to the left edge of the element
		var clickPosition = event.offsetX;
		
		// Calculate the percentage
		var percentage = (clickPosition / elementWidth) * 100;
		
			console.log(event.target.parentNode.closest('.js-audio'))
			console.log(this)
		let $elem = event.parent().closest('.js-audio');
		
		updateAudio(Math.floor(percentage), $elem);

		// Display the result
		console.log("Click position: " + percentage.toFixed(2) + "%");
	});
	
}

function convertToTime(num) {
    if (typeof num !== 'number' || num < 0) {
      return "00:00";
    }
  
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
  
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

includeFiles('header', 'main-header');
includeFiles('sidebar', 'sidebar');
includeFiles('playing', 'side-playing');
includeFiles('authors_list', 'top-authors');
includeFiles('channel_list', 'channel_list');
includeFiles('genres_list', 'top-charts');
includeFiles('tracks-list', 'tracks-list');
includeFiles('public-playlists', 'public-playlists');
includeFiles('playlist-items', 'playlist-items-list');
includeFiles('playlist-items', 'playlist-items-list2');




function stickyScroll()
{
	const sidebar = document.querySelector('#filter-side');
	const container = document.querySelector('#filter-parent');
	
	if (!sidebar || !container)
		return null;

	function fixSidebar() {
	const rect = sidebar.getBoundingClientRect();
	const containerRect = container.getBoundingClientRect();
	const distanceFromBottom = containerRect.bottom - rect.height - 300; // Adjust with the top value

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



const activeParents = document.querySelectorAll('.active-parent');
activeParents.forEach((item, i) => {
	item.addEventListener('click',function(i){
		item.parentElement.classList.toggle('active')
	})
})

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


jQuery('html').removeClass('dark') 


setTimeout(function() {

	const currentURL = window.location.href;
	const page = currentURL.split("/")
	const a =  ((page[page.length - 1]).replace('.html', ''))

	jQuery('#'+(a ? a : 'home')).addClass('active')
	
	stickyScroll()
	runAudio()
	stickyPlaylist();
}, 1000);



