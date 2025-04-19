function toggleShareDropdown() {
    const dropdown = document.getElementById("shareDropdown");
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
}

document.addEventListener('click', function (e) {
    const dropdown = document.getElementById("shareDropdown");
    const dropdownButton = document.querySelector(".shareDropdownButton");
    if (dropdown) {
        if (dropdown.style.display === "block" && !dropdown.contains(e.target) && !dropdownButton.contains(e.target)) {
            dropdown.style.display = "none";
        }
    }
});

const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
const navContainer = document.querySelector('.nav-container');
navContainer.appendChild(navOverlay);

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


const roadmapId = document.getElementById('roadmap');
function scrollDown() {    
  if (roadmapId) {
    roadmapId.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
      });
  }
}