document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    for (let anchor of anchors) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Mobile navigation toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.nav-links a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        });
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Reset mobile menu state on desktop view
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });

    // Add active class to current page nav link
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        if (itemHref === currentPage || (currentPage === '' && itemHref === 'index.html')) {
            item.classList.add('active');
        }
    });

    // Cookie consent
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
        createCookieConsentBanner();
    }

    function createCookieConsentBanner() {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <p>Używamy plików cookie na naszej stronie. Niektóre z nich są niezbędne, podczas gdy inne pomagają nam ulepszyć tę witrynę i Twoje doświadczenie.</p>
                <div class="cookie-buttons">
                    <button class="accept-all">Akceptuję</button>
                    <button class="accept-essential">Akceptuję tylko niezbędne</button>
                </div>
                <a href="polityka-prywatnosci.html" class="privacy-link">Indywidualne preferencje prywatności</a>
            </div>
        `;
        
        document.body.appendChild(banner);
        
        document.querySelector('.accept-all').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'all');
            banner.remove();
        });
        
        document.querySelector('.accept-essential').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'essential');
            banner.remove();
        });
    }
});
