#  ARMET - Notas Técnicas de Desarrollo
## Documentación Técnica Completa

---

##  **Índice de Contenidos**
1. [Stack Tecnológico](#stack-tecnológico)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [APIs y Servicios Externos](#apis-y-servicios-externos)
4. [Configuración de Desarrollo](#configuración-de-desarrollo)
5. [Estructura de Archivos](#estructura-de-archivos)
6. [Componentes Frontend](#componentes-frontend)
7. [Sistema de Renderizado 3D](#sistema-de-renderizado-3d)
8. [Audio y Multimedia](#audio-y-multimedia)
9. [Optimizaciones y Performance](#optimizaciones-y-performance)
10. [Deployment y Producción](#deployment-y-producción)

---

##  **Stack Tecnológico**

### **Frontend Core**
```javascript
// Tecnologías base
HTML5 (Semantic markup)
CSS3 (Flexbox, Grid, Animations)
JavaScript ES6+ (Async/Await, Modules, Classes)
```

### **Librerías JavaScript**
```javascript
// Renderizado 3D
Three.js v150+ (WebGL, GLTFLoader, Geometries)

// No frameworks adicionales - Vanilla JavaScript puro
// Decisión de diseño para máximo control y rendimiento
```

### **Multimedia Technologies**
```javascript
// Audio
Web Audio API (Control de audio ambiental)
HTML5 Audio Element (Música de fondo)

// Video
HTML5 Video Element (Material introductorio)

// Modelos 3D
GLTF/GLB Format (Compresión optimizada)
Procedural Geometry (Fallback system)
```

---

## 🏗️ **Arquitectura del Sistema**

### **Patrón de Diseño**
```
Arquitectura: Modular Component-Based
Patrón: Observer Pattern (Event-driven)
Estructura: Frontend SPA + Backend API Server
```

### **Frontend Architecture**
```javascript
frontend/
├── index.html              // Landing page principal
├── noticias.html           // Página de noticias NASA
├── gamecard.html           // Interfaz del mini-juego
├── scripts/
│   ├── audio.js            // Módulo de control de audio
│   ├── calendar.js         // Modal de calendario astronómico
│   ├── gamecard.js         // Motor del juego de defensa
│   ├── models.js           // Renderizado de modelos 3D
│   └── noticias.js         // Obtención de datos NASA APIs
├── styles/                 // CSS modular por componente
└── assets/                 // Recursos multimedia
```

### **Backend Architecture**
```javascript
backend/
└── server.js               // Express.js API server
    ├── CORS handling
    ├── Static file serving
    ├── API proxy endpoints
    └── Error handling middleware
```

---

## 🌐 **APIs y Servicios Externos**

### **1. NASA APOD (Astronomy Picture of the Day)**
```javascript
// Configuración
Endpoint: https://api.nasa.gov/planetary/apod
Method: GET
API Key: Required (api.nasa.gov)
Rate Limit: 1000 requests/hour

// Implementación
const API_KEY = "Ie3jrajsuZ1DfwEZdR91Se2lS5gazb1lvojY0NRe";
const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);

// Response Schema
{
  "title": string,
  "explanation": string,
  "url": string,
  "hdurl": string (optional),
  "media_type": "image" | "video",
  "date": "YYYY-MM-DD"
}
```

### **2. NASA Breaking News RSS**
```javascript
// Configuración
RSS Source: https://www.nasa.gov/rss/dyn/breaking_news.rss
Conversion: RSS2JSON service
Endpoint: https://api.rss2json.com/v1/api.json

// Implementación
const rssURL = "https://api.rss2json.com/v1/api.json?rss_url=https://www.nasa.gov/rss/dyn/breaking_news.rss";
const response = await fetch(rssURL);

// Response Schema
{
  "status": "ok",
  "items": [
    {
      "title": string,
      "description": string,
      "link": string,
      "pubDate": string,
      "enclosure": { "link": string }
    }
  ]
}
```

### **3. Google Calendar Integration**
```javascript
// Configuración
Service: Google Calendar API
Implementation: Iframe embedding
URL: https://calendar.google.com/calendar/embed

// Eventos astronómicos predefinidos
- Eclipses solares y lunares
- Lluvias de meteoros
- Acercamientos de asteroides
- Misiones espaciales importantes
```

---

## ⚙️ **Configuración de Desarrollo**

### **Requisitos del Sistema**
```bash
# Servidor web local (cualquiera de estos)
Node.js + http-server
Python + SimpleHTTPServer  
Live Server (VS Code extension)
Apache/Nginx

# Navegadores soportados
Chrome 90+
Firefox 88+
Safari 14+
Edge 90+
```

### **Setup de Desarrollo**
```bash
# 1. Clonar repositorio
git clone https://github.com/sportillocaballero-coder/Celeste-y-Blanca-Space-2025.git

# 2. Navegar al frontend
cd frontend/

# 3. Servir archivos (opción Node.js)
npx http-server -c-1 -p 8080

# 3. Servir archivos (opción Python)
python -m http.server 8080

# 4. Abrir en navegador
http://localhost:8080
```

### **Backend Setup**
```bash
# 1. Navegar al backend
cd backend/

# 2. Instalar dependencias
npm install express cors

# 3. Ejecutar servidor
node server.js

# Servidor disponible en http://localhost:3000
```

---

## 📁 **Estructura de Archivos Detallada**

### **Frontend Structure**
```
frontend/
├── 📄 index.html                    (4.2KB) - Landing page
├── 📄 noticias.html                 (3.8KB) - News page  
├── 📄 gamecard.html                 (3.1KB) - Game interface
├── 📁 scripts/
│   ├── 📜 audio.js                  (2.1KB) - Audio controller
│   ├── 📜 calendar.js               (4.7KB) - Calendar modal
│   ├── 📜 gamecard.js               (8.9KB) - Game engine
│   ├── 📜 models.js                 (7.2KB) - 3D renderer
│   └── 📜 noticias.js               (3.4KB) - NASA API client
├── 📁 styles/
│   ├── 📜 main.css                  (5.1KB) - Base styles
│   ├── 📜 gamecard.css              (3.2KB) - Game UI styles
│   ├── 📜 noticias.css              (2.8KB) - News styles
│   ├── 📜 calendar.css              (2.1KB) - Calendar styles
│   ├── 📜 models.css                (1.9KB) - 3D canvas styles
│   ├── 📜 conocidos.css             (2.3KB) - Known asteroids
│   ├── 📜 proximos.css              (2.1KB) - Upcoming asteroids
│   └── 📜 video.css                 (1.7KB) - Video styles
└── 📁 assets/
    ├── 📁 audio/
    │   ├── 🎵 ArMet Spatial Ambient Sound.wav  (15.2MB)
    │   └── 🎵 gamecard.mp3                     (2.1MB)
    ├── 📁 models/
    │   ├── 🧊 apophis.glb                      (890KB)
    │   ├── 🧊 bennu.glb                        (1.2MB)
    │   ├── 🧊 4vesta.glb                       (950KB)
    │   ├── 🧊 asteroid_2024_yr4.glb           (720KB)
    │   ├── 🧊 Chelyabinsk.glb                 (680KB)
    │   ├── 🧊 chicxulub.glb                   (1.1MB)
    │   └── 🧊 hoba.glb                        (580KB)
    ├── 📁 images/
    │   ├── 🖼️ logo-CyB.png                     (45KB)
    │   └── 🖼️ logo-CyB--embossed.png          (67KB)
    ├── 📁 textures/
    │   └── 🖼️ textura.jpeg                     (120KB)
    └── 📁 video/
        ├── 🎬 Portada1.mp4                     (8.9MB)
        └── 🎬 1851190-uhd_3840_2160_25fps.mp4  (125MB)
```

---

## 🎮 **Componentes Frontend**

### **1. Game Engine (gamecard.js)**
```javascript
// Arquitectura del juego
Patrón: State Machine
Estados: [menu, playing, resolved, game-over]
Mecánicas: Turn-based combat system

// Componentes principales
class GameState {
  round: number
  earthHP: number
  score: number
  wins: number
  selected: DefenseType[]
  collabActive: boolean
  resolved: boolean
  meteor: MeteoriteType
}

// Sistema de combate
function resolveRound(defenses, meteorite) {
  // Cálculo de efectividad basado en tipos
  // Retroalimentación visual inmediata
  // Actualización de estado del juego
}
```

### **2. 3D Renderer (models.js)**
```javascript
// Three.js Setup
Scene: THREE.Scene()
Camera: THREE.PerspectiveCamera(75, 1, 0.1, 1000)
Renderer: THREE.WebGLRenderer({ antialias: true, alpha: true })

// Sistema híbrido de modelos
Primary: GLB/GLTF models (NASA accurate)
Fallback: Procedural IcosahedronGeometry
Lighting: Ambient + Directional
Animation: Continuous rotation (0.005, 0.01 rad/frame)

// Responsive handling
window.addEventListener('resize', updateCanvasSize);
```

### **3. NASA API Client (noticias.js)**
```javascript
// Async data fetching
async function loadNASAData() {
  const [apod, news] = await Promise.all([
    fetchAPOD(),
    fetchBreakingNews()
  ]);
  
  // Error handling
  try {
    // API calls
  } catch (error) {
    // Fallback content
    // User notification
  }
}

// DOM manipulation
function renderNewsCards(newsData) {
  // Dynamic HTML generation
  // Image optimization
  // Responsive layout
}
```

### **4. Audio Controller (audio.js)**
```javascript
// Web Audio API implementation
const audioContext = new AudioContext();
let currentAudio = null;
let isPlaying = false;

// Audio control functions
function toggleAudio() {
  // State management
  // User preference storage
  // Accessibility compliance
}

// Spatial audio features
function setupSpatialAudio() {
  // 3D audio positioning
  // Ambient space soundscape
}
```

---

## 🎨 **Sistema de Renderizado 3D**

### **Three.js Configuration**
```javascript
// Renderer settings
const renderer = new THREE.WebGLRenderer({
  canvas: targetCanvas,
  antialias: true,        // Smooth edges
  alpha: true,           // Transparent background
  preserveDrawingBuffer: true
});

renderer.setSize(width, height);
renderer.setClearColor(0x000011, 0.3);  // Deep space blue
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
```

### **Lighting System**
```javascript
// Ambient lighting (space environment)
const ambientLight = new THREE.AmbientLight(0x404040, 0.6);

// Directional lighting (simulated sunlight)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;

// Shadow configuration
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
```

### **Model Loading Pipeline**
```javascript
// GLB/GLTF Loader
const loader = new THREE.GLTFLoader();

loader.load(
  modelPath,
  (gltf) => {
    // Success callback
    const model = gltf.scene;
    
    // Auto-scaling based on bounding box
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2.0 / maxDim;
    
    model.scale.setScalar(scale);
    
    // Centering
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center.multiplyScalar(scale));
    
    scene.add(model);
  },
  (progress) => {
    // Loading progress callback
    const percent = (progress.loaded / progress.total * 100);
    console.log(`Loading ${modelPath}: ${percent.toFixed(1)}%`);
  },
  (error) => {
    // Error callback - fallback to procedural
    console.warn(`Error loading ${modelPath}:`, error);
    createProceduralAsteroid();
  }
);
```

### **Procedural Geometry Fallback**
```javascript
// Asteroid generation
function createProceduralAsteroid(size, color) {
  const geometry = new THREE.IcosahedronGeometry(size * 0.8, 1);
  
  // Vertex deformation for realistic asteroid shape
  const positions = geometry.attributes.position.array;
  for (let i = 0; i < positions.length; i += 3) {
    const factor = 0.7 + Math.random() * 0.6;
    positions[i] *= factor;      // X
    positions[i + 1] *= factor;  // Y
    positions[i + 2] *= factor;  // Z
  }
  
  geometry.attributes.position.needsUpdate = true;
  geometry.computeVertexNormals();
  
  // Material with realistic asteroid appearance
  const material = new THREE.MeshPhongMaterial({
    color: color,
    shininess: 10,
    specular: 0x111111,
    bumpScale: 0.3
  });
  
  return new THREE.Mesh(geometry, material);
}
```

---

## 🔊 **Audio y Multimedia**

### **Audio System Architecture**
```javascript
// Global audio state
let audioEnabled = localStorage.getItem('audioEnabled') !== 'false';
let currentAudio = null;
let audioContext = null;

// Audio initialization
function initAudio() {
  if (!audioEnabled) return;
  
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    loadAmbientSound();
  } catch (error) {
    console.warn('Web Audio API not supported:', error);
    fallbackToHTMLAudio();
  }
}

// Spatial audio implementation
function setupSpatialAudio() {
  const panner = audioContext.createPanner();
  panner.panningModel = 'HRTF';
  panner.distanceModel = 'inverse';
  panner.refDistance = 1;
  panner.maxDistance = 10000;
  panner.rolloffFactor = 1;
  panner.coneInnerAngle = 360;
  panner.coneOuterAngle = 0;
  panner.coneOuterGain = 0;
  
  // Position audio in 3D space
  panner.setPosition(0, 0, 0);
  
  return panner;
}
```

### **Video Integration**
```javascript
// Hero video configuration
const heroVideo = document.querySelector('#hero-video');
heroVideo.autoplay = true;
heroVideo.muted = true;        // Required for autoplay
heroVideo.loop = true;
heroVideo.playsInline = true;  // Mobile compatibility

// Video optimization
heroVideo.addEventListener('loadeddata', () => {
  // Preload optimization
  heroVideo.currentTime = 0;
});

// Responsive video handling
function updateVideoSize() {
  const container = heroVideo.parentElement;
  const containerRatio = container.offsetWidth / container.offsetHeight;
  const videoRatio = heroVideo.videoWidth / heroVideo.videoHeight;
  
  if (containerRatio > videoRatio) {
    heroVideo.style.width = '100%';
    heroVideo.style.height = 'auto';
  } else {
    heroVideo.style.width = 'auto';
    heroVideo.style.height = '100%';
  }
}
```

---

## ⚡ **Optimizaciones y Performance**

### **Loading Optimization**
```javascript
// Lazy loading for 3D models
const observerOptions = {
  threshold: 0.1,
  rootMargin: '50px'
};

const modelObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const canvasId = entry.target.id;
      loadModel(canvasId);
      modelObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all model canvases
document.querySelectorAll('canvas[data-model]').forEach(canvas => {
  modelObserver.observe(canvas);
});
```

### **Memory Management**
```javascript
// Dispose of Three.js resources
function disposeModel(model) {
  model.traverse((child) => {
    if (child.isMesh) {
      child.geometry.dispose();
      if (child.material.map) child.material.map.dispose();
      child.material.dispose();
    }
  });
}

// Audio cleanup
function cleanupAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = '';
    currentAudio = null;
  }
  
  if (audioContext && audioContext.state !== 'closed') {
    audioContext.close();
  }
}
```

### **Performance Monitoring**
```javascript
// FPS monitoring for 3D scenes
let lastTime = 0;
let frameCount = 0;
let fps = 0;

function updateFPS(currentTime) {
  frameCount++;
  
  if (currentTime - lastTime >= 1000) {
    fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
    frameCount = 0;
    lastTime = currentTime;
    
    // Adjust quality based on performance
    if (fps < 30) {
      reduceQuality();
    } else if (fps > 50) {
      increaseQuality();
    }
  }
}

function reduceQuality() {
  // Reduce renderer size
  // Simplify geometry
  // Disable shadows
}
```

---

## 🚀 **Deployment y Producción**

### **Build Process**
```bash
# Optimización de assets
# 1. Comprimir imágenes
imagemin assets/images/* --out-dir=dist/assets/images/

# 2. Minificar CSS
cssnano styles/*.css --dir dist/styles/

# 3. Minificar JavaScript
terser scripts/*.js --compress --mangle --output dist/scripts/

# 4. Optimizar modelos 3D
gltf-pipeline -i assets/models/*.glb -o dist/assets/models/ --draco
```

### **Server Configuration**
```javascript
// Express.js production setup
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https://apod.nasa.gov"],
      connectSrc: ["'self'", "https://api.nasa.gov", "https://api.rss2json.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      mediaSrc: ["'self'"]
    }
  }
}));

// Compression
app.use(compression());

// Static files with caching
app.use(express.static('public', {
  maxAge: '1d',
  etag: true
}));

// CORS for APIs
app.use('/api', cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:8080'],
  credentials: true
}));
```

### **Environment Variables**
```bash
# .env file
NODE_ENV=production
PORT=3000
NASA_API_KEY=your_nasa_api_key_here
ALLOWED_ORIGINS=https://armet.space,https://www.armet.space

# Database (if needed)
DATABASE_URL=your_database_url_here

# CDN Configuration
CDN_URL=https://cdn.armet.space
ASSET_VERSION=v1.0.0
```

### **Performance Metrics**
```javascript
// Web Vitals monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics service
  gtag('event', metric.name, {
    event_category: 'Web Vitals',
    value: Math.round(metric.value),
    non_interaction: true,
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

---

## 🔒 **Seguridad y Mejores Prácticas**

### **Content Security Policy**
```html
<!-- CSP Header -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com;
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
               img-src 'self' data: https://apod.nasa.gov;
               connect-src 'self' https://api.nasa.gov https://api.rss2json.com;">
```

### **API Key Management**
```javascript
// Nunca exponer API keys en frontend
// Usar variables de entorno en backend
const NASA_API_KEY = process.env.NASA_API_KEY;

// Proxy endpoint para ocultar API key
app.get('/api/apod', async (req, res) => {
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch APOD data' });
  }
});
```

### **Input Validation y Sanitización**
```javascript
// Validación de entrada para formularios
function sanitizeInput(input) {
  return input
    .trim()
    .replace(/[<>\"']/g, '') // Remover caracteres peligrosos
    .slice(0, 100); // Limitar longitud
}

// Validación de URLs
function isValidURL(url) {
  try {
    const parsedURL = new URL(url);
    return ['http:', 'https:'].includes(parsedURL.protocol);
  } catch {
    return false;
  }
}
```

---

## 📊 **Métricas y Monitoreo**

### **Performance Tracking**
```javascript
// Load time measurement
window.addEventListener('load', () => {
  const loadTime = performance.now();
  console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
  
  // Track model loading times
  trackAssetLoading();
});

function trackAssetLoading() {
  const resources = performance.getEntriesByType('resource');
  
  resources.forEach(resource => {
    if (resource.name.includes('.glb') || resource.name.includes('.mp3')) {
      console.log(`${resource.name}: ${resource.duration.toFixed(2)}ms`);
    }
  });
}
```

### **Error Tracking**
```javascript
// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  
  // Send to monitoring service
  if (typeof gtag !== 'undefined') {
    gtag('event', 'exception', {
      description: event.error.message,
      fatal: false
    });
  }
});

// Unhandled promise rejection
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  
  // Prevent default browser behavior
  event.preventDefault();
});
```

---

## 🚀 **Próximas Mejoras Técnicas**

### **Optimizaciones Planificadas**
- **Service Workers** para caching offline
- **WebAssembly** para cálculos orbitales complejos
- **Progressive Web App** features
- **WebRTC** para funcionalidades multiplayer
- **WebGL 2.0** para efectos visuales avanzados

### **Expansiones de Backend**
- **Base de datos** para datos de asteroides persistentes
- **Cache Redis** para APIs externas
- **Rate limiting** para protección de APIs
- **Websockets** para actualizaciones en tiempo real
- **Microservicios** para escalabilidad

---

*Documentación técnica completa del proyecto ARMET v1.0*  
*Última actualización: Octubre 2025* 