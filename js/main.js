// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Simple animation for cards when they come into view
    const cards = document.querySelectorAll('.tool-card, .category-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        observer.observe(card);
    });

    // Handle navigation menu on mobile
    const navToggle = document.createElement('div');
    navToggle.innerHTML = '☰';
    navToggle.style.cssText = `
        display: none;
        position: absolute;
        right: 20px;
        top: 20px;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 101;
    `;
    document.querySelector('header .container').appendChild(navToggle);

    const nav = document.querySelector('nav ul');
    navToggle.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.style.display = 'flex';
        } else {
            nav.style.display = 'none';
        }
    });

    // Keyboard UX: '/' to focus search (if search element exists)
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
            e.preventDefault();
            const search = document.querySelector('input[type="search"]');
            if (search) {
                search.focus();
            }
        }
    });
});