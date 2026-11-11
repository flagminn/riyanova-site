/**
 * Elina Riyanova Landing — Advanced High-End Animations & Interactions
 * Role: AI Frontend Developer
 */

console.log('[Init] Запуск продвинутого движка анимаций и взаимодействий...');

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // 2. Interactive Tabs with Fan-Out / 3D Flip Transition
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const heroCtaBtns = document.querySelectorAll('.hero-buttons [data-tab]');

    function switchTab(targetTabId) {
        console.log('[Tabs] Переключение на вкладку с 3D-веером:', targetTabId);

        tabBtns.forEach(btn => {
            if (btn.getAttribute('data-target') === targetTabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        const activeContent = document.querySelector('.tab-content.active');
        const targetContent = document.getElementById(`tab-${targetTabId}`);

        if (activeContent && activeContent !== targetContent && typeof gsap !== 'undefined') {
            // Animate old cards out (fan-out / 3D throw away)
            const oldCards = activeContent.querySelectorAll('.service-bento-card');
            gsap.to(oldCards, {
                opacity: 0,
                y: -30,
                rotationZ: (i) => (i - 1) * 15,
                rotationY: 45,
                scale: 0.9,
                duration: 0.55,
                stagger: 0.08,
                ease: 'power2.in',
                onComplete: () => {
                    activeContent.classList.remove('active');
                    
                    // Activate target content
                    targetContent.classList.add('active');
                    targetContent.style.opacity = '1';
                    targetContent.style.visibility = 'visible';

                    // Animate new cards in (3D fan-in / unfold)
                    const newCards = targetContent.querySelectorAll('.service-bento-card');
                    gsap.fromTo(newCards,
                        { opacity: 0, y: 40, rotationY: -45, scale: 0.85 },
                        { opacity: 1, y: 0, rotationY: 0, rotationZ: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.4)', clearProps: 'all' }
                    );
                }
            });
        } else {
            tabContents.forEach(content => {
                if (content.id === `tab-${targetTabId}`) {
                    content.classList.add('active');
                    content.style.opacity = '1';
                    content.style.visibility = 'visible';
                } else {
                    content.classList.remove('active');
                }
            });
        }
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            switchTab(target);
        });
    });

    heroCtaBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            if (targetTab) {
                switchTab(targetTab);
                // Smooth scroll to services section
                const servicesSec = document.getElementById('services');
                if (servicesSec) {
                    servicesSec.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // 3. GSAP & ScrollTrigger Animations with Spring Physics and clearProps
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        console.log('[GSAP] ScrollTrigger и физика пружин активированы.');

        // Hero Entrance
        gsap.from('.hero-content > *', {
            opacity: 0,
            y: 40,
            duration: 1.2,
            stagger: 0.18,
            ease: 'back.out(1.2)',
            clearProps: 'all'
        });

        gsap.from('.hero-visual', {
            opacity: 0,
            scale: 0.92,
            duration: 1.4,
            delay: 0.3,
            ease: 'power3.out',
            clearProps: 'all'
        });

        // Floating Badges Physics
        gsap.to('.float-badge-1', {
            y: -14,
            duration: 2.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        gsap.to('.float-badge-2', {
            y: 14,
            duration: 3.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 0.4
        });

        // Background Blobs Parallax
        gsap.to('.bg-glow-1', {
            y: 180,
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5
            }
        });

        gsap.to('.bg-glow-2', {
            y: -220,
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5
            }
        });

        // Camera Shutter Curtain Opening Effect for About Section
        gsap.to('.about-camera-viewport', {
            clipPath: 'circle(100% at 50% 50%)',
            scrollTrigger: {
                trigger: '#about',
                start: 'top 85%',
                end: 'top 30%',
                scrub: 1
            }
        });

        // Clip-Path Reveal for Contacts Section
        gsap.to('.contacts-clip-wrapper', {
            clipPath: 'inset(0% 0% 0% 0% round 0px)',
            scrollTrigger: {
                trigger: '#contacts',
                start: 'top 90%',
                end: 'bottom bottom',
                scrub: 1
            }
        });

        // Cascade Reveal for all sections with responsive matchMedia
        const animatedSections = document.querySelectorAll('.stats-section, .services-section, .reviews-section, .contacts-section');
        
        animatedSections.forEach(section => {
            const elements = section.querySelectorAll('.stat-card, .service-bento-card, .review-card, .about-text-content, .about-card-banner, .contacts-box, .section-header');
            
            ScrollTrigger.matchMedia({
                // Desktop
                "(min-width: 769px)": function() {
                    gsap.from(elements, {
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 82%',
                            toggleActions: 'play none none none'
                        },
                        opacity: 0,
                        y: 35,
                        scale: 0.96,
                        duration: 1.0,
                        stagger: 0.15,
                        ease: 'back.out(1.4)',
                        clearProps: 'all'
                    });
                },
                // Mobile
                "(max-width: 768px)": function() {
                    gsap.from(elements, {
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 88%',
                            toggleActions: 'play none none none'
                        },
                        opacity: 0,
                        y: 20,
                        x: 0, // No horizontal shift on mobile to prevent overflow
                        scale: 0.98,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power2.out',
                        clearProps: 'all'
                    });
                }
            });
        });

        console.log('[GSAP] Каскадные анимации секций успешно настроены.');
    } else {
        console.warn('[GSAP] Библиотека не загружена, принудительно устанавливаем видимость карточек.');
        document.querySelectorAll('.service-bento-card, .review-card, .stat-card').forEach(el => {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
        });
    }

    // 4. Interactive 3D Tilt Effect on Cards with Specular Highlight
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // 5. Magnetic Buttons Effect
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // 7. Overflow Detector for Debugging Mobile Layout
    window.addEventListener('load', () => {
        const docWidth = window.innerWidth;
        document.querySelectorAll('*').forEach(el => {
            const box = el.getBoundingClientRect();
            if (box.right > docWidth + 1) {
                console.warn('[Overflow Detector] Элемент выпирает за правую границу экрана:', el, box.right, 'px при ширине окна', docWidth, 'px');
            }
        });
    });
});
