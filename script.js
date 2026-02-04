// ==========================================
// MODERN PORTFOLIO - JAVASCRIPT
// Developer: Pranaya Kumar Dash
// ==========================================

// ==========================================
// DOM ELEMENTS
// ==========================================
const preloader = document.getElementById("preloader");
const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
const mobileMenuClose = document.getElementById("mobileMenuClose");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
const navLinks = document.querySelectorAll(".nav-link");
const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");
const themeToggle = document.getElementById("themeToggle");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

// ==========================================
// PRELOADER
// ==========================================
window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.classList.add("hidden");
    document.body.style.overflow = "auto";

    // Initialize AOS after preloader
    AOS.init({
      duration: 600, // Reduced from 800ms for snappier feel
      easing: "ease-out",
      once: true,
      offset: 80, // Reduced from 100 for earlier trigger
      disable: "mobile", // Disable on mobile for better performance
    });
  }, 300); // Reduced from 1500ms - much faster loading!
});

// ==========================================
// SCROLL PROGRESS BAR
// ==========================================
function updateScrollProgress() {
  const windowHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  scrollProgress.style.width = scrolled + "%";
}

window.addEventListener("scroll", updateScrollProgress);

// ==========================================
// NAVBAR SCROLL BEHAVIOR
// ==========================================
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
function openMobileMenu() {
  mobileMenuOverlay.classList.add("active");
  menuToggle.classList.add("active");
  document.body.style.overflow = "hidden";
  mobileMenuOverlay.setAttribute("aria-hidden", "false");
}

function closeMobileMenu() {
  mobileMenuOverlay.classList.remove("active");
  menuToggle.classList.remove("active");
  document.body.style.overflow = "auto";
  mobileMenuOverlay.setAttribute("aria-hidden", "true");
}

menuToggle.addEventListener("click", () => {
  if (mobileMenuOverlay.classList.contains("active")) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

mobileMenuClose.addEventListener("click", closeMobileMenu);

// Close mobile menu when clicking on overlay
mobileMenuOverlay.addEventListener("click", (e) => {
  if (e.target === mobileMenuOverlay) {
    closeMobileMenu();
  }
});

// Close mobile menu when clicking on a link
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileMenu();
  });
});

// ==========================================
// SMOOTH SCROLL & ACTIVE NAVIGATION
// ==========================================
function setActiveNav() {
  const sections = document.querySelectorAll(".section, .hero-section");
  const navHeight = navbar.offsetHeight;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - navHeight - 100;
    const sectionBottom = sectionTop + section.offsetHeight;
    const scrollPos = window.scrollY;

    if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
      const currentId = section.getAttribute("id");

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", setActiveNav);

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");

    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navHeight = navbar.offsetHeight;
      const targetPosition = targetElement.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ==========================================
// THEME TOGGLE
// ==========================================
const currentTheme = localStorage.getItem("theme") || "dark";

if (currentTheme === "light") {
  document.body.classList.add("light-theme");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  const theme = document.body.classList.contains("light-theme")
    ? "light"
    : "dark";
  localStorage.setItem("theme", theme);
});

// ==========================================
// TYPING EFFECT
// ==========================================
const typedTextElement = document.getElementById("typedText");
const roles = [
  "Python Full Stack Developer",
  "Django Backend Developer",
  "React Frontend Developer",
  "AI Enthusiast",
  "Problem Solver",
  "Prompt Engineer",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeRole() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = 50;
  } else {
    typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 100;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    typingDelay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingDelay = 500;
  }

  setTimeout(typeRole, typingDelay);
}

// Start typing effect after preloader
window.addEventListener("load", () => {
  setTimeout(typeRole, 800);
});

// ==========================================
// COUNTER ANIMATION
// ==========================================
function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-count"));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + "+";
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Observe stat numbers for animation
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

document.querySelectorAll(".stat-number").forEach((stat) => {
  statObserver.observe(stat);
});

// ==========================================
// TABS FUNCTIONALITY
// ==========================================
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetTab = button.getAttribute("data-tab");

    // Remove active class from all buttons and contents
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    // Add active class to clicked button and corresponding content
    button.classList.add("active");
    document.getElementById(targetTab).classList.add("active");
  });
});

// ==========================================
// PORTFOLIO FILTER
// ==========================================
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    // Update active button
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Filter portfolio cards
    portfolioCards.forEach((card) => {
      const categories = card.getAttribute("data-category").split(" ");

      if (filter === "all" || categories.includes(filter)) {
        card.classList.remove("hidden");
        // Add animation
        card.style.animation = "fadeInUp 0.5s ease";
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// ==========================================
// RESUME VIEWER CONTROLS
// ==========================================
const downloadResumeBtn = document.getElementById("downloadResumeBtn");
const fullscreenResumeBtn = document.getElementById("fullscreenResumeBtn");
const resumeViewer = document.getElementById("resumeViewer");

if (downloadResumeBtn) {
  downloadResumeBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = "./images/PranayaDash_PythonDeveloper_Resume.pdf";
    link.download = "Pranaya_Kumar_Dash_Resume.pdf";
    link.click();
  });
}

if (fullscreenResumeBtn) {
  fullscreenResumeBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      resumeViewer.requestFullscreen().catch((err) => {
        console.log("Fullscreen error:", err);
      });
      fullscreenResumeBtn.innerHTML =
        '<i class="fas fa-compress"></i><span>Exit Fullscreen</span>';
    } else {
      document.exitFullscreen();
      fullscreenResumeBtn.innerHTML =
        '<i class="fas fa-expand"></i><span>Fullscreen</span>';
    }
  });
}

// Update fullscreen button on fullscreen change
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement && fullscreenResumeBtn) {
    fullscreenResumeBtn.innerHTML =
      '<i class="fas fa-expand"></i><span>Fullscreen</span>';
  }
});

// ==========================================
// CONTACT FORM HANDLING (EmailJS Integration)
// ==========================================
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const formData = new FormData(contactForm);

    // Show loading state
    submitBtn.classList.add("loading");
    formStatus.style.display = "none";

    try {
      // Using FormSpree
      const response = await fetch("https://formspree.io/f/maqoljny", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // Success
        formStatus.className = "form-status success";
        formStatus.textContent =
          "✓ Message sent successfully! I'll get back to you soon.";
        formStatus.style.display = "block";
        contactForm.reset();

        // Alternative: Using EmailJS (uncomment and add your credentials)
        /*
                emailjs.send(
                    'YOUR_SERVICE_ID',
                    'YOUR_TEMPLATE_ID',
                    {
                        from_name: formData.get('name'),
                        from_email: formData.get('email'),
                        subject: formData.get('subject'),
                        message: formData.get('message')
                    }
                ).then(() => {
                    formStatus.className = 'form-status success';
                    formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                    formStatus.style.display = 'block';
                    contactForm.reset();
                }).catch((error) => {
                    throw error;
                });
                */
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      // Error
      formStatus.className = "form-status error";
      formStatus.textContent =
        "✗ Oops! Something went wrong. Please try again or email me directly.";
      formStatus.style.display = "block";
      console.error("Form submission error:", error);
    } finally {
      // Remove loading state
      submitBtn.classList.remove("loading");

      // Hide status message after 5 seconds
      setTimeout(() => {
        formStatus.style.display = "none";
      }, 5000);
    }
  });
}

// ==========================================
// FLOATING ANIMATIONS
// ==========================================
function createFloatingParticles() {
  // Skip on mobile devices for better performance
  if (navigator.hardwareConcurrency <= 4) return;

  if (window.innerWidth < 768) return;

  const sections = document.querySelectorAll(".section");

  sections.forEach((section) => {
    // Skip if section already has particles
    if (section.querySelector(".floating-particles")) return;

    const particlesContainer = document.createElement("div");
    particlesContainer.className = "floating-particles";
    particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            z-index: 0;
        `;

    // Create random particles (reduced to 3 for better performance)
    for (let i = 0; i < 3; i++) {
      const particle = document.createElement("div");
      const size = Math.random() * 4 + 2;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 5;

      particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(34, 211, 238, 0.3);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: floatParticle ${duration}s ${delay}s ease-in-out infinite;
            `;

      particlesContainer.appendChild(particle);
    }

    section.style.position = "relative";
    section.insertBefore(particlesContainer, section.firstChild);
  });
}

// Add particle float animation to stylesheet
const style = document.createElement("style");
style.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.3;
        }
        25% {
            transform: translate(50px, -50px) rotate(90deg);
            opacity: 0.6;
        }
        50% {
            transform: translate(100px, 0) rotate(180deg);
            opacity: 0.3;
        }
        75% {
            transform: translate(50px, 50px) rotate(270deg);
            opacity: 0.6;
        }
    }
`;
document.head.appendChild(style);

// Initialize particles after page load
setTimeout(createFloatingParticles, 2000);

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================
const animateOnScroll = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
);

// Observe elements for scroll animations
document
  .querySelectorAll(".service-card, .portfolio-card, .skill-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    animateOnScroll.observe(el);
  });

// ==========================================
// CURSOR TRAIL EFFECT (Optional - DISABLED for performance)
// ==========================================
// Uncomment below if you want cursor trail on desktop
/*
if (window.innerWidth > 768) {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll('.cursor-circle');

    if (circles.length === 0) {
        // Create cursor circles if they don't exist
        for (let i = 0; i < 20; i++) {
            const circle = document.createElement('div');
            circle.className = 'cursor-circle';
            circle.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: rgba(34, 211, 238, 0.3);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: 0.1s;
            `;
            document.body.appendChild(circle);
        }
    }

    const cursorCircles = document.querySelectorAll('.cursor-circle');

    cursorCircles.forEach((circle, index) => {
        circle.x = 0;
        circle.y = 0;
    });

    window.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCursor() {
        let x = coords.x;
        let y = coords.y;

        cursorCircles.forEach((circle, index) => {
            circle.style.left = x - 5 + 'px';
            circle.style.top = y - 5 + 'px';
            circle.style.transform = `scale(${(cursorCircles.length - index) / cursorCircles.length})`;

            circle.x = x;
            circle.y = y;

            const nextCircle = cursorCircles[index + 1] || cursorCircles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        });

        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}
*/

// ==========================================
// LAZY LOADING IMAGES
// ==========================================
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
      }
      imageObserver.unobserve(img);
    }
  });
});

document.querySelectorAll("img[data-src]").forEach((img) => {
  imageObserver.observe(img);
});

// ==========================================
// CONSOLE MESSAGE
// ==========================================
console.log(
  "%c👨‍💻 Pranaya Kumar Dash",
  "color: #22D3EE; font-size: 24px; font-weight: bold;",
);
console.log(
  "%c🚀 Python Full Stack Developer",
  "color: #01c16a; font-size: 16px;",
);
console.log("%c📧 dashpranaya28@gmail.com", "color: #94A3B8; font-size: 14px;");
console.log(
  "%c🔗 linkedin.com/in/pranayakd28",
  "color: #94A3B8; font-size: 14px;",
);

// ==========================================
// PERFORMANCE MONITORING
// ==========================================
if ("PerformanceObserver" in window) {
  const perfObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
      if (entry.entryType === "largest-contentful-paint") {
        console.log("LCP:", entry.renderTime || entry.loadTime);
      }
    });
  });

  perfObserver.observe({ entryTypes: ["largest-contentful-paint"] });
}

// ==========================================
// PREVENT RIGHT CLICK ON IMAGES (Optional)
// ==========================================
// Uncomment if you want to protect images
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
});
*/

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================
document.addEventListener("keydown", (e) => {
  // Press 'T' to toggle theme
  if (e.key === "t" || e.key === "T") {
    if (!e.target.matches("input, textarea")) {
      themeToggle.click();
    }
  }

  // Press 'Escape' to close mobile menu
  if (e.key === "Escape") {
    closeMobileMenu();
  }
});

// ==========================================
// VIEWPORT HEIGHT FIX FOR MOBILE
// ==========================================
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

setViewportHeight();
window.addEventListener("resize", setViewportHeight);

// ==========================================
// SERVICE WORKER REGISTRATION (Optional - for PWA)
// ==========================================
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('ServiceWorker registered:', registration);
            })
            .catch((error) => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}
*/

function onScroll() {
  updateScrollProgress();
  setActiveNav();

  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  backToTop.classList.toggle("visible", window.scrollY > 500);
}

window.addEventListener("scroll", onScroll, { passive: true });

// ==========================================
// CAR RENTAL PROJECT MODAL - ADD TO SCRIPT.JS
// ==========================================

// Add this to your existing portfolio preview functionality
// If you already have a modal system, integrate this into it

// Portfolio Project Details
const projectDetails = {
  shoppermart: {
    title: "ShopperMart E-Commerce Platform",
    description:
      "A full-featured e-commerce platform built with Django, featuring user authentication, product management, shopping cart, payment integration, and an admin dashboard for inventory management.",
    features: [
      "User registration and authentication with email verification",
      "Advanced product search and filtering",
      "Shopping cart with real-time updates",
      "Secure payment gateway integration",
      "Admin dashboard for product and order management",
      "Responsive design for mobile and desktop",
    ],
    techStack: [
      "Django",
      "Python",
      "PostgreSQL",
      "Bootstrap",
      "JavaScript",
      "Stripe API",
    ],
    github: "https://github.com/PranayaKD/ShopperMart",
    live: "https://shoppermart-hear.onrender.com",
  },
  taskmaster: {
    title: "TaskMaster - Project Management Tool",
    description:
      "A collaborative task management application with team collaboration features, real-time notifications, and project tracking capabilities.",
    features: [
      "User authentication and team management",
      "Create and assign tasks with priorities",
      "Real-time notifications for task updates",
      "Project timeline and progress tracking",
      "File attachments and comments on tasks",
      "RESTful API for mobile integration",
    ],
    techStack: [
      "Django REST Framework",
      "Python",
      "PostgreSQL",
      "Bootstrap",
      "AJAX",
    ],
    github: "https://github.com/PranayaKD/TaskMaster",
    live: "#",
  },
  segmentation: {
    title: "Customer Segmentation & Analysis",
    description:
      "Data analysis project focused on customer segmentation and product profitability analysis using machine learning techniques and data visualization.",
    features: [
      "Customer behavior analysis and segmentation",
      "Product profitability metrics and visualization",
      "Predictive analytics for sales forecasting",
      "Interactive dashboards with Matplotlib and Seaborn",
      "Data preprocessing and feature engineering",
      "K-means clustering for customer groups",
    ],
    techStack: [
      "Python",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Scikit-learn",
      "Jupyter",
    ],
    github:
      "https://github.com/PranayaKD/Customer-Segmentation-Product-Profitability-Analysis",
    live: "#",
  },
  carrental: {
    title: "Drive in Style - Car Rental Platform",
    description:
      "A comprehensive car rental and sales platform with three integrated Django apps: user management (btmapp), car purchasing (carsapp), and rental services (rentalcars). Features include dynamic pricing, EMI calculator, and automated email notifications.",
    features: [
      "Multi-app architecture with btmapp, carsapp, and rentalcars",
      "User authentication with profile management and auto-logout",
      "Car rental with dynamic pricing based on fuel type and seating capacity",
      "Real-time EMI calculator for car purchases",
      "Test drive booking system with time slot selection",
      "Automated email notifications for bookings and invoices",
      "Admin dashboard for car and booking management",
      "Responsive design with modern UI/UX",
      "ReCAPTCHA integration for security",
      "Image upload and management for car listings",
    ],
    techStack: [
      "Django 5.2.4",
      "Python",
      "SQLite",
      "Bootstrap 5",
      "Crispy Forms",
      "Django ReCAPTCHA",
      "Django Auto Logout",
      "SMTP Email Integration",
    ],
    github: "https://github.com/PranayaKD/DriveInStyle",
    live: "https://driveinstyle.onrender.com",
    highlights: [
      "Dynamic rental pricing: ₹9-16/km based on fuel type and seats",
      "Minimum 300 km/day rental policy with extra km penalties",
      "Fuel cost calculation and deduction from final bill",
      "Car purchase with complete price breakdown (tax, RTO, insurance)",
      "Password reset functionality",
      "Session management with configurable auto-logout",
    ],
  },
};

// Create modal HTML (if not already present)
function createProjectModal() {
  const modalHTML = `
        <div class="project-modal" id="projectModal">
            <div class="modal-overlay" id="modalOverlay"></div>
            <div class="modal-container">
                <button class="modal-close" id="modalClose">
                    <i class="fas fa-times"></i>
                </button>
                <div class="modal-content">
                    <h2 class="modal-title" id="modalTitle"></h2>
                    <p class="modal-description" id="modalDescription"></p>
                    
                    <div class="modal-section">
                        <h3><i class="fas fa-star"></i> Key Features</h3>
                        <ul class="modal-features" id="modalFeatures"></ul>
                    </div>
                    
                    <div class="modal-section" id="highlightsSection" style="display: none;">
                        <h3><i class="fas fa-bolt"></i> Highlights</h3>
                        <ul class="modal-highlights" id="modalHighlights"></ul>
                    </div>
                    
                    <div class="modal-section">
                        <h3><i class="fas fa-code"></i> Technology Stack</h3>
                        <div class="modal-tech-stack" id="modalTechStack"></div>
                    </div>
                    
                    <div class="modal-actions">
                        <a href="#" id="modalGithubLink" target="_blank" class="btn btn-primary">
                            <i class="fab fa-github"></i>
                            <span>View on GitHub</span>
                        </a>
                        <a href="#" id="modalLiveLink" target="_blank" class="btn btn-secondary" style="display: none;">
                            <i class="fas fa-external-link-alt"></i>
                            <span>Live Demo</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Add modal styles
  const modalStyles = `
        <style>
            .project-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                z-index: 10000;
                display: none;
                align-items: center;
                justify-content: center;
                padding: 2rem;
            }
            
            .project-modal.active {
                display: flex;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(20px);
            }
            
            .modal-container {
                position: relative;
                width: 100%;
                max-width: 900px;
                max-height: 90vh;
                background: var(--secondary-bg);
                border-radius: var(--radius-xl);
                border: 1px solid rgba(255, 255, 255, 0.1);
                overflow-y: auto;
                box-shadow: var(--shadow-xl);
                animation: modalSlideIn 0.3s ease;
            }
            
            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(30px) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            .modal-close {
                position: sticky;
                top: 1rem;
                right: 1rem;
                float: right;
                width: 50px;
                height: 50px;
                background: var(--tertiary-bg);
                border: 2px solid rgba(255, 255, 255, 0.1);
                border-radius: var(--radius-full);
                color: var(--accent-cyan);
                font-size: 1.5rem;
                cursor: pointer;
                transition: all var(--transition-normal);
                z-index: 10;
            }
            
            .modal-close:hover {
                transform: rotate(90deg);
                border-color: var(--accent-cyan);
            }
            
            .modal-content {
                padding: 3rem;
                clear: both;
            }
            
            .modal-title {
                font-size: 2rem;
                font-weight: 700;
                margin-bottom: 1rem;
                background: var(--gradient-primary);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .modal-description {
                color: var(--text-secondary);
                font-size: 1.1rem;
                line-height: 1.8;
                margin-bottom: 2rem;
            }
            
            .modal-section {
                margin-bottom: 2rem;
            }
            
            .modal-section h3 {
                font-size: 1.3rem;
                font-weight: 700;
                color: var(--text-primary);
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .modal-section h3 i {
                color: var(--accent-cyan);
            }
            
            .modal-features,
            .modal-highlights {
                list-style: none;
                display: grid;
                gap: 0.75rem;
            }
            
            .modal-features li,
            .modal-highlights li {
                display: flex;
                align-items: start;
                gap: 0.75rem;
                color: var(--text-secondary);
                padding: 0.75rem;
                background: var(--tertiary-bg);
                border-radius: var(--radius-md);
                border-left: 3px solid var(--accent-cyan);
            }
            
            .modal-highlights li {
                border-left-color: var(--accent-green);
            }
            
            .modal-features li::before {
                content: '✓';
                color: var(--accent-green);
                font-weight: bold;
                flex-shrink: 0;
            }
            
            .modal-highlights li::before {
                content: '⚡';
                flex-shrink: 0;
            }
            
            .modal-tech-stack {
                display: flex;
                flex-wrap: wrap;
                gap: 0.75rem;
            }
            
            .modal-tech-stack span {
                padding: 0.5rem 1rem;
                background: rgba(34, 211, 238, 0.1);
                border: 1px solid rgba(34, 211, 238, 0.3);
                border-radius: var(--radius-md);
                color: var(--accent-cyan);
                font-weight: 600;
                font-size: 0.9rem;
            }
            
            .modal-actions {
                display: flex;
                gap: 1rem;
                margin-top: 2rem;
                flex-wrap: wrap;
            }
            
            @media (max-width: 768px) {
                .project-modal {
                    padding: 1rem;
                }
                
                .modal-content {
                    padding: 2rem 1.5rem;
                }
                
                .modal-title {
                    font-size: 1.5rem;
                }
                
                .modal-actions {
                    flex-direction: column;
                }
                
                .modal-actions .btn {
                    width: 100%;
                }
            }
        </style>
    `;

  document.head.insertAdjacentHTML("beforeend", modalStyles);
}

// Show project modal
function showProjectModal(projectKey) {
  const project = projectDetails[projectKey];
  if (!project) return;

  const modal = document.getElementById("projectModal");
  if (!modal) {
    createProjectModal();
  }

  // Populate modal content
  document.getElementById("modalTitle").textContent = project.title;
  document.getElementById("modalDescription").textContent = project.description;

  // Features
  const featuresList = document.getElementById("modalFeatures");
  featuresList.innerHTML = project.features
    .map((feature) => `<li>${feature}</li>`)
    .join("");

  // Highlights (if exists)
  if (project.highlights) {
    const highlightsSection = document.getElementById("highlightsSection");
    const highlightsList = document.getElementById("modalHighlights");
    highlightsSection.style.display = "block";
    highlightsList.innerHTML = project.highlights
      .map((highlight) => `<li>${highlight}</li>`)
      .join("");
  } else {
    document.getElementById("highlightsSection").style.display = "none";
  }

  // Tech Stack
  const techStack = document.getElementById("modalTechStack");
  techStack.innerHTML = project.techStack
    .map((tech) => `<span>${tech}</span>`)
    .join("");

  // Links
  document.getElementById("modalGithubLink").href = project.github;
  const liveLink = document.getElementById("modalLiveLink");
  if (project.live && project.live !== "#") {
    liveLink.href = project.live;
    liveLink.style.display = "inline-flex";
  } else {
    liveLink.style.display = "none";
  }

  // Show modal
  document.getElementById("projectModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close modal
function closeProjectModal() {
  document.getElementById("projectModal").classList.remove("active");
  document.body.style.overflow = "auto";
}

// Event listeners for portfolio preview buttons
document.addEventListener("DOMContentLoaded", function () {
  // Create modal on page load
  createProjectModal();

  // Add click handlers to preview buttons
  document.querySelectorAll(".portfolio-preview").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const projectKey = this.getAttribute("data-project");
      showProjectModal(projectKey);
    });
  });

  // Close modal events
  document.addEventListener("click", function (e) {
    if (e.target.id === "modalClose" || e.target.id === "modalOverlay") {
      closeProjectModal();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeProjectModal();
    }
  });
});
console.log(
  "%c✨ Portfolio loaded successfully!",
  "color: #22D3EE; font-size: 14px; font-weight: bold;",
);
