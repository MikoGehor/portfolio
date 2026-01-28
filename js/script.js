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

    // Theme toggle: apply saved theme and wire up button
    const themeToggle = document.getElementById('themeToggle');
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark-theme');
            if (themeToggle) {
                themeToggle.setAttribute('aria-pressed', 'true');
                themeToggle.textContent = 'Teema: Tumma';
            }
        } else {
            document.documentElement.classList.remove('dark-theme');
            if (themeToggle) {
                themeToggle.setAttribute('aria-pressed', 'false');
                themeToggle.textContent = 'Teema: Vaalea';
            }
        }
    }

    // Load saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('dark-theme');
            const newTheme = isDark ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
});

// ========================
// FORM HANDLING
// ========================

function handleFormSubmit(e) {
    e.preventDefault();

    const formMessage = document.getElementById('formMessage');
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !subject || !message) {
        showFormMessage('Täytä kaikki kentät!', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showFormMessage('Anna kelvollinen sähköpostiosoite!', 'error');
        return;
    }

    // Show loading message
    showFormMessage('Lähetetään viestia...', 'success');

    // Prepare data for Formspree
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);

    // Send to Formspree
    fetch('https://formspree.io/f/xyzjxzoj', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Sähköposti lähetetty onnistuneesti!');
            showFormMessage('✓ Kiitos viestistäsi! Vastaan sinulle pian.', 'success');
            document.getElementById('contactForm').reset();
            
            // Clear message after 5 seconds
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.classList.remove('success', 'error');
            }, 5000);
        } else {
            throw new Error('Vastaus ei ollut ok');
        }
    })
    .catch(error => {
        console.error('Virhe sähköpostin lähetyksessä:', error);
        showFormMessage('Virhe viestin lähetyksessä. Yritä myöhemmin uudelleen.', 'error');
        
        // Clear error message after 5 seconds
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.classList.remove('success', 'error');
        }, 5000);
    });

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
