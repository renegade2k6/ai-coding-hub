// Search functionality for AI Coding Hub
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith('contact.html')) {
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
    `;
    
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
    // searchContainer.appendChild(categorySelect); // Remove this line
    
    // Add search container to the page (after hero section)
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.parentNode.insertBefore(searchContainer, heroSection.nextSibling);
    }
    
    // Add divider after search
    const divider = document.createElement('div');
    divider.className = 'divider';
    searchContainer.parentNode.insertBefore(divider, searchContainer.nextSibling);
    
    // Search functionality
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        // const selectedCategory = categorySelect.value; // Remove this line
        
        document.querySelectorAll('.tool-card').forEach(card => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
            const tagText = tags.join(' ');
            const listItems = Array.from(card.querySelectorAll('li')).map(li => li.textContent.toLowerCase());
            const listItemText = listItems.join(' ');
            
            const matchesSearch = searchTerm === '' || 
                title.includes(searchTerm) || 
                description.includes(searchTerm) || 
                tagText.includes(searchTerm) || 
                listItemText.includes(searchTerm);
                
            // const matchesCategory = selectedCategory === '' || tags.includes(selectedCategory.toLowerCase()); // Remove this line
            
            // if (matchesSearch && matchesCategory) { // Simplify this condition
            if (matchesSearch) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
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

    // Event listeners
    searchInput.addEventListener('input', performSearch);
    
    // Keyboard shortcut for search
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
    });
});