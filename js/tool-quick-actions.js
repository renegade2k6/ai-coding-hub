/**
 * Tool Quick Actions
 * Adds copy link and share functionality to tool cards
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    addQuickActionsToCards();
  }

  function addQuickActionsToCards() {
    const toolCards = document.querySelectorAll('.tool-card');

    toolCards.forEach(card => {
      // Skip if already has quick actions
      if (card.querySelector('.quick-actions')) return;

      // Create quick actions container
      const quickActions = document.createElement('div');
      quickActions.className = 'quick-actions';

      // Copy link button
      const copyBtn = document.createElement('button');
      copyBtn.className = 'quick-action-btn copy-link';
      copyBtn.innerHTML = '🔗';
      copyBtn.setAttribute('aria-label', 'Copy link to tool');
      copyBtn.setAttribute('title', 'Copy link');
      copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        copyToolLink(card, copyBtn);
      });

      // Share button (if Web Share API is supported)
      if (navigator.share) {
        const shareBtn = document.createElement('button');
        shareBtn.className = 'quick-action-btn share-tool';
        shareBtn.innerHTML = '📤';
        shareBtn.setAttribute('aria-label', 'Share tool');
        shareBtn.setAttribute('title', 'Share');
        shareBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          shareTool(card);
        });
        quickActions.appendChild(shareBtn);
      }

      quickActions.appendChild(copyBtn);

      // Insert quick actions at the top-left of card
      card.style.position = 'relative';
      card.insertBefore(quickActions, card.firstChild);
    });
  }

  function copyToolLink(card, button) {
    const toolLink = card.querySelector('a.btn, a.btn-external');
    if (!toolLink) return;

    const url = toolLink.href;

    // Copy to clipboard
    navigator.clipboard.writeText(url).then(() => {
      // Visual feedback
      button.innerHTML = '✓';
      button.classList.add('success');

      setTimeout(() => {
        button.innerHTML = '🔗';
        button.classList.remove('success');
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
      button.innerHTML = '✗';
      setTimeout(() => {
        button.innerHTML = '🔗';
      }, 2000);
    });
  }

  function shareTool(card) {
    const toolTitle = card.querySelector('h4')?.textContent || 'AI Tool';
    const toolLink = card.querySelector('a.btn, a.btn-external');
    const toolDesc = card.querySelector('p')?.textContent || '';

    if (!toolLink) return;

    const shareData = {
      title: toolTitle + ' - AI Coding Hub',
      text: toolDesc,
      url: toolLink.href
    };

    navigator.share(shareData).catch(err => {
      // User cancelled or error occurred
      console.log('Share cancelled or failed:', err);
    });
  }
})();
