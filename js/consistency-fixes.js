// Consistency Fixes for Tool Cards and Animations
// Ensures all tool cards have consistent structure and animations

document.addEventListener('DOMContentLoaded', function() {
    // Standardize all tool cards to have consistent structure
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        // Add schema.org markup if missing
        if (!card.hasAttribute('itemscope')) {
            card.setAttribute('itemscope', '');
            card.setAttribute('itemtype', 'https://schema.org/SoftwareApplication');
        }
        
        // Ensure h4 has itemprop="name"
        const h4 = card.querySelector('h4');
        if (h4 && !h4.hasAttribute('itemprop')) {
            h4.setAttribute('itemprop', 'name');
        }
        
        // Ensure tag has itemprop="softwareApplicationCategory"
        const tag = card.querySelector('.tag');
        if (tag && !tag.hasAttribute('itemprop')) {
            tag.setAttribute('itemprop', 'softwareApplicationCategory');
        }
        
        // Ensure description has itemprop="description"
        const description = card.querySelector('p');
        if (description && !description.hasAttribute('itemprop')) {
            description.setAttribute('itemprop', 'description');
        }
        
        // Ensure latency has itemprop="applicationSubCategory"
        const latency = card.querySelector('.latency');
        if (latency && !latency.hasAttribute('itemprop')) {
            latency.setAttribute('itemprop', 'applicationSubCategory');
        }
        
        // Ensure autonomy has itemprop="featureList"
        const autonomy = card.querySelector('.autonomy');
        if (autonomy && !autonomy.hasAttribute('itemprop')) {
            autonomy.setAttribute('itemprop', 'featureList');
        }
        
        // Ensure ul has itemprop="featureList"
        const ul = card.querySelector('ul');
        if (ul && !ul.hasAttribute('itemprop')) {
            ul.setAttribute('itemprop', 'featureList');
        }
        
        // Ensure external links have itemprop="url"
        const externalLink = card.querySelector('a[target="_blank"]');
        if (externalLink && !externalLink.hasAttribute('itemprop')) {
            externalLink.setAttribute('itemprop', 'url');
        }
        
        // Add pricing schema if pricing info is present
        const pricingText = card.textContent;
        if (pricingText.includes('$') || pricingText.includes('Free') || pricingText.includes('Pro')) {
            let offersDiv = card.querySelector('[itemscope][itemtype*="Offer"]');
            if (!offersDiv) {
                offersDiv = document.createElement('div');
                offersDiv.setAttribute('itemprop', 'offers');
                offersDiv.setAttribute('itemscope', '');
                offersDiv.setAttribute('itemtype', 'https://schema.org/Offer');
                offersDiv.style.display = 'none'; // Hidden metadata
                
                // Try to extract price information
                const priceMatch = pricingText.match(/\\$([0-9]+)/);
                if (priceMatch) {
                    const priceMeta = document.createElement('meta');
                    priceMeta.setAttribute('itemprop', 'price');
                    priceMeta.setAttribute('content', priceMatch[1]);
                    offersDiv.appendChild(priceMeta);
                    
                    const currencyMeta = document.createElement('meta');
                    currencyMeta.setAttribute('itemprop', 'priceCurrency');
                    currencyMeta.setAttribute('content', 'USD');
                    offersDiv.appendChild(currencyMeta);
                } else if (pricingText.toLowerCase().includes('free')) {
                    const priceMeta = document.createElement('meta');
                    priceMeta.setAttribute('itemprop', 'price');
                    priceMeta.setAttribute('content', '0');
                    offersDiv.appendChild(priceMeta);
                    
                    const currencyMeta = document.createElement('meta');
                    currencyMeta.setAttribute('itemprop', 'priceCurrency');
                    currencyMeta.setAttribute('content', 'USD');
                    offersDiv.appendChild(currencyMeta);
                }
                
                // Insert before the last link
                const lastLink = card.querySelector('a:last-of-type');
                if (lastLink) {
                    card.insertBefore(offersDiv, lastLink);
                } else {
                    card.appendChild(offersDiv);
                }
            }
        }
    });
    
    // Ensure consistent animation timing
    const animatedElements = document.querySelectorAll('.tool-card, .category-card, .btn, nav a');
    animatedElements.forEach(element => {
        // Standardize transition timing to 0.3s ease
        const currentTransition = getComputedStyle(element).transition;
        if (currentTransition && currentTransition !== 'none') {
            element.style.transition = currentTransition.replace(/[0-9.]+s/g, '0.3s').replace(/ease-[a-z-]+/g, 'ease');
        }
    });
    
    // Consistency fixes applied to ${toolCards.length} tool cards
});