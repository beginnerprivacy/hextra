function showTourModal() {
    const modal = document.createElement('div');
    const modalContent = document.createElement('div');
    const message = document.createElement('p');
    const yesButton = document.createElement('button');
    const noButton = document.createElement('button');
    const checkboxLabel = document.createElement('label');
    const checkbox = document.createElement('input');
  
    modal.className = 'modal';
    modalContent.className = 'modal-content';
    checkboxLabel.className = 'modal-ask-again';
    yesButton.className = 'modal-button';
    noButton.className = 'modal-button';
  
    const isSpanish = window.location.href.includes('/es/');
    const isChinese = window.location.href.includes('/zh-cn/');
  
    message.textContent = isSpanish ? '¿Te gustaría hacer un recorrido?' : isChinese ? '您想参加导览吗？' : 'Would you like to take a tour?';
    yesButton.textContent = isSpanish ? 'Sí' : isChinese ? '是' : 'Yes';
    noButton.textContent = isSpanish ? 'No' : isChinese ? '否' : 'No';
  
    checkbox.type = 'checkbox';
    checkboxLabel.appendChild(checkbox);
    checkboxLabel.appendChild(document.createTextNode(isSpanish ? ' No preguntar de nuevo' : isChinese ? ' 不再询问' : ' Do not ask again'));
    
    modalContent.appendChild(message);
    modalContent.appendChild(checkboxLabel);
    modalContent.appendChild(yesButton);
    modalContent.appendChild(noButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  
    yesButton.onclick = function() {
        if (checkbox.checked) {
            localStorage.setItem('doNotAskAgain', 'true');
        }
        guidedTour();
        document.body.removeChild(modal);
    };
  
    noButton.onclick = function() {
        if (checkbox.checked) {
            localStorage.setItem('doNotAskAgain', 'true');
        }
        document.body.removeChild(modal);
    };
  }
  
  function scrollDown() {
    window.scrollBy({
        top: 400,
        behavior: 'smooth'
    });
    
    setTimeout(() => {
        if (localStorage.getItem('doNotAskAgain') !== 'true') {
            showTourModal();
        }
    }, 400);
  }
  
  const steps = [
    {
      element: '.roadmap',
      text: 'This is the Roadmap. Here you can see all the steps.',
      text_es: 'Este es el Roadmap. Aquí puedes ver todos los pasos.',
      text_zh_cn: '这是路线图。在这里你可以看到所有的步骤。'
    },
    {
      element: '.tabs',
      text: 'You can use the tabs to switch between different difficulties.',
      text_es: 'Puedes usar las pestañas para cambiar entre diferentes niveles de dificultad.',
      text_zh_cn: '你可以使用标签在不同难度之间切换。'
    },
    {
      element: '#import-export',
      text: 'Save your progress across devices with Import/Export buttons.',
      text_es: ' Guarda tu progreso en dispositivos con los botones de Importar/Exportar.',
      text_zh_cn: '使用导入/导出按钮在设备间保存进度。'  
    },
    {
      element: '.hextra-feature-card',
      noBtn: true,
      text: 'Go to the first step of the roadmap.',
      text_es: 'Ve al primer paso de la hoja de ruta.',
      text_zh_cn: '前往路线图的第一步。'  
    },
    {
      element: '#roadmap-modal-mark',
      noBtn: true,
      text: 'Once done reading you can mark it as done.',
      text_es: 'Una vez que hayas terminado de leer, puedes marcarlo como completado.',
      text_zh_cn: '阅读完成后，您可以将其标记为已完成。'  
    }
  ];
  
  const container = document.createElement('div');
  container.className = 'tour-container';
  document.body.appendChild(container);
  
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);
  
  const navOverlay = document.createElement('div');
  navOverlay.className = 'nav-overlay';
  const navContainer = document.querySelector('.nav-container');
  navContainer.appendChild(navOverlay);
  
  let currentStep = parseInt(localStorage.getItem('currentStep')) || 0;
  let isGuidedTour = localStorage.getItem('isGuidedTour') === 'true';
  
  function guidedTour() {
    localStorage.setItem('isGuidedTour', 'true');
    updateTourContainer(steps[currentStep]);
  }
  
  if (isGuidedTour && currentStep < steps.length) {
    guidedTour();
  }
  
  document.body.addEventListener('click', (event) => {
    const target = event.target;
    const isGuidedTour = localStorage.getItem('isGuidedTour') === 'true';
    const isSpanish = window.location.href.includes('/es/');
    const isChinese = window.location.href.includes('/zh-cn/');
  
    if (isGuidedTour) {
      let elementSelector = steps[currentStep].element;
      if (isSpanish && steps[currentStep].element_es) {
          elementSelector = steps[currentStep].element_es;
      } else if (isChinese && steps[currentStep].element_zh_cn) {
          elementSelector = steps[currentStep].element_zh_cn;
      }
      const currentElement = document.querySelector(elementSelector);
  
      if (target.closest('.hextra-feature-card')) {
          event.stopPropagation();
          if (currentElement) {currentElement.classList.remove('highlight-tour');}
          currentStep++;
          localStorage.setItem('currentStep', currentStep);
          updateTourContainer(steps[currentStep]);
      }
    }
  });
  
  function updateTourContainer(step) {
      const isSpanish = window.location.href.includes('/es/');
      const isChinese = window.location.href.includes('/zh-cn/');
  
      let elementSelector = step.element;
      if (isSpanish && step.element_es) {
          elementSelector = step.element_es;
      } else if (isChinese && step.element_zh_cn) {
          elementSelector = step.element_zh_cn;
      }
  
      const element = document.querySelector(elementSelector);
      const rect = element.getBoundingClientRect();
      
      overlay.style.display = 'block';
      navOverlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
      
      if (currentStep === 3) {
        if (document.documentElement.classList.contains('dark')) {
          element.style.backgroundColor = 'black';
        }
        else {
          element.style.backgroundColor = 'white';
        }
        element.style.borderRadius = '1.5rem';
        thirdElement = element;
      }
      if (currentStep === 4) {
        thirdElement.style.backgroundColor = '';
      }

      container.style.left = `${rect.left + window.scrollX}px`;
      if (!step.under) {
        if (currentStep === 4) {
          container.style.top = `${window.scrollY + 400}px`;
          document.querySelector('.roadmap-modal-close').style.pointerEvents = 'none';
          document.querySelector('.overlay').style.pointerEvents = 'none';
          document.querySelector('.nav-overlay').style.pointerEvents = 'none';
        }
        else if (currentStep === 3) {
          container.style.top = `${rect.top + window.scrollY -55}px`;
        }
        else {
          container.style.top = `${rect.top + window.scrollY - 95}px`;
        }
      }
      else {
        container.style.top = `${rect.top + window.scrollY + 50}px`;
      }
      if (window.innerWidth <= 768) {
        if (currentStep === 2) {
          container.style.left = `${rect.left + window.scrollX - 275}px`;
        }
        if (currentStep === 4) {
          container.style.left = `${rect.left + window.scrollX}px`;
        }
      }
      if (window.innerWidth <= 525) {
        if (currentStep === 1) {
          container.style.top = `${rect.top + window.scrollY - 120}px`;
        }
        if (currentStep === 2) {
          container.style.left = `0px`;
          container.style.top = `${rect.top + window.scrollY - 120}px`;
        }
      }

      if (!step.noBtn) {
        const textToDisplay = isSpanish ? step.text_es : isChinese ? step.text_zh_cn : step.text;
        container.innerHTML = `<p>${textToDisplay}</p><button id="nextBtn">Next</button>`;
  
        const nextButton = document.getElementById('nextBtn');
        nextButton.onclick = () => {
          let elementSelector = steps[currentStep].element;
          if (isSpanish && steps[currentStep].element_es) {
              elementSelector = steps[currentStep].element_es;
          } else if (isChinese && steps[currentStep].element_zh_cn) {
              elementSelector = steps[currentStep].element_zh_cn;
          }
          const currentElement = document.querySelector(elementSelector);
          if (currentElement) {currentElement.classList.remove('highlight-tour');}
          currentStep++;
          localStorage.setItem('currentStep', currentStep);
          if (currentStep === 2) {
            const startTabInput = document.getElementById('radio-start');
            if (startTabInput) {
                startTabInput.checked = true;
            }
            updateRoadmap();
          }
          updateTourContainer(steps[currentStep]);
        };
      }
      else {
        const textToDisplay = isSpanish ? step.text_es : isChinese ? step.text_zh_cn : step.text;
        container.innerHTML = `<p>${textToDisplay}</p>`;
        if (currentStep === 4) {
          const markDoneButton = document.querySelector('.mark-done-button');
          markDoneButton.addEventListener('click', (e) => {
              endTour();
          });
        }
      }
  
      container.style.display = 'block';
      if (currentStep === 1) {
        document.querySelector(elementSelector).style.zIndex = '99';
      }
      else {
        document.querySelector(elementSelector).classList.add('highlight-tour');
        document.querySelector(steps[1].element).style.zIndex = '1';
      }
  }
  
  function endTour() {
      container.style.display = 'none';
      document.body.style.overflow = 'visible';
      document.querySelector('.roadmap-modal-close').style.pointerEvents = 'fill';
      document.querySelector('.overlay').style.pointerEvents = 'fill';
      document.querySelector('.nav-overlay').style.pointerEvents = 'fill';
      if (currentStep < steps.length) {
          document.querySelector(steps[currentStep].element).classList.remove('highlight-tour');
      }
      localStorage.removeItem('currentStep');
      localStorage.setItem('isGuidedTour', 'false');
      currentStep = 0;
  }