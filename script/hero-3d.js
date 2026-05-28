/* ============================================================
   deepblue — Hero 3D wave (Three.js)
   ------------------------------------------------------------
   A horizontally-tilted, vertex-displaced wireframe plane that
   sits in the hero as a "data wave" — references the wave +
   binary-code motif of the deepblue logo without competing with
   the existing particle canvas (this scene has a transparent
   background and floats above it).
   ------------------------------------------------------------
   Requirements: Three.js global build loaded BEFORE this script.
   ============================================================ */

(function () {
    'use strict';

    if (typeof THREE === 'undefined') {
        console.warn('[hero-3d] Three.js not loaded — skipping.');
        return;
    }

    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Don't run on the smallest screens — saves battery + avoids
       overdrawing the already-rich hero on phones. */
    if (window.matchMedia('(max-width: 720px)').matches) return;

    const host = document.getElementById('hero');
    if (!host) return;

    /* --------------------------------------------------------
       Mount a dedicated canvas for our 3D scene
       -------------------------------------------------------- */
    const canvas = document.createElement('canvas');
    canvas.className = 'hero-3d-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    /* Insert AFTER the existing particle canvas but BEFORE the
       hero overlay/content, so 3D sits over particles but under text. */
    const overlay = document.getElementById('heroOverlay');
    if (overlay) host.insertBefore(canvas, overlay);
    else host.appendChild(canvas);

    /* --------------------------------------------------------
       Renderer + scene + camera
       -------------------------------------------------------- */
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 1.2, 6);
    camera.lookAt(0, 0, 0);

    /* --------------------------------------------------------
       Wave geometry — large subdivided plane, displaced by noise
       in the vertex shader. Rendered as both:
       (a) a thin wireframe (the "data grid")
       (b) a filled mesh with very low opacity (the "depth")
       -------------------------------------------------------- */
    const SEG = 80;
    const geom = new THREE.PlaneGeometry(14, 9, SEG, Math.floor(SEG * 0.66));
    geom.rotateX(-Math.PI * 0.5); /* Plane becomes horizontal (XZ) */

    /* Shared shader chunks for both materials below */
    const vertHead = `
        uniform float uTime;
        varying float vH;

        /* Layered sine waves — natural water/data feel */
        float waveHeight(vec2 p) {
            float t = uTime * 0.45;
            float h = 0.0;
            h += sin(p.x * 0.55 + t)            * 0.40;
            h += sin(p.x * 1.10 - t * 1.30)     * 0.18;
            h += sin(p.y * 0.70 + t * 0.85)     * 0.30;
            h += cos(p.y * 1.35 + t * 0.35)     * 0.14;
            h += sin((p.x + p.y) * 0.85 - t * 0.6) * 0.12;
            return h;
        }
    `;
    const vertMain = `
        vec3 pos = position;
        float h = waveHeight(pos.xz);
        pos.y += h;
        vH = h;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    `;

    /* Wireframe material — the grid lines */
    const wireMat = new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 },
            uCyan: { value: new THREE.Color('#4ED7E0') },
            uCyanLight: { value: new THREE.Color('#9AE5EB') },
        },
        vertexShader: `
            ${vertHead}
            void main() { ${vertMain} }
        `,
        fragmentShader: `
            uniform vec3 uCyan;
            uniform vec3 uCyanLight;
            varying float vH;
            void main() {
                vec3 col = mix(uCyan, uCyanLight, smoothstep(-0.2, 0.5, vH));
                float a = 0.55 + smoothstep(-0.3, 0.5, vH) * 0.35;
                gl_FragColor = vec4(col, a);
            }
        `,
        wireframe: true,
        transparent: true,
        depthWrite: false,
    });

    /* Soft filled material — adds depth between grid lines */
    const fillMat = new THREE.ShaderMaterial({
        uniforms: {
            uTime: wireMat.uniforms.uTime, /* shared time */
            uCyan: { value: new THREE.Color('#1A4A6E') },
            uCyanLight: { value: new THREE.Color('#0B1F36') },
        },
        vertexShader: wireMat.vertexShader,
        fragmentShader: `
            uniform vec3 uCyan;
            uniform vec3 uCyanLight;
            varying float vH;
            void main() {
                vec3 col = mix(uCyanLight, uCyan, smoothstep(-0.4, 0.6, vH));
                gl_FragColor = vec4(col, 0.30);
            }
        `,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
    });

    const wave = new THREE.Group();
    wave.add(new THREE.Mesh(geom, fillMat));
    wave.add(new THREE.Mesh(geom, wireMat));
    /* Tilt the whole group slightly so the wave is angled toward the viewer */
    wave.rotation.x = 0.18;
    wave.position.y = -0.4;
    scene.add(wave);

    /* --------------------------------------------------------
       Resize handling — match canvas to its CSS box size
       -------------------------------------------------------- */
    function resize() {
        const rect = host.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        renderer.setSize(w, h, false);
        camera.aspect = w / Math.max(h, 1);
        camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', () => requestAnimationFrame(resize));

    /* --------------------------------------------------------
       Mouse parallax + scroll-driven camera lift
       -------------------------------------------------------- */
    let mx = 0, my = 0;
    let tmx = 0, tmy = 0;
    let scrollY = 0;

    host.addEventListener('mousemove', (e) => {
        const r = host.getBoundingClientRect();
        /* normalize to -1..1 */
        tmx = ((e.clientX - r.left) / r.width) * 2 - 1;
        tmy = ((e.clientY - r.top) / r.height) * 2 - 1;
    });
    host.addEventListener('mouseleave', () => { tmx = 0; tmy = 0; });

    window.addEventListener('scroll', () => {
        scrollY = Math.min(1, window.scrollY / window.innerHeight);
    }, { passive: true });

    /* --------------------------------------------------------
       Animation loop
       -------------------------------------------------------- */
    const clock = new THREE.Clock();
    let raf = 0;

    function frame() {
        const t = clock.getElapsedTime();
        wireMat.uniforms.uTime.value = t;

        /* Mouse parallax — lerp toward target */
        mx += (tmx - mx) * 0.05;
        my += (tmy - my) * 0.05;

        /* Camera follows mouse subtly + lifts back as user scrolls */
        camera.position.x = mx * 0.7;
        camera.position.y = 1.2 - my * 0.4 + scrollY * 1.5;
        camera.position.z = 6 + scrollY * 1.2;
        camera.lookAt(0, 0, 0);

        /* Slow rotation of the wave itself */
        wave.rotation.y = t * 0.04;

        renderer.render(scene, camera);
        raf = requestAnimationFrame(frame);
    }

    if (prefersReduce) {
        renderer.render(scene, camera); /* one static frame */
    } else {
        raf = requestAnimationFrame(frame);
    }

    /* Pause when tab hidden (saves battery) */
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (raf) cancelAnimationFrame(raf);
        } else if (!prefersReduce) {
            raf = requestAnimationFrame(frame);
        }
    });
})();
