// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.main-slider li');
const dots = document.querySelectorAll('.pagination .dot');
const nextBtn = document.querySelector('.next-slide');
let autoScrollInterval;

function showSlide(index) {
  // Handle wrap-around for slides
  if (index >= slides.length) {
    index = 0;
  } else if (index < 0) {
    index = slides.length - 1;
  }
  
  // Update slides
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('active');
      slide.classList.remove('next');
    } else if (i === (index + 1) % slides.length) {
      slide.classList.add('next');
      slide.classList.remove('active');
    } else {
      slide.classList.remove('active', 'next');
    }
  });
  
  // Update dots
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  
  currentSlide = index;
  
  // Reset the auto-scroll timer whenever a slide changes
  resetAutoScroll();
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function resetAutoScroll() {
  clearInterval(autoScrollInterval);
  autoScrollInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

// Toggle menu function
function toggleMenu() {
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('.site-main-nav');
  
  // Toggle classes
  header.classList.toggle('small');
  nav.classList.toggle('open');
  
  // Toggle body scroll
  document.body.classList.toggle('no-scroll');
}

// Add scroll event for header shrinking
window.addEventListener('scroll', function() {
  const header = document.querySelector('.site-header');
  if (window.scrollY > 50) {
    header.classList.add('small');
  } else {
    header.classList.remove('small');
  }
});

function createOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.addEventListener('click', toggleMenu);
  document.body.prepend(overlay);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize carousel
  showSlide(0);
  
  // Dot navigation
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
  });

  // Next button navigation
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }

  // Start auto-scrolling
  resetAutoScroll();

  // Pause auto-scroll when user hovers over carousel
  const slider = document.querySelector('.main-slider');
  if (slider) {
    slider.addEventListener('mouseenter', () => {
      clearInterval(autoScrollInterval);
    });

    slider.addEventListener('mouseleave', resetAutoScroll);
  }

  // Initialize menu functionality
  createOverlay();
  
  // Close menu when clicking outside (optional - you might want to remove this)
  document.addEventListener('click', function(event) {
    const nav = document.querySelector('.main-nav');
    const burger = document.querySelector('.burger');
    const overlay = document.querySelector('.overlay');
    const menuClose = document.querySelector('.menu-close');
    
    if (event.target === overlay && nav.classList.contains('active')) {
      toggleMenu();
    }
  });
});