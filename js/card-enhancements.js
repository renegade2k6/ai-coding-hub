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

// Uniform card sizing across each grid without cutting text
(function(){
  function isVisible(el){
    return !!el && el.offsetParent !== null && getComputedStyle(el).display !== 'none';
  }

  function unifyGridHeights(grid){
    if(!grid) return;
    const cards = Array.from(grid.querySelectorAll('.tool-card'));
    if(cards.length === 0) return;
    // reset before measuring
    cards.forEach(c => c.style.minHeight = '');
    const visible = cards.filter(isVisible);
    if(visible.length === 0) return;

    // Group visible cards into rows based on their top position
    const rows = [];
    const THRESH = 8; // px tolerance for row grouping
    visible.forEach(card => {
      const rect = card.getBoundingClientRect();
      const top = Math.round(rect.top);
      let row = rows.find(r => Math.abs(r.top - top) <= THRESH);
      if (!row) {
        row = { top, cards: [] };
        rows.push(row);
      }
      row.cards.push(card);
    });

    // Set min-height per row to the tallest in that row
    rows.forEach(row => {
      const maxH = Math.max(...row.cards.map(c => c.getBoundingClientRect().height));
      const h = Math.ceil(maxH) + 'px';
      row.cards.forEach(c => c.style.minHeight = h);
    });
  }

  function unifyAllGrids(){
    const grids = document.querySelectorAll('.tool-grid');
    grids.forEach(grid => {
      if (grid.hasAttribute('data-no-equalize')) return; // skip featured spotlight grid
      unifyGridHeights(grid);
    });
  }

  const debounced = (fn, wait=150) => { let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), wait); }; };
  const run = debounced(unifyAllGrids, 100);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(run, 50));
  } else {
    setTimeout(run, 50);
  }
  window.addEventListener('load', () => setTimeout(run, 50));
  window.addEventListener('resize', run);

  const root = document.querySelector('main') || document.body;
  if (root && 'MutationObserver' in window) {
    const observer = new MutationObserver(() => run());
    observer.observe(root, { subtree: true, childList: true, attributes: true, attributeFilter: ['style', 'class'] });
  }
  document.addEventListener('input', (e) => { if (e.target && e.target.id === 'tool-search') run(); });
})();

// Add anchor links to section headers (category-intro h3)
(function(){
  function slugify(text){
    return text.toLowerCase().replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').replace(/-+/g,'-');
  }
  function enhanceHeaders(){
    document.querySelectorAll('.category-intro h3').forEach(h3 => {
      const title = h3.textContent.trim();
      if (!title) return;
      if (!h3.id){ h3.id = slugify(title); }
      if (!h3.querySelector('.section-anchor')){
        const a = document.createElement('a');
        a.href = '#' + h3.id;
        a.className = 'section-anchor';
        a.setAttribute('aria-label', 'Link to section ' + title);
        const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
        svg.setAttribute('class','icon');
        const use = document.createElementNS('http://www.w3.org/2000/svg','use');
        const base = location.pathname.includes('/pages/') ? '../' : '';
        use.setAttribute('href', base + 'assets/icons/sprite.svg#link');
        svg.appendChild(use);
        a.appendChild(svg);
        h3.appendChild(a);
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceHeaders);
  } else { enhanceHeaders(); }
})();

// Back-to-top button
(function(){
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.type = 'button';
  btn.textContent = 'Back to top';
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(btn));
  window.addEventListener('scroll', () => {
    const show = window.scrollY > 500;
    btn.style.display = show ? 'block' : 'none';
  });
})();

// Enhance tool cards: add brand chips and inline meta chips (latency/autonomy)
(function(){
  const BRAND_WHITELIST = new Set([]); // disabled brand chips
  function brandClass(name){
    const key = name.toLowerCase().replace(/[^a-z0-9]+/g,'');
    const map = new Map([
      ['aws','brand-aws'],['google','brand-google'],['openai','brand-openai'],['github','brand-github'],
      ['replit','brand-replit'],['vercel','brand-vercel'],['builderio','brand-builder'],['openrouter','brand-openrouter'],
      ['togetherai','brand-together'],['fireworksai','brand-fireworks'],['groq','brand-groq'],['perplexity','brand-perplexity'],
      ['microsoft','brand-microsoft'],['deepset','brand-deepset'],['langchain','brand-langchain'],['llamaindex','brand-llamaindex'],
      ['anysphere','brand-cursor'],['codeium','brand-codeium'],['qoder','brand-qoder'],['anthropic','brand-anthropic']
    ]);
    return map.get(key) || null;
  }
  function normalizeAutonomy(text){
    const t = (text||'').toLowerCase();
    if (t.includes('high')) return {label:'High', cls:'high'};
    if (t.includes('medium')) return {label:'Medium', cls:'medium'};
    if (t.includes('low')) return {label:'Low', cls:'low'};
    if (t.includes('semi')) return {label:'Semi', cls:'semi'};
    if (t.includes('assist')) return {label:'Assistive', cls:'assistive'};
    return {label:text||'—', cls:''};
  }
  function latencyLabel(text){
    const s = (text||'').trim();
    if (!s) return '—';
    const bolts = (s.match(/⚡/g)||[]).length;
    if (bolts>=5) return 'Very Fast';
    if (bolts>=4) return 'Fast';
    if (bolts>=3) return 'Good';
    if (bolts>=2) return 'Avg';
    if (bolts>=1) return 'Slow';
    return s.replace(/\?/g,'').trim() || '—';
  }
  function enhance(){
    document.querySelectorAll('.tool-card').forEach(card => {
      // Brand chip in title
      const h4 = card.querySelector('h4');
      const tag = card.querySelector('.tag');
      if (h4 && tag) {
        // Wrap title text to enable ellipsis separate from potential chips (none injected now)
        if (!h4.querySelector('.card-title-text')){
          const wrapper = document.createElement('span');
          wrapper.className = 'card-title-text';
          const chips = Array.from(h4.querySelectorAll('.brand-chip'));
          const nodes = Array.from(h4.childNodes);
          // Move text nodes and non-chip inline nodes into wrapper (preserve chips at end)
          nodes.forEach(n => {
            if (chips.includes(n) || (n.nodeType === 1 && n.classList && n.classList.contains('brand-chip'))) return;
            wrapper.appendChild(n);
          });
          h4.insertBefore(wrapper, chips[0] || null);
        }
      }

      // Meta chips row for latency/autonomy
      const latEl = card.querySelector('.latency');
      const autEl = card.querySelector('.autonomy');
      if (latEl || autEl){
        let row = card.querySelector('.meta-row');
        if (!row){
          row = document.createElement('div');
          row.className = 'meta-row';
          // Insert after h4 or at top of card content
          if (h4 && h4.parentNode === card) card.insertBefore(row, h4.nextSibling);
          else card.insertBefore(row, card.firstChild);
        }
        if (latEl && !row.querySelector('.chip.latency')){
          const c = document.createElement('span');
          c.className = 'chip latency';
          c.textContent = latencyLabel(latEl.textContent);
          row.appendChild(c);
          latEl.style.display = 'none';
        }
        if (autEl && !row.querySelector('.chip.autonomy')){
          const info = normalizeAutonomy(autEl.textContent);
          const c = document.createElement('span');
          c.className = 'chip autonomy ' + info.cls;
          c.textContent = info.label;
          row.appendChild(c);
          autEl.style.display = 'none';
        }
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhance);
  } else { enhance(); }
})();
