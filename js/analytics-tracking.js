// Analytics Event Tracking for AI Coding Hub
// Tracks user interactions for better insights

(function() {
    'use strict';

    // Wait for DOM to be ready
    function init() {
        trackOutboundLinks();
        trackSearchQueries();
        trackCategoryViews();
    }

    // Track clicks on external tool links
    function trackOutboundLinks() {
        document.querySelectorAll('.btn-external').forEach(link => {
            link.addEventListener('click', function(e) {
                const toolCard = e.target.closest('.tool-card');
                const toolName = toolCard?.querySelector('h4')?.textContent?.trim() || 'Unknown';
                const toolTag = toolCard?.querySelector('.tag')?.textContent?.trim() || 'Unknown';
                const targetUrl = e.target.href;

                // Get category from current page
                const pathname = window.location.pathname;
                let category = 'Home';
                if (pathname.includes('/pages/')) {
                    const pageName = pathname.split('/').pop().replace('.html', '');
                    category = pageName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                }

                // Send event to Google Analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'tool_click', {
                        'event_category': 'Tool Interaction',
                        'event_label': toolName,
                        'tool_name': toolName,
                        'tool_company': toolTag,
                        'tool_url': targetUrl,
                        'page_category': category,
                        'value': 1
                    });

                    console.log('Analytics: Tool click tracked -', toolName);
                }
            });
        });

        // Also track clicks on category cards
        document.querySelectorAll('.category-card .btn').forEach(link => {
            link.addEventListener('click', function(e) {
                const categoryName = e.target.closest('.category-card')?.querySelector('h3')?.textContent?.trim() || 'Unknown';

                if (typeof gtag !== 'undefined') {
                    gtag('event', 'category_navigation', {
                        'event_category': 'Navigation',
                        'event_label': categoryName,
                        'category_name': categoryName,
                        'value': 1
                    });

                    console.log('Analytics: Category navigation tracked -', categoryName);
                }
            });
        });
    }

    // Track search queries
    function trackSearchQueries() {
        const searchInput = document.getElementById('tool-search');
        if (!searchInput) return;

        let searchTimeout;
        searchInput.addEventListener('input', function(e) {
            clearTimeout(searchTimeout);

            // Only track after user stops typing for 2 seconds
            searchTimeout = setTimeout(() => {
                const query = e.target.value.trim();

                if (query.length >= 2 && typeof gtag !== 'undefined') {
                    gtag('event', 'search', {
                        'event_category': 'Search',
                        'search_term': query,
                        'value': 1
                    });

                    console.log('Analytics: Search tracked -', query);
                }
            }, 2000);
        });
    }

    // Track which category pages are viewed
    function trackCategoryViews() {
        const pathname = window.location.pathname;

        if (pathname.includes('/pages/')) {
            const pageName = pathname.split('/').pop().replace('.html', '');
            const category = pageName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

            if (typeof gtag !== 'undefined') {
                gtag('event', 'page_view', {
                    'event_category': 'Page View',
                    'page_title': document.title,
                    'page_location': window.location.href,
                    'page_path': pathname,
                    'category_name': category
                });

                console.log('Analytics: Category page view -', category);
            }
        }
    }

    // Track featured tool interactions
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.featured-tool .btn-external').forEach(link => {
            link.addEventListener('click', function(e) {
                const toolName = e.target.closest('.featured-tool')?.querySelector('h4')?.textContent?.trim() || 'Unknown';

                if (typeof gtag !== 'undefined') {
                    gtag('event', 'featured_tool_click', {
                        'event_category': 'Featured Tools',
                        'event_label': toolName,
                        'tool_name': toolName,
                        'value': 2 // Higher value for featured clicks
                    });

                    console.log('Analytics: Featured tool click -', toolName);
                }
            });
        });
    });

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
