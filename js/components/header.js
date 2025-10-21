(function() {
  function injectNavIcons(){
    try{
      const nav = document.querySelector('nav');
      if(!nav) return;
      const map = new Map([
        ['index.html','home'],
        ['pages/cli-tools.html','terminal'],
        ['pages/ides.html','code'],
        ['pages/agent-frameworks.html','bot'],
        ['pages/local-runtimes.html','device'],
        ['pages/rag-tools.html','cloud'],
        ['pages/contact.html','mail']
      ]);
      const toSymbol = (href) => {
        for (const [key, sym] of map.entries()){
          if (href.endsWith(key)) return sym;
        }
        return null;
      };
      const links = nav.querySelectorAll('a');
      links.forEach(a => {
        const sym = toSymbol(a.getAttribute('href') || '');
        if (!sym) return;
        if (a.querySelector('svg.icon')) return; // already has
        const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
        svg.setAttribute('class','icon');
        const use = document.createElementNS('http://www.w3.org/2000/svg','use');
        // compute sprite path
        const base = location.pathname.includes('/pages/') ? '../' : '';
        use.setAttribute('href', base + 'assets/icons/sprite.svg#' + sym);
        svg.appendChild(use);
        a.prepend(svg);
      });
    }catch(e){ /* no-op */ }
  }
  function pathPrefix() {
    const p = location.pathname;
    return p.includes('/pages/') ? '../' : '';
  }

  function isActive(href) {
    const loc = location.pathname.replace(/\/?index\.html?$/, '/');
    const target = new URL(href, location.origin).pathname.replace(/\/?index\.html?$/, '/');
    return loc.endsWith(target) || loc === target;
  }

  // Update navigation active states without replacing content
  function updateNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    if (!navLinks.length) return; // If no nav links exist, nothing to update
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href') || '';
      if (href && isActive(href)) {
        link.classList.add('active');
      }
    });
  }

  // Check if DOM is already loaded, if so initialize immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      updateNavigation();
      injectNavIcons();
    });
  } else {
    // DOM already loaded, update immediately
    updateNavigation();
    injectNavIcons();
  }
  
  // Add CSS class for loading state to the document head
  if (!document.querySelector('#header-loading-style')) {
    const style = document.createElement('style');
    style.id = 'header-loading-style';
    style.textContent = `
      body.header-loading header {
        opacity: 0.9;
        transition: opacity 0.1s ease;
      }
      header {
        transition: all 0.1s ease;
      }
    `;
    document.head.appendChild(style);
  }
})();
