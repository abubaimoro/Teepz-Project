// Navbar toggle for mobile
const toggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
const body = document.body;

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  navLinks.classList.toggle("show");
  body.style.overflow = navLinks.classList.contains("show") ? "hidden" : "";
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    !toggle.contains(e.target) &&
    !navLinks.contains(e.target) &&
    navLinks.classList.contains("show")
  ) {
    toggle.classList.remove("active");
    navLinks.classList.remove("show");
    body.style.overflow = "";
  }
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    toggle.classList.remove("active");
    navLinks.classList.remove("show");
    body.style.overflow = "";
  });
});

// Handle active navigation state
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

function setActiveNavItem() {
  const scrollPosition = window.scrollY + 100; // Offset for fixed header

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navItems.forEach((item) => {
        item.classList.remove("active");
        if (item.getAttribute("href") === `#${sectionId}`) {
          item.classList.add("active");
        }
      });
    }
  });
}

// Smooth scroll for navigation links
navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = item.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const headerOffset = 72; // Same as body padding-top
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      navLinks.classList.remove("show");
    }
  });
});

// Scroll reveal animations
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 150;

    if (elementTop < windowHeight - revealPoint) {
      reveals[i].classList.add("visible");
    }
  }
}

window.addEventListener("scroll", () => {
  revealOnScroll();
  setActiveNavItem();
});
window.addEventListener("load", () => {
  revealOnScroll();
  setActiveNavItem();
});

document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Observe all elements with animation classes
  document
    .querySelectorAll(".slide-in-left, .slide-in-right, .reveal")
    .forEach((el) => {
      observer.observe(el);
    });
});
