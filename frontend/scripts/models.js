console.log('🚀 Iniciando carga de modelos 3D...');

// Función para crear modelo 3D básico que siempre funciona
function createAsteroid(canvasId, color = 0x8B4513, size = 1) {
    console.log(`Creando asteroide en canvas: ${canvasId}`);
    
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error(`Canvas ${canvasId} no encontrado`);
        return;
    }

    // Verificar que Three.js esté disponible
    if (typeof THREE === 'undefined') {
        console.error('Three.js no está cargado');
        canvas.style.background = 'linear-gradient(45deg, #1a1a2e, #16213e)';
        canvas.style.display = 'flex';
        canvas.style.alignItems = 'center';
        canvas.style.justifyContent = 'center';
        canvas.innerHTML = '<div style="color: white; text-align: center;">🌌<br>Modelo 3D<br>Loading...</div>';
        return;
    }

    // Configurar escena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        antialias: true, 
        alpha: true 
    });

    // Configurar tamaño del canvas
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 300;
    const height = rect.height || 250;
    
    renderer.setSize(width, height);
    renderer.setClearColor(0x000011, 0.3);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    console.log(`Canvas ${canvasId} configurado: ${width}x${height}`);

    // Luces
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Crear geometría de asteroide
    const geometry = new THREE.IcosahedronGeometry(size * 0.8, 1); // Reducir tamaño base
    
    // Deformar para parecer asteroide irregular
    const positions = geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        const factor = 0.7 + Math.random() * 0.6;
        positions[i] *= factor;
        positions[i + 1] *= factor;
        positions[i + 2] *= factor;
    }
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();

    // Material del asteroide
    const material = new THREE.MeshPhongMaterial({
        color: color,
        shininess: 10,
        specular: 0x111111,
        wireframe: false
    });

    const asteroid = new THREE.Mesh(geometry, material);
    scene.add(asteroid);

    // Posicionar cámara más lejos para mejor vista
    camera.position.set(0, 0, 4);
    camera.lookAt(0, 0, 0);

    console.log(`Asteroide ${canvasId} creado exitosamente`);

    // Función de animación
    function animate() {
        requestAnimationFrame(animate);
        
        asteroid.rotation.x += 0.005;
        asteroid.rotation.y += 0.01;
        
        renderer.render(scene, camera);
    }

    // Iniciar animación
    animate();

    // Manejar redimensionamiento de ventana
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

// Función para intentar cargar modelo GLB (si existe)
function tryLoadGLB(canvasId, modelPath, texturePath) {
    console.log(`Intentando cargar GLB: ${modelPath}`);
    
    // Primero crear asteroide por defecto más pequeño
    const fallback = createAsteroid(canvasId, 0x8B4513, 0.8);
    
    // Verificar si GLTFLoader está disponible
    if (typeof THREE.GLTFLoader === 'undefined') {
        console.warn('GLTFLoader no disponible');
        return;
    }

    const loader = new THREE.GLTFLoader();
    
    loader.load(
        modelPath,
        function(gltf) {
            console.log(`✅ Modelo ${modelPath} cargado exitosamente`);
            
            // Remover asteroide fallback
            if (fallback && fallback.asteroid) {
                fallback.scene.remove(fallback.asteroid);
            }
            
            const model = gltf.scene;
            
            // Calcular el tamaño del modelo y escalarlo apropiadamente
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2.0 / maxDim; // Escalar para que quepa bien en la vista
            
            model.scale.setScalar(scale);
            
            // Centrar el modelo
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center.multiplyScalar(scale));
            
            fallback.scene.add(model);
            
            // Ajustar cámara para mejor vista del modelo GLB
            fallback.camera.position.set(0, 0, 2);
            fallback.camera.lookAt(0, 0, 0);
            
            // Aplicar textura si existe
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
            
            // ⭐ NUEVA ANIMACIÓN PARA EL MODELO GLB
            function animateGLB() {
                requestAnimationFrame(animateGLB);
                
                // Rotar el modelo GLB cargado
                model.rotation.x += 0.005;
                model.rotation.y += 0.01;
                
                fallback.renderer.render(fallback.scene, fallback.camera);
            }
            
            // Iniciar animación específica para el modelo GLB
            animateGLB();
        },
        function(progress) {
            const percent = (progress.loaded / progress.total * 100);
            console.log(`Cargando ${modelPath}: ${percent.toFixed(1)}%`);
        },
        function(error) {
            console.warn(`❌ Error cargando ${modelPath}:`, error);
            console.log('Usando modelo fallback');
        }
    );
}

// Función principal para inicializar todos los modelos
function initAllModels() {
    console.log('🌟 Inicializando todos los modelos 3D...');
    
    // Verificar que Three.js esté cargado
    if (typeof THREE === 'undefined') {
        console.error('❌ Three.js no está disponible');
        setTimeout(initAllModels, 500); // Reintentar en 500ms
        return;
    }

    console.log('✅ Three.js detectado, creando modelos...');

    // Modelos próximos
    tryLoadGLB('model-proximo1', 'assets/models/apophis.glb', 'assets/textures/textura.jpeg');
    tryLoadGLB('model-proximo2', 'assets/models/asteroid_2024_yr4.glb', 'assets/textures/textura.jpeg');
    tryLoadGLB('model-chicxulub', 'assets/models/chucucu.glb', 'assets/textures/textura.jpeg')
    tryLoadGLB('model-chelyabinsk', 'assets/models/Cheliabiskifinal.glb', 'assets/textures/textura.jpeg')
    tryLoadGLB('model-hoba', 'assets/models/hoba.glb', 'assets/textures/textura.jpeg')
    tryLoadGLB('model-bennu', 'assets/models/bennu.glb', 'assets/textures/textura.jpeg')
    tryLoadGLB('model-4vesta', 'assets/models/4vesta.glb', 'assets/textures/textura.jpeg')
    // Modelos conocidos
    createAsteroid('model-chelyabinsk', 0x5A5A5A, 0.9);
    createAsteroid('model-hoba', 0x4A4A4A, 2.0);
    createAsteroid('model-bennu', 0xC0C0C0, 0.7);
    createAsteroid('model-4vesta', 0x8B7355, 1.2);
    createAsteroid('model-chicxulub', 0x654321, 1.0);

    console.log('🎉 Todos los modelos han sido inicializados');
}

// Esperar a que el DOM y las librerías estén cargadas
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM cargado, esperando Three.js...');
    
    // Intentar inicializar inmediatamente
    initAllModels();
    
    // También intentar después de un breve delay por si acaso
    setTimeout(initAllModels, 1000);
});

// Backup: inicializar cuando la ventana termine de cargar
window.addEventListener('load', function() {
    console.log('🔄 Window load event, verificando modelos...');
    
    // Solo re-inicializar si no hay modelos visibles
    const canvas1 = document.getElementById('model-proximo1');
    if (canvas1 && !canvas1.style.background) {
        initAllModels();
    }
});