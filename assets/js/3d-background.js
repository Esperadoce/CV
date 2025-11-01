// ===== 3D BACKGROUND WITH THREE.JS =====
let scene, camera, renderer, particlesMesh, shapes = [];
let mouseX = 0, mouseY = 0;
let touchStartX = 0, touchStartY = 0;
let cameraRotationX = 0, cameraRotationY = 0;
let animationFrameId = null;

export function init3D() {
    const canvas = document.getElementById('canvas-3d');

    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.log('Waiting for Three.js to load...');
        setTimeout(init3D, 100);
        return;
    }

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // Use full device pixel ratio for crisp rendering
    camera.position.z = 5;

    // Create particles
    createParticles();

    // Create geometric shapes
    createGeometricShapes();

    // Add lighting
    addLighting();

    // Setup interactions
    setupInteractions(canvas);

    // Handle window resize
    window.addEventListener('resize', onWindowResize);

    // Show canvas
    canvas.classList.add('loaded');

    // Start animation
    animate();
}

function createParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000; // Increased for better visibility
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 30; // Increased spread
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.025, // Slightly larger
        color: 0x667eea,
        transparent: true,
        opacity: 0.9 // Increased opacity
    });

    particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
}

function createGeometricShapes() {
    const geometries = [
        new THREE.IcosahedronGeometry(0.6, 1), // Increased size and detail
        new THREE.OctahedronGeometry(0.6, 1),
        new THREE.TetrahedronGeometry(0.6, 1),
        new THREE.TorusGeometry(0.4, 0.12, 16, 100)
    ];

    const material = new THREE.MeshPhongMaterial({
        color: 0x667eea,
        wireframe: true,
        transparent: true,
        opacity: 0.75, // Increased for sharper appearance
        emissive: 0x667eea, // Add glow effect
        emissiveIntensity: 0.3 // Increased glow
    });

    for (let i = 0; i < 20; i++) { // Increased to 20 for better coverage
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const mesh = new THREE.Mesh(geometry, material);

        // Spread objects more evenly across the scene
        mesh.position.x = (Math.random() - 0.5) * 18;
        mesh.position.y = (Math.random() - 0.5) * 30; // Increased vertical range even more
        mesh.position.z = (Math.random() - 0.5) * 15;

        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;

        mesh.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            },
            originalY: mesh.position.y // Store original position
        };

        scene.add(mesh);
        shapes.push(mesh);
    }
}

function addLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x667eea, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
}

function setupInteractions(canvas) {
    // Mouse interaction for desktop
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Touch gestures for mobile
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    // Show touch hint on mobile
    if ('ontouchstart' in window) {
        setTimeout(() => {
            const hint = document.getElementById('touchHint');
            if (hint) {
                hint.classList.add('show');
                setTimeout(() => {
                    hint.classList.remove('show');
                }, 3000);
            }
        }, 2000);
    }
}

function handleTouchStart(e) {
    if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }
}

function handleTouchMove(e) {
    if (e.touches.length === 1) {
        e.preventDefault();

        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;

        const deltaX = touchX - touchStartX;
        const deltaY = touchY - touchStartY;

        cameraRotationY += deltaX * 0.005;
        cameraRotationX += deltaY * 0.005;

        touchStartX = touchX;
        touchStartY = touchY;
    }
}

function handleTouchEnd() {
    // Reset touch tracking if needed
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    animationFrameId = requestAnimationFrame(animate);

    if (particlesMesh) {
        // Rotate particles
        particlesMesh.rotation.y += 0.0005;
        particlesMesh.rotation.x += 0.0003;

        // Rotate shapes
        shapes.forEach(shape => {
            shape.rotation.x += shape.userData.rotationSpeed.x;
            shape.rotation.y += shape.userData.rotationSpeed.y;
            shape.rotation.z += shape.userData.rotationSpeed.z;
        });

        // Camera follows mouse on desktop or touch gestures on mobile
        if ('ontouchstart' in window) {
            // Mobile: use touch gesture rotation
            camera.position.x = Math.sin(cameraRotationY) * 5;
            camera.position.y = Math.sin(cameraRotationX) * 3;
            camera.position.z = Math.cos(cameraRotationY) * 5;
        } else {
            // Desktop: follow mouse
            camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
            camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
        }

        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
}

export function update3DOnScroll() {
    if (shapes.length === 0) return;

    const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);

    shapes.forEach((shape, index) => {
        const offset = index * 0.2;
        // Move shapes up and down based on scroll with original position as base
        const scrollMovement = Math.sin(scrollPercent * Math.PI * 4 + offset) * 3;
        shape.position.y = shape.userData.originalY + scrollMovement;

        // Add horizontal movement for more dynamic effect
        shape.position.x += Math.sin(scrollPercent * Math.PI + offset) * 0.002;
    });

    if (particlesMesh) {
        // Rotate particles based on scroll
        particlesMesh.rotation.z = scrollPercent * Math.PI * 2;
        // Move particles slightly based on scroll
        particlesMesh.position.y = -scrollPercent * 2;
    }
}

export function cleanup3D() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
}
