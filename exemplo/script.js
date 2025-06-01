// Mobile menu toggle
function toggleMobileMenu() {
    const nav = document.getElementById('navbarNav');
    nav.classList.toggle('active');
}

// FAQ toggle
function toggleFAQ(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems[index].classList.toggle('active');
}

// Form submission
function handleSubmit(event) {
    event.preventDefault();
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    event.target.reset();
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                document.getElementById('navbarNav').classList.remove('active');
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.backgroundColor = 'transparent';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.news-card, .stat-item, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Gallery auto-scroll pause on hover
    const gallery = document.querySelector('.gallery-container');
    if (gallery) {
        gallery.addEventListener('mouseenter', function () {
            this.style.animationPlayState = 'paused';
        });

        gallery.addEventListener('mouseleave', function () {
            this.style.animationPlayState = 'running';
        });
    }

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function () {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });

    // Counter animation for stats
    function animateCounter(element, target) {
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Observe stat numbers for counter animation
    const statObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const number = parseInt(entry.target.textContent);
                animateCounter(entry.target, number);
                entry.target.dataset.animated = 'true';
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(stat => {
        statObserver.observe(stat);
    });

    // Mobile menu close on outside click
    document.addEventListener('click', function (event) {
        const nav = document.getElementById('navbarNav');
        const toggle = document.querySelector('.mobile-menu-toggle');

        if (!nav.contains(event.target) && !toggle.contains(event.target)) {
            nav.classList.remove('active');
        }
    });

    // Add active state to current nav item
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScroll = debounce(() => {
    // Navbar background
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = 'transparent';
    }
}, 10);