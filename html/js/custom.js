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
	
	jQuery('.audio__slider').on('drag, change', function (e) {
		let $this = $(this);
		let $elem = $this.closest('.js-audio');
		updateAudio(e, $elem);
		$this.addClass('active');
	});
}


function updateAudio(e, $elem) {
	console.log(e.handle.value);
	let value = e.handle.value;
	// var thisPlayer = el.find('.js-audio'),
	var play = $elem.find('.play-pause'),
		circle = $elem.find('#seekbar'),

		getCircle = circle.get(0),
		totalLength = getCircle.getTotalLength(),
		//currentTime = $elem.find('audio')[0].currentTime,
		maxduration = $elem.find('audio')[0].duration;
	var y = (value * maxduration) / 100;
	$elem.find('audio')[0].currentTime = y;

}

function initAudioPlayer(player, index) {

	let audio = player.find('audio'),
		play = player.find('.play-pause'),
		circle = player.find('#seekbar'),
		getCircle = circle.get(0),
		totalLength = getCircle.getTotalLength();

		console.log(audio)

	circle.attr({
		'stroke-dasharray': totalLength,
		'stroke-dashoffset': totalLength,
	});

	play.on('click', () => {

		if (audio[0].paused) {
			$('audio').each((index, el) => {
				$('audio')[index].pause();
			});
			$('.js-audio').removeClass('playing');
			$('.js-audio').parent().removeClass('active');
			audio[0].play();
			player.removeClass('paused');
			player.addClass('playing');
			player.parent().addClass('active');
		} else {
	

			audio[0].pause();
			player.removeClass('playing');
			player.parent().removeClass('active');
			player.addClass('paused');
		}
	});

	audio.on('timeupdate', () => {
		let currentTime = audio[0].currentTime,
			maxduration = audio[0].duration,
			calc = totalLength - (currentTime / maxduration * totalLength);

		console.log(convertToTime( parseInt(currentTime)));
		
		circle.attr('stroke-dashoffset', calc);
		
		let value = Math.floor((currentTime / maxduration) * 100);
		// console.log(value);
		$('#track-wave-1').css('right', '0')
		$('#track-wave-1').css('left', 'auto')
		$('#track-wave-1').css('width', (100 - value)+'%')
		var slider = audio.closest('.js-audio').find('.audio__slider');
		$(slider).roundSlider('setValue', value);
	});

	audio.on('ended', () => {
		player.removeClass('playing');
        player.parent().removeClass('active');
		circle.attr('stroke-dashoffset', totalLength);

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



