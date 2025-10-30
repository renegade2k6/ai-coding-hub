/**
 * Scroll Progress Bar
 * Shows reading progress at top of page
 */

(function() {
  'use strict';

  // Create progress bar element
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress-bar';
  progressBar.setAttribute('role', 'progressbar');
  progressBar.setAttribute('aria-label', 'Page scroll progress');
  progressBar.setAttribute('aria-valuenow', '0');
  progressBar.setAttribute('aria-valuemin', '0');
  progressBar.setAttribute('aria-valuemax', '100');

  // Insert at top of body
  document.body.insertBefore(progressBar, document.body.firstChild);

  // Update progress on scroll
  function updateProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Calculate scroll percentage
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    const clampedPercent = Math.min(Math.max(scrollPercent, 0), 100);

    // Update progress bar
    progressBar.style.width = clampedPercent + '%';
    progressBar.setAttribute('aria-valuenow', Math.round(clampedPercent));
  }

  // Throttle scroll events for performance
  let ticking = false;
  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Listen to scroll events
  window.addEventListener('scroll', requestTick, { passive: true });

  // Initial update
  updateProgress();
})();
