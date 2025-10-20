(function() {
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
    });
  } else {
    // DOM already loaded, update immediately
    updateNavigation();
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