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