// Modular Footer Component
class FooterComponent {
    constructor(options = {}) {
        this.options = {
            year: new Date().getFullYear(),
            siteName: 'AI Coding Hub',
            author: {
                name: 'Renegade2k6',
                patreon: 'https://www.patreon.com/renegade2k6UK',
                twitter: 'https://x.com/Renegade2k6News',
                facebook: 'https://www.facebook.com/ren2k6'
            },
            showDisclaimer: true,
            disclaimer: `This website is an independent project and is not affiliated with any of the tools or services listed. 
                        All product names, logos, and brands are property of their respective owners. 
                        We strive to keep information accurate and up-to-date, but recommend verifying details directly with tool providers.`,
            ...options
        };
    }

    createSocialLinks() {
        const { author } = this.options;
        return `
            <p>Follow on 
                <a href="${author.twitter}" target="_blank" rel="noopener" style="color: var(--accent); text-decoration: none;">Twitter</a> | 
                <a href="${author.facebook}" target="_blank" rel="noopener" style="color: var(--accent); text-decoration: none;">Facebook</a>
            </p>
        `;
    }

    createCopyright() {
        return `
            <p>&copy; ${this.options.year} ${this.options.siteName}. All rights reserved.</p>
            <p>Created by 
                <a href="${this.options.author.patreon}" target="_blank" rel="noopener" style="color: var(--accent); text-decoration: none;">${this.options.author.name}</a>
            </p>
        `;
    }

    createDisclaimer() {
        if (!this.options.showDisclaimer) return '';
        
        return `
            <div class="disclaimer">
                <p><small>${this.options.disclaimer}</small></p>
            </div>
        `;
    }

    render() {
        return `
            <footer>
                <div class="container">
                    ${this.createCopyright()}
                    ${this.createSocialLinks()}
                    ${this.createDisclaimer()}
                </div>
            </footer>
        `;
    }

    mount(targetSelector = 'body') {
        const target = document.querySelector(targetSelector);
        if (target) {
            target.insertAdjacentHTML('beforeend', this.render());
        }
    }

    replace(existingFooterSelector = 'footer') {
        const existingFooter = document.querySelector(existingFooterSelector);
        if (existingFooter) {
            existingFooter.outerHTML = this.render();
        }
    }

    updateYear() {
        this.options.year = new Date().getFullYear();
        this.replace();
    }

    // Method to add custom footer sections
    addCustomSection(html, position = 'before-disclaimer') {
        const positions = {
            'after-copyright': 1,
            'after-social': 2,
            'before-disclaimer': 3,
            'after-disclaimer': 4
        };

        // This would require a more complex implementation for dynamic insertion
        // For now, users can extend the class and override methods
        console.log('Custom sections can be added by extending this class');
    }
}

// Auto-initialize if this script is loaded
if (typeof window !== 'undefined') {
    window.FooterComponent = FooterComponent;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FooterComponent;
}