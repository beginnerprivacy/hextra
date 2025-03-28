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


  let currentIndex = 0;

  function getItemsToShow() {
      const width = window.innerWidth;
  
      if (width >= 1200) {
          return 2.7;
      } else if (width >= 992) {
          return 2;
      } else if (width >= 768) {
          return 1.9;
      } else {
          return 1.4;
      }
  }
  
  function moveCarousel(direction) {
      const items = document.querySelectorAll('.carousel-item');
      const totalItems = items.length;
      const itemsToShow = getItemsToShow();
  
      currentIndex += direction;
  
      if (currentIndex < 0) {
          currentIndex = Math.ceil(totalItems / itemsToShow) - 1;
      } else if (currentIndex >= Math.ceil(totalItems / itemsToShow)) {
          currentIndex = 0;
      }
  
      const track = document.querySelector('.carousel-track');
      const offset = -currentIndex * (100 / itemsToShow);
      track.style.transform = `translateX(${offset}%)`;
  }
  
  window.addEventListener('resize', () => {
      currentIndex = 0;
      moveCarousel(0);
  });