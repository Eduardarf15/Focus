const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

hamburgerBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  hamburgerBtn.classList.toggle("open", isOpen);
  hamburgerBtn.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu" : "Abrir menu",
  );
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    hamburgerBtn.classList.remove("open");
    hamburgerBtn.setAttribute("aria-label", "Abrir menu");
  });
});

const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

revealEls.forEach((el) => revealObserver.observe(el));

const headerEl = document.querySelector("header");

window.addEventListener(
  "scroll",
  () => {
    headerEl.classList.toggle("scrolled", window.scrollY > 20);
  },
  { passive: true },
);

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navItems.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${id}`;
          link.classList.toggle("active", isActive);
          link.style.color = isActive ? "var(--heading)" : "";
        });
      }
    });
  },
  { threshold: 0.4 },
);

sections.forEach((sec) => sectionObserver.observe(sec));

function animateCount(el) {
  const raw = el.textContent.trim();
  const match = raw.match(/[\d]+/);
  if (!match) return;

  const target = parseInt(match[0], 10);
  const prefix = raw.startsWith("+") ? "+" : "";
  const suffix = raw.includes("anos") ? " anos" : "";
  const duration = 1400;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    el.textContent = `${prefix}${current}${suffix}`;

    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = raw;
  }

  requestAnimationFrame(step);
}

const statsSection = document.querySelector(".hero-stats");

if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          statsSection.querySelectorAll("strong").forEach(animateCount);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  statsObserver.observe(statsSection);
}
