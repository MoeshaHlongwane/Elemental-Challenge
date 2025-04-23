// Carousel functionality
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
    if (dots[i]) {
      dots[i].classList.toggle('active', i === index);
    }
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

// Toggle menu functionality
// function toggleMenu() {
//   const nav = document.querySelector('.main-nav');
//   const overlay = document.querySelector('.overlay');
//   const burger = document.querySelector('.burger')
//   const menuClose = document.querySelector('.menu-close')
 

//   nav.classList.toggle('active');
//   overlay.classList.toggle('active');
//   document.body.classList.toggle('no-scroll');

//    // Toggle burger icon visibility
//    burger.style.display = nav.classList.contains('active') ? 'none' : 'block';
// }

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

  // Next arrow navigation
  if (nextArrow) {
    nextArrow.addEventListener('click', nextSlide);
  }

  // Start auto-scrolling
  resetAutoScroll();

  // Pause auto-scroll when user hovers over carousel
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoScrollInterval);
    });

    carousel.addEventListener('mouseleave', resetAutoScroll);
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