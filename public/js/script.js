document.addEventListener('DOMContentLoaded', () => {
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle) {
menuToggle.addEventListener('click', () => {
navLinks.classList.toggle('active');
});
}
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
link.addEventListener('click', () => {
navLinks.classList.remove('active');
});
});
const sliderImages = document.querySelectorAll('.slider-image');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
let currentSlide = 0;
if (sliderImages.length > 0) {
const showSlide = (index) => {
const targetImg = sliderImages[index];
if (targetImg.dataset.src) {
targetImg.src = targetImg.dataset.src;
targetImg.removeAttribute('data-src');
}
sliderImages.forEach(img => img.classList.remove('active'));
targetImg.classList.add('active');
};
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
setInterval(() => {
currentSlide = (currentSlide + 1) % sliderImages.length;
showSlide(currentSlide);
}, 5000);
// Inicializace prvního slidu
if (sliderImages.length > 0) {
const firstImg = sliderImages[0];
if (firstImg.dataset.src) {
firstImg.src = firstImg.dataset.src;
firstImg.removeAttribute('data-src');
}
}
}
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
const targetImg = galleryImages[currentGalleryIndex];
const actualSrc = targetImg.dataset.src || targetImg.src;
lightboxImg.src = actualSrc;
lightboxImg.alt = targetImg.alt;
lightbox.classList.add('active');
document.body.style.overflow = 'hidden';
};
const closeLightbox = () => {
lightbox.classList.remove('active');
document.body.style.overflow = '';
};
const nextImage = (e) => {
if (e) e.stopPropagation();
currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
const targetImg = galleryImages[currentGalleryIndex];
lightboxImg.src = targetImg.dataset.src || targetImg.src;
lightboxImg.alt = targetImg.alt;
};
const prevImage = (e) => {
if (e) e.stopPropagation();
currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
const targetImg = galleryImages[currentGalleryIndex];
lightboxImg.src = targetImg.dataset.src || targetImg.src;
lightboxImg.alt = targetImg.alt;
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
lightbox.addEventListener('click', (e) => {
if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
closeLightbox();
}
});
document.addEventListener('keydown', (e) => {
if (!lightbox.classList.contains('active')) return;
if (e.key === 'Escape') closeLightbox();
if (e.key === 'ArrowRight') nextImage();
if (e.key === 'ArrowLeft') prevImage();
});
}
const updateExperienceYears = () => {
const startYear = 1998;
const currentYear = new Date().getFullYear();
const years = currentYear - startYear;
const elements = document.querySelectorAll('.years-text');
elements.forEach(el => {
if (el.tagName === 'STRONG' && el.textContent.includes('zkušeností')) {
el.textContent = `Více než ${years} let zkušeností`;
}
else if (el.tagName === 'SPAN') {
el.textContent = `více než ${years} let`;
}
});
const yearElement = document.getElementById('current-year');
if (yearElement) {
yearElement.textContent = currentYear;
}
};
updateExperienceYears();
const animatedItems = document.querySelectorAll('.gallery-item, .visible-on-scroll, .slider, .image-content, .service-card');
const loadVisibleImage = (item) => {
const img = item.querySelector('img');
if (img && img.dataset.src) {
img.src = img.dataset.src;
img.removeAttribute('data-src');
}
if (item.classList.contains('slider')) {
const sliderImages = item.querySelectorAll('.slider-image');
sliderImages.forEach(sliderImg => {
if (sliderImg.dataset.src) {
sliderImg.src = sliderImg.dataset.src;
sliderImg.removeAttribute('data-src');
}
});
} else if (item.classList.contains('image-content')) {
const contentImg = item.querySelector('img');
if (contentImg && contentImg.dataset.src) {
contentImg.src = contentImg.dataset.src;
contentImg.removeAttribute('data-src');
}
}
item.classList.add('visible');
};
if (animatedItems.length > 0) {
const observerOptions = {
root: null,
rootMargin: '200px',
threshold: 0.01
};
const observer = new IntersectionObserver((entries, observer) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
loadVisibleImage(entry.target);
observer.unobserve(entry.target);
}
});
}, observerOptions);
animatedItems.forEach(item => {
observer.observe(item);
});
}
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
iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
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