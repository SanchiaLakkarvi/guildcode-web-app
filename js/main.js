document.addEventListener('DOMContentLoaded', () => {
  const strengthButton = document.querySelector('#strengthButton');
  const strengthResult = document.querySelector('#strengthResult');
  const themeToggle = document.querySelector('#pageThemeToggle, #themeToggle');

  const cardTitleInput = document.querySelector('#cardTitleInput');
  const cardTextInput = document.querySelector('#cardTextInput');
  const accentColorInput = document.querySelector('#accentColorInput');
  const cardBgInput = document.querySelector('#cardBgInput');
  const updatePreviewButton = document.querySelector('#updatePreviewButton');

  const previewTitle = document.querySelector('#previewTitle');
  const previewText = document.querySelector('#previewText');
  const previewPill = document.querySelector('#previewPill');
  const previewCard = document.querySelector('#previewCard');

  if (strengthButton && strengthResult) {
    const strengths = [
      'I adapt quickly to new tools, tasks and environments.',
      'I communicate confidently with students, staff and stakeholders.',
      'I combine technical thinking with a strong focus on users.',
      'I stay patient when solving problems and debugging issues.',
      'I work well in both team-based and independent roles.'
    ];

    strengthButton.addEventListener('click', () => {
      const randomStrength = strengths[Math.floor(Math.random() * strengths.length)];
      strengthResult.textContent = randomStrength;
    });
  }

  function applySavedTheme() {
    const savedTheme = localStorage.getItem('guildcode-theme');

    if (savedTheme === 'dark') {
      document.body.classList.add('dark-page');
      if (themeToggle) {
        themeToggle.checked = true;
      }
    } else {
      document.body.classList.remove('dark-page');
      if (themeToggle) {
        themeToggle.checked = false;
      }
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('change', () => {
      if (themeToggle.checked) {
        document.body.classList.add('dark-page');
        localStorage.setItem('guildcode-theme', 'dark');
      } else {
        document.body.classList.remove('dark-page');
        localStorage.setItem('guildcode-theme', 'light');
      }
    });
  }

  function updateLivePreview() {
    if (!cardTitleInput || !cardTextInput || !accentColorInput || !cardBgInput) return;
    if (!previewTitle || !previewText || !previewPill || !previewCard) return;

    previewTitle.textContent = cardTitleInput.value.trim() || 'My first web card';
    previewText.textContent =
      cardTextInput.value.trim() ||
      'HTML creates the content, CSS styles it, and JavaScript updates it.';

    const accent = accentColorInput.value || '#6c63ff';
    const bg = cardBgInput.value || '#eef0ff';

    previewPill.style.backgroundColor = accent;
    previewCard.style.backgroundColor = bg;
    previewCard.style.borderColor = accent;
  }

  if (updatePreviewButton) {
    updatePreviewButton.addEventListener('click', updateLivePreview);
  }

  if (cardTitleInput) {
    cardTitleInput.addEventListener('input', updateLivePreview);
  }

  if (cardTextInput) {
    cardTextInput.addEventListener('input', updateLivePreview);
  }

  if (accentColorInput) {
    accentColorInput.addEventListener('input', updateLivePreview);
  }

  if (cardBgInput) {
    cardBgInput.addEventListener('input', updateLivePreview);
  }

  applySavedTheme();
  updateLivePreview();
});