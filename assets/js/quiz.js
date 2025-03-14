function startAssessment(id) {
    const container = document.querySelector(`#${id}`);
    container.querySelector('.tm-start-button').style.display = 'none';
    container.querySelector('.tm-questions-container').style.display = 'block';
    showQuestion(id, 0);
  }
  
  let currentScores = {};
  
  function showQuestion(id, index) {
    const container = document.querySelector(`#${id}`);
    container.querySelectorAll('.tm-question').forEach(q => {
      q.classList.remove('active');
    });
    container.querySelector(`.tm-question[data-index="${index}"]`).classList.add('active');
  }
  
  function previousQuestion(id) {
    const currentIndex = parseInt(document.querySelector(`#${id} .tm-question.active`).dataset.index);
    showQuestion(id, Math.max(0, currentIndex - 1));
  }
  
  document.querySelectorAll('.tm-option').forEach(button => {
    button.addEventListener('click', function() {
      const assessmentId = this.closest('.threat-model-assessment').id;
      const currentIndex = parseInt(this.closest('.tm-question').dataset.index);
      const totalQuestions = document.querySelectorAll(`#${assessmentId} .tm-question`).length;
      
      currentScores[assessmentId] = (currentScores[assessmentId] || 0) + parseInt(this.dataset.score);
      
      if(currentIndex < totalQuestions - 1) {
        showQuestion(assessmentId, currentIndex + 1);
      } else {
        showResult(assessmentId);
      }
    });
  });
  
  function showResult(id) {
    const container = document.querySelector(`#${id}`);
    const totalScore = currentScores[id] || 0;
    let resultText = '';
    
    if(totalScore <= 5) {
      resultText = resultTexts.casual;
    } else if(totalScore <= 10) {
      resultText = resultTexts.privacyConscious;
    } else {
      resultText = resultTexts.advanced;
    }
    
    container.querySelector('.tm-result-content').textContent = resultText;
    container.querySelector('.tm-result').style.display = 'block';
    container.querySelectorAll('.tm-question').forEach(q => {
      q.style.display = 'none';
    });
  }
  
  function restartAssessment(id) {
    const container = document.querySelector(`#${id}`);
    currentScores[id] = 0;
    container.querySelector('.tm-result').style.display = 'none';
    container.querySelectorAll('.tm-question').forEach(q => {
      q.style.cssText = '';
    });
    container.querySelector('.tm-questions-container').style.display = 'block';
    showQuestion(id, 0);
  }