// Performance Monitoring and Optimization
(function() {
    'use strict';

    // Performance Observer for monitoring
    if ('PerformanceObserver' in window) {
        // Monitor Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            
            if (lastEntry.startTime > 2500) {
                console.warn('LCP is slower than recommended (2.5s):', lastEntry.startTime + 'ms');
            }
        });

        try {
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            console.log('LCP monitoring not supported');
        }

        // Monitor First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (entry.processingStart - entry.startTime > 100) {
                    console.warn('FID is slower than recommended (100ms):', entry.processingStart - entry.startTime + 'ms');
                }
            });
        });

        try {
            fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
            console.log('FID monitoring not supported');
        }
    }

    // Lazy loading for images
    function lazyLoadImages() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    // Preload critical resources
    function preloadCriticalResources() {
        const criticalCSS = document.querySelector('link[rel="stylesheet"]');
        if (criticalCSS && !criticalCSS.hasAttribute('data-preloaded')) {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'style';
            preloadLink.href = criticalCSS.href;
            document.head.appendChild(preloadLink);
            criticalCSS.setAttribute('data-preloaded', 'true');
        }
    }

    // Optimize animations based on device capabilities
    function optimizeAnimations() {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const isLowEndDevice = navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 4;

        if (reducedMotion.matches || isLowEndDevice) {
            document.body.classList.add('reduced-animations');
        }

        // Listen for changes in motion preference
        reducedMotion.addEventListener('change', (e) => {
            if (e.matches) {
                document.body.classList.add('reduced-animations');
            } else {
                document.body.classList.remove('reduced-animations');
            }
        });
    }

    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for performance
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Optimize scroll events
    function optimizeScrollEvents() {
        const scrollHandler = throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // Parallax effect for hero section (if exists)
            const hero = document.querySelector('.hero');
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        }, 16); // ~60fps

        window.addEventListener('scroll', scrollHandler, { passive: true });
    }

    // Resource hints
    function addResourceHints() {
        // DNS prefetch for external domains
        const externalDomains = [
            'fonts.googleapis.com',
            'fonts.gstatic.com'
        ];

        externalDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = `//${domain}`;
            document.head.appendChild(link);
        });
    }

    // Memory usage monitoring
    function monitorMemoryUsage() {
        if ('memory' in performance) {
            const memoryInfo = performance.memory;
            const usedMemoryMB = memoryInfo.usedJSHeapSize / 1024 / 1024;
            const totalMemoryMB = memoryInfo.totalJSHeapSize / 1024 / 1024;
            
            if (usedMemoryMB > 50) {
                console.warn(`High memory usage detected: ${usedMemoryMB.toFixed(2)}MB / ${totalMemoryMB.toFixed(2)}MB`);
            }
        }
    }

    // Initialize all optimizations
    document.addEventListener('DOMContentLoaded', () => {
        lazyLoadImages();
        preloadCriticalResources();
        optimizeAnimations();
        optimizeScrollEvents();
        addResourceHints();
        
        // Monitor memory usage every 30 seconds
        setInterval(monitorMemoryUsage, 30000);
    });

    // Expose utilities globally
    window.PerformanceUtils = {
        debounce,
        throttle,
        lazyLoadImages,
        monitorMemoryUsage
    };

})();