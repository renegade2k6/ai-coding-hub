// Quick Navigation Enhancement
// Adds smooth scrolling, active states, and improved UX for section navigation

document.addEventListener('DOMContentLoaded', function() {
    const subnav = document.querySelector('.subnav');
    if (!subnav) return;
    
    const navLinks = subnav.querySelectorAll('a[href^="#"]');
    const sections = [];
    
    // Collect all sections that have corresponding nav links
    navLinks.forEach(link => {
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            sections.push({
                link: link,
                section: targetSection,
                id: targetId
            });
        }
    });
    
    // Add smooth scrolling to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Calculate offset to account for fixed headers
                const headerOffset = 100; // Adjust based on your header height
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state
                updateActiveNavLink(this);
                
                // Add temporary highlight to target section
                highlightSection(targetSection);
            }
        });
    });
    
    // Update active nav link based on scroll position
    function updateActiveNavLink(activeLink = null) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    // Highlight target section temporarily
    function highlightSection(section) {
        section.style.transition = 'background-color 0.3s ease';
        section.style.backgroundColor = 'rgba(0, 212, 255, 0.1)';
        
        setTimeout(() => {
            section.style.backgroundColor = '';
            setTimeout(() => {
                section.style.transition = '';
            }, 300);
        }, 1000);
    }
    
    // Scroll spy functionality
    function handleScrollSpy() {
        const scrollPosition = window.scrollY + 150; // Offset for better detection
        
        let activeSection = null;
        sections.forEach(({ section, link }) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                activeSection = link;
            }
        });
        
        updateActiveNavLink(activeSection);
    }
    
    // Throttled scroll listener for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScrollSpy, 10);
    });
    
    // Initial active state
    handleScrollSpy();
    
    // Quick navigation enhanced for ${sections.length} sections
});