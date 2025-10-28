// Main JavaScript file for shared functionality
document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle (if needed)
    const navToggle = document.createElement('button');
    navToggle.classList.add('nav-toggle');
    navToggle.innerHTML = '☰';
    
    const nav = document.querySelector('.nav-links');
    const header = document.querySelector('.nav-container');
    
    if (window.innerWidth <= 768) {
        header.insertBefore(navToggle, nav);
        
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            navToggle.classList.toggle('nav-toggle-active');
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // subtle entrance animations for hero cards and HUD
    const hero = document.querySelector('.hero-content-advanced');
    if (hero) {
        hero.style.opacity = 0;
        hero.style.transform = 'translateY(18px)';
        setTimeout(() => {
            hero.style.transition = 'all 700ms cubic-bezier(.2,.9,.2,1)';
            hero.style.opacity = 1;
            hero.style.transform = 'translateY(0)';
        }, 250);
    }

    // floating HUD slight parallax
    const heroBg = document.querySelector('.hero-media .hero-bg');
    const hud = document.querySelector('.hero-overlay-cards');
    if (heroBg && hud) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 18;
            const y = (e.clientY / window.innerHeight - 0.5) * 12;
            heroBg.style.transform = `scale(1.06) translate(${x / 2}px, ${y / 2}px)`;
            hud.style.transform = `translate(${x * -0.6}px, ${y * -0.4}px)`;
        });
    }

    // lazy reveal on scroll for featured cards
    const revealOnScroll = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealOnScroll, { threshold: 0.12 });
    document.querySelectorAll('.course-card').forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(18px)';
        observer.observe(card);
    });
});