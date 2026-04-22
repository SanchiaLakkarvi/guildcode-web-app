document.addEventListener('DOMContentLoaded', () => {
  /*  TUTORIAL TAB SWITCHER */
const tabs = document.querySelectorAll('.tutorial-tab');
const topicBadge = document.getElementById('topicBadge');
const topicTitle = document.getElementById('topicTitle');
const topicIntro = document.getElementById('topicIntro');
const topicExplanation = document.getElementById('topicExplanation');
const topicWhy = document.getElementById('topicWhy');
const topicCode = document.getElementById('topicCode');
const topicPoints = document.getElementById('topicPoints');
const topicTakeaway = document.getElementById('topicTakeaway');

const tutorialContent = {
  html: {
    badge: 'HTML',
    badgeClass: 'tech-badge html',
    title: 'HTML gives the page structure',

    intro: `HTML stands for <strong>HyperText Markup Language</strong>. It is the foundation of every webpage and is used to organise content into meaningful parts such as headings, paragraphs, navigation links, lists, forms and sections.`,

    explanation: `Instead of simply placing text anywhere on the screen, HTML tells the browser what each part of the content means. For example, a heading is not the same as a paragraph, and a navigation area is not the same as the main content of the page. This clear structure makes the page easier to read, easier to style with CSS and easier to update with JavaScript.`,

    why: `Good HTML goes beyond basic tags. Semantic elements such as <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code> and <code>&lt;footer&gt;</code> improve accessibility, help screen readers understand the page and make the code more maintainable. This matters because strong structure is the base for everything else in front-end development.`,

    code: `<!-- Header introduces the page -->
<header>
  <h1>GuildCode Portfolio</h1>

  <!-- Navigation helps users move between pages -->
  <nav>
    <a href="index.html">Home</a>
    <a href="quiz.html">Quiz</a>
    <a href="cv.html">CV</a>
  </nav>
</header>

<!-- Main contains the main page content -->
<main>
  <!-- Section groups related content together -->
  <section>
    <h2>About Me</h2>
    <p>I enjoy building practical and user-friendly websites.</p>
  </section>

  <section>
    <h2>Skills</h2>
    <ul>
      <li>HTML for structure</li>
      <li>CSS for visual design</li>
      <li>JavaScript for interaction</li>
    </ul>
  </section>

  <section>
    <h2>Contact</h2>
    <form>
      <label for="email">Email address</label>
      <input type="email" id="email" placeholder="Enter your email">
      <button type="submit">Send</button>
    </form>
  </section>
</main>

<!-- Footer closes the page -->
<footer>
  <p>&copy; 2026 GuildCode</p>
</footer>`,

    points: [
      `<code>&lt;header&gt;</code> introduces the page and usually contains branding or navigation.`,
      `<code>&lt;nav&gt;</code> groups links that help the user move through the website.`,
      `<code>&lt;main&gt;</code> contains the central content of the page.`,
      `<code>&lt;section&gt;</code> divides content into meaningful topic areas.`,
      `The form example shows how HTML can also collect user input, not just display text.`
    ],

    takeaway: `HTML is not only about displaying content. It gives a page meaning and structure, which improves accessibility, readability and future styling.`

  },

  css: {
    badge: 'CSS',
    badgeClass: 'tech-badge css',
    title: 'CSS controls the appearance',

    intro: `CSS stands for <strong>Cascading Style Sheets</strong>. It controls how HTML content looks by styling layout, spacing, colours, typography, borders, shadows and responsive behaviour.`,

    explanation: `Without CSS, a webpage would still show content, but it would look plain and difficult to use. CSS allows developers to create hierarchy, improve readability and make a page feel polished. It helps users immediately understand which content is important and which elements are interactive.`,

    why: `Best-practice CSS is not only about decoration. It improves consistency across the whole website. Reusable classes, spacing systems, hover effects and media queries make a project more professional and easier to maintain. In larger websites, clean CSS is essential because design decisions need to stay consistent from one page to the next.`,

    code: `/* Global page styling */
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #f5f7ff;
  color: #1f2340;
}

/* Main content wrapper */
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
}

/* Card component */
.card {
  background: white;
  border-radius: 18px;
  padding: 1.5rem;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  margin-bottom: 1.5rem;
}

/* Card heading */
.card h2 {
  margin-top: 0;
  color: #5f5af6;
}

/* Button style */
.btn-custom {
  display: inline-block;
  padding: 0.8rem 1.4rem;
  border-radius: 999px;
  background: #6c63ff;
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: 0.3s ease;
}

/* Button hover effect */
.btn-custom:hover {
  background: #564fe0;
  transform: translateY(-2px);
}

/* Responsive changes */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .card {
    padding: 1rem;
  }
}`,

    points: [
      `The <code>body</code> rule sets the global font, text colour and background.`,
      `The <code>.container</code> keeps the layout centred and readable on large screens.`,
      `The <code>.card</code> creates a reusable content block with spacing, rounded corners and shadow.`,
      `The button styles make links look interactive and visually consistent.`,
      `The media query improves the layout on smaller screens, which is important for responsive design.`
    ],

    takeaway: `CSS turns plain structure into a polished interface. It improves readability, consistency and responsiveness across devices.`

  },

  js: {
    badge: 'JavaScript',
    badgeClass: 'tech-badge js',
    title: 'JavaScript makes pages interactive',

    intro: `JavaScript adds behaviour to a website. It can respond to user actions, change page content, validate forms, store settings and load new data without reloading the whole page.`,

    explanation: `This is what makes modern websites feel interactive instead of static. JavaScript can listen for clicks, read user input, update the DOM and change what the user sees immediately. It works together with HTML and CSS by using structure from HTML and updating styled elements already designed with CSS.`,

    why: `JavaScript is especially useful because it makes websites dynamic. Features such as quizzes, live previews, dark mode toggles and AJAX-loaded content all depend on JavaScript logic. In this project, it helps connect the tutorial tabs, quiz behaviour and visual changes in the interactive demo.`,

    code: `// Select elements from the page
const button = document.querySelector('#showMessage');
const message = document.querySelector('#message');
const themeToggle = document.querySelector('#themeToggle');

// Run code when the button is clicked
button.addEventListener('click', () => {
  message.textContent = 'You clicked the button!';
  message.style.color = '#6c63ff';
});

// Save theme choice when the toggle changes
themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    document.body.classList.add('dark-page');
    localStorage.setItem('guildcode-theme', 'dark');
  } else {
    document.body.classList.remove('dark-page');
    localStorage.setItem('guildcode-theme', 'light');
  }
});

// Load the saved theme when the page opens
const savedTheme = localStorage.getItem('guildcode-theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark-page');
  themeToggle.checked = true;
}`,

    points: [
      `<code>querySelector()</code> is used to select elements from the page.`,
      `The click event listener makes the page react when the user presses a button.`,
      `The DOM is updated by changing the text and style of the message element.`,
      `<code>localStorage</code> saves the user’s theme choice so it remains after refresh.`,
      `The final check loads the stored preference when the page opens again.`
    ],

    takeaway: `JavaScript gives a webpage behaviour. It is what allows content, appearance and user experience to change dynamically.`

  }
};

function updateTopic(topic) {
  const data = tutorialContent[topic];
  if (!data) return;

  topicBadge.textContent = data.badge;
  topicBadge.className = data.badgeClass;
  topicTitle.textContent = data.title;
  topicIntro.innerHTML = data.intro;
  topicExplanation.innerHTML = data.explanation;
  topicWhy.innerHTML = data.why;
  topicCode.textContent = data.code;
  topicTakeaway.innerHTML = data.takeaway;

  topicPoints.innerHTML = '';
  data.points.forEach(point => {
    const li = document.createElement('li');
    li.innerHTML = point;
    topicPoints.appendChild(li);
  });

  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.topic === topic);
  });
}

if (
  tabs.length &&
  topicBadge &&
  topicTitle &&
  topicIntro &&
  topicExplanation &&
  topicWhy &&
  topicCode &&
  topicPoints &&
  topicTakeaway
) {
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      updateTopic(tab.dataset.topic);
    });
  });

  updateTopic('html');
}

  /* LIVE PREVIEW CARD */
  const applyButton = document.getElementById('applyChanges');
  const cardTitle = document.getElementById('cardTitle');
  const cardText = document.getElementById('cardText');
  const cardColor = document.getElementById('cardColor');
  const cardBackground = document.getElementById('cardBackground');
  const fontSize = document.getElementById('fontSize');
  const fontSizeValue = document.getElementById('fontSizeValue');
  const fontFamily = document.getElementById('fontFamily');

  const previewCard = document.getElementById('previewCard');
  const previewPill = document.getElementById('previewPill');
  const previewTitle = document.getElementById('previewTitle');
  const previewText = document.getElementById('previewText');

  function updatePreview() {
    if (
      !previewCard ||
      !previewPill ||
      !previewTitle ||
      !previewText ||
      !cardTitle ||
      !cardText ||
      !cardColor ||
      !cardBackground ||
      !fontSize ||
      !fontFamily
    ) {
      return;
    }

    previewTitle.textContent = cardTitle.value || 'My first web card';
    previewText.textContent =
      cardText.value || 'HTML creates the content, CSS styles it, and JavaScript updates it.';

    previewPill.style.background = cardColor.value;
    previewCard.style.background = cardBackground.value;
    previewTitle.style.fontSize = `${fontSize.value}px`;
    previewCard.style.fontFamily = fontFamily.value;

    if (fontSizeValue) {
      fontSizeValue.textContent = `${fontSize.value}px`;
    }
  }

  if (applyButton) {
    applyButton.addEventListener('click', updatePreview);
  }

  if (fontSize && fontSizeValue) {
    fontSize.addEventListener('input', () => {
      fontSizeValue.textContent = `${fontSize.value}px`;
    });
  }

  updatePreview();
});