## 🛰️ Sistema de Noticias en Tiempo Real – ARMET

El apartado **Noticias** de la plataforma **Celeste & Blanca Space** integra información astronómica y espacial actualizada directamente desde las **fuentes oficiales de la NASA**, garantizando contenido verificado y en tiempo real.

### 🔹 Funcionamiento general
El módulo combina **dos servicios oficiales de la NASA**:

1. **NASA APOD (Astronomy Picture of the Day)**  
   - Endpoint: `https://api.nasa.gov/planetary/apod`  
   - Requiere API Key propia (`api.nasa.gov`).  
   - Muestra automáticamente la **imagen o video del día** junto con su descripción y fecha oficial.  
   - Se actualiza **cada 24 horas** sin intervención manual.  
   - Cumple la función de *“Noticia del día”* en la página.

2. **NASA Breaking News Feed (RSS)**  
   - Fuente RSS: `https://www.nasa.gov/rss/dyn/breaking_news.rss`  
   - Se convierte a JSON mediante el servicio `https://api.rss2json.com/v1/api.json`.  
   - Devuelve múltiples artículos en tiempo real, incluyendo título, descripción, fecha, enlace y miniatura.  
   - En la web se muestran las **5 noticias más recientes** publicadas en NASA.gov.

### 🔹 Flujo de actualización
1. Al cargar la página `noticias.html`, el sistema ejecuta el script `noticias.js`.  
2. El script realiza dos solicitudes HTTP:
   - Una al endpoint APOD, usando la API Key local.
   - Otra al RSS de NASA Breaking News, convertido a JSON.
3. Los datos obtenidos se procesan y renderizan dinámicamente en el DOM, creando tarjetas (`.news-card`) para cada noticia.  
4. Cada nueva visita o actualización de la página muestra la información más reciente disponible desde los servidores oficiales de la NASA.

### 🔹 Ventajas
- **Automatización completa:** no requiere mantenimiento manual.  
- **Actualización diaria y continua:** sincronizada con los servidores oficiales de la NASA.  
- **Fiabilidad de fuente:** todos los datos provienen de NASA APIs públicas.  
- **Diseño responsivo:** las tarjetas se adaptan automáticamente a distintos dispositivos.  

### 🔹 Archivos involucrados
- `noticias.html` → Estructura principal del módulo.  
- `scripts/noticias.js` → Lógica de obtención y renderizado dinámico.  
- `style.css` → Estilos visuales coherentes con la interfaz general del proyecto ARMET.

---

**En resumen:**  
El sistema de noticias en ARMET convierte la información astronómica de la NASA en un flujo dinámico y accesible para el público general, integrando tecnología API, RSS y renderizado en tiempo real dentro de una interfaz moderna y educativa.


