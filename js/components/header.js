// Modular Header Component
class HeaderComponent {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.navItems = [
            { href: 'index.html', label: 'Home', isActive: this.currentPage === 'index' },
            { href: 'pages/cli-tools.html', label: 'CLI Tools', isActive: this.currentPage === 'cli-tools' },
            { href: 'pages/ides.html', label: 'AI IDEs', isActive: this.currentPage === 'ides' },
            { href: 'pages/extensions.html', label: 'VS Code Extensions', isActive: this.currentPage === 'extensions' },
            { href: 'pages/local-runtimes.html', label: 'Local Runtimes', isActive: this.currentPage === 'local-runtimes' },
            { href: 'pages/rag-tools.html', label: 'RAG Tools', isActive: this.currentPage === 'rag-tools' },
            { href: 'pages/agent-frameworks.html', label: 'Agent Frameworks', isActive: this.currentPage === 'agent-frameworks' },
            { href: 'pages/model-providers.html', label: 'Model Providers', isActive: this.currentPage === 'model-providers' },
            { href: 'pages/mcp.html', label: 'MCP', isActive: this.currentPage === 'mcp' },
            { href: 'pages/code-review.html', label: 'Code Review', isActive: this.currentPage === 'code-review' },
            { href: 'pages/testing.html', label: 'Testing', isActive: this.currentPage === 'testing' },
            { href: 'pages/web-builders.html', label: 'Web Builders', isActive: this.currentPage === 'web-builders' },
            { href: 'pages/contact.html', label: 'Contact', isActive: this.currentPage === 'contact' }
        ];
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.endsWith('index.html') || path === '/' || path === '') {
            return 'index';
        }
        const filename = path.split('/').pop();
        return filename ? filename.replace('.html', '') : 'index';
    }

    adjustNavigationPaths() {
        const isInSubFolder = window.location.pathname.includes('/pages/');
        if (!isInSubFolder) {
            // We're on the main page
            return this.navItems;
        } else {
            // We're in a sub-folder, adjust paths
            return this.navItems.map(item => ({
                ...item,
                href: item.href.startsWith('pages/') ? `../${item.href}` : `../${item.href}`
            }));
        }
    }

    createLogo() {
        return `
            <div class="header-logo-container">
                <div class="logo header-logo" aria-hidden="true">
                    <div style="position: absolute; inset: -2px; border-radius: 14px; background: conic-gradient(from 210deg, var(--accent), var(--accent-2), #0cf, var(--accent)); filter: blur(12px); opacity: .8; z-index: -1;"></div>
                </div>
                <h1>AI Coding Hub</h1>
            </div>
        `;
    }

    createNavigation() {
        const adjustedNavItems = this.adjustNavigationPaths();
        const navItemsHtml = adjustedNavItems.map(item => 
            `<li><a href="${item.href}" ${item.isActive ? 'class="active"' : ''}>${item.label}</a></li>`
        ).join('');

        return `
            <nav>
                <ul>
                    ${navItemsHtml}
                </ul>
            </nav>
        `;
    }

    render() {
        return `
            <header>
                <div class="container">
                    ${this.createLogo()}
                    ${this.createNavigation()}
                </div>
            </header>
        `;
    }

    mount(targetSelector = 'body') {
        const target = document.querySelector(targetSelector);
        if (target) {
            target.insertAdjacentHTML('afterbegin', this.render());
        }
    }

    replace(existingHeaderSelector = 'header') {
        const existingHeader = document.querySelector(existingHeaderSelector);
        if (existingHeader) {
            existingHeader.outerHTML = this.render();
        }
    }
}

// Auto-initialize if this script is loaded
if (typeof window !== 'undefined') {
    window.HeaderComponent = HeaderComponent;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeaderComponent;
}