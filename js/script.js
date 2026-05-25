document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Zavřít menu po kliknutí na odkaz (pro mobilní zobrazení)
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Slider logic
    const sliderImages = document.querySelectorAll('.slider-image');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentSlide = 0;

    if (sliderImages.length > 0) {
        function showSlide(index) {
            sliderImages.forEach(img => img.classList.remove('active'));
            sliderImages[index].classList.add('active');
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % sliderImages.length;
                showSlide(currentSlide);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + sliderImages.length) % sliderImages.length;
                showSlide(currentSlide);
            });
        }

        // Auto slide
        setInterval(() => {
            currentSlide = (currentSlide + 1) % sliderImages.length;
            showSlide(currentSlide);
        }, 5000);
    }
});
