import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';

// Parallax & Reveal Logic
document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });

        const hideMenu = () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = ''; // Restore scroll
        };

        if (closeMenu) closeMenu.addEventListener('click', hideMenu);
        mobileLinks.forEach(link => link.addEventListener('click', hideMenu));
    }

    // Intersection Observer for Fade-ins
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-8');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply fade-in classes to sections and cards
    const animatedElements = document.querySelectorAll('.bento-card, section h2, .display-text, article');
    animatedElements.forEach(el => {
        el.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', 'translate-y-8');
        observer.observe(el);
    });

    // Navigation Highlighting (Only for anchor links on current page)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const handleScroll = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 350)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            // If it's a hash link, update active state based on scroll
            if (href.startsWith('#')) {
                link.classList.toggle('active', href.substring(1) === current);
            }
            // If it's a page link (e.g., /projects.html), keep active if it matches the path
            else if (href !== '/' && window.location.pathname.includes(href)) {
                link.classList.add('active');
            }
            else if (href === '/' && (window.location.pathname === '/' || window.location.pathname === '/index.html')) {
                // Keep active if we are at home and no section is highlighted yet or if it's the home link
                if (!current) link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once on load
});
