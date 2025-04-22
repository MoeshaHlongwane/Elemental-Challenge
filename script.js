let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const nextArrow = document.querySelector('.arrow.next');
let autoScrollInterval;

function showSlide(index) {
  // Handle wrap-around for slides
  if (index >= slides.length) {
    index = 0;
  } else if (index < 0) {
    index = slides.length - 1;
  }
  
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    dots[i]?.classList.toggle('active', i === index);
  });
  currentSlide = index;
  
  // Reset the auto-scroll timer whenever a slide changes
  resetAutoScroll();
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function resetAutoScroll() {
  clearInterval(autoScrollInterval);
  autoScrollInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

// Initialize the carousel
showSlide(0);

// Dot navigation
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => showSlide(i));
});

// Next arrow navigation
nextArrow.addEventListener('click', nextSlide);

// Start auto-scrolling
resetAutoScroll();

// Optional: Pause auto-scroll when user hovers over carousel
document.querySelector('.carousel').addEventListener('mouseenter', () => {
  clearInterval(autoScrollInterval);
});

document.querySelector('.carousel').addEventListener('mouseleave', resetAutoScroll);