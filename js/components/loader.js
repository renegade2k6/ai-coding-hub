// Component Loader - Initialize modular components
document.addEventListener('DOMContentLoaded', function() {
    // The header and footer components are loaded via their respective JS files
    // which handle the DOM manipulation. We don't initialize them here as classes
    // since they use procedural patterns instead of class-based components.

    // Enhanced animations for cards after components are loaded
    setTimeout(() => {
        const cards = document.querySelectorAll('.category-card, .tool-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);

    // Add smooth scrolling for better UX
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

    // Add keyboard navigation enhancement
    document.addEventListener('keydown', (e) => {
        // Alt + H for Home navigation
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            const homeLink = document.querySelector('nav a[href*="index.html"], nav a[href="/"], nav a[href=""]');
            if (homeLink) {
                homeLink.click();
            }
        }

        // Alt + S for search focus (if search exists)
        if (e.altKey && e.key === 's') {
            e.preventDefault();
            const searchInput = document.querySelector('#tool-search');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });

    // Add performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            if (loadTime > 3000) {
                console.warn('Page load time is high:', loadTime + 'ms');
            }
        });
    }
});

// Utility functions for component management
window.ComponentUtils = {
    // Reinitialize all components
    reinitializeComponents() {
        if (window.HeaderComponent) {
            new HeaderComponent().replace();
        }
        if (window.FooterComponent) {
            new FooterComponent().replace();
        }
    },

    // Update active navigation state
    updateActiveNav(pageName) {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.includes(pageName)) {
                link.classList.add('active');
            }
        });
    },

    // Add loading states
    showLoading(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0.5';
            element.style.pointerEvents = 'none';
        }
    },

    hideLoading(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '1';
            element.style.pointerEvents = 'auto';
        }
    }
};