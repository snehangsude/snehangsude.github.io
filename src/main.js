import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';

// Parallax & Reveal Logic
document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu
    const mobileBtn = document.getElementById('mobile-menu-btn');
    // Note: We don't have a full screen mobile menu in the HTML, we might just scroll to sections or add a simple overlay.
    // For simplicity in this 'Bento' design, the mobile button just scrolls to top (simple) or we add a basic toggle if needed.
    // Let's implement a simple scroll-to-top for the float button if clicked, or toggle a hidden menu if we added one.
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            // Simple interaction for now: Scroll nicely to Nav
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
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
