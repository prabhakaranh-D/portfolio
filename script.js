/**
 * =====================================================
 *  PRABHAKARAN D — PORTFOLIO SCRIPT
 * =====================================================
 *
 *  EmailJS Setup (3 steps):
 *  ─────────────────────────────────────────────────
 *  1. Sign up free at https://www.emailjs.com
 *  2. Add an Email Service (Gmail, Outlook, etc.)
 *  3. Create an Email Template using these variables:
 *       {{from_name}}, {{reply_to}}, {{subject}}, {{message}}, {{to_name}}
 *  4. Replace the 3 placeholders below with your real values.
 * =====================================================
 */

const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';    // Account → API Keys
const EMAILJS_SERVICE_ID = 'service_XXXXXXX';    // Email Services → Service ID
const EMAILJS_TEMPLATE_ID = 'template_XXXXXXX';   // Email Templates → Template ID

/* ─── 1. Initialize EmailJS ─────────────────────── */
try {
    emailjs.init(EMAILJS_PUBLIC_KEY);
} catch (e) {
    console.warn('EmailJS initialization failed:', e);
}

/* ─── 2. Particle Canvas ─────────────────────────── */
(function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: -9999, y: -9999 };

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.r = Math.random() * 1.8 + 0.6;
            this.a = Math.random() * 0.4 + 0.15;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            // Mouse repulsion (subtle)
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80) {
                this.x += dx / dist * 1.2;
                this.y += dy / dist * 1.2;
            }
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(180,190,210,${this.a})`;
            ctx.fill();
        }
    }

    function init() {
        resize();
        particles = Array.from({ length: 70 }, () => new Particle());
    }

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(160,170,190,${0.12 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawLines();
        requestAnimationFrame(loop);
    }

    init();
    loop();
    window.addEventListener('resize', () => { resize(); });
    document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    document.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
})();

/* ─── 3. Typed.js ─────────────────────────────────── */
try {
    new Typed('.typed-target', {
        strings: ['Fullstack Developer', 'UX Designer', 'Web Developer', 'React Developer'],
        typeSpeed: 70,
        backSpeed: 45,
        backDelay: 1800,
        startDelay: 600,
        loop: true,
    });
} catch (e) {
    console.warn('Typed.js initialization failed:', e);
    const typedTarget = document.querySelector('.typed-target');
    if (typedTarget) typedTarget.textContent = 'Fullstack Developer';
}

/* ─── 4. Sticky Navbar + Active Link ─────────────── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateNav() {
    const scrollY = window.scrollY;

    // Sticky glass effect
    navbar.classList.toggle('scrolled', scrollY > 60);

    // Active link highlight
    let currentSection = '';
    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 150) {
            currentSection = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

/* ─── 5. Mobile Hamburger Menu ───────────────────── */
const togglebtn = document.getElementById('togglebtn');
const navlinksEl = document.getElementById('navlinks');

togglebtn.addEventListener('click', () => {
    togglebtn.classList.toggle('open');
    navlinksEl.classList.toggle('open');
});

// Close menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        togglebtn.classList.remove('open');
        navlinksEl.classList.remove('open');
    });
});

/* ─── 6. Smooth Scroll for nav links ─────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetTop = target.offsetTop - navHeight - 10;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
});

/* ─── 7. Scroll Reveal Animation ─────────────────── */
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger siblings if they're in the same grid
                const siblings = entry.target.closest('.projects-grid, .tools-grid, .skills-grid, .about-grid, .contact-grid');
                if (siblings) {
                    const all = [...siblings.querySelectorAll('.reveal:not(.visible)')];
                    const idx = all.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${idx * 80}ms`;
                }
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── 8. Animated Counters ───────────────────────── */
let countersStarted = false;
const heroStats = document.querySelector('.hero-stats');

function animateCounters() {
    if (countersStarted) return;
    countersStarted = true;
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const fps = 60;
        const steps = (duration / 1000) * fps;
        const increment = target / steps;
        let current = 0;

        const tick = () => {
            current += increment;
            if (current < target) {
                el.textContent = Math.floor(current);
                requestAnimationFrame(tick);
            } else {
                el.textContent = target;
            }
        };
        tick();
    });
}

// Trigger counters when hero stats scroll into view
if (heroStats) {
    const counterObserver = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                counterObserver.disconnect();
            }
        },
        { threshold: 0.5 }
    );
    counterObserver.observe(heroStats);
}

/* ─── 9. Skills Bar Animation ────────────────────── */
const skillsBarsEl = document.querySelector('.skills-bars');
let skillsAnimated = false;

if (skillsBarsEl) {
    const skillsObserver = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting && !skillsAnimated) {
                skillsAnimated = true;
                document.querySelectorAll('.skill-fill').forEach((bar, i) => {
                    setTimeout(() => {
                        bar.style.width = bar.getAttribute('data-width') + '%';
                        setTimeout(() => bar.classList.add('animated'), 1200);
                    }, i * 150);
                });
                skillsObserver.disconnect();
            }
        },
        { threshold: 0.3 }
    );
    skillsObserver.observe(skillsBarsEl);
}

/* ─── 10. Project Filter Tabs ────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const show = filter === 'all' || category === filter;
            card.style.display = show ? 'flex' : 'none';
        });
    });
});

/* ─── 11. Back to Top Button ─────────────────────── */
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

/* ─── 12. Contact Form (EmailJS) ─────────────────── */
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Check placeholder keys
        if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
            formMessage.textContent = '⚠️ EmailJS is not configured yet. Please set your public key, service ID, and template ID in script.js.';
            formMessage.className = 'form-message error';
            return;
        }

        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        formMessage.className = 'form-message';

        // Add the recipient name to the template params
        const templateParams = {
            from_name: document.getElementById('from_name').value,
            reply_to: document.getElementById('reply_to').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            to_name: 'Prabhakaran D',
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(() => {
                formMessage.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
                formMessage.className = 'form-message success';
                contactForm.reset();
            })
            .catch((error) => {
                console.error('EmailJS error:', error);
                formMessage.textContent = '❌ Oops! Something went wrong. Please try again or email me directly.';
                formMessage.className = 'form-message error';
            })
            .finally(() => {
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            });
    });
}
