// Search functionality for AI Coding Hub
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith('contact.html')) {
        return;
    }
    
    // Always add search functionality for site-wide search capability
    // Search will filter local tool cards (if any) and show external suggestions
    // const hasToolCards = document.querySelectorAll('.tool-card').length > 0;
    // 
    // // Only add search functionality if there are tool cards to search
    // if (!hasToolCards) {
    //     return;
    // }
    
    // Create search input in header
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.style.cssText = `
        margin: 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    `;
    
    const searchWrapper = document.createElement('div');
    searchWrapper.style.cssText = 'position: relative; display: inline-block;';

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
        z-index: 0;
    `;

    // Build structure: wrapper(glow,input) → searchContainer
    searchWrapper.appendChild(glowEffect);
    searchWrapper.appendChild(searchInput);
    searchContainer.appendChild(searchWrapper);
    
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
    
    // searchInput is already appended inside wrapper above

    // Add a no-results placeholder
    const noResults = document.createElement('div');
    noResults.id = 'no-results';
    noResults.style.cssText = 'display:none; color: var(--muted); margin: 10px 0; text-align:center';
    noResults.textContent = 'No matching tools found.';

    // Add search container to the page (after hero section)
    const heroSection = document.querySelector('.hero');
    const isIndexPage = /(?:^|\/)index\.html$/.test(location.pathname) || /\/$/.test(location.pathname);
    if (heroSection) {
        const parent = heroSection.parentNode;
        // Find the first divider after the hero
        let sibling = heroSection.nextElementSibling;
        let firstDivider = null;
        while (sibling) {
            if (sibling.classList && sibling.classList.contains('divider')) { firstDivider = sibling; break; }
            sibling = sibling.nextElementSibling;
        }
        // TOOL PAGES: hero → search → (existing) first divider → subnav → injected second divider → content
        // HOME PAGE: hero → search (no extra divider injected here per prior rule)
        if (!isIndexPage && firstDivider) {
            // Insert search BEFORE the existing first divider
            parent.insertBefore(searchContainer, firstDivider);
            parent.insertBefore(noResults, firstDivider);

            // Place subnav right AFTER the existing first divider
            const pageSubnav = document.querySelector('nav.subnav');
            if (pageSubnav) {
                // Ensure subnav sits after the first divider
                parent.insertBefore(pageSubnav, firstDivider.nextSibling);
            }

            // Inject the second divider AFTER subnav (or after first divider if no subnav)
            const secondDivider = document.createElement('div');
            secondDivider.className = 'divider';
            const afterNode = (pageSubnav && pageSubnav.parentNode === parent) ? pageSubnav : firstDivider;
            parent.insertBefore(secondDivider, afterNode.nextSibling);
        } else {
            // Index page or no divider present: keep search right after hero and don't inject extra divider
            parent.insertBefore(searchContainer, heroSection.nextSibling);
            parent.insertBefore(noResults, searchContainer.nextSibling);

            const pageSubnav = document.querySelector('nav.subnav');
            if (pageSubnav) {
                parent.insertBefore(pageSubnav, noResults.nextSibling);
            }
        }
    } else {
        // If no hero section, try to find another appropriate place
        const mainContent = document.querySelector('main') || document.querySelector('#main-content');
        if (mainContent) {
            mainContent.insertBefore(searchContainer, mainContent.firstChild);
            mainContent.insertBefore(noResults, searchContainer.nextSibling);

            const pageSubnav = document.querySelector('nav.subnav');
            if (pageSubnav) {
                mainContent.insertBefore(pageSubnav, noResults.nextSibling);
            }

            // Add divider after search area (and subnav if present) — skip on main index page
            if (!isIndexPage) {
                const divider = document.createElement('div');
                divider.className = 'divider';
                const afterNode = (pageSubnav && pageSubnav.parentNode === mainContent) ? pageSubnav : noResults;
                mainContent.insertBefore(divider, afterNode.nextSibling);
            }
        }
    }
    
    // Search functionality
    // Cache originals for highlight reset and prebuilt card index
    const originals = new WeakMap();
    const cardIndexCache = new WeakMap();

    function normalize(text){
        return (text||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'');
    }

    function buildCardIndex(card){
        // Use full visible text to avoid missing any content like titles, links, list items
        const raw = (card.innerText || card.textContent || '').trim();
        return normalize(raw);
    }

    function highlight(text, term){
        if(!term) return text;
        const esc = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return text.replace(new RegExp(`(${esc})`, 'ig'), '<mark>$1</mark>');
    }

    let externalIndex = null;
    const MIN_LEN = 2;
    async function getExternalIndex(){
        if (externalIndex) return externalIndex;
        try {
            const base = location.pathname.includes('/pages/') ? '../' : '';
            const res = await fetch(base + 'js/search-index.json', { cache: 'no-store' });
            if (res.ok) {
                externalIndex = await res.json();
            } else {
                console.error('Failed to load search index:', res.status, res.statusText);
            }
        } catch(e) {
            console.error('Error fetching search index:', e);
        }
        return externalIndex;
    }

    function clearSuggestions(){
        const el = document.getElementById('search-suggestions');
        if (el) el.remove();
    }

    function renderSuggestions(matches){
        clearSuggestions();
        if (!matches || matches.length === 0) return;
        const base = location.pathname.includes('/pages/') ? '../' : '';
        const wrap = document.createElement('div');
        wrap.id = 'search-suggestions';
        wrap.style.cssText = 'margin:10px 0;';
        const container = document.createElement('div');
        container.className = 'container';
        const grid = document.createElement('div');
        grid.className = 'tool-grid suggestions-grid';

        matches.slice(0,12).forEach(item => {
            const card = document.createElement('div');
            card.className = 'tool-card';
            const h4 = document.createElement('h4');
            h4.textContent = item.name;
            const p = document.createElement('p');
            p.textContent = item.category || '';
            const actions = document.createElement('div');
            const open = document.createElement('a');
            open.href = base + (item.page || 'index.html');
            open.className = 'btn btn-external';
            open.textContent = 'Open';
            open.target = '_self';
            open.rel = 'noopener';
            actions.appendChild(open);
            // Also include external Website/GitHub link if available
            if (item.links && item.links.length){
                const preferred = item.links.find(l => /website/i.test(l.label)) || item.links.find(l => /github/i.test(l.label)) || item.links[0];
                if (preferred) {
                    const ext = document.createElement('a');
                    ext.href = preferred.url;
                    ext.className = 'btn btn-external';
                    ext.style.marginLeft = '8px';
                    ext.textContent = preferred.label;
                    ext.target = '_blank';
                    ext.rel = 'noopener';
                    actions.appendChild(ext);
                }
            }
            card.appendChild(h4);
            card.appendChild(p);
            card.appendChild(actions);
            grid.appendChild(card);
        });
        container.appendChild(grid);
        wrap.appendChild(container);
        // Insert after search
        searchContainer.parentNode.insertBefore(wrap, searchContainer.nextSibling);
    }

    function stringScore(hay, needle){
        hay = hay.toLowerCase(); needle = needle.toLowerCase();
        if (hay.includes(needle)) return 2;
        // simple fuzzy: all chars in order
        let i=0; for (const c of hay){ if (c===needle[i]) i++; if (i===needle.length) break; }
        return i===needle.length ? 1 : 0;
    }

    async function performSearch() {
        const searchTermRaw = searchInput.value || '';
        const searchTerm = normalize(searchTermRaw.trim());
        let visibleCount = 0;

        // Search performed with term: ${searchTerm}

        // If below minimum length, reset view and exit
        if (searchTerm.length < MIN_LEN) {
            // show all cards; clear highlights
            document.querySelectorAll('.tool-card').forEach(card => {
                card.classList.remove('hidden');
                const h4 = card.querySelector('h4');
                const p = card.querySelector('p');
                if (h4 && originals.has(h4)) h4.innerHTML = originals.get(h4);
                if (p && originals.has(p)) p.innerHTML = originals.get(p);
            });
            // show all sections
            document.querySelectorAll('.content .container .tool-grid').forEach(grid => grid.classList.remove('hidden'));
            document.querySelectorAll('.content .container .category-intro').forEach(ci => ci.classList.remove('hidden'));
            const noResultsEl = document.getElementById('no-results');
            if (noResultsEl) noResultsEl.style.display = 'none';
            clearSuggestions();
            window.dispatchEvent(new Event('resize'));
            return;
        }

        document.querySelectorAll('.tool-card').forEach(card => {
            const h4 = card.querySelector('h4');
            const p = card.querySelector('p');
            if(!originals.has(h4)) originals.set(h4, h4.innerHTML);
            if(!originals.has(p)) originals.set(p, p.innerHTML);

            // Build/refresh index for this card
            cardIndexCache.set(card, buildCardIndex(card));
            const hay = cardIndexCache.get(card);
            const terms = searchTerm.split(/\s+/).filter(Boolean);
            const matchesSearch = terms.every(t => hay.includes(t));
            
            if (matchesSearch) {
                card.classList.remove('hidden');
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
                card.classList.add('hidden');
            }
        });

        // Local cards filtered: ${visibleCount} visible of ${document.querySelectorAll('.tool-card').length} total

        const noResultsEl = document.getElementById('no-results');
        if(noResultsEl){ noResultsEl.style.display = visibleCount === 0 ? 'block' : 'none'; }

        // Hide empty sections (category-intro + grid) when no visible cards inside that grid
        document.querySelectorAll('.content .container').forEach(section => {
            const grids = section.querySelectorAll('.tool-grid');
            grids.forEach(grid => {
                const cards = Array.from(grid.querySelectorAll('.tool-card'));
                const anyVisible = cards.some(c => !c.classList.contains('hidden'));
                const catIntro = grid.previousElementSibling && grid.previousElementSibling.classList.contains('category-intro')
                    ? grid.previousElementSibling : null;
                grid.classList.toggle('hidden', !anyVisible);
                if (catIntro) catIntro.classList.toggle('hidden', !anyVisible);
            });
        });

        // External suggestions: always show matches across site beneath the search
        clearSuggestions();
        {
            const idx = await getExternalIndex();
            // External index loaded: ${idx ? idx.items?.length : 'null'} items
            if (idx && idx.items){
                const matches = idx.items
                  .map(it => ({...it, score: Math.max(
                    stringScore(it.name, searchTerm),
                    ...it.tags.map(t => stringScore(t, searchTerm))
                  )}))
                  .filter(it => it.score > 0)
                  .sort((a,b)=> b.score - a.score || a.name.localeCompare(b.name));
                // Found ${matches.length} external matches for term "${searchTerm}"
                if (matches.length){ renderSuggestions(matches); }
            }
        }

        // Nudge equalizer to recompute row heights
        window.dispatchEvent(new Event('resize'));
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

// ====== ENHANCED SEARCH FILTERS ======
(function() {
    const FILTERS = [
        { id: 'oss', label: 'Open Source', icon: '✅' },
        { id: 'free', label: 'Free Tier', icon: '💰' },
        { id: 'high-autonomy', label: 'High Autonomy', icon: '🚀' },
        { id: 'local', label: 'Local-first', icon: '💻' },
        { id: 'cloud', label: 'Cloud-based', icon: '☁️' }
    ];

    let activeFilters = new Set();
    
    // Wait for search container to be created
    setTimeout(() => {
        const searchContainer = document.querySelector('.search-container');
        if (!searchContainer || !document.querySelector('.tool-card')) return;
        
        tagToolCards();
        const counts = calculateCounts();
        createFilterUI(searchContainer, counts);
        setupFilterListeners();
    }, 100);

    function tagToolCards() {
        document.querySelectorAll('.tool-card').forEach(card => {
            const text = card.textContent.toLowerCase();
            const autonomy = card.querySelector('.autonomy')?.textContent.toLowerCase() || '';
            const badges = [];

            // Tag cards with filter attributes and collect badge info
            if (text.includes('oss') || text.includes('open source') || card.querySelector('a[href*="github.com"]')) {
                card.dataset.oss = 'true';
                badges.push({ id: 'oss', label: 'Open Source', icon: '✅' });
            }
            if (text.includes('free') || text.includes('$0')) {
                card.dataset.free = 'true';
                badges.push({ id: 'free', label: 'Free', icon: '💰' });
            }
            // Don't show autonomy badge since it's already displayed in the card
            if (autonomy.includes('high')) {
                card.dataset.highAutonomy = 'true';
                // Skip adding autonomy badge - it's redundant
            }
            if (text.includes('local') || text.includes('self-hosted') || text.includes('offline')) {
                card.dataset.local = 'true';
                badges.push({ id: 'local', label: 'Local', icon: '💻' });
            }
            if (text.includes('cloud') || text.includes('api') || text.includes('hosted')) {
                card.dataset.cloud = 'true';
                badges.push({ id: 'cloud', label: 'Cloud', icon: '☁️' });
            }

            // Inject visual badges into card (if not already present)
            if (badges.length > 0 && !card.querySelector('.tool-card-badges')) {
                const badgeContainer = document.createElement('div');
                badgeContainer.className = 'tool-card-badges';

                badges.forEach(badge => {
                    const badgeEl = document.createElement('span');
                    badgeEl.className = `badge badge-${badge.id}`;
                    badgeEl.innerHTML = `<span class="icon">${badge.icon}</span> ${badge.label}`;
                    badgeContainer.appendChild(badgeEl);
                });

                // Insert badges after the tag element
                const tag = card.querySelector('.tag');
                if (tag && tag.nextSibling) {
                    tag.parentNode.insertBefore(badgeContainer, tag.nextSibling);
                } else if (tag) {
                    tag.parentNode.appendChild(badgeContainer);
                }
            }
        });
    }

    function calculateCounts() {
        return {
            oss: document.querySelectorAll('.tool-card[data-oss="true"]').length,
            free: document.querySelectorAll('.tool-card[data-free="true"]').length,
            'high-autonomy': document.querySelectorAll('.tool-card[data-high-autonomy="true"]').length,
            local: document.querySelectorAll('.tool-card[data-local="true"]').length,
            cloud: document.querySelectorAll('.tool-card[data-cloud="true"]').length
        };
    }

    function createFilterUI(searchContainer, counts) {
        const filtersDiv = document.createElement('div');
        filtersDiv.className = 'search-filters';
        filtersDiv.id = 'search-filters';

        FILTERS.forEach(filter => {
            const count = counts[filter.id];
            if (count === 0) return;

            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'filter-chip';
            chip.dataset.filterId = filter.id;
            chip.innerHTML = `<span class="icon">${filter.icon}</span> ${filter.label} <span class="count">${count}</span>`;
            chip.addEventListener('click', () => toggleFilter(chip));
            filtersDiv.appendChild(chip);
        });

        // Clear button
        const clearBtn = document.createElement('button');
        clearBtn.type = 'button';
        clearBtn.className = 'filter-chip clear-filters';
        clearBtn.id = 'clear-filters';
        clearBtn.style.display = 'none';
        clearBtn.innerHTML = '✕ Clear Filters';
        clearBtn.addEventListener('click', clearFilters);
        filtersDiv.appendChild(clearBtn);

        searchContainer.parentNode.insertBefore(filtersDiv, searchContainer.nextSibling);
    }

    function toggleFilter(chip) {
        const id = chip.dataset.filterId;
        if (activeFilters.has(id)) {
            activeFilters.delete(id);
            chip.classList.remove('active');
        } else {
            activeFilters.add(id);
            chip.classList.add('active');
        }
        applyFilters();
        document.getElementById('clear-filters').style.display = activeFilters.size > 0 ? 'inline-flex' : 'none';
    }

    function clearFilters() {
        activeFilters.clear();
        document.querySelectorAll('.filter-chip.active').forEach(c => c.classList.remove('active'));
        applyFilters();
        document.getElementById('clear-filters').style.display = 'none';
    }

    function applyFilters() {
        if (activeFilters.size === 0) {
            document.querySelectorAll('.tool-card').forEach(c => c.classList.remove('hidden'));
            return;
        }

        document.querySelectorAll('.tool-card').forEach(card => {
            let matches = true;
            for (const id of activeFilters) {
                const attr = id === 'high-autonomy' ? 'highAutonomy' : id;
                if (card.dataset[attr] !== 'true') {
                    matches = false;
                    break;
                }
            }
            card.classList.toggle('hidden', !matches);
        });

        // Hide empty sections
        document.querySelectorAll('.content .container').forEach(section => {
            section.querySelectorAll('.tool-grid').forEach(grid => {
                const hasVisible = Array.from(grid.querySelectorAll('.tool-card')).some(c => !c.classList.contains('hidden'));
                grid.classList.toggle('hidden', !hasVisible);
                const intro = grid.previousElementSibling;
                if (intro?.classList.contains('category-intro')) {
                    intro.classList.toggle('hidden', !hasVisible);
                }
            });
        });

        window.dispatchEvent(new Event('resize'));
    }

    function setupFilterListeners() {
        // Integrate with existing search
        const searchInput = document.getElementById('tool-search');
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                setTimeout(applyFilters, 200);
            });
        }
    }
})();
