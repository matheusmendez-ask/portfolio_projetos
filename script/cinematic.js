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

        window.__lenis = lenis; /* debug/verification hook */

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
            /* Extra buffer (40px) so section header is comfortably below
               the nav after the navbar shrinks into its scrolled state. */
            const offset = -((navbar?.offsetHeight || 80) + 40);
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

        initManifestoCinema();
    }

    /* --------------------------------------------------------
       Manifesto cinema — pinned scroll sequence (desktop only).
       The section pins for ~350vh while each of the 5 principles
       takes the stage one at a time; the 3D camera behind pans
       via the window.__immersiveCine hook read by immersive.js.
       Mobile / reduced-motion keep the original list + IO reveal.
       -------------------------------------------------------- */
    function initManifestoCinema() {
        if (!window.matchMedia('(min-width: 1025px)').matches) return;

        const section = document.querySelector('.manifesto');
        const list = section?.querySelector('.manifesto-list');
        const items = list ? Array.from(list.querySelectorAll('li')) : [];
        if (!section || items.length < 2) return;

        section.classList.add('cinema');

        /* Neutralize the IntersectionObserver reveal on these nodes —
           GSAP owns them now (CSS transition is killed by .cinema). */
        section.querySelectorAll('[data-animate]').forEach((el) => el.classList.add('animated'));

        /* Progress rail (one dot per principle) */
        const rail = document.createElement('div');
        rail.className = 'manifesto-progress';
        rail.setAttribute('aria-hidden', 'true');
        items.forEach(() => rail.appendChild(document.createElement('span')));
        section.appendChild(rail);
        const dots = Array.from(rail.children);
        const setDot = (idx) => dots.forEach((d, i) => d.classList.toggle('on', i === idx));
        setDot(0);

        /* Camera hook — immersive.js adds these values every frame.
           Path is 0 → peak → 0 so nothing leaks outside the section. */
        const cine = (window.__immersiveCine = { x: 0, roll: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: '+=350%',
                pin: true,
                scrub: 0.8,
                onUpdate(self) {
                    setDot(Math.min(items.length - 1, Math.floor(self.progress * items.length)));
                },
            },
        });

        items.forEach((li, i) => {
            tl.fromTo(li,
                { autoAlpha: 0, y: 70, scale: 0.97 },
                { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
            );
            tl.to(li, { duration: 0.7 }); /* hold */
            if (i < items.length - 1) {
                tl.to(li, { autoAlpha: 0, y: -70, duration: 0.6, ease: 'power2.in' });
            }
        });

        /* Camera sweep across the whole pinned distance: pan right then
           settle back, with a subtle roll — starts and ends at neutral. */
        const total = tl.duration();
        gsap.timeline({
            scrollTrigger: { trigger: section, start: 'top top', end: '+=350%', scrub: 0.8 },
        })
            .to(cine, { x: 1.6, roll: 0.045, duration: total * 0.5, ease: 'sine.inOut' })
            .to(cine, { x: 0, roll: 0, duration: total * 0.5, ease: 'sine.inOut' });
    }

    /* --------------------------------------------------------
       Scroll progress bar — thin cyan line at the very top
       -------------------------------------------------------- */
    function initProgress() {
        const bar = document.createElement('div');
        bar.className = 'scroll-progress';
        bar.setAttribute('aria-hidden', 'true');
        document.body.appendChild(bar);

        let ticking = false;
        function update() {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
            ticking = false;
        }
        window.addEventListener('scroll', () => {
            if (!ticking) { ticking = true; requestAnimationFrame(update); }
        }, { passive: true });
        update();
    }

    /* --------------------------------------------------------
       Boot sequence
       -------------------------------------------------------- */
    function boot() {
        initPreloader();
        initCursor();
        initProgress();
        const lenis = initLenis();
        initGsap(lenis);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
