// Card Click Enhancements for Better UX
document.addEventListener('DOMContentLoaded', function() {
    // Make tool cards clickable
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        const externalLink = card.querySelector('a[target="_blank"]');
        
        if (externalLink) {
            // Add visual indicator that card is clickable
            card.style.cursor = 'pointer';
            card.setAttribute('data-clickable', 'true');
            
            // Add click handler to the entire card (except on the button itself)
            card.addEventListener('click', function(e) {
                // Don't trigger if clicking directly on the button
                if (!e.target.closest('.btn')) {
                    externalLink.click();
                }
            });
            
            // Add keyboard accessibility
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Visit ${card.querySelector('h4').textContent}`);
            
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    externalLink.click();
                }
            });
            
            // Enhanced hover effects
            card.addEventListener('mouseenter', function() {
                const button = card.querySelector('.btn');
                if (button) {
                    button.style.transform = 'translateY(-2px) scale(1.02)';
                    button.style.boxShadow = '0 8px 25px rgba(0, 212, 255, .3)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const button = card.querySelector('.btn');
                if (button) {
                    button.style.transform = '';
                    button.style.boxShadow = '';
                }
            });
        }
    });
    
    // Add loading indicators for external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add brief loading state
            const originalText = this.textContent;
            const originalHTML = this.innerHTML;
            
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
            
            if (this.classList.contains('btn')) {
                this.innerHTML = 'Opening... <span style="opacity: 0.6">⏳</span>';
            }
            
            // Reset after a short delay
            setTimeout(() => {
                this.style.opacity = '';
                this.style.pointerEvents = '';
                this.innerHTML = originalHTML;
            }, 1000);
        });
    });
    
    // Apply autonomy level styling
    const autonomyElements = document.querySelectorAll('.autonomy');
    autonomyElements.forEach(element => {
        const level = element.textContent.toLowerCase().trim();
        if (level === 'medium') {
            element.classList.add('medium');
        } else if (level === 'low') {
            element.classList.add('low');
        }
        // 'high' is the default styling, no additional class needed
    });

    // Add smooth scrolling when clicking category navigation
    const categoryLinks = document.querySelectorAll('a[href*="#"]');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
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
    
    // Add subtle animation for new page loads
    const cards = document.querySelectorAll('.tool-card, .category-card');
    
    // Use Intersection Observer for better performance
    if ('IntersectionObserver' in window) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    cardObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        cards.forEach(card => {
            // Only animate cards that don't have opacity set yet
            if (!card.style.opacity) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                cardObserver.observe(card);
            }
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
});

// Utility function to track external link clicks (optional analytics)
window.trackExternalClick = function(toolName, url) {
    // This can be connected to analytics services
    console.log(`External link clicked: ${toolName} -> ${url}`);
    
    // Example: Google Analytics event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            'event_category': 'External Link',
            'event_label': toolName,
            'value': url
        });
    }
};