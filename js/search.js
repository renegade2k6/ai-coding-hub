// Search functionality for AI Coding Hub
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith('contact.html')) {
        return;
    }
    
    // Check if there are tool cards on this page to make search meaningful
    const hasToolCards = document.querySelectorAll('.tool-card').length > 0;
    
    // Only add search functionality if there are tool cards to search
    if (!hasToolCards) {
        return;
    }
    
    // Create search input in header
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.style.cssText = `
        margin: 16px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    `;
    
    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.placeholder = 'Search tools, vendors, tags... (e.g. MCP, local, Groq)';
    searchInput.id = 'tool-search';
    searchInput.style.cssText = `
        width: 320px;
        max-width: 90vw;
        background: rgba(12, 20, 44, .85);
        color: var(--ink);
        border: 1px solid rgba(125, 249, 255, .3);
        border-radius: 24px;
        padding: 10px 16px;
        outline: none;
        backdrop-filter: blur(12px);
        font-size: 14px;
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(0, 0, 0, .3), inset 0 1px 0 rgba(125, 249, 255, .1);
        position: relative;
        overflow: hidden;
    `;
    
    // Add neon glow effect to search input
    const glowEffect = document.createElement('div');
    glowEffect.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 24px;
        background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
        pointer-events: none;
        transition: all 0.3s ease;
        z-index: -1;
    `;
    searchInput.parentNode.style.position = 'relative';
    searchInput.parentNode.appendChild(glowEffect);
    
    // Add hover and focus effects for search
    searchInput.addEventListener('mouseenter', () => {
        glowEffect.style.background = 'radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, transparent 70%)';
    });
    
    searchInput.addEventListener('mouseleave', () => {
        if (document.activeElement !== searchInput) {
            glowEffect.style.background = 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)';
        }
    });
    
    searchInput.addEventListener('focus', () => {
        glowEffect.style.background = 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)';
    });
    
    searchInput.addEventListener('blur', () => {
        glowEffect.style.background = 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)';
    });
    
    // Remove the category select dropdown as requested
    // const categorySelect = document.createElement('select');
    // categorySelect.id = 'category-filter';
    // categorySelect.style.cssText = `
    //     background: rgba(10, 18, 40, .75);
    //     color: var(--ink);
    //     border: 1px solid var(--border);
    //     border-radius: 12px;
    //     padding: 8px 10px; /* Reduced padding to make it smaller */
    //     outline: none;
    //     backdrop-filter: blur(8px);
    //     font-size: 14px; /* Smaller font size */
    // `;
    
    // Add default option
    // const defaultOption = document.createElement('option');
    // defaultOption.value = '';
    // defaultOption.textContent = 'All categories';
    // categorySelect.appendChild(defaultOption);
    
    // Get unique categories from tool cards
    // const categories = new Set();
    // document.querySelectorAll('.tool-card').forEach(card => {
    //     const tag = card.querySelector('.tag');
    //     if (tag) {
    //         categories.add(tag.textContent);
    //     }
    // });
    
    // Add categories to select
    // categories.forEach(category => {
    //     const option = document.createElement('option');
    //     option.value = category;
    //     option.textContent = category;
    //     categorySelect.appendChild(option);
    // });
    
    searchContainer.appendChild(searchInput);

    // Add a no-results placeholder
    const noResults = document.createElement('div');
    noResults.id = 'no-results';
    noResults.style.cssText = 'display:none; color: var(--muted); margin: 10px 0; text-align:center';
    noResults.textContent = 'No matching tools found.';

    // Add search container to the page (after hero section)
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.parentNode.insertBefore(searchContainer, heroSection.nextSibling);
        heroSection.parentNode.insertBefore(noResults, searchContainer.nextSibling);
        
        // Add divider after search
        const divider = document.createElement('div');
        divider.className = 'divider';
        noResults.parentNode.insertBefore(divider, noResults.nextSibling);
    } else {
        // If no hero section, try to find another appropriate place
        const mainContent = document.querySelector('main') || document.querySelector('#main-content');
        if (mainContent) {
            mainContent.insertBefore(searchContainer, mainContent.firstChild);
            mainContent.insertBefore(noResults, searchContainer.nextSibling);
            
            // Add divider after search
            const divider = document.createElement('div');
            divider.className = 'divider';
            noResults.parentNode.insertBefore(divider, noResults.nextSibling);
        }
    }
    
    // Search functionality
    // Cache originals for highlight reset
    const originals = new WeakMap();

    function highlight(text, term){
        if(!term) return text;
        const esc = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return text.replace(new RegExp(`(${esc})`, 'ig'), '<mark>$1</mark>');
    }

    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        document.querySelectorAll('.tool-card').forEach(card => {
            const h4 = card.querySelector('h4');
            const p = card.querySelector('p');
            if(!originals.has(h4)) originals.set(h4, h4.innerHTML);
            if(!originals.has(p)) originals.set(p, p.innerHTML);

            const title = h4.textContent.toLowerCase();
            const description = p.textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
            const tagText = tags.join(' ');
            const listItems = Array.from(card.querySelectorAll('li')).map(li => li.textContent.toLowerCase());
            const listItemText = listItems.join(' ');
            
            const matchesSearch = searchTerm === '' || 
                title.includes(searchTerm) || 
                description.includes(searchTerm) || 
                tagText.includes(searchTerm) || 
                listItemText.includes(searchTerm);
            
            if (matchesSearch) {
                card.style.display = 'block';
                visibleCount++;
                // highlight
                if(searchTerm){
                    h4.innerHTML = highlight(originals.get(h4), searchTerm);
                    p.innerHTML = highlight(originals.get(p), searchTerm);
                } else {
                    h4.innerHTML = originals.get(h4);
                    p.innerHTML = originals.get(p);
                }
            } else {
                card.style.display = 'none';
            }
        });

        const noResultsEl = document.getElementById('no-results');
        if(noResultsEl){ noResultsEl.style.display = visibleCount === 0 ? 'block' : 'none'; }
    }
    
    // Add hover and focus effects
    searchInput.addEventListener('mouseenter', () => {
        searchInput.style.borderColor = 'rgba(125, 249, 255, .5)';
        searchInput.style.boxShadow = '0 6px 24px rgba(0, 0, 0, .4), inset 0 1px 0 rgba(125, 249, 255, .15), 0 0 0 1px rgba(125, 249, 255, .2)';
    });
    
    searchInput.addEventListener('mouseleave', () => {
        if (document.activeElement !== searchInput) {
            searchInput.style.borderColor = 'rgba(125, 249, 255, .3)';
            searchInput.style.boxShadow = '0 4px 20px rgba(0, 0, 0, .3), inset 0 1px 0 rgba(125, 249, 255, .1)';
        }
    });
    
    searchInput.addEventListener('focus', () => {
        searchInput.style.borderColor = 'rgba(125, 249, 255, .6)';
        searchInput.style.boxShadow = '0 8px 32px rgba(0, 0, 0, .5), inset 0 1px 0 rgba(125, 249, 255, .2), 0 0 0 2px rgba(125, 249, 255, .25)';
        searchInput.style.background = 'rgba(14, 24, 52, .9)';
    });
    
    searchInput.addEventListener('blur', () => {
        searchInput.style.borderColor = 'rgba(125, 249, 255, .3)';
        searchInput.style.boxShadow = '0 4px 20px rgba(0, 0, 0, .3), inset 0 1px 0 rgba(125, 249, 255, .1)';
        searchInput.style.background = 'rgba(12, 20, 44, .85)';
    });

    // Event listeners (debounced)
    let t; const DEBOUNCE_MS = 180;
    searchInput.addEventListener('input', () => { clearTimeout(t); t = setTimeout(performSearch, DEBOUNCE_MS); });
    
    // Keyboard shortcut for search
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
    });
});