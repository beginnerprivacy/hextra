document.querySelectorAll('.hextra-tabs-toggle').forEach(function (button) {
  button.addEventListener('click', function (e) {
    // set parent tabs to unselected
    const tabs = Array.from(e.target.parentElement.querySelectorAll('.hextra-tabs-toggle'));
    tabs.map(tab => tab.dataset.state = '');

    // set current tab to selected
    e.target.dataset.state = 'selected';

    // set all panels to unselected
    const panelsContainer = e.target.parentElement.parentElement.nextElementSibling;
    Array.from(panelsContainer.children).forEach(function (panel) {
      panel.dataset.state = '';
    });

    const panelId = e.target.getAttribute('aria-controls');
    const panel = panelsContainer.querySelector(`#${panelId}`);
    panel.dataset.state = 'selected';
  });
});

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

let score = 0;
let currentQuestionIndex = 0;

function takeQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    document.getElementById('quizModal').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const quizResult = document.getElementById('quizResult');
    quizResult.style.display = 'none';
    const questions = document.querySelectorAll('.question');
    questions.forEach(question => question.style.display = 'none');
    const basicMessage = document.getElementById('basic');
    const mediumMessage = document.getElementById('medium');
    const advancedMessage = document.getElementById('advanced');
    basicMessage.style.display = 'none';
    mediumMessage.style.display = 'none';
    advancedMessage.style.display = 'none';
    
    const quizButtons = document.querySelectorAll('.yes-no-button');
    
    if (currentQuestionIndex === 2 || currentQuestionIndex === 3) {
        quizButtons.forEach(button => button.style.display = 'none');
    } else {
        quizButtons.forEach(button => button.style.display = 'inline');
    }

    if (currentQuestionIndex < questions.length) {
        questions[currentQuestionIndex].style.display = 'block';
    } else {
        determineRoadmap();
    }
}

function answerQuestion(answer) {
    if (answer === 'yes') {
        score += 1;
    }
    if (currentQuestionIndex === 2 || currentQuestionIndex === 3) {
        score += answer;
    }
    currentQuestionIndex++;
    showQuestion();
}

function determineRoadmap() {
    let roadmapMessage;
    if (score <= 2) {
        roadmapMessage = document.getElementById('basic');
    } else if (score <= 4) {
        roadmapMessage = document.getElementById('medium');
    } else {
        roadmapMessage = document.getElementById('advanced');
    }
    roadmapMessage.style.display = 'block';
    
    const questions = document.querySelectorAll('.question');
    questions.forEach(question => question.style.display = 'none');
    
    const quizButtons = document.querySelectorAll('.yes-no-button');
    quizButtons.forEach(button => button.style.display = 'none');

    const quizResult = document.getElementById('quizResult');
    quizResult.style.display = 'block';
}

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