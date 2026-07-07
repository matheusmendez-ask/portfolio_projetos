/* ============================================================
   deepblue — Immersive deep-ocean scene (Three.js)
   ------------------------------------------------------------
   A FIXED full-page canvas behind the whole site. Sections with
   solid backgrounds paint over it; #hero, .manifesto and
   .cta-section are transparent "windows" into the scene.

   Scene: wireframe data-wave + 3 depth layers of drifting cyan
   particles + exponential fog. Camera descends as you scroll
   (the deeper you read, the deeper you dive) with mouse parallax.

   Replaces script/hero-3d.js (hero-only version).
   Requirements: Three.js global build loaded BEFORE this script.
   ============================================================ */

(function () {
    'use strict';

    if (typeof THREE === 'undefined') {
        console.warn('[immersive] Three.js not loaded — skipping.');
        return;
    }

    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    /* ponytail: mobile keeps the existing 2D particle hero — 3D scene is desktop-only */
    if (window.matchMedia('(max-width: 720px)').matches) return;

    /* --------------------------------------------------------
       Canvas — first child of body so every later positioned
       element (sections) paints above it in the stacking order
       -------------------------------------------------------- */
    const canvas = document.createElement('canvas');
    canvas.className = 'immersive-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(canvas, document.body.firstChild);

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 120);
    camera.position.set(0, 1.2, 9);

    /* --------------------------------------------------------
       Theme palettes — light mode is body.light in v1
       -------------------------------------------------------- */
    const PALETTES = {
        dark: {
            bg: new THREE.Color('#06091A'),
            fogDensity: 0.030,
            waveA: new THREE.Color('#4ED7E0'),
            waveB: new THREE.Color('#9AE5EB'),
            particle: new THREE.Color('#4ED7E0'),
            particleOpacity: 0.75,
        },
        light: {
            bg: new THREE.Color('#EDE7D8'),
            fogDensity: 0.034,
            waveA: new THREE.Color('#0E7E97'),
            waveB: new THREE.Color('#0EA5C7'),
            particle: new THREE.Color('#0E7E97'),
            particleOpacity: 0.55,
        },
    };

    function currentPalette() {
        return document.body.classList.contains('light') ? PALETTES.light : PALETTES.dark;
    }

    /* --------------------------------------------------------
       Wave — subdivided plane displaced by layered sines
       -------------------------------------------------------- */
    const waveGeom = new THREE.PlaneGeometry(70, 44, 96, 64);
    waveGeom.rotateX(-Math.PI * 0.5);

    const waveShaderHead = `
        uniform float uTime;
        varying float vH;
        float waveHeight(vec2 p) {
            float t = uTime * 0.40;
            float h = 0.0;
            h += sin(p.x * 0.30 + t)                * 0.70;
            h += sin(p.x * 0.62 - t * 1.25)         * 0.32;
            h += sin(p.y * 0.38 + t * 0.80)         * 0.52;
            h += cos(p.y * 0.74 + t * 0.35)         * 0.24;
            h += sin((p.x + p.y) * 0.46 - t * 0.55) * 0.20;
            return h;
        }
    `;

    const wireMat = new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 },
            uColA: { value: PALETTES.dark.waveA.clone() },
            uColB: { value: PALETTES.dark.waveB.clone() },
            uFogColor: { value: PALETTES.dark.bg.clone() },
            uFogDensity: { value: PALETTES.dark.fogDensity },
        },
        vertexShader: `
            ${waveShaderHead}
            varying float vFogDepth;
            void main() {
                vec3 pos = position;
                float h = waveHeight(pos.xz);
                pos.y += h;
                vH = h;
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                vFogDepth = -mvPosition.z;
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            uniform vec3 uColA;
            uniform vec3 uColB;
            uniform vec3 uFogColor;
            uniform float uFogDensity;
            varying float vH;
            varying float vFogDepth;
            void main() {
                vec3 col = mix(uColA, uColB, smoothstep(-0.4, 1.0, vH));
                float a = 0.42 + smoothstep(-0.5, 1.0, vH) * 0.38;
                /* manual exp2 fog so it composites right with transparency */
                float fogF = 1.0 - exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth);
                fogF = clamp(fogF, 0.0, 1.0);
                col = mix(col, uFogColor, fogF);
                a *= 1.0 - fogF * 0.85;
                gl_FragColor = vec4(col, a);
            }
        `,
        wireframe: true,
        transparent: true,
        depthWrite: false,
    });

    const wave = new THREE.Mesh(waveGeom, wireMat);
    wave.position.y = -4.2;
    scene.add(wave);

    /* --------------------------------------------------------
       Particles — 3 depth bands of slow-drifting points
       -------------------------------------------------------- */
    const particleGroups = [];
    const BANDS = [
        { count: 500, size: 0.055, spread: [46, 22, 34], zOff: -14, opacity: 0.35 },
        { count: 380, size: 0.085, spread: [40, 18, 26], zOff: -6,  opacity: 0.55 },
        { count: 220, size: 0.130, spread: [34, 14, 18], zOff: 0,   opacity: 0.85 },
    ];

    BANDS.forEach((band) => {
        const positions = new Float32Array(band.count * 3);
        const speeds = new Float32Array(band.count);
        for (let i = 0; i < band.count; i++) {
            positions[i * 3]     = (Math.random() - 0.5) * band.spread[0];
            positions[i * 3 + 1] = (Math.random() - 0.5) * band.spread[1];
            positions[i * 3 + 2] = (Math.random() - 0.5) * band.spread[2] + band.zOff;
            speeds[i] = 0.15 + Math.random() * 0.5;
        }
        const geom = new THREE.BufferGeometry();
        geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const mat = new THREE.PointsMaterial({
            color: PALETTES.dark.particle.clone(),
            size: band.size,
            transparent: true,
            opacity: band.opacity,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true,
        });
        const points = new THREE.Points(geom, mat);
        points.userData = { speeds, band };
        scene.add(points);
        particleGroups.push(points);
    });

    /* --------------------------------------------------------
       Theme application + observer (v1 toggles body.light)
       -------------------------------------------------------- */
    function applyTheme() {
        const p = currentPalette();
        renderer.setClearColor(p.bg, 1);
        wireMat.uniforms.uColA.value.copy(p.waveA);
        wireMat.uniforms.uColB.value.copy(p.waveB);
        wireMat.uniforms.uFogColor.value.copy(p.bg);
        wireMat.uniforms.uFogDensity.value = p.fogDensity;
        particleGroups.forEach((pts) => {
            pts.material.color.copy(p.particle);
            pts.material.opacity = pts.userData.band.opacity * (p.particleOpacity / 0.75);
            /* additive blending washes out on pale bg — switch to normal in light */
            pts.material.blending = p === PALETTES.light ? THREE.NormalBlending : THREE.AdditiveBlending;
            pts.material.needsUpdate = true;
        });
    }
    applyTheme();
    new MutationObserver(applyTheme).observe(document.body, {
        attributes: true,
        attributeFilter: ['class'],
    });

    /* --------------------------------------------------------
       Resize / scroll / mouse
       -------------------------------------------------------- */
    function resize() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / Math.max(h, 1);
        camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', () => requestAnimationFrame(resize));

    let scrollProgress = 0; /* 0..1 across the whole document */
    function onScroll() {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    let tmx = 0, tmy = 0, mx = 0, my = 0;
    window.addEventListener('pointermove', (e) => {
        tmx = (e.clientX / window.innerWidth) * 2 - 1;
        tmy = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });

    /* --------------------------------------------------------
       Intro — particles gather to spell "deepblue", hold, then
       disperse back into the ocean. Silent-fail: any problem
       leaves the particles in normal ocean mode.
       -------------------------------------------------------- */
    const clock = new THREE.Clock();
    const intro = { phase: 'idle', t0: 0, k: 0 };
    const GATHER_S = 1.8, HOLD_S = 1.6, RELEASE_S = 1.6;
    const easeIO = (u) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);

    function buildWordTargets() {
        const W = 1100, H = 260;
        const cv = document.createElement('canvas');
        cv.width = W; cv.height = H;
        const c2 = cv.getContext('2d');
        c2.fillStyle = '#fff';
        c2.font = '800 150px Geist, Arial, sans-serif';
        c2.textAlign = 'center';
        c2.textBaseline = 'middle';
        c2.fillText('deepblue', W / 2, H / 2);
        const data = c2.getImageData(0, 0, W, H).data;
        const pts = [];
        const STEP = 6;
        for (let y = 0; y < H; y += STEP) {
            for (let x = 0; x < W; x += STEP) {
                if (data[(y * W + x) * 4 + 3] > 128) {
                    pts.push([
                        (x / W - 0.5) * 9.0 + 1.6,  /* world x — clear of the DOM headline */
                        (0.5 - y / H) * 2.2 + 1.45, /* world y — upper-right quadrant */
                        1.5,                         /* world z — in front of the wave */
                    ]);
                }
            }
        }
        return pts;
    }

    const fontsReady = (document.fonts && document.fonts.ready)
        ? document.fonts.ready : Promise.resolve();
    Promise.race([fontsReady, new Promise((r) => setTimeout(r, 900))]).then(() => {
        try {
            if (prefersReduce || window.scrollY > 120) { intro.phase = 'done'; return; }
            const wordPts = buildWordTargets();
            if (wordPts.length < 50) { intro.phase = 'done'; return; }
            let gi = 0;
            particleGroups.forEach((pts) => {
                const n = pts.userData.speeds.length;
                const word = new Float32Array(n * 3);
                for (let i = 0; i < n; i++) {
                    const p = wordPts[gi % wordPts.length]; gi++;
                    word[i * 3]     = p[0] + (Math.random() - 0.5) * 0.06;
                    word[i * 3 + 1] = p[1] + (Math.random() - 0.5) * 0.06;
                    word[i * 3 + 2] = p[2] + (Math.random() - 0.5) * 0.35;
                }
                pts.userData.word = word;
                /* snapshot of ocean positions to return to */
                pts.userData.start = new Float32Array(pts.geometry.attributes.position.array);
            });
            intro.phase = 'gather';
            intro.t0 = clock.getElapsedTime();
        } catch (e) { intro.phase = 'done'; }
    });

    /* --------------------------------------------------------
       Animation loop
       -------------------------------------------------------- */
    let raf = 0;

    function frame() {
        const t = clock.getElapsedTime();
        wireMat.uniforms.uTime.value = t;

        const ph = intro.phase;

        if (ph === 'gather' || ph === 'hold' || ph === 'release') {
            /* Word formation phases — positions interpolate start↔word */
            const el = t - intro.t0;
            let k;
            if (ph === 'gather')      k = easeIO(Math.min(el / GATHER_S, 1));
            else if (ph === 'hold')   k = 1;
            else                      k = intro.k * (1 - easeIO(Math.min(el / RELEASE_S, 1)));
            if (ph !== 'release') intro.k = k;

            particleGroups.forEach((pts) => {
                const { word, start, speeds } = pts.userData;
                if (!word) return;
                const pos = pts.geometry.attributes.position;
                for (let i = 0; i < speeds.length; i++) {
                    const sx = start[i * 3], sy = start[i * 3 + 1], sz = start[i * 3 + 2];
                    const shimmer = ph === 'hold' ? Math.sin(t * 2.5 + i) * 0.015 : 0;
                    pos.setXYZ(i,
                        sx + (word[i * 3]     - sx) * k,
                        sy + (word[i * 3 + 1] + shimmer - sy) * k,
                        sz + (word[i * 3 + 2] - sz) * k
                    );
                }
                pos.needsUpdate = true;
                pts.rotation.y = 0;
            });

            /* Phase transitions — scrolling away skips ahead */
            const interrupted = window.scrollY > 150;
            if (ph === 'gather' && (el >= GATHER_S)) { intro.phase = 'hold'; intro.t0 = t; }
            else if (ph === 'gather' && interrupted) { intro.phase = 'release'; intro.t0 = t; }
            else if (ph === 'hold' && (el >= HOLD_S || interrupted)) { intro.phase = 'release'; intro.t0 = t; }
            else if (ph === 'release' && el >= RELEASE_S) { intro.phase = 'done'; }
        } else {
            /* Normal ocean — slow particle drift, sideways loop */
            particleGroups.forEach((pts, gi) => {
                const pos = pts.geometry.attributes.position;
                const speeds = pts.userData.speeds;
                const spreadX = pts.userData.band.spread[0];
                for (let i = 0; i < speeds.length; i++) {
                    let x = pos.getX(i) + speeds[i] * 0.006;
                    if (x > spreadX / 2) x = -spreadX / 2;
                    pos.setX(i, x);
                }
                pos.needsUpdate = true;
                pts.rotation.y = Math.sin(t * 0.03 + gi) * 0.02;
            });
        }

        /* Mouse parallax (lerped) */
        mx += (tmx - mx) * 0.04;
        my += (tmy - my) * 0.04;

        /* Camera dive + manifesto cinema hook (cinematic.js writes it) */
        const cine = window.__immersiveCine;
        camera.position.x = mx * 0.9 + (cine ? cine.x : 0);
        camera.position.y = 1.2 - scrollProgress * 4.6 - my * 0.35;
        camera.position.z = 9 - scrollProgress * 2.5;
        camera.lookAt(mx * 0.5, camera.position.y - 0.6, 0);
        if (cine && cine.roll) camera.rotation.z += cine.roll;

        renderer.render(scene, camera);
        raf = requestAnimationFrame(frame);
    }

    if (prefersReduce) {
        renderer.render(scene, camera); /* one static frame */
    } else {
        raf = requestAnimationFrame(frame);
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (raf) cancelAnimationFrame(raf);
        } else if (!prefersReduce) {
            raf = requestAnimationFrame(frame);
        }
    });
})();
