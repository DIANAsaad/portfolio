// ============================================
// THEME TOGGLE (Light/Dark Mode)
// ============================================

const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

function initializeTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const theme = savedTheme || (prefersDark ? "dark" : "light");
  setTheme(theme);
}

function setTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateThemeIcon(theme);
}

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav-container")) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
});

// ============================================
// GALLERY FILTERING WITH ANIMATION
// ============================================

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    galleryItems.forEach((item, index) => {
      const category = item.getAttribute("data-category");
      // view all item except pen
      if (filterValue === "all") {
        if (category === "pen") {
          item.classList.add("hidden");
        } else {
          item.classList.remove("hidden");
          item.style.animation = "none";
          setTimeout(() => {
            item.style.animation = `fadeInUp 0.6s ease-out ${
              index * 0.05
            }s both`;
          }, 10);
        }
      } else if (category === filterValue) {
        item.classList.remove("hidden");
        item.style.animation = "none";
        setTimeout(() => {
          item.style.animation = `fadeInUp 0.6s ease-out ${index * 0.05}s both`;
        }, 10);
      } else {
        item.classList.add("hidden");
      }
    });
  });
});

// ============================================
// SCROLL ANIMATIONS WITH INTERSECTION OBSERVER
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for scroll animations
document
  .querySelectorAll(
    ".gallery-item, .news-card, .about-content, .studio-image, .section-header"
  )
  .forEach((el) => {
    el.classList.add("scroll-fade-in");
    observer.observe(el);
  });

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================

const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  const scrollPosition = window.scrollY + 100;

  navLinks.forEach((link) => {
    const sectionId = link.getAttribute("href").substring(1);
    const section = document.getElementById(sectionId);

    if (section) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    }
  });
}

window.addEventListener("scroll", updateActiveLink);

// ============================================
// PARALLAX EFFECT ON HERO IMAGE
// ============================================

const heroImage = document.querySelector(".hero-image");

if (heroImage) {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxAmount = scrolled * 0.3;
    heroImage.style.transform = `translateY(${parallaxAmount}px)`;
  });
}

// ============================================
// OPTIMIZE SCROLL LISTENER WITH REQUESTANIMATIONFRAME
// ============================================

let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateActiveLink();
      ticking = false;
    });
    ticking = true;
  }
});

// ============================================
// KEYBOARD ACCESSIBILITY
// ============================================

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
});

// ============================================
// LAZY LOADING IMAGES
// ============================================

if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ============================================
// ENHANCED GALLERY HOVER EFFECTS
// ============================================

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.zIndex = "10";
  });

  item.addEventListener("mouseleave", function () {
    this.style.zIndex = "auto";
  });
});

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");

  // Hide pen items on initial load
  document.querySelectorAll(".gallery-item").forEach((item) => {
    if (item.getAttribute("data-category") === "pen") {
      item.classList.add("hidden");
    }
  });

  // Preload critical images
  const criticalImages = document.querySelectorAll(
    ".hero-img, .about-image img"
  );
  criticalImages.forEach((img) => {
    const preload = new Image();
    preload.src = img.src;
  });
});

// ============================================
// PERFORMANCE MONITORING
// ============================================

if (window.performance && window.performance.timing) {
  window.addEventListener("load", () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(
      "%cPage load time: " + pageLoadTime + "ms",
      "color: #8b4513; font-weight: bold;"
    );
  });
}

// ============================================
// CONSOLE GREETING
// ============================================

console.log(
  "%cWelcome to Diana's Portfolio",
  "font-size: 20px; font-weight: bold; color: #8b4513;"
);
console.log(
  "%cExploring the boundaries of form, color, and meaning",
  "font-size: 12px; color: #d4a574;"
);

// ============================================
// POP UP MESSAGE FORM
// ============================================

function openMessagePopup() {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.classList.add("popup-overlay");

  // Create popup form
  const messageForm = document.createElement("div");
  messageForm.classList.add("message-form");
  messageForm.innerHTML = `
    <button class="close-popup" type="button" aria-label="Close pop-up" title="Close">
      <span>Close</span>
    </button>

    <h3>Leave a Message :)</h3>
    <h4>Your Name (optional)</h4>
    <input type="text" placeholder="Your name..." />
    <h4>Your Message</h4>
    <textarea placeholder="Your message..." required></textarea>
    <button class="submit-message" type="button">Send</button>
  `;

  overlay.appendChild(messageForm);
  document.body.appendChild(overlay);

  // Helpers
  function getCookie(name) {
    const match = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return match ? match.pop() : '';
  }
  const csrftoken = getCookie('csrftoken');

  // Elements
  const closeBtn = messageForm.querySelector(".close-popup");
  const submitBtn = messageForm.querySelector(".submit-message");
  const nameInput = messageForm.querySelector("input[type='text']");
  const messageInput = messageForm.querySelector("textarea");

  // Close handlers
  closeBtn.addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });

  // Submit handler (attached while messageForm is in scope)
  submitBtn.addEventListener("click", async () => {
    const name = (nameInput.value || "").trim();
    const message = (messageInput.value || "").trim();

    if (!message) {
      alert("Please enter a message.");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
      const res = await fetch("/add-message", { // adjust URL as needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken
        },
        body: JSON.stringify({ name, message })
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => null);
        throw new Error(errText || `Server returned ${res.status}`);
      }

      // Success -> close and inform user
      alert("Thanks — your message was sent.");
      overlay.remove();
    } catch (err) {
      console.error("Send failed:", err);
      alert("Sorry — could not send your message. Try again later.");
    } finally {
      if (document.body.contains(overlay)) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send";
      }
    }
  });
}

// Wire up the CTA (keep this simple)
const messageButton = document.querySelector(".cta-button");
if (messageButton) {
  messageButton.addEventListener("click", openMessagePopup);
}