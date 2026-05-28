/* ============================================================
   deepblue — Cinematic layer
   - Lenis smooth scroll (with anchor link intercept)
   - Custom cursor (white ring, mix-blend-mode: difference)
   - Preloader (1.2s intro, sessionStorage)
   - GSAP ScrollTrigger parallax on project images
   ------------------------------------------------------------
   Designed to coexist with the existing inline JS in index.html.
   Doesn't touch any existing handlers — purely additive.
   ============================================================ */

(function () {
    'use strict';

    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* --------------------------------------------------------
       1. Preloader — shows on first session visit
       -------------------------------------------------------- */
    function initPreloader() {
        const SESSION_KEY = 'deepblue-preloaded';
        if (sessionStorage.getItem(SESSION_KEY)) return;
        if (prefersReduce) {
            sessionStorage.setItem(SESSION_KEY, '1');
            return;
        }

        const overlay = document.createElement('div');
        overlay.className = 'preloader';
        overlay.setAttribute('aria-hidden', 'true');
        overlay.innerHTML = `
            <div class="preloader-inner">
                <div class="preloader-logo">
                    <img src="images/deepblue_logo.jpeg" alt="" />
                </div>
                <div class="preloader-word">deep<span>blue</span></div>
                <div class="preloader-tag">consultoria · 2026</div>
            </div>
        `;
        document.body.appendChild(overlay);
        document.documentElement.style.overflow = 'hidden';

        const HOLD = 1100;
        setTimeout(() => overlay.classList.add('exiting'), HOLD);
        setTimeout(() => {
            overlay.remove();
            document.documentElement.style.overflow = '';
            sessionStorage.setItem(SESSION_KEY, '1');
        }, HOLD + 700);
    }

    /* --------------------------------------------------------
       2. Custom cursor — single ring, mix-blend-mode: difference
       -------------------------------------------------------- */
    function initCursor() {
        const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
        if (!mq.matches || prefersReduce) return;

        const ring = document.createElement('div');
        ring.className = 'cursor-ring';
        ring.dataset.state = 'idle';
        ring.setAttribute('aria-hidden', 'true');
        document.body.appendChild(ring);
        document.documentElement.classList.add('no-cursor');

        let mx = window.innerWidth / 2, my = window.innerHeight / 2;
        let rx = mx, ry = my;

        const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select, summary, label, [data-cursor="hover"]';

        const onMove = (e) => {
            mx = e.clientX; my = e.clientY;
            ring.style.opacity = '1';
        };
        const onOver = (e) => {
            const target = e.target;
            ring.dataset.state = target.closest && target.closest(HOVER_SELECTOR) ? 'hover' : 'idle';
        };
        const onLeave = () => { ring.style.opacity = '0'; };

        const loop = () => {
            rx += (mx - rx) * 0.22;
            ry += (my - ry) * 0.22;
            ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);

        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('pointerover', onOver, { passive: true });
        document.addEventListener('mouseleave', onLeave);
    }

    /* --------------------------------------------------------
       3. Lenis smooth scroll + anchor intercept
       -------------------------------------------------------- */
    function initLenis() {
        if (prefersReduce || typeof Lenis === 'undefined') return null;

        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.6,
        });

        function loop(time) {
            lenis.raf(time);
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);

        /* Intercept anchor clicks in CAPTURE phase so we run before
           the existing inline smooth-scroll handler. */
        document.addEventListener('click', (e) => {
            const a = e.target.closest && e.target.closest('a[href^="#"]');
            if (!a) return;
            const href = a.getAttribute('href');
            if (!href || href === '#') return;
            const el = document.querySelector(href);
            if (!el) return;
            const navbar = document.getElementById('navbar');
            const offset = -((navbar?.offsetHeight || 80) + 20);
            e.preventDefault();
            /* Stop the existing handler from also firing */
            e.stopImmediatePropagation();
            lenis.scrollTo(el, { offset });
        }, { capture: true });

        return lenis;
    }

    /* --------------------------------------------------------
       4. GSAP ScrollTrigger — project image parallax + reveals
       -------------------------------------------------------- */
    function initGsap(lenis) {
        if (prefersReduce || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        gsap.registerPlugin(ScrollTrigger);

        /* Keep ScrollTrigger in sync with Lenis (so scrub timings match
           the smoothed scroll position, not the raw native scroll). */
        if (lenis) {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => lenis.raf(time * 1000));
            gsap.ticker.lagSmoothing(0);
        }

        /* Project images: gentle parallax — image translates slower than
           its container as you scroll. Subtle, doesn't break layout. */
        document.querySelectorAll('.project-card .project-image img').forEach((img) => {
            gsap.fromTo(img,
                { yPercent: -8, scale: 1.08 },
                {
                    yPercent: 8,
                    scale: 1.08,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: img.closest('.project-card'),
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 0.6,
                    },
                }
            );
        });

        /* Service cards: gentle stagger entrance when grid enters viewport */
        const servicesGrid = document.querySelector('.services-grid');
        if (servicesGrid) {
            gsap.from(servicesGrid.querySelectorAll('.service-card'), {
                y: 40,
                opacity: 0,
                duration: 0.85,
                ease: 'power3.out',
                stagger: 0.08,
                scrollTrigger: {
                    trigger: servicesGrid,
                    start: 'top 75%',
                    once: true,
                },
            });
        }

        /* Manifesto lines: stagger in from the side */
        const manifestoList = document.querySelector('.manifesto-list');
        if (manifestoList) {
            gsap.from(manifestoList.querySelectorAll('li'), {
                x: -30,
                opacity: 0,
                duration: 0.7,
                ease: 'power3.out',
                stagger: 0.10,
                scrollTrigger: {
                    trigger: manifestoList,
                    start: 'top 80%',
                    once: true,
                },
            });
        }
    }

    /* --------------------------------------------------------
       Boot sequence
       -------------------------------------------------------- */
    function boot() {
        initPreloader();
        initCursor();
        const lenis = initLenis();
        initGsap(lenis);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
