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