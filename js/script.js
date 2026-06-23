// MolTech Digital Agency - Innovative Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Skills Marquee - Apply brand colors
    // ========================================
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const color = item.getAttribute('data-color');
        const logo = item.querySelector('.skill-logo');
        
        if (color && logo) {
            logo.style.color = color;
            logo.style.borderColor = color;
        }
    });
    
    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            const expanded = navLinks.classList.contains('active');
            this.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            document.body.style.overflow = expanded ? 'hidden' : '';
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }
    
    // ========================================
    // Header Scroll Effect
    // ========================================
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ========================================
    // Smooth Scroll for Navigation
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // Counter Animation
    // ========================================
    const counterElements = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    
    function animateCounters() {
        counterElements.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
    
    // Trigger counter animation when in view
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    animateCounters();
                    countersAnimated = true;
                    statsObserver.unobserve(statsSection);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });

        statsObserver.observe(statsSection);

        const statsRect = statsSection.getBoundingClientRect();
        const inViewOnLoad = statsRect.top < window.innerHeight && statsRect.bottom > 0;
        if (inViewOnLoad && !countersAnimated) {
            animateCounters();
            countersAnimated = true;
            statsObserver.unobserve(statsSection);
        }
    }
    
    // ========================================
    // Scroll Reveal Animation
    // ========================================
    const revealElements = document.querySelectorAll('.service-card, .pricing-card, .work-item, .about-card, .contact-item');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
    
    // ========================================
    // Service Card Tilt Effect
    // ========================================
    const tiltCards = document.querySelectorAll('[data-tilt]');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // ========================================
    // Contact Form Handling
    // ========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            if (!data.name || !data.email || !data.message) {
                e.preventDefault();
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                e.preventDefault();
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
        });
    }
    
    // ========================================
    // Service Card Click Handler
    // ========================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('h3').textContent;
            // Could navigate to service detail page
            console.log('Clicked on:', serviceName);
        });
    });
    
    // ========================================
    // Work Item Hover Effect
    // ========================================
    const workItems = document.querySelectorAll('.work-item');
    
    workItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // ========================================
    // Pricing Card Click Handler
    // ========================================
    const pricingBtns = document.querySelectorAll('.pricing-btn');
    
    pricingBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // Notification System
    // ========================================
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.notification-toast').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification-toast notification-${type}`;
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle',
            warning: 'fa-exclamation-triangle'
        };
        
        notification.innerHTML = `
            <i class="fas ${icons[type] || icons.info}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
            color: white;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 10000;
            max-width: 400px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            transform: translateX(500px);
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            font-weight: 500;
        `;
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
            opacity: 0.8;
            transition: opacity 0.3s;
        `;
        
        closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
        closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '0.8');
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button handler
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(500px)';
            setTimeout(() => notification.remove(), 400);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(500px)';
                setTimeout(() => notification.remove(), 400);
            }
        }, 5000);
    }
    
    // ========================================
    // Parallax Effect for Hero
    // ========================================
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // ========================================
    // CTA Button Click Handler
    // ========================================
    document.querySelectorAll('.cta-button').forEach(btn => {
        if (!btn.closest('form')) {
            btn.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        }
    });
    
    // ========================================
    // Floating Shapes Animation
    // ========================================
    const floatingShapes = document.querySelectorAll('.floating-shapes .float-shape');
    
    floatingShapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * -2}s`;
    });
    
    // ========================================
    // Service Link Hover Effect
    // ========================================
    document.querySelectorAll('.service-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = '#FF6B6B';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.color = '#DC143C';
        });
    });
    
    // ========================================
    // Form Input Focus Effects
    // ========================================
    document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // ========================================
    // Social Links Animation
    // ========================================
    document.querySelectorAll('.social-link, .footer-social a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ========================================
    // Work Grid Stagger Animation
    // ========================================
    const workItemsGrid = document.querySelectorAll('.work-item');
    workItemsGrid.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // ========================================
    // Poster Cards Interaction
    // ========================================
    const posterCards = document.querySelectorAll('.poster-card');
    
    posterCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // ========================================
    // Poster Button Click Handler
    // ========================================
    const posterBtns = document.querySelectorAll('.poster-btn');
    
    posterBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('fa-eye')) {
                // View project - could open modal
                showNotification('Opening project preview...', 'info');
            } else if (icon.classList.contains('fa-external-link-alt')) {
                // Open project link
                showNotification('Opening project link...', 'info');
            }
        });
    });
    
    // ========================================
    // About Cards Animation
    // ========================================
    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });
    
    // ========================================
    // Lazy Load Images (Performance)
    // ========================================
    const images = document.querySelectorAll('img[src*="unsplash"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '100px' });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ========================================
    // Console Welcome Message
    // ========================================
    console.log(`
    %c🎨 MolTech Digital Agency
    %c━━━━━━━━━━━━━━━━━━━━━━━
    Welcome! Built with ❤️ using modern web technologies.
    Graphics Design • Web Design • Web Development
    `, 'color: #DC143C; font-size: 18px; font-weight: bold;', 'color: #666;');
    
    // ========================================
    // Design Carousel Navigation
    // ========================================
    const designCarousel = document.querySelector('.design-carousel');
    const designPrevBtn = document.querySelector('.prev-btn');
    const designNextBtn = document.querySelector('.next-btn');
    
    if (designCarousel && designPrevBtn && designNextBtn) {
        // Get the first card to calculate width dynamically
        const firstCard = designCarousel.querySelector('.design-card');
        
        function getScrollAmount() {
            if (firstCard) {
                return firstCard.offsetWidth + 20; // card width + gap
            }
            return 350; // fallback
        }
        
        designPrevBtn.addEventListener('click', function() {
            designCarousel.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });
        
        designNextBtn.addEventListener('click', function() {
            designCarousel.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });
    }
    
    // ========================================
    // Web Development Carousel Navigation
    // ========================================
    const websiteCarousel = document.querySelector('.website-carousel');
    const webPrevBtn = document.querySelector('.prev-btn-web');
    const webNextBtn = document.querySelector('.next-btn-web');
    
    if (websiteCarousel && webPrevBtn && webNextBtn) {
        const scrollAmountWeb = 320;
        
        webPrevBtn.addEventListener('click', function() {
            websiteCarousel.scrollBy({
                left: -scrollAmountWeb,
                behavior: 'smooth'
            });
        });
        
        webNextBtn.addEventListener('click', function() {
            websiteCarousel.scrollBy({
                left: scrollAmountWeb,
                behavior: 'smooth'
            });
        });
    }
    
    // ========================================
    // Testimonials Carousel
    // ========================================
    const testimonialsCarousel = document.querySelector('.testimonials-carousel');
    
    if (testimonialsCarousel) {
        const carouselTrack = testimonialsCarousel.querySelector('.carousel-track');
        const cards = carouselTrack ? carouselTrack.querySelectorAll('.testimonial-card') : [];
        const prevBtn = testimonialsCarousel.querySelector('.carousel-btn-prev');
        const nextBtn = testimonialsCarousel.querySelector('.carousel-btn-next');
        const dotsContainer = testimonialsCarousel.querySelector('.carousel-dots');
        
        if (carouselTrack && cards && cards.length > 0) {
            let currentIndex = 0;
            const totalCards = cards.length;
            
            // Create dots
            cards.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
            
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            
            function goToSlide(index) {
                currentIndex = index;
                carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
                
                // Update dots
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
            }
            
            function nextSlide() {
                currentIndex = (currentIndex + 1) % totalCards;
                goToSlide(currentIndex);
            }
            
            function prevSlide() {
                currentIndex = (currentIndex - 1 + totalCards) % totalCards;
                goToSlide(currentIndex);
            }
            
            // Button click handlers
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    nextSlide();
                });
            }
            
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    prevSlide();
                });
            }
            
            // Auto-advance slides every 5 seconds
            let autoPlay = setInterval(nextSlide, 5000);
            
            // Pause on hover
            testimonialsCarousel.addEventListener('mouseenter', () => {
                clearInterval(autoPlay);
            });
            
            testimonialsCarousel.addEventListener('mouseleave', () => {
                autoPlay = setInterval(nextSlide, 5000);
            });
            
            // Touch/swipe support
            let touchStartX = 0;
            let touchEndX = 0;
            
            testimonialsCarousel.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            testimonialsCarousel.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                }
            }
        }
    }
    
    // ========================================
    // Preload Keyframes
    // ========================================
    // Force browser to load keyframe animations
    setTimeout(() => {
        document.body.style.animation = 'none';
    }, 100);
});

// ========================================
// Utility: Debounce Function
// ========================================
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

// ========================================
// Utility: Throttle Function
// ========================================
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
