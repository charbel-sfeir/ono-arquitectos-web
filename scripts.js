const hero = document.querySelector("[data-slider]");
const dotsContainer = document.querySelector(".slider-dots");
const progress = document.querySelector(".scroll-progress");
const navLinks = document.querySelectorAll(".nav-links a");
const revealElements = document.querySelectorAll(".reveal");

const images = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=80"
];

let currentImage = 0;
let sliderTimer;

function setHeroImage(index) {
  currentImage = index;

  hero.style.backgroundImage = `
    linear-gradient(rgba(17, 17, 17, 0.28), rgba(17, 17, 17, 0.88)),
    url("${images[currentImage]}")
  `;

  document.querySelectorAll(".slider-dots button").forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === currentImage);
  });
}

function nextHeroImage() {
  const nextIndex = (currentImage + 1) % images.length;
  setHeroImage(nextIndex);
}

function createDots() {
  images.forEach((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `Ver imagen ${index + 1}`);

    button.addEventListener("click", () => {
      clearInterval(sliderTimer);
      setHeroImage(index);
      sliderTimer = setInterval(nextHeroImage, 4500);
    });

    dotsContainer.appendChild(button);
  });
}

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

  progress.style.width = `${percent}%`;
}

function updateActiveNav() {
  let currentSection = "";

  document.querySelectorAll("section[id]").forEach((section) => {
    const sectionTop = section.offsetTop - 140;

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.16
});

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

createDots();
setHeroImage(0);
sliderTimer = setInterval(nextHeroImage, 4500);

window.addEventListener("scroll", () => {
  updateScrollProgress();
  updateActiveNav();
});

updateScrollProgress();
updateActiveNav();
// STUDIO REEL
const studioReel = document.querySelector("[data-studio-reel]");

if (studioReel) {
  const studioStage = studioReel.querySelector(".studio-reel-stage");
  const studioImage = studioReel.querySelector("[data-studio-image]");
  const studioKicker = studioReel.querySelector("[data-studio-kicker]");
  const studioTitle = studioReel.querySelector("[data-studio-title]");
  const studioText = studioReel.querySelector("[data-studio-text]");
  const studioProgress = studioReel.querySelector("[data-studio-progress]");
  const studioButtons = studioReel.querySelectorAll("[data-studio-index]");

  const studioItems = [
    {
      kicker: "Ejecución de obra",
      title: "Del plano a la construcción real",
      text: "Seguimiento técnico para que cada decisión del proyecto llegue a obra con precisión y criterio.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1300&q=80"
    },
    {
      kicker: "Desarrollo residencial",
      title: "Viviendas y dúplex con identidad",
      text: "Diseño espacial, volumetría y documentación para desarrollos habitacionales claros y funcionales.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1300&q=80"
    },
    {
      kicker: "Remodelación integral",
      title: "Transformar lo existente sin perder potencial",
      text: "Lectura del espacio actual, mejoras funcionales y una propuesta visual coherente con nuevas formas de habitar.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1300&q=80"
    },
    {
      kicker: "Espacios comerciales",
      title: "Arquitectura pensada para operar mejor",
      text: "Locales, oficinas y espacios de trabajo con una experiencia clara para usuarios, equipos y clientes.",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1300&q=80"
    }
  ];

  let studioIndex = 0;
  let studioTimer;

  function restartStudioProgress() {
    studioProgress.classList.remove("running");
    void studioProgress.offsetWidth;
    studioProgress.classList.add("running");
  }

  function setStudioItem(index) {
    studioIndex = index;
    const item = studioItems[studioIndex];

    studioStage.classList.add("is-changing");
    studioImage.style.setProperty("--studio-image", `url("${item.image}")`);
    studioKicker.textContent = item.kicker;
    studioTitle.textContent = item.title;
    studioText.textContent = item.text;

    studioButtons.forEach((button, buttonIndex) => {
      button.classList.toggle("active", buttonIndex === studioIndex);
    });

    restartStudioProgress();
    window.setTimeout(() => studioStage.classList.remove("is-changing"), 420);
  }

  function nextStudioItem() {
    setStudioItem((studioIndex + 1) % studioItems.length);
  }

  studioButtons.forEach((button) => {
    button.addEventListener("click", () => {
      window.clearInterval(studioTimer);
      setStudioItem(Number(button.dataset.studioIndex));
      studioTimer = window.setInterval(nextStudioItem, 5000);
    });
  });

  setStudioItem(0);
  studioTimer = window.setInterval(nextStudioItem, 5000);
}