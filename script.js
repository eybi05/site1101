// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animation to elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all glass cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.glass-card, .link-card, .project-card, .about-section');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Add glow effect on button hover
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 30px rgba(102, 126, 234, 0.6)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Vanish effect for hero elements when scrolling (mobile-friendly)
function handleHeroVanish() {
    const scrollY = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
    const hero = document.querySelector('.hero');
    
    // Only apply on home page (index.html)
    if (hero && (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '/')) {
        const profileImage = document.querySelector('.profile-image');
        const profileGlow = document.querySelector('.profile-glow');
        const socialIcons = document.querySelector('.social-icons');
        const heroText = document.querySelector('.hero-text');
        const heroButtons = document.querySelector('.hero-buttons');
        
        // Mobile-friendly scroll thresholds (smaller for mobile)
        const isMobile = window.innerWidth <= 768;
        const scrollThreshold = isMobile ? 30 : 50;
        const vanishDistance = isMobile ? 100 : 150; // Shorter distance on mobile for faster vanish
        
        if (scrollY > scrollThreshold) {
            // Calculate opacity based on scroll (fade to 0)
            const scrollProgress = Math.min((scrollY - scrollThreshold) / vanishDistance, 1);
            const opacity = Math.max(0, 1 - scrollProgress); // Fade from 1 to 0, ensure no negative
            
            // Apply vanish effect with mobile-optimized transitions
            if (profileImage) {
                profileImage.style.opacity = opacity;
                profileImage.style.visibility = opacity > 0.01 ? 'visible' : 'hidden';
                profileImage.style.pointerEvents = opacity > 0.01 ? 'auto' : 'none';
                profileImage.style.transform = `scale(${0.9 + opacity * 0.1})`; // Slight scale for smooth effect
                profileImage.classList.add('scrolled');
            }
            
            if (profileGlow) {
                profileGlow.style.opacity = Math.max(0, opacity * 0.3);
                profileGlow.style.visibility = opacity > 0.01 ? 'visible' : 'hidden';
                profileGlow.classList.add('scrolled');
            }
            
            if (socialIcons) {
                socialIcons.style.opacity = opacity;
                socialIcons.style.visibility = opacity > 0.01 ? 'visible' : 'hidden';
                socialIcons.style.pointerEvents = opacity > 0.01 ? 'auto' : 'none';
                socialIcons.classList.add('scrolled');
            }
            
            if (heroText) {
                heroText.style.opacity = opacity;
                heroText.style.visibility = opacity > 0.01 ? 'visible' : 'hidden';
                heroText.classList.add('scrolled');
            }
            
            if (heroButtons) {
                heroButtons.style.opacity = opacity;
                heroButtons.style.visibility = opacity > 0.01 ? 'visible' : 'hidden';
                heroButtons.style.pointerEvents = opacity > 0.01 ? 'auto' : 'none';
            }
        } else {
            // Reset to original state when scrolled back to top
            if (profileImage) {
                profileImage.style.opacity = '1';
                profileImage.style.visibility = 'visible';
                profileImage.style.pointerEvents = 'auto';
                profileImage.style.transform = 'scale(1)';
                profileImage.classList.remove('scrolled');
            }
            
            if (profileGlow) {
                profileGlow.style.opacity = '0.3';
                profileGlow.style.visibility = 'visible';
                profileGlow.classList.remove('scrolled');
            }
            
            if (socialIcons) {
                socialIcons.style.opacity = '1';
                socialIcons.style.visibility = 'visible';
                socialIcons.style.pointerEvents = 'auto';
                socialIcons.classList.remove('scrolled');
            }
            
            if (heroText) {
                heroText.style.opacity = '1';
                heroText.style.visibility = 'visible';
                heroText.classList.remove('scrolled');
            }
            
            if (heroButtons) {
                heroButtons.style.opacity = '1';
                heroButtons.style.visibility = 'visible';
                heroButtons.style.pointerEvents = 'auto';
            }
        }
    }
}

// Use requestAnimationFrame for smooth performance on mobile
let ticking = false;
function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleHeroVanish();
            ticking = false;
        });
        ticking = true;
    }
}

// Support both scroll and touch events for mobile
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('touchmove', onScroll, { passive: true });

// Also handle on initial load
document.addEventListener('DOMContentLoaded', handleHeroVanish);
window.addEventListener('load', handleHeroVanish);

// Handle orientation change on mobile
window.addEventListener('orientationchange', () => {
    setTimeout(handleHeroVanish, 100);
});

// Handle resize for responsive behavior
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleHeroVanish, 250);
});

// Add typing effect to hero name (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect on page load
// window.addEventListener('DOMContentLoaded', () => {
//     const nameElement = document.querySelector('.name');
//     if (nameElement) {
//         const originalText = nameElement.textContent;
//         typeWriter(nameElement, originalText, 100);
//     }
// });

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            if (navLink) {
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        }
    });
});

// Image lazy loading enhancement
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

