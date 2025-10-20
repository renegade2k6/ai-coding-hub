// Modular Footer Component
class FooterComponent {
    constructor() {
        // No complex state needed for the footer yet
    }

    render() {
        // Note: The links are now styled via css/style.css
        return `
            <footer>
                <div class="container">
                    <p>&copy; 2025 AI Coding Hub. All rights reserved.</p>
                    <p>Created by <a href="https://www.patreon.com/renegade2k6UK" target="_blank">Renegade2k6</a></p>
                    <p>Follow on <a href="https://x.com/Renegade2k6News" target="_blank">X</a> | <a href="https://www.facebook.com/ren2k6" target="_blank">Facebook</a></p>
                    <div class="disclaimer">
                        <p><small>Disclaimer: This website is an independent project and is not affiliated with any of the tools or services listed. All product names, logos, and brands are property of their respective owners. We strive to keep information accurate and up-to-date, but recommend verifying details directly with tool providers.</small></p>
                    </div>
                </div>
            </footer>
        `;
    }

    mount(targetSelector = 'body') {
        const existingFooter = document.querySelector('footer');
        if (existingFooter) {
            // Update existing footer content instead of creating a new one
            existingFooter.outerHTML = this.render();
        } else {
            // Create new footer if none exists
            const target = document.querySelector(targetSelector);
            if (target) {
                target.insertAdjacentHTML('beforeend', this.render());
            }
        }
    }
}

// Auto-initialize and mount the footer when the script is loaded
// Optimized footer initialization to prevent flashing
function initializeFooter() {
  // Add loading class to prevent flashing
  document.body.classList.add('footer-loading');
  
  const existingFooter = document.querySelector('footer');
  if (existingFooter) {
    // Update existing footer content with minimal disruption
    const footerHTML = new FooterComponent().render();
    existingFooter.innerHTML = footerHTML.innerHTML || footerHTML; // More graceful replacement
  } else {
    // Create new footer if none exists
    const footerComponent = new FooterComponent();
    footerComponent.mount('body');
  }
  
  // Remove loading class after a brief delay to ensure smooth transition
  setTimeout(() => {
    document.body.classList.remove('footer-loading');
  }, 100);
}

// Check if DOM is already loaded, if so initialize immediately
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeFooter();
    });
} else {
    // DOM already loaded, initialize immediately
    initializeFooter();
}

// Export for module systems (optional, but good practice)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FooterComponent;
}
