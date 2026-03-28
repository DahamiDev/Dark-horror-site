// Custom Cursor
const cursor = document.querySelector(".custom-cursor");
const cursorDot = document.querySelector(".cursor-dot");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  cursorDot.style.left = e.clientX - 3 + "px";
  cursorDot.style.top = e.clientY - 3 + "px";
});

// Spotlight Effect
const spotlight = document.querySelector(".spotlight");
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  spotlight.style.setProperty("--x", x + "%");
  spotlight.style.setProperty("--y", y + "%");
});

// Parallax Effect
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxBg = document.querySelector(".parallax-bg");
  if (parallaxBg)
    parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;

  const storyPanels = document.querySelectorAll(".story-panel");
  storyPanels.forEach((panel, index) => {
    const rect = panel.getBoundingClientRect();
    if (rect.top < window.innerHeight) panel.classList.add("visible");
    const image = panel.querySelector(".story-image");
    if (image) {
      const speed = index % 2 === 0 ? 0.3 : -0.3;
      image.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
    }
  });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Comic Cards Animation
const observerOptions = { threshold: 0.2, rootMargin: "0px 0px -100px 0px" };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.animation = "fadeInUp 0.8s ease forwards";
      }, index * 100);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);
document.querySelectorAll(".comic-card").forEach((card) => {
  card.style.opacity = "0";
  observer.observe(card);
});

// Hover effects on buttons/cards
document.querySelectorAll(".cta-button, .comic-card").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "scale(2)";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(1)";
  });
});

// Random flicker effect for title
setInterval(() => {
  const title = document.querySelector(".hero-title");
  if (Math.random() > 0.95) {
    title.style.opacity = "0.7";
    setTimeout(() => {
      title.style.opacity = "1";
    }, 50);
  }
}, 2000);

// Mobile menu toggle for 360px
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("open");
  });
}

// Hide menu when nav link clicked (mobile)
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (nav.classList.contains("open")) {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

// Comic card images
const comicImageUrls = [
  "g1.jpg",
  "g2.jpg",
  "g4.jpg",
  "g5.jpg",
  "g6.jpg",
  "g7.jpg",
];
document.querySelectorAll(".comic-image").forEach((el, index) => {
  el.innerHTML = `<img src="${comicImageUrls[index] || comicImageUrls[0]}" alt="Comic panel ${index + 1}" />`;
});

// Story panel images
const storyImageUrls = [
  "gg3.jpg",
  "24309a7440e8aa6c9ca08369f52e9128.jpg",
  "hanyu.jpg",
];
document.querySelectorAll(".story-image").forEach((el, index) => {
  el.innerHTML = `<img src="${storyImageUrls[index] || storyImageUrls[0]}" alt="Story scene ${index + 1}" />`;
});
