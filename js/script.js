/* ===================================
   Amen Group Company Limited
   Main JavaScript File
   =================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // MOBILE MENU TOGGLE
    // ===================================
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnMenu = mobileMenu.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnMenu && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    }

    // ===================================
    // CONTACT FORM HANDLING
    // ===================================
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm && successMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };

            // Here I would normally send the data to a server
            // Example using fetch:
            /*
            fetch('your-backend-url/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            */

            // For now, just logging to console
            console.log('Form submitted:', formData);

            // Show success message
            successMessage.classList.add('show');
            
            // Reset form
            contactForm.reset();

            // Hiding success message after 5 seconds
            setTimeout(function() {
                successMessage.classList.remove('show');
            }, 5000);

            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    // ===================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default if it's not just "#"
            if (href !== '#' && href !== '') {
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

    // ===================================
    // SCROLL TO TOP BUTTON (Optional)
    // ===================================
    // Might Uncomment if I will want to add a scroll-to-top button
    /*
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.setAttribute('id', 'scrollToTop');
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #F26522;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: all 0.3s;
    `;
    
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.background = '#d9551a';
        this.style.transform = 'scale(1.1)';
    });

    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.background = '#F26522';
        this.style.transform = 'scale(1)';
    });
    */

    // ===================================
    // ACTIVE NAVIGATION HIGHLIGHTING
    // ===================================
    // Get current page URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Find and highlight active page in navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // ===================================
    // FORM VALIDATION ENHANCEMENT
    // ===================================
    // Add real-time validation feedback
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && this.value.trim() === '') {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#28a745';
            }
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = '#0078D4';
        });
    });

    // ===================================
    // LOADING ANIMATION (Optional)
    // ===================================
    // Add fade-in animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements with animation
    document.querySelectorAll('.service-card, .stat-box, .team-card, .value-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===================================
    // COUNTER ANIMATION FOR STATS
    // ===================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60 FPS
        let current = start;

        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.dataset.suffix || '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.dataset.suffix || '');
            }
        }, 16);
    }

    // Animate counters when they come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber) {
                    const text = statNumber.textContent.trim();
                    
                    // Skip animation for text-based stats like "24/7"
                    if (text.includes('/') || isNaN(parseInt(text.replace(/\D/g, '')))) {
                        entry.target.classList.add('counted');
                        return;
                    }
                    
                    const number = parseInt(text.replace(/\D/g, ''));
                    const suffix = text.replace(/[\d\s]/g, '');
                    
                    if (!isNaN(number)) {
                        statNumber.dataset.suffix = suffix;
                        statNumber.textContent = '0' + suffix;
                        animateCounter(statNumber, number, 2000);
                        entry.target.classList.add('counted');
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    // Observe all stat boxes
    document.querySelectorAll('.stat-box').forEach(box => {
        statsObserver.observe(box);
    });

    // ===================================
    // PRELOAD IMAGES (Optional)
    // ===================================
    // Preload important images for better performance
    function preloadImages(urls) {
        urls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    // Add your important image URLs here
    // preloadImages(['img/logo.png', 'img/hero-bg.jpg']);

    // ===================================
    // UTILITY FUNCTIONS
    // ===================================
    
    // Debounce function for performance optimization
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

    // Throttle function for scroll events
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

    // ===================================
    // HEADER SCROLL EFFECT (Optional)
    // ===================================
    // Add shadow to header on scroll
    const header = document.querySelector('header');
    
    if (header) {
        const handleScroll = throttle(function() {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
            } else {
                header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            }
        }, 100);

        window.addEventListener('scroll', handleScroll);
    }

    // ===================================
    // CONSOLE MESSAGE
    // ===================================
    console.log('%c🌾 Amen Group Company Limited 🚚', 'color: #0078D4; font-size: 20px; font-weight: bold;');
    console.log('%cWebsite loaded successfully!', 'color: #F26522; font-size: 14px;');
    console.log('%cFor support: info@amengroup.co.tz', 'color: #3D3D3D; font-size: 12px;');

});

// ===================================
// EXPORT FUNCTIONS (if using modules)
// ===================================
// Uncomment if you're using ES6 modules
/*
export {
    debounce,
    throttle,
    animateCounter
};
*/