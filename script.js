const I18N = {
  en: {
    status: "Open to work",
    menuHome: "Home",
    menuAbout: "About",
    menuProjects: "Projects",
    menuContact: "How to reach me",
    contactTitle: "How to reach me",
    contactTg: "Telegram",
    contactGh: "GitHub",
    contactEmail: "Email",
    introLabel: "Python Developer — Portfolio 2026",
    introSub:
      "I build Telegram bots for different niches, web parsers, and AI assistants powered by APIs. I automate routine tasks and turn ideas into working products.",
    aboutTitle: "About me",
    aboutP1: "Hello! My name is Peter Obod.",
    aboutP2:
      "I am a Python developer from Ukraine. My dream is to become an AI engineer.",
    aboutP3:
      "I build simple and useful software that helps people, and I work on improving my skills every day.",
    aboutDoTitle: "What I do",
    aboutDo1: "Write code in Python",
    aboutDo2: "Build web applications",
    aboutDo3: "Work on automation projects",
    aboutDo4: "Study artificial intelligence",
    aboutResTitle: "My resources",
    aboutFooter:
      "Follow me to stay updated on my projects. Thank you for your support!",
    projectsTitle: "My GitHub Projects",
    noDesc: "No description provided.",
    openIn: "Open in GitHub",
  },
  ru: {
    status: "Открыт к предложениям",
    menuHome: "Главная",
    menuAbout: "Обо мне",
    menuProjects: "Проекты",
    menuContact: "Как со мной связаться",
    contactTitle: "Как со мной связаться",
    contactTg: "Телеграм",
    contactGh: "GitHub",
    contactEmail: "Почта",
    introLabel: "Python-разработчик — Портфолио 2026",
    introSub:
      "Я создаю Telegram-ботов для разных ниш, парсеры и AI-ассистентов на основе API. Автоматизирую рутину и превращаю идеи в рабочие продукты.",
    aboutTitle: "Обо мне",
    aboutP1: "Привет! Меня зовут Пётр Обод.",
    aboutP2:
      "Я Python-разработчик из Украины. Моя мечта — стать AI-инженером.",
    aboutP3:
      "Я создаю простой и полезный софт, который помогает людям, и каждый день улучшаю свои навыки.",
    aboutDoTitle: "Чем я занимаюсь",
    aboutDo1: "Пишу код на Python",
    aboutDo2: "Создаю веб-приложения",
    aboutDo3: "Работаю над проектами по автоматизации",
    aboutDo4: "Изучаю искусственный интеллект",
    aboutResTitle: "Мои контакты",
    aboutFooter:
      "Подписывайтесь, чтобы следить за моими проектами. Спасибо за поддержку!",
    projectsTitle: "Мои проекты на GitHub",
    noDesc: "Описание не указано.",
    openIn: "Открыть в GitHub",
  },
};

const projects = [
  {
    name: "telegramm-ai-assistant",
    url: "https://github.com/yavkhr/telegramm-ai-assistant",
    desc: "A smart Telegram bot that talks, listens and reads text from images. Built with Python and DeepSeek.",
    descRu:
      "Умный Telegram-бот, который говорит, слушает и читает текст с изображений. Python + DeepSeek.",
    lang: "Python",
    stars: 0,
    forks: 0,
  },
  {
    name: "resume-creator",
    url: "https://github.com/yavkhr/resume-creator",
    desc: "Resume builder with interview",
    descRu: "Резюме-создатель с интервью",
    lang: "Python",
    stars: 0,
    forks: 0,
  },
];

const scroller = document.querySelector(".scroller");
const progressFill = document.querySelector(".progress-fill");
const sectionLabel = document.querySelector(".section-label");
const sectionMenu = document.querySelector(".section-menu");
const pages = Array.from(document.querySelectorAll(".scroller > section"));
const starsEl = document.querySelector(".stars");

let currentPage = 0;
let currentLang = "en";

/* ---------- Loader ---------- */
const loader = document.querySelector(".loader");
const pctEl = loader.querySelector(".pct");
let loaded = 0;
const loadTimer = setInterval(() => {
  loaded += Math.floor(Math.random() * 18) + 6;
  if (loaded >= 100) {
    loaded = 100;
    clearInterval(loadTimer);
    setTimeout(() => loader.classList.add("done"), 150);
  }
  pctEl.textContent = loaded + "%";
}, 160);

/* ---------- Stars ---------- */
for (let i = 0; i < 140; i++) {
  const star = document.createElement("span");
  star.className = "star";
  if (i % 11 === 0) star.classList.add("blue");
  if (i % 5 === 0) star.classList.add("slow");
  const size = Math.random() * 2.4 + 1;
  star.style.width = size + "px";
  star.style.height = size + "px";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.setProperty("--dur", (Math.random() * 4 + 2).toFixed(2) + "s");
  star.style.setProperty("--delay", (Math.random() * 5).toFixed(2) + "s");
  starsEl.appendChild(star);
}

/* ---------- Language ---------- */
const starIcon =
  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>';

const forkIcon =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="6" cy="5" r="2"></circle><circle cx="18" cy="5" r="2"></circle><circle cx="12" cy="19" r="2"></circle><path d="M6 7v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M12 11v6"></path></svg>';

function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = "";
  projects.forEach((p) => {
    const desc = currentLang === "ru" ? p.descRu : p.desc;
    const card = document.createElement("a");
    card.className = "project-card";
    card.href = p.url;
    card.target = "_blank";
    card.rel = "noopener";
    card.innerHTML =
      '<div class="project-top"><span class="project-name">' +
      p.name +
      '</span><span class="project-star">' +
      starIcon +
      "</span></div>" +
      '<p class="project-desc">' +
      (desc || I18N[currentLang].noDesc) +
      "</p>" +
      '<div class="project-meta"><span class="project-lang"><span class="dot"></span>' +
      p.lang +
      '</span><div class="project-stats"><span>' +
      starIcon.replace('fill="currentColor"', 'fill="none" stroke="currentColor" stroke-width="1.5"') +
      " " + p.stars + "</span><span>" +
      forkIcon +
      " " + p.forks + "</span></div></div>";
    grid.appendChild(card);
  });
}

function applyLang() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (I18N[currentLang][key]) {
      el.textContent = I18N[currentLang][key];
    }
  });
  document.documentElement.lang = currentLang;
  renderProjects();
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentLang = btn.dataset.lang;
    document.querySelectorAll(".lang-btn").forEach((b) => b.classList.toggle("active", b === btn));
    applyLang();
  });
});

/* ---------- Page navigation ---------- */
function goTo(index) {
  currentPage = Math.max(0, Math.min(pages.length - 1, index));
  pages.forEach((p, i) => p.classList.toggle("active", i === currentPage));
  progressFill.style.height = ((currentPage + 1) / pages.length) * 100 + "%";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown" || e.key === "ArrowRight") {
    e.preventDefault();
    goTo(currentPage + 1);
  } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
    e.preventDefault();
    goTo(currentPage - 1);
  }
});

/* ---------- Section menu ---------- */
sectionLabel.addEventListener("click", (e) => {
  e.stopPropagation();
  const open = sectionMenu.hidden;
  sectionMenu.hidden = !open;
  sectionLabel.querySelector(".chev").classList.toggle("open", open);
});

document.addEventListener("click", (e) => {
  if (!sectionMenu.hidden && !sectionMenu.contains(e.target) && e.target !== sectionLabel) {
    sectionMenu.hidden = true;
    sectionLabel.querySelector(".chev").classList.remove("open");
  }
});

sectionMenu.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-target]");
  if (!btn) return;
  const idx = pages.findIndex((p) => p.id === btn.dataset.target);
  if (idx >= 0) goTo(idx);
  sectionMenu.hidden = true;
  sectionLabel.querySelector(".chev").classList.remove("open");
});

applyLang();
goTo(0);
