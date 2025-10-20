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

    // Simple animation for cards when they come into view (respects reduced motion)
    const cards = document.querySelectorAll('.tool-card, .category-card');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
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
    }

    // Handle navigation menu on mobile
    // Accessible mobile nav toggle
    const navToggle = document.createElement('button');
    navToggle.type = 'button';
    navToggle.setAttribute('aria-label', 'Toggle navigation menu');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.innerHTML = '☰';
    navToggle.style.cssText = `
        display: none;
        position: absolute;
        right: 20px;
        top: 20px;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 101;
        background: transparent;
        color: var(--ink);
        border: 1px solid var(--border);
        border-radius: 8px;
        padding: 4px 8px;
    `;
    document.querySelector('header .container').appendChild(navToggle);

    const nav = document.querySelector('nav ul');
    navToggle.addEventListener('click', () => {
        const open = nav.style.display === 'flex';
        nav.style.display = open ? 'none' : 'flex';
        navToggle.setAttribute('aria-expanded', String(!open));
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.style.display = 'flex';
        } else {
            nav.style.display = 'none';
        }
    });

    // Add Latency/Autonomy legend if present


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
    
    // Make tool cards clickable
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        // Find the "Visit" button link
        const visitButton = card.querySelector('.btn-external');
        if (visitButton && visitButton.href) {
            // Make the entire card clickable
            card.style.cursor = 'pointer';
            
            // Add click event to the card
            card.addEventListener('click', function(e) {
                // Don't trigger if they clicked on the button itself (let it work normally)
                if (e.target.tagName === 'A' && e.target.classList.contains('btn')) {
                    return;
                }
                
                // Open the link in a new tab
                window.open(visitButton.href, '_blank');
            });
            
            // Add visual feedback
            card.addEventListener('mouseenter', function() {
                this.style.cursor = 'pointer';
            });
        }
    });
});