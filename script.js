/* =============================================
   InnJoy Showcase Website — Scripts
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initSmoothScroll();
    initParallax();
    initLanguageSwitcher();
    initScrollProgress();
    initBackToTop();
    initThemeToggle();
    initDemoModal();
});

/* =============================================
   Navbar Scroll Effect
   ============================================= */

function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

/* =============================================
   Mobile Menu Toggle
   ============================================= */

function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('active');
    });

    // Close menu when a link is clicked
    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('active');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !links.contains(e.target)) {
            toggle.classList.remove('active');
            links.classList.remove('active');
        }
    });
}

/* =============================================
   Scroll Reveal Animation
   ============================================= */

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

/* =============================================
   Smooth Scroll for Navigation Links
   ============================================= */

function initSmoothScroll() {
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
}

/* =============================================
   Parallax Effect for Background Shapes
   ============================================= */

function initParallax() {
    const shapes = document.querySelectorAll('.shape');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        shapes.forEach((shape, i) => {
            const speed = (i + 1) * 0.03;
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }, { passive: true });
}

/* =============================================
   Active Navigation Highlight
   ============================================= */

(function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            link.style.background = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = '#38bdf8';
                link.style.background = 'rgba(56, 189, 248, 0.08)';
            }
        });
    }, { passive: true });
})();

/* =============================================
   Language Switcher (TR / EN)
   ============================================= */

function initLanguageSwitcher() {
    const switcher = document.getElementById('langSwitcher');
    const slider = document.getElementById('langSlider');
    const btnTR = document.getElementById('langTR');
    const btnEN = document.getElementById('langEN');

    if (!switcher || !slider || !btnTR || !btnEN) return;

    // Load saved language or default to Turkish
    let currentLang = localStorage.getItem('innjoy-lang') || 'tr';
    applyLanguage(currentLang, false);

    btnTR.addEventListener('click', () => {
        if (currentLang === 'tr') return;
        currentLang = 'tr';
        localStorage.setItem('innjoy-lang', currentLang);
        applyLanguage(currentLang, true);
    });

    btnEN.addEventListener('click', () => {
        if (currentLang === 'en') return;
        currentLang = 'en';
        localStorage.setItem('innjoy-lang', currentLang);
        applyLanguage(currentLang, true);
    });

    function applyLanguage(lang, animate) {
        // Update all elements with data-tr and data-en attributes
        document.querySelectorAll('[data-tr][data-en]').forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });

        // Update slider position and active states
        if (lang === 'tr') {
            slider.classList.remove('slide-right');
            btnTR.classList.add('active');
            btnEN.classList.remove('active');
            document.documentElement.lang = 'tr';
        } else {
            slider.classList.add('slide-right');
            btnEN.classList.add('active');
            btnTR.classList.remove('active');
            document.documentElement.lang = 'en';
        }

        // Update page title and meta description
        document.title = lang === 'tr'
            ? 'InnJoy — Akıllı Otel Deneyimi'
            : 'InnJoy — Smart Hotel Experience';

        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.content = lang === 'tr'
                ? 'InnJoy — Akıllı Otel Deneyimi. Misafirlerinize ve otel yönetimine yeni bir boyut kazandırın. QR ile kapı açma, oda servisi, spa, etkinlikler ve daha fazlası.'
                : 'InnJoy — Smart Hotel Experience. Bring a new dimension to your guests and hotel management. QR door access, room service, spa, events and more.';
        }
    }
}

/* =============================================
   Scroll Progress Bar
   ============================================= */

function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const scrollTop  = window.scrollY;
        const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
        const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width  = pct + '%';
    }, { passive: true });
}

/* =============================================
   Back to Top Button
   ============================================= */

function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* =============================================
   Dark / Light Mode Toggle
   ============================================= */

function initThemeToggle() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;

    // Load saved preference (default: dark)
    const saved = localStorage.getItem('innjoy-theme');
    if (saved === 'light') {
        document.body.classList.add('light-mode');
    }

    btn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('innjoy-theme', isLight ? 'light' : 'dark');
    });
}

/* =============================================
   Copy-to-Clipboard (Credentials in HIW section)
   ============================================= */

function initDemoModal() {
    // Copy buttons in the how-it-works try section
    document.querySelectorAll('.hiw-copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.dataset.copy;
            navigator.clipboard.writeText(text).then(() => {
                btn.classList.add('copied');
                const original = btn.innerHTML;
                btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.innerHTML = original;
                }, 1800);
            });
        });
    });
}

