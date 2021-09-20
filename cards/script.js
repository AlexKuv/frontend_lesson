function slidesPlugin( activeSlide = 0) {
    const slides = document.querySelectorAll('.slide');

    slides[activeSlide].classList.add('active');

    slides.forEach(item => {
        item.addEventListener('click', () => {
            clearActiveClasses();
            item.classList.add('active');
        })
    })

    function clearActiveClasses () {
        slides.forEach(item => {
            item.classList.remove('active');
        })
    }
}

slidesPlugin(2);