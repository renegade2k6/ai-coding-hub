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
                    <p>Follow on <a href="https://x.com/Renegade2k6News" target="_blank">Twitter</a> | <a href="https://www.facebook.com/ren2k6" target="_blank">Facebook</a></p>
                    <div class="disclaimer">
                        <p><small>Disclaimer: This website is an independent project and is not affiliated with any of the tools or services listed. All product names, logos, and brands are property of their respective owners. We strive to keep information accurate and up-to-date, but recommend verifying details directly with tool providers.</small></p>
                    </div>
                </div>
            </footer>
        `;
    }

    mount(targetSelector = 'body') {
        const target = document.querySelector(targetSelector);
        if (target) {
            // Appending to the body is standard for a footer
            target.insertAdjacentHTML('beforeend', this.render());
        }
    }
}

// Auto-initialize and mount the footer when the script is loaded
document.addEventListener('DOMContentLoaded', () => {
    const footer = new FooterComponent();
    footer.mount('body');
});

// Export for module systems (optional, but good practice)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FooterComponent;
}
