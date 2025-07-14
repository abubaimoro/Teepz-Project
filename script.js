// Initialize AOS
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  mirror: false,
});

// Mobile Navigation Toggle
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
const body = document.body;

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  navToggle.classList.toggle("active");
  body.style.overflow = navLinks.classList.contains("show") ? "hidden" : "";
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    !navToggle.contains(e.target) &&
    !navLinks.contains(e.target) &&
    navLinks.classList.contains("show")
  ) {
    navToggle.classList.remove("active");
    navLinks.classList.remove("show");
    body.style.overflow = "";
  }
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
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

// Update active nav item on scroll
window.addEventListener("scroll", setActiveNavItem);


// Handle form submission
document.getElementById('community-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      fullName: document.getElementById('name').value,
      phoneNumber: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      role: document.getElementById('role').value,
      agreedToTerms: document.getElementById('terms').checked
    };

    try {
      const res = await fetch('https://teepz-backend.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      alert(result.message);
    } catch (error) {
      alert('Error submitting form. Try again.');
    }
  });