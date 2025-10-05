console.log('🚀 Starting 3D models loading...');

// Function to create basic 3D model that always works
function createAsteroid(canvasId, color = 0x8B4513, size = 1) {
    console.log(`Creating asteroid in canvas: ${canvasId}`);
    
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error(`Canvas ${canvasId} not found`);
        return;
    }

    // Verify that Three.js is available
    if (typeof THREE === 'undefined') {
        console.error('Three.js is not loaded');
        canvas.style.background = 'linear-gradient(45deg, #1a1a2e, #16213e)';
        canvas.style.display = 'flex';
        canvas.style.alignItems = 'center';
        canvas.style.justifyContent = 'center';
        canvas.innerHTML = '<div style="color: white; text-align: center;">🌌<br>3D Model<br>Loading...</div>';
        return;
    }

    // Configure scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        antialias: true, 
        alpha: true 
    });

    // Configure canvas size
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 300;
    const height = rect.height || 250;
    
    renderer.setSize(width, height);
    renderer.setClearColor(0x000011, 0.3);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    console.log(`Canvas ${canvasId} configured: ${width}x${height}`);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create asteroid geometry
    const geometry = new THREE.IcosahedronGeometry(size * 0.8, 1); // Reduce base size
    
    // Deform to look like irregular asteroid
    const positions = geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        const factor = 0.7 + Math.random() * 0.6;
        positions[i] *= factor;
        positions[i + 1] *= factor;
        positions[i + 2] *= factor;
    }
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();

    // Asteroid material
    const material = new THREE.MeshPhongMaterial({
        color: color,
        shininess: 10,
        specular: 0x111111,
        wireframe: false
    });

    const asteroid = new THREE.Mesh(geometry, material);
    scene.add(asteroid);

    // Position camera farther for better view
    camera.position.set(0, 0, 4);
    camera.lookAt(0, 0, 0);

    console.log(`Asteroid ${canvasId} created successfully`);

    // Animation function
    function animate() {
        requestAnimationFrame(animate);
        
        asteroid.rotation.x += 0.005;
        asteroid.rotation.y += 0.01;
        
        renderer.render(scene, camera);
    }

    // Start animation
    animate();

    // Handle window resizing
    window.addEventListener('resize', () => {
        const newRect = canvas.getBoundingClientRect();
        const newWidth = newRect.width || 300;
        const newHeight = newRect.height || 250;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });

    return { scene, camera, renderer, asteroid };
}

// Function to try loading GLB model (if exists)
function tryLoadGLB(canvasId, modelPath, texturePath) {
    console.log(`Trying to load GLB: ${modelPath}`);
    
    // First create smaller default asteroid
    const fallback = createAsteroid(canvasId, 0x8B4513, 0.8);
    
    // Check if GLTFLoader is available
    if (typeof THREE.GLTFLoader === 'undefined') {
        console.warn('GLTFLoader not available');
        return;
    }

    const loader = new THREE.GLTFLoader();
    
    loader.load(
        modelPath,
        function(gltf) {
            console.log(`✅ Model ${modelPath} loaded successfully`);
            
            // Remove fallback asteroid
            if (fallback && fallback.asteroid) {
                fallback.scene.remove(fallback.asteroid);
            }
            
            const model = gltf.scene;
            
            // Calculate model size and scale appropriately
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2.0 / maxDim; // Scale to fit well in view
            
            model.scale.setScalar(scale);
            
            // Center the model
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center.multiplyScalar(scale));
            
            fallback.scene.add(model);
            
            // Adjust camera for better GLB model view
            fallback.camera.position.set(0, 0, 2);
            fallback.camera.lookAt(0, 0, 0);
            
            // Apply texture if exists
            if (texturePath) {
                const textureLoader = new THREE.TextureLoader();
                textureLoader.load(texturePath, function(texture) {
                    model.traverse(function(child) {
                        if (child.isMesh) {
                            child.material.map = texture;
                            child.material.needsUpdate = true;
                        }
                    });
                });
            }
            
            // ⭐ NEW ANIMATION FOR GLB MODEL
            function animateGLB() {
                requestAnimationFrame(animateGLB);
                
                // Rotate the loaded GLB model
                model.rotation.x += 0.005;
                model.rotation.y += 0.01;
                
                fallback.renderer.render(fallback.scene, fallback.camera);
            }
            
            // Start specific animation for GLB model
            animateGLB();
        },
        function(progress) {
            const percent = (progress.loaded / progress.total * 100);
            console.log(`Loading ${modelPath}: ${percent.toFixed(1)}%`);
        },
        function(error) {
            console.warn(`❌ Error loading ${modelPath}:`, error);
            console.log('Using fallback model');
        }
    );
}

// Main function to initialize all models
function initAllModels() {
    console.log('🌟 Initializing all 3D models...');
    
    // Check that Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('❌ Three.js is not available');
        setTimeout(initAllModels, 500); // Retry in 500ms
        return;
    }

    console.log('✅ Three.js detected, creating models...');

    // Upcoming models
    tryLoadGLB('model-proximo1', 'assets/models/apophis.glb', 'assets/textures/textura.jpeg');
    tryLoadGLB('model-proximo2', 'assets/models/asteroid_2024_yr4.glb', 'assets/textures/textura.jpeg');
    tryLoadGLB('model-chicxulub', 'assets/models/chicxulub.glb', 'assets/textures/textura.jpeg')
    tryLoadGLB('model-chelyabinsk', 'assets/models/Chelyabinsk.glb', 'assets/textures/textura.jpeg')
    tryLoadGLB('model-hoba', 'assets/models/hoba.glb', 'assets/textures/textura.jpeg')
    tryLoadGLB('model-bennu', 'assets/models/bennu.glb', 'assets/textures/textura.jpeg')
    tryLoadGLB('model-4vesta', 'assets/models/4vesta.glb', 'assets/textures/textura.jpeg')
    // Known models
    createAsteroid('model-chelyabinsk', 0x5A5A5A, 0.9);
    createAsteroid('model-hoba', 0x4A4A4A, 2.0);
    createAsteroid('model-bennu', 0xC0C0C0, 0.7);
    createAsteroid('model-4vesta', 0x8B7355, 1.2);
    createAsteroid('model-chicxulub', 0x654321, 1.0);

    console.log('🎉 All models have been initialized');
}

// Wait for DOM and libraries to be loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM loaded, waiting for Three.js...');
    
    // Try to initialize immediately
    initAllModels();
    
    // Also try after a brief delay just in case
    setTimeout(initAllModels, 1000);
});

// Backup: initialize when window finishes loading
window.addEventListener('load', function() {
    console.log('🔄 Window load event, checking models...');
    
    // Only re-initialize if no visible models
    const canvas1 = document.getElementById('model-proximo1');
    if (canvas1 && !canvas1.style.background) {
        initAllModels();
    }
});