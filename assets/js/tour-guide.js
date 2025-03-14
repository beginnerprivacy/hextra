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
      element: '#checkbox-about-beginner-privacy',
      element_es: '#checkbox-sobre-beginner-privacy',
      element_zh_cn: '#checkbox-关于-beginner-privacy',
      text: 'On every step, there is a checkbox to track your progress.',
      text_es: 'En cada paso, hay una casilla de verificación para rastrear tu progreso.',
      text_zh_cn: '在每一步都有一个复选框来跟踪你的进度。'
    },
    {
      element: '#import-export',
      text: 'You can save your progress by using the Import/Export buttons.',
      text_es: 'Puedes guardar tu progreso utilizando los botones de Importar/Exportar.',
      text_zh_cn: '您可以通过使用导入/导出按钮来保存您的进度。'  
    },
    {
      element: 'a[title="PrivacyAI"]',
      under: true,
      noBtn: true,
      text: 'This is the navigation bar, go to PrivacyAI.',
      text_es: 'Esta es la barra de navegación, ve a PrivacyAI.',
      text_zh_cn: '这是导航栏，前往PrivacyAI。'
    },
    {
      element: '.chat-container',
      text: 'This is PrivacyAI, your privacy adviser.',
      text_es: 'Este es PrivacyAI, tu asesor de privacidad.',
      text_zh_cn: '这是PrivacyAI，您的隐私顾问。'  
    },
  ];
  
  if (window.innerWidth <= 768) {
    steps.splice(4, 0, {
        element: '.hamburger-menu',
        under: true,
        noBtn: true,
        text: 'Click the hamburger menu.',
        text_es: 'Haz clic en el menú de hamburguesa.',
        text_zh_cn: '点击汉堡菜单。'  
    });
    steps.splice(5, 1, {
      element: 'a[href="/privacyai/"]',
      element_es: 'a[href="/es/privacyai/"]',
      element_zh_cn: 'a[href="/zh-cn/privacyai/"]',
      under: true,
      noBtn: true,
      text: 'Navigate to PrivacyAI.',
      text_es: 'Navega a PrivacyAI.',
      text_zh_cn: '导航到PrivacyAI。'  
    });
  }
  
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
  
  const mobileMenuContainer = document.querySelector('.sidebar-container');
  const overlayMobile = document.createElement('div');
  overlayMobile.className = 'overlay-mobile';
  if (mobileMenuContainer) {
    mobileMenuContainer.appendChild(overlayMobile);
  }
  
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
  
      if (target.closest('a[title="PrivacyAI"]')) {
          event.stopPropagation();
          if (currentElement) {currentElement.classList.remove('highlight-tour');}
          currentStep++;
          localStorage.setItem('currentStep', currentStep);
          updateTourContainer(steps[currentStep]);
      }
      if (target.closest('a[href="/privacyai/"]')) {
          event.stopPropagation();
          if (currentElement) {currentElement.classList.remove('highlight-tour');}
          currentStep++;
          localStorage.setItem('currentStep', currentStep);
          updateTourContainer(steps[currentStep]);
      }
      if (target.closest('a[href="/es/privacyai/"]')) {
        event.stopPropagation();
        if (currentElement) {currentElement.classList.remove('highlight-tour');}
        currentStep++;
        localStorage.setItem('currentStep', currentStep);
        updateTourContainer(steps[currentStep]);
      }
      if (target.closest('a[href="/zh-cn/privacyai/"]')) {
        event.stopPropagation();
        if (currentElement) {currentElement.classList.remove('highlight-tour');}
        currentStep++;
        localStorage.setItem('currentStep', currentStep);
        updateTourContainer(steps[currentStep]);
      }
      if (target.closest('.hamburger-menu')) {
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
      if (mobileMenuContainer) {
        overlayMobile.style.display = 'block';
      }
      document.body.style.overflow = 'hidden';
  
      if (window.innerWidth <= 768) {
        if (currentStep === 5) {
          overlay.style.display = 'none';
        }
        else {
          overlay.style.display = 'block';
        }
      }
  
      container.style.left = `${rect.left + window.scrollX}px`;
      if (window.innerWidth <= 768) {
        if (currentStep === 2) {
          container.style.left = `${rect.left + window.scrollX - 400}px`;
        }
        if (currentStep === 4) {
          container.style.left = `${rect.left + window.scrollX - 170}px`;
        }
      }
      if (!step.under) {
        container.style.top = `${rect.top + window.scrollY - 95}px`;
      }
      else {
        container.style.top = `${rect.top + window.scrollY + 50}px`;
        if (window.innerWidth <= 768) {
          if (currentStep === 5) {
            container.style.top = `${rect.top + window.scrollY + 987}px`;
          }
        }
      }
      if (!step.noBtn) {
        if (window.innerWidth <= 768) {
          buttonText = currentStep === 6 ? 'Finish' : 'Next';
        }
        else {
          buttonText = currentStep === 5 ? 'Finish' : 'Next';
        }
        const textToDisplay = isSpanish ? step.text_es : isChinese ? step.text_zh_cn : step.text;
        container.innerHTML = `<p>${textToDisplay}</p><button id="nextBtn">${buttonText}</button>`;
  
        const nextButton = document.getElementById('nextBtn');
        nextButton.onclick = () => {
          if (buttonText === 'Finish') {
              endTour();
              if (isSpanish) {
                window.location.href = '/es';
              }
              else if (isChinese) {
                window.location.href = '/zh-cn';
              }
              else {
                window.location.href = '/';
              }
          } else {
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
          }
        };
      }
      else {
        const textToDisplay = isSpanish ? step.text_es : isChinese ? step.text_zh_cn : step.text;
        container.innerHTML = `<p>${textToDisplay}</p>`;
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
      overlay.style.display = 'none';
      navOverlay.style.display = 'none';
      if (currentStep < steps.length) {
          document.querySelector(steps[currentStep].element).classList.remove('highlight-tour');
      }
      localStorage.removeItem('currentStep');
      localStorage.setItem('isGuidedTour', 'false');
      currentStep = 0;
  }