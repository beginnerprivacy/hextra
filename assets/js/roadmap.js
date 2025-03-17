function updateRoadmap() {
    const sections = document.querySelectorAll('.roadmap-section');
    sections.forEach(section => section.style.display = 'none');
  
    const selectedTab = document.querySelector('input[name="tabs"]:checked').value;
    document.getElementById(selectedTab + 'Content').style.display = 'block';
  
    const selectedLabel = document.querySelector(`label[for="radio-${selectedTab}"]`);
    const glider = document.querySelector('.glider');
    const labelRect = selectedLabel.getBoundingClientRect();
    const tabsRect = document.querySelector('.tabs').getBoundingClientRect();
  
    glider.style.width = `${labelRect.width}px`;
    glider.style.transform = `translateX(${labelRect.left - tabsRect.left}px)`;
  }
  window.onload = updateRoadmap;
  
  function exportCheckbox() {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      const checkedItems = [];
  
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          checkedItems.push({
            featureCardTitle: checkbox.id.replace('checkbox-', ''),
            checked: true
          });
        }
      });
  
      const json = JSON.stringify(checkedItems, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'checked_items.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  };
  
  function importCheckbox() {
      const fileInput = document.getElementById('importFile');
      const file = fileInput.files[0];
  
      if (!file) {
          alert('Please select a file to import.');
          return;
      }
  
      const reader = new FileReader();
      reader.onload = function(event) {
          try {
          const data = JSON.parse(event.target.result);
          data.forEach(item => {
              const checkbox = document.getElementById(`checkbox-${item.featureCardTitle}`);
              if (checkbox) {
              checkbox.checked = item.checked;
              }
          });
          } catch (error) {
          alert('Error parsing JSON: ' + error.message);
          }
      };
  
      reader.readAsText(file);
    }
  
  function markAsDone(id) {
    const checkbox = document.getElementById(`checkbox-${id}`);
    if (!checkbox) return;
    checkbox.checked = !checkbox.checked;
    updateStatus(checkbox);
    
    localStorage.setItem(`checkbox-${id}`, checkbox.checked);
  }
  
  function updateStatus(checkbox) {
    const id = checkbox.id.replace('checkbox-', '');
    const button = document.getElementById(`mark-done-${id}`);
    const icon = document.getElementById(`status-icon-${id}`);
    const todoIcon = document.getElementById(`todo-icon-${id}`);
    const doneIcon = document.getElementById(`done-icon-${id}`);
  
    if (!button || !icon || !todoIcon || !doneIcon) return;
  
    const isChecked = checkbox.checked;
    button.textContent = isChecked ? 'Mark as todo' : 'Mark as done';
    icon.style.color = isChecked ? '#008d0c' : '#9CA3AF';
    todoIcon.classList.toggle('hx-hidden', isChecked);
    doneIcon.classList.toggle('hx-hidden', !isChecked);
  }
    
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.hx-checkbox').forEach(checkbox => {
      const id = checkbox.id;
      const savedState = localStorage.getItem(id);
      if (savedState === 'true') {
        checkbox.checked = true;
        updateStatus(checkbox);
      }
    });
    handleModalParam();
  });
  
  function handleModalParam() {
    const params = new URLSearchParams(window.location.search);
    const modalID = params.get('m');
    
    document.querySelectorAll('.roadmap-modal').forEach(modal => {
      modal.style.display = 'none';
    });
    
    if (modalID) {
      const modal = document.getElementById(modalID);
      if (modal) {
        const parentSection = modal.closest('.roadmap-section');
  
        if (parentSection) {
          const tabName = parentSection.id.replace('Content', '');
          const tabInput = document.querySelector(`input[name="tabs"][value="${tabName}"]`);
  
          if (tabInput) {
            tabInput.checked = true;
            updateRoadmap();
            modal.style.display = 'block';
            const overlay = document.querySelector('.overlay')
            const navoverlay = document.querySelector('.nav-overlay')
            overlay.style.display = 'block';
            navoverlay.style.display = 'block';
            const checkboxId = modalID.replace('modal-', '');
            const checkbox = document.getElementById(`checkbox-${checkboxId}`);
            if (checkbox) updateStatus(checkbox);
          }
        }
      }
    }
  }
  
  function closeRoadmapModal() {
    const params = new URLSearchParams(window.location.search);
    const modalID = params.get('m');
    const url = new URL(window.location);
    url.searchParams.delete('m');
    window.history.replaceState({}, '', url);
    document.getElementById(modalID).style.display = 'none';
    const overlay = document.querySelector('.overlay')
    const navoverlay = document.querySelector('.nav-overlay')
    overlay.style.display = 'none';
    navoverlay.style.display = 'none';
    return false;
  }
  
  document.querySelectorAll('a[href^="?m="]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const modalID = new URL(this.href).searchParams.get('m');
      const url = new URL(window.location);
      url.searchParams.set('m', modalID);
      window.history.pushState({}, '', url);
      handleModalParam();
    });
  });
  
  document.querySelectorAll('.roadmap-modal-close').forEach(btn => {
    btn.onclick = () => {
      closeRoadmapModal();
    };
  });
  
  document.querySelectorAll('.overlay, .nav-overlay').forEach(overlay => {
    overlay.onclick = () => {
      closeRoadmapModal();
    }
  });
  
  document.querySelectorAll('.hx-checkbox').forEach(checkbox => {
    checkbox.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  })
  
  window.addEventListener('popstate', handleModalParam);
  document.addEventListener('DOMContentLoaded', handleModalParam);
  
  function previousRoadmapModal() {
    const params = new URLSearchParams(window.location.search);
    const currentModalID = params.get('m');
    const modals = document.querySelectorAll('.roadmap-modal');
    let currentIndex = -1;
  
    modals.forEach((modal, index) => {
      if (modal.id === currentModalID) {
        currentIndex = index;
      }
    });
  
    while (currentIndex > 0) {
      const previousModal = modals[currentIndex - 1];
      const previousModalID = previousModal.id;
  
      if (previousModalID !== 'something-missing-contribute') {
        const url = new URL(window.location);
        url.searchParams.set('m', previousModalID);
        window.history.pushState({}, '', url);
        handleModalParam();
        break;
      }
      currentIndex--;
    }
  }
  
  function nextRoadmapModal() {
    const params = new URLSearchParams(window.location.search);
    const currentModalID = params.get('m');
    const modals = document.querySelectorAll('.roadmap-modal');
    let currentIndex = -1;
  
    modals.forEach((modal, index) => {
      if (modal.id === currentModalID) {
        currentIndex = index;
      }
    });
  
    while (currentIndex < modals.length - 1) {
      const nextModal = modals[currentIndex + 1];
      const nextModalID = nextModal.id;
  
      if (nextModalID !== 'something-missing-contribute') {
        const url = new URL(window.location);
        url.searchParams.set('m', nextModalID);
        window.history.pushState({}, '', url);
        handleModalParam();
        break;
      }
      currentIndex++;
    }
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    const grids = [
        document.querySelector('#basicContent .hextra-feature-grid'),
        document.querySelector('#advancedContent .hextra-feature-grid')
    ];
  
    if (window.innerWidth > 1025) {
      grids.forEach(grid => {
          if (!grid) return;
          const cards = Array.from(grid.children); 
          
          if (cards.length < 10) {
              return;
          }
  
          const cardsToRearrange = [
              cards[11],
              cards[13],
              cards[15],
              cards[17],
              cards[19]
          ];
  
          const newOrder = [
              cardsToRearrange[4],
              cardsToRearrange[3],
              cardsToRearrange[2],
              cardsToRearrange[1],
              cardsToRearrange[0]
          ];
  
          const insertPositions = [
              cards[11].nextElementSibling,
              cards[13].nextElementSibling,
              cards[15].nextElementSibling,
              cards[17].nextElementSibling,
              cards[19].nextElementSibling
          ];
  
          cardsToRearrange.forEach(card => {
              grid.removeChild(card);
          });
  
          newOrder.forEach((card, index) => {
              grid.insertBefore(card, insertPositions[index]);
          });
      });
    }
  });
  
  
