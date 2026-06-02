document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.testimonials')) return;
    
    const track = document.querySelector('.testimonials__slider-list');
    const container = document.querySelector('.testimonials__slider');
    const slides = document.querySelectorAll('.testimonials__slider-item');
    const prevBtn = document.querySelector('.testimonials__icons-arrow:first-child');
    const nextBtn = document.querySelector('.testimonials__icons-arrow:last-child');
    const dots = document.querySelectorAll('.slider__icons-button');

    let currentIndex = 2;
    const totalSlides = slides.length;

    function getSlideWidth() {
        const slide = slides[0];
        if (!slide) return 606;
        return slide.offsetWidth;
    }

    function getGap() {
        const style = getComputedStyle(track);
        return parseFloat(style.gap) || 50;
    }

    function centerSlide() {
        const containerWidth = container.offsetWidth;
        const slideWidth = getSlideWidth();
        const gap = getGap();

        let offset = (containerWidth / 2) - (slideWidth / 2);

        for (let i = 0; i < currentIndex; i++) {
            offset -= (slides[i].offsetWidth + gap);
        }

        track.style.transform = `translateX(${offset}px)`;
        track.style.transition = 'transform 0.4s ease';

        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        if (prevBtn) {
            if (currentIndex === 0) {
                prevBtn.classList.add('disabled');
            } else {
                prevBtn.classList.remove('disabled');
            }
        }

        if (nextBtn) {
            if (currentIndex === totalSlides - 1) {
                nextBtn.classList.add('disabled');
            } else {
                nextBtn.classList.remove('disabled');
            }
        }
    }

    function nextSlide() {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            centerSlide();
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            centerSlide();
        }
    }

    function goToSlide(index) {
        currentIndex = index;
        centerSlide();
    }

    nextBtn?.addEventListener('click', nextSlide);
    prevBtn?.addEventListener('click', prevSlide);

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => goToSlide(i));
    });

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            centerSlide();
        }, 200);
    });

    centerSlide();
});