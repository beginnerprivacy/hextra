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

// Homepage scrolling
let observerScroll;
let currentSectionIndex = 0;
const sections = document.querySelectorAll('section');

observerScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            currentSectionIndex = Array.from(sections).indexOf(entry.target);
        }
    });
}, {
    threshold: 0.5
});

sections.forEach(section => {
    observerScroll.observe(section);
});

let isSearchInputFocused = false;

if (window.location.pathname === '/' || window.location.pathname === '/es/' || window.location.pathname === '/zh-cn/') {
    if (window.innerHeight >= 825) {
        document.querySelector('html').style.overflow = "hidden";
    }
    window.addEventListener('resize', () => {
        if (window.innerHeight >= 825) {
            document.querySelector('html').style.overflow = "hidden";
        } else {
            document.querySelector('html').style.overflow = "";
        }
    });

    const searchInput = document.querySelector('.search-input')
    const searchResults = document.querySelector('.search-results')
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            isSearchInputFocused = true;
        });
        document.addEventListener('click', function(event) {
            if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
                isSearchInputFocused = false;
            }
        });
    }

    window.addEventListener('wheel', function(event) {
        const urlParams = new URLSearchParams(window.location.search);
        if (!urlParams.has('m') && window.innerHeight >= 825 && !isSearchInputFocused) {
            event.preventDefault();
            if (event.deltaY > 0) {
                // Scrolling down
                if (currentSectionIndex < sections.length - 1) {
                    sections[currentSectionIndex + 1].scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Scrolling up
                if (currentSectionIndex > 1) {
                    sections[currentSectionIndex - 1].scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        }
    });

    window.addEventListener('keydown', function(event) {
        const urlParams = new URLSearchParams(window.location.search);
        if (!urlParams.has('m') && window.innerHeight >= 825 && !isSearchInputFocused) {
            event.preventDefault();
            if (event.key === "ArrowDown") {
                // Scrolling down
                if (currentSectionIndex < sections.length - 1) {
                    sections[currentSectionIndex + 1].scrollIntoView({ behavior: 'smooth' });
                }
            } 
            else if (event.key === "ArrowUp") {
                // Scrolling up
                if (currentSectionIndex > 1) {
                    sections[currentSectionIndex - 1].scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        }
    });
}

// Footer waves color
function updateWaveColors(selector) {
const isDarkMode = document.documentElement.classList.contains('dark');
const waves = document.querySelectorAll(`${selector} .wave`);
if (waves.length > 0) {
    if (isDarkMode) {
    waves[0].setAttribute('fill', 'rgba(50, 50, 50, 0.7)');
    waves[1].setAttribute('fill', 'rgba(50, 50, 50, 0.5)');
    waves[2].setAttribute('fill', 'rgba(50, 50, 50, 0.3)');
    waves[3].setAttribute('fill', '#171717');
    } else {
    waves[0].setAttribute('fill', 'rgba(243,244,246, 0.7)');
    waves[1].setAttribute('fill', 'rgba(243,244,246, 0.5)');
    waves[2].setAttribute('fill', 'rgba(243,244,246, 0.3)');
    waves[3].setAttribute('fill', '#e8e9eb');
    }
}
}
updateWaveColors('.hero-waves');
updateWaveColors('.footer-waves');

const observer = new MutationObserver(() => {
    updateWaveColors('.hero-waves');
    updateWaveColors('.footer-waves');
});
observer.observe(document.documentElement, { attributes: true });