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

    // Lightbox logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const galleryImages = document.querySelectorAll('.gallery-preview img, .gallery-grid img, .about .image-content img, .contact-map img, .slider-image');
    
    let currentGalleryIndex = 0;

    if (lightbox && galleryImages.length > 0) {
        const openLightbox = (index) => {
            currentGalleryIndex = index;
            lightboxImg.src = galleryImages[currentGalleryIndex].src;
            lightboxImg.alt = galleryImages[currentGalleryIndex].alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Zakázat scrollování na pozadí
        };

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Povolit scrollování
        };

        const nextImage = (e) => {
            if (e) e.stopPropagation();
            currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
            lightboxImg.src = galleryImages[currentGalleryIndex].src;
            lightboxImg.alt = galleryImages[currentGalleryIndex].alt;
        };

        const prevImage = (e) => {
            if (e) e.stopPropagation();
            currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
            lightboxImg.src = galleryImages[currentGalleryIndex].src;
            lightboxImg.alt = galleryImages[currentGalleryIndex].alt;
        };

        galleryImages.forEach((img, index) => {
            img.addEventListener('click', () => openLightbox(index));
        });

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        if (lightboxNext) {
            lightboxNext.addEventListener('click', nextImage);
        }

        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', prevImage);
        }

        // Zavřít kliknutím na pozadí (mimo obrázek a tlačítka)
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });

        // Ovládání klávesnicí
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        });
    }

    // Dynamický výpočet let zkušeností
    const updateExperienceYears = () => {
        const startYear = 1998;
        const currentYear = new Date().getFullYear();
        const years = currentYear - startYear;
        const elements = document.querySelectorAll('.years-text');
        
        elements.forEach(el => {
            // Pokud element obsahuje "Více než ... let zkušeností"
            if (el.tagName === 'STRONG' && el.textContent.includes('zkušeností')) {
                el.textContent = `Více než ${years} let zkušeností`;
            } 
            // Pokud element obsahuje "více než ... let" (v odstavci O nás)
            else if (el.tagName === 'SPAN') {
                el.textContent = `více než ${years} let`;
            }
        });

        // Aktualizace roku v patičce
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = currentYear;
        }
    };

    updateExperienceYears();
    
    // Inicializace mapy na stránce kontakt
    const mapElement = document.getElementById('map');
    if (mapElement) {
        const lat = 50.5701017;
        const lng = 15.1673439;
        const zoom = 12;
        
        const map = L.map('map').setView([lat, lng], zoom);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        const customIcon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        
        L.marker([lat, lng], { icon: customIcon }).addTo(map)
            .bindPopup('<strong>Roubenky Šimůnek</strong><br>Pelešany 124, Turnov')
            .openPopup();
    }
});
