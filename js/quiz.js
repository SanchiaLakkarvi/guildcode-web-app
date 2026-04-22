/* Quiz page logic: AJAX, dynamic rendering, validation, beforeunload, reward API and local storage. */
const PASS_MARK = 70;
const STORAGE_KEY = 'GuildCode-quiz-attempts';

let quizQuestions = [];
let quizStarted = false;
let quizSubmitted = false;

const quizContainer = document.querySelector('#quizContainer');
const quizForm = document.querySelector('#quizForm');
const quizStatus = document.querySelector('#quizStatus');
const quizError = document.querySelector('#quizError');
const resultBox = document.querySelector('#resultBox');
const rewardBox = document.querySelector('#rewardBox');
const historyList = document.querySelector('#historyList');
const reloadQuizButton = document.querySelector('#reloadQuiz');
const clearHistoryButton = document.querySelector('#clearHistory');

/**
 * Shuffle an array using the Fisher-Yates algorithm.
 * @param {Array} array The array to shuffle.
 * @returns {Array} A shuffled copy of the original array.
 */
function shuffleArray(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

/**
 * Fetch quiz questions from the local JSON file.
 */
async function loadQuestions() {
  quizStatus.textContent = 'Loading questions...';
  quizError.classList.add('d-none');
  quizContainer.innerHTML = '';
  rewardBox.classList.add('d-none');
  rewardBox.innerHTML = '';
  quizStarted = false;
  quizSubmitted = false;

  try {
    const response = await fetch('./data/questions.json', { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Question file could not be loaded. Status: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.questions) || data.questions.length < 10) {
      throw new Error('The question file is missing data or has fewer than 10 questions.');
    }

    quizQuestions = shuffleArray(data.questions).slice(0, 10);
    renderQuestions(quizQuestions);
    quizStatus.textContent = `${quizQuestions.length} questions ready`;
  } catch (error) {
    quizStatus.textContent = 'Loading failed';
    quizError.textContent = `${error.message} Run the project using a local server for fetch/AJAX to work properly.`;
    quizError.classList.remove('d-none');
  }
}

/**
 * Render all questions dynamically into the quiz form.
 * @param {Array} questions The questions to display.
 */
function renderQuestions(questions) {
  const fragment = document.createDocumentFragment();

  questions.forEach((question, index) => {
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'question-card';
    fieldset.dataset.questionId = question.id;

    const legend = document.createElement('legend');
    legend.textContent = `${index + 1}. ${question.question}`;
    fieldset.appendChild(legend);

    question.options.forEach((option, optionIndex) => {
      const optionId = `question-${question.id}-option-${optionIndex}`;
      const wrapper = document.createElement('div');
      wrapper.className = 'form-check mt-3';

      const input = document.createElement('input');
      input.className = 'form-check-input';
      input.type = 'radio';
      input.name = `question-${question.id}`;
      input.id = optionId;
      input.value = option;

      const label = document.createElement('label');
      label.className = 'form-check-label';
      label.setAttribute('for', optionId);
      label.textContent = option;

      wrapper.appendChild(input);
      wrapper.appendChild(label);
      fieldset.appendChild(wrapper);
    });

    const helper = document.createElement('p');
    helper.className = 'small text-danger mt-3 mb-0 d-none validation-message';
    helper.textContent = 'Please answer this question before submitting.';
    fieldset.appendChild(helper);

    fragment.appendChild(fieldset);
  });

  quizContainer.appendChild(fragment);
}

/**
 * Find unanswered questions and highlight them.
 * @returns {Array} Array of unanswered fieldsets.
 */
function validateQuiz() {
  const fieldsets = [...quizContainer.querySelectorAll('.question-card')];
  const unanswered = [];

  fieldsets.forEach((fieldset) => {
    const checkedInput = fieldset.querySelector('input[type="radio"]:checked');
    const message = fieldset.querySelector('.validation-message');

    if (!checkedInput) {
      unanswered.push(fieldset);
      fieldset.classList.add('needs-attention');
      message.classList.remove('d-none');
    } else {
      fieldset.classList.remove('needs-attention');
      message.classList.add('d-none');
    }
  });

  return unanswered;
}

/**
 * Calculate the user's score.
 * @returns {{score: number, percentage: number, passed: boolean}}
 */
function calculateScore() {
  let score = 0;

  quizQuestions.forEach((question) => {
    const selectedOption = quizContainer.querySelector(`input[name="question-${question.id}"]:checked`);

    if (selectedOption && selectedOption.value === question.answer) {
      score += 1;
    }
  });

  const percentage = Math.round((score / quizQuestions.length) * 100);
  const passed = percentage >= PASS_MARK;

  return { score, percentage, passed };
}

/**
 * Save the latest attempt to local storage.
 * @param {{score: number, percentage: number, passed: boolean}} result Result data.
 */
function saveAttempt(result) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const attempt = {
      score: result.score,
      percentage: result.percentage,
      passed: result.passed,
      date: new Date().toLocaleString()
    };

    existing.unshift(attempt);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (error) {
    console.error('Local storage is unavailable or corrupted.', error);
  }
}

/**
 * Display saved attempt history.
 */
function renderHistory() {
  historyList.innerHTML = '';

  try {
    const savedAttempts = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (!Array.isArray(savedAttempts) || savedAttempts.length === 0) {
      historyList.innerHTML = '<p class="text-secondary mb-0">No previous attempts yet.</p>';
      return;
    }

    savedAttempts.forEach((attempt) => {
      if (typeof attempt.score !== 'number' || typeof attempt.percentage !== 'number') {
        return;
      }

      const item = document.createElement('div');
      item.className = `history-item ${attempt.passed ? 'pass' : 'fail'}`;
      item.innerHTML = `
        <p class="mb-1 fw-semibold">${attempt.passed ? 'Pass' : 'Fail'} — ${attempt.score}/${quizQuestions.length || 10}</p>
        <p class="mb-1 text-secondary">Percentage: ${attempt.percentage}%</p>
        <p class="mb-0 text-secondary">Date: ${attempt.date}</p>
      `;
      historyList.appendChild(item);
    });
  } catch (error) {
    historyList.innerHTML = '<p class="text-secondary mb-0">Attempt history could not be read.</p>';
  }
}

/**
 * Fetch a reward from a public API if the user passes.
 */
async function fetchReward() {
  rewardBox.classList.remove('d-none');
  rewardBox.innerHTML = '<p class="mb-0">Fetching your reward...</p>';

  try {
    const response = await fetch('https://api.adviceslip.com/advice', { cache: 'no-store' });

    if (!response.ok) {
      throw new Error('Reward API request failed.');
    }

    const data = await response.json();

    if (!data.slip || !data.slip.advice) {
      throw new Error('Reward API returned an unexpected response.');
    }

    rewardBox.innerHTML = `
      <h3 class="h5">🏆 Reward unlocked</h3>
      <p class="mb-0">Inspirational advice for your success: “${data.slip.advice}”</p>
    `;
  } catch (error) {
    rewardBox.innerHTML = '<p class="mb-0">You passed! Reward API could not be loaded right now, but your achievement still counts.</p>';
  }
}

/**
 * Trigger browser warning if the user tries to leave during an unfinished quiz.
 * @param {BeforeUnloadEvent} event Browser event.
 */
function handleBeforeUnload(event) {
  if (quizStarted && !quizSubmitted) {
    event.preventDefault();
    event.returnValue = '';
  }
}

quizForm.addEventListener('change', () => {
  quizStarted = true;
});

quizForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const unanswered = validateQuiz();

  if (unanswered.length > 0) {
    resultBox.innerHTML = `<p class="mb-0 text-danger">Please answer all questions before submitting. ${unanswered.length} question(s) still need attention.</p>`;
    unanswered[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const result = calculateScore();
  quizSubmitted = true;

  resultBox.innerHTML = `
    <h3 class="h5">Quiz completed</h3>
    <p class="mb-2"><strong>Score:</strong> ${result.score}/${quizQuestions.length}</p>
    <p class="mb-2"><strong>Percentage:</strong> ${result.percentage}%</p>
    <p class="mb-0"><strong>Result:</strong> ${result.passed ? 'Pass ✅' : 'Fail ❌'}</p>
  `;

  saveAttempt(result);
  renderHistory();

  if (result.passed) {
    await fetchReward();
  } else {
    rewardBox.classList.add('d-none');
    rewardBox.innerHTML = '';
  }
});

reloadQuizButton.addEventListener('click', () => {
  loadQuestions();
  resultBox.innerHTML = '<p class="text-secondary mb-0">Submit the quiz to see your score, percentage and pass/fail result.</p>';
});

clearHistoryButton.addEventListener('click', () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    renderHistory();
  } catch (error) {
    historyList.innerHTML = '<p class="text-secondary mb-0">History could not be cleared.</p>';
  }
});

window.addEventListener('beforeunload', handleBeforeUnload);
document.addEventListener('DOMContentLoaded', () => {
  loadQuestions();
  renderHistory();
});
