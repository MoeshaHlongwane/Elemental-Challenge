let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    dots[i].classList.toggle('active', i === index);
  });
  currentSlide = index;
}

// Initialize the carousel
showSlide(0);

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => showSlide(i));
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => showSlide(i));
});

function toggleMenu() {
  alert("Burger menu clicked! Add real menu toggle logic here.");
}
