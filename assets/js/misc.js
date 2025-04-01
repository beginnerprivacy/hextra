function toggleShareDropdown () {
    const dropdown = document.getElementById("shareDropdown");
    dropdown.style.display = "block";
  }
  
  window.onclick = function(event) {
      if (!event.target.matches('.share-button')) {
          const dropdowns = document.getElementsByClassName ("dropdown-content");
          for (let i = 0; i < dropdowns.length; i++) {
              const openDropdown = dropdowns[i];
              if (openDropdown.style.display === "block") {
                  openDropdown.style.display = "none";
              }
          }
      }
  }

// Carousel for checklists on homepage
let currentIndex = 0;

function moveCarousel(direction) {
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length - 3;
    const itemWidth = items[0].offsetWidth + 15;

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalItems - 1;
    } else if (currentIndex >= totalItems) {
        currentIndex = 0;
    }

    const newPosition = -currentIndex * itemWidth;
    document.querySelector('.carousel-track').style.transform = `translateX(${newPosition}px)`;
}

let isDragging = false;
let startX;
let scrollLeft;

const carousel = document.querySelector('.carousel');
const carouselTrack = document.querySelector('.carouselTrack');

if (carousel) {
    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    carousel.addEventListener('mouseup', () => {
        isDragging = false;
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    carousel.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('touchend', () => {
        isDragging = false;
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
}

// Scroll down to common misconceptions section on homepage
function scrollMisconceptions() {
    const commonMisconceptionsId = document.getElementById('common-misconceptions');
    
    if (commonMisconceptionsId) {
        commonMisconceptionsId.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}
  