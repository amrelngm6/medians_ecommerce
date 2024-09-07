let currentIndexes = [0,0];

function showSlides() 
{
    const cont = document.querySelectorAll('.carousel-container')
    
    if (!cont)
        return null;

    cont.forEach((container, index) => {
        container.setAttribute('data-index', index)
        showSlide(container, index)

    });

}

function showSlide(container, i)
{

    
    const id = container.getAttribute('id');
    const parentId = container.parentElement.getAttribute('id');

    const limit = parseInt(container.getAttribute('data-count') ? container.getAttribute('data-count') : 3);
    const slides = document.querySelectorAll('#'+id+' .slide');
    // console.log(slides)
    const start = currentIndexes[i];
    const end = start + limit;
    slides.forEach((slide, index) => {
        if (index >= start && index < end) {
            slide.style.display = 'block';
            slide.classList.add('active')
        } else {
            slide.style.display = 'none';
            slide.classList.remove('active')
        }
    });

    listenButtons(parentId)
}

function listenButtons(parentId)
{
            
    const prevBtn = document.querySelector('#'+parentId+' .prev-btn');
    const nextBtn = document.querySelector('#'+parentId+' .next-btn');

    prevBtn.addEventListener('click', goToPrev);
    nextBtn.addEventListener('click', goToNext);
}

function goToNext(i) {
    
    const sliderId = i.target.parentElement.getAttribute('data-slider');

    const slides = document.querySelectorAll('#'+sliderId+' .slide');
    const cont = document.querySelector('#'+sliderId+'.carousel-container')
    const limit = parseInt(cont.getAttribute('data-count') ? cont.getAttribute('data-count') : 3);

    const currentIndex = cont.getAttribute('data-index');

    currentIndexes[currentIndex]++; 
    let indexVal =  currentIndexes[currentIndex]; 

    if (indexVal > slides.length || (indexVal + limit) > slides.length ) {
        currentIndexes[currentIndex] = 0
    }


    showSlide(cont, currentIndex);
}

function goToPrev(i) {
    const sliderId = i.target.parentElement.getAttribute('data-slider');

    const slides = document.querySelectorAll('#'+sliderId+' .slide');
    const cont = document.querySelector('#'+sliderId+'.carousel-container')
    const limit = parseInt(cont.getAttribute('data-count') ? cont.getAttribute('data-count') : 3);

    const currentIndex = cont.getAttribute('data-index');

    currentIndexes[currentIndex]--; 
    let index =  currentIndexes[currentIndex]; 
    if (index < 0) {
        currentIndexes[currentIndex] = slides.length - limit
    }
    showSlide(cont, currentIndex);
}

setTimeout(function() {
    
    showSlides()

}, 500);

window.addEventListener('resize', function(e) {
    // Your JavaScript code to run on resize
    showSlides()
    const slides = document.querySelectorAll('.carousel-container');
    
    if (window.innerWidth < 600)
    {
        slides.forEach((slide, index) => {
            slide.setAttribute('data-count', 2)
        })
    } else if (window.innerWidth < 800) {

        slides.forEach((slide, index) => {
            slide.setAttribute('data-count', 3)
        })
    } else if (window.innerWidth < 1000) {

        slides.forEach((slide, index) => {
            slide.setAttribute('data-count', 4)
        })
    } else {

        slides.forEach((slide, index) => {
            const count = slide.getAttribute('data-count')
            slide.setAttribute('data-count', 5)
        })
    }
});
