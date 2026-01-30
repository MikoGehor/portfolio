// ========================
// SMOOTH SCROLL & ANIMATIONS
// ========================

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Navigation Active Link
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
    // Ensure default light theme: remove any dark theme class and saved preference
    document.documentElement.classList.remove('dark-theme');
    try { localStorage.removeItem('theme'); } catch (e) { /* ignore */ }
});

// ========================
// FORM HANDLING
// ========================

function handleFormSubmit(e) {
    const formMessage = document.getElementById('formMessage');
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !subject || !message) {
        e.preventDefault();
        showFormMessage('Täytä kaikki kentät!', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        e.preventDefault();
        showFormMessage('Anna kelvollinen sähköpostiosoite!', 'error');
        return;
    }

    // Show loading message
    showFormMessage('Lähetetään viestia...', 'success');

    // Store in localStorage for backup
    let submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    submissions.push({
        name: name,
        email: email,
        subject: subject,
        message: message,
        timestamp: new Date().toLocaleString('fi-FI')
    });
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

    // Form will submit to FormSubmit.co automatically
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.classList.remove('success', 'error');
    formMessage.classList.add(type);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========================
// NAVIGATION ACTIVE LINK
// ========================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = 'var(--text-primary)';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--primary-color)';
        }
    });
}

// ========================
// SCROLL REVEAL ANIMATION
// ========================

function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-in');

    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveal.style.opacity = '1';
            reveal.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// ========================
// PAGE LOAD ANIMATION
// ========================

window.addEventListener('load', function() {
    // Add animation to hero section on page load
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    if (heroContent) {
        heroContent.style.animation = 'slideInLeft 0.8s ease-out forwards';
    }

    if (heroImage) {
        heroImage.style.animation = 'slideInRight 0.8s ease-out forwards';
    }
});

// ========================
// UTILITY FUNCTIONS
// ========================

// Get all form submissions from localStorage
function getFormSubmissions() {
    return JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
}

// Clear all form submissions
function clearFormSubmissions() {
    localStorage.removeItem('contactSubmissions');
    console.log('Lomakkeen vastaukset poistettu');
}

// Log all submissions to console
function logSubmissions() {
    const submissions = getFormSubmissions();
    console.log('Kaikki lomakkeen vastaukset:', submissions);
}

// ========================
// LAZY LOADING IMAGES
// ========================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('Portfolio-sivusto ladattu onnistuneesti! 🚀');
