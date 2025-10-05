# 🌌 ARMET - Active Research for Meteor Targeting
## Resumen Ejecutivo del Proyecto

### 🚀 **Descripción General**
**ARMET** (Active Research for Meteor Targeting) es una plataforma web educativa e interactiva desarrollada para el **NASA Space Apps Challenge 2025** por el equipo **Celeste & Blanca Space**. La plataforma combina información científica real sobre asteroides y meteoritos con experiencias interactivas para aumentar la conciencia pública sobre la defensa planetaria.

---

##  **Objetivos Principales**

### **1. Educación Científica**
- Proporcionar información precisa y actualizada sobre asteroides cercanos a la Tierra (NEAs)
- Explicar estrategias de mitigación de impactos asteroidales
- Mostrar datos históricos de meteoritos conocidos

### **2. Interactividad y Gamificación**
- Mini-juego de defensa planetaria para simular estrategias de protección
- Modelos 3D interactivos de asteroides reales
- Experiencia inmersiva con audio ambiental espacial

### **3. Información en Tiempo Real**
- Integración con APIs oficiales de la NASA
- Noticias astronómicas actualizadas diariamente
- Calendario de eventos astronómicos relevantes

---

##  **Arquitectura del Sistema**

### **Frontend (Página Web Principal)**
```
frontend/
├── 📄 index.html          → Página principal con información de meteoritos
├── 📄 noticias.html       → Sección de noticias astronómicas
├── 📄 gamecard.html       → Mini-juego de defensa planetaria
├── 📁 scripts/            → Lógica JavaScript
│   ├── audio.js           → Control de audio ambiental
│   ├── calendar.js        → Modal de calendario astronómico
│   ├── gamecard.js        → Motor del juego de defensa
│   ├── models.js          → Renderizado de modelos 3D
│   └── noticias.js        → Obtención de datos NASA APIs
├── 📁 styles/             → Hojas de estilo CSS
└── 📁 assets/             → Recursos multimedia
    ├── audio/             → Música ambiental espacial
    ├── models/            → Modelos 3D de asteroides (.glb)
    ├── images/            → Logos y gráficos
    └── video/             → Videos de introducción
```

### **Backend (Servidor de Datos)**
```
backend/
└── server.js              → Servidor Express.js para APIs locales
```

---

##  **Características Principales**

### **1. Sistema de Noticias en Tiempo Real**
- **NASA APOD Integration**: Imagen astronómica del día automática
- **RSS Feed Processing**: Últimas 5 noticias de NASA Breaking News
- **Auto-actualización**: Contenido fresco en cada visita
- **Fuentes verificadas**: Datos directos de servidores oficiales NASA

### **2. Mini-juego de Defensa Planetaria**
- **Mecánicas de juego**: Sistema de turnos con asteroides vs defensas
- **Estrategias realistas**: Basado en técnicas reales de deflección (DART, Impactadores cinéticos, etc.)
- **Sistema de puntuación**: Retroalimentación inmediata sobre estrategias
- **Audio inmersivo**: Música espacial ambiental durante el juego

### **3. Modelos 3D Interactivos**
- **Asteroides reales**: Apophis, Bennu, 4 Vesta, asteroid 2024 YR4
- **Meteoritos históricos**: Chelyabinsk, Chicxulub, Hoba
- **Tecnología Three.js**: Renderizado WebGL con animaciones suaves
- **Fallback system**: Modelos procedurales si GLB files fallan

### **4. Información Educativa Estructurada**
- **Asteroides próximos**: Datos de próximos acercamientos a la Tierra
- **Meteoritos conocidos**: Información histórica y científica
- **Estrategias de mitigación**: Explicación de técnicas de defensa planetaria
- **Calendario astronómico**: Eventos relevantes con integración Google Calendar

---

##  **Tecnologías Implementadas**

### **Frontend Technologies**
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño responsivo con Flexbox y Grid
- **JavaScript ES6+**: Programación asíncrona y modular
- **Three.js**: Renderizado 3D y animaciones
- **WebGL**: Aceleración gráfica por hardware

### **APIs y Servicios Externos**
- **NASA APOD API**: `api.nasa.gov/planetary/apod`
- **NASA RSS Feed**: Conversión RSS→JSON via `rss2json.com`
- **Google Calendar API**: Integración de eventos astronómicos
- **Three.js GLTFLoader**: Carga de modelos 3D avanzados

### **Multimedia y Assets**
- **Audio WebAPI**: Control de audio ambiental
- **GLB/GLTF Models**: Modelos 3D de alta calidad
- **Responsive Images**: Optimización para múltiples dispositivos
- **Video Integration**: Material introductorio y explicativo

---

##  **Experiencia de Usuario**

### **Flujo Principal**
1. **Landing Page**: Introducción con video hero y navegación intuitiva
2. **Información Educativa**: Secciones de asteroides próximos y conocidos
3. **Noticias Actualizadas**: Feed en tiempo real de NASA
4. **Juego Interactivo**: Simulación de defensa planetaria
5. **Modelos 3D**: Exploración visual de asteroides reales

### **Características de Accesibilidad**
- **Diseño responsivo**: Funcional en desktop, tablet y móvil
- **Controles de audio**: Activación/desactivación de música ambiental
- **Navegación intuitiva**: Menú claro y consistente
- **Contenido educativo**: Explicaciones científicas accesibles

---

##  **Impacto Educativo y Científico**

### **Valor Educativo**
- **Conciencia científica**: Aumenta el conocimiento sobre amenazas asteroidales
- **Estrategias reales**: Enseña técnicas de defensa planetaria actuales
- **Datos verificados**: Información científica precisa y actualizada
- **Experiencia práctica**: Aprendizaje through gamificación

### **Contribución a la Defensa Planetaria**
- **Divulgación científica**: Hace accesible la ciencia espacial compleja
- **Preparación pública**: Educa sobre estrategias de mitigación
- **Compromiso ciudadano**: Fomenta interés en programas espaciales
- **Alfabetización científica**: Mejora comprensión de riesgos cósmicos

---

##  **Logros Técnicos**

### **Integración Exitosa**
- ✅ **APIs NASA funcionales**: Datos en tiempo real sin interrupciones
- ✅ **Renderizado 3D optimizado**: Modelos GLB con fallbacks robustos
- ✅ **Juego completamente funcional**: Mecánicas balanceadas y divertidas
- ✅ **Diseño responsivo**: Experiencia consistente en todos los dispositivos
- ✅ **Documentación completa**: Código comentado y mantenible

### **Innovaciones Implementadas**
- **Sistema híbrido de modelos**: Combina GLB reales con geometría procedural
- **Mecánicas de juego educativas**: Gamificación de conceptos científicos reales
- **Feed automatizado**: Actualización de contenido sin intervención manual
- **Audio espacial inmersivo**: Experiencia multisensorial
- **Arquitectura modular**: Fácil mantenimiento y expansión

---

##  **Próximos Pasos y Escalabilidad**

### **Expansiones Planificadas**
- **Más asteroides**: Integración de base de datos JPL/NASA más amplia
- **Realidad aumentada**: Visualización AR de asteroides
- **Multiplayer**: Modo colaborativo en el juego de defensa
- **Simulaciones avanzadas**: Cálculos orbitales en tiempo real
- **Integración redes sociales**: Compartir descubrimientos y puntajes

### **Potencial de Impacto**
- **Plataforma educativa**: Uso en escuelas y universidades
- **Divulgación científica**: Apoyo a programas de divulgación NASA
- **Investigación ciudadana**: Contribuciones de la comunidad
- **Concientización global**: Difusión de la importancia de la defensa planetaria

---

##  **Equipo Celeste & Blanca Space**
*Desarrollado para NASA Space Apps Challenge 2025*

**ARMET** representa un paso significativo hacia la democratización del conocimiento sobre defensa planetaria, combinando tecnología web moderna con información científica precisa para crear una experiencia educativa única e impactante.

---

*"Protegiendo la Tierra a través de la educación, la tecnología y la ciencia"*