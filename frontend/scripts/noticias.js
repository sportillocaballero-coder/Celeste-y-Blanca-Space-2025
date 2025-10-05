/* ================================================================ */
/* SCRIPT PARA CARGAR NOTICIAS ASTRONÓMICAS EN TIEMPO REAL        */
/* ================================================================ */
/* 
 * Este script obtiene información de APIs de NASA para mostrar:
 * - Imagen astronómica del día (APOD)
 * - Noticias recientes del feed RSS de NASA
 * - Manejo de errores si las APIs no responden
 */

// Clave de API de NASA para acceder a sus servicios
const API_KEY = "Ie3jrajsuZ1DfwEZdR91Se2lS5gazb1lvojY0NRe"; // ⚠️ poné tu API key real de api.nasa.gov

// Elementos del DOM donde se mostrarán las noticias
const noticiaDia = document.getElementById("noticia-dia");
const newsContainer = document.getElementById("news-container");

/* ================================================================ */
/* FUNCIÓN: CARGAR IMAGEN ASTRONÓMICA DEL DÍA                     */
/* ================================================================ */
/* 
 * Obtiene la imagen destacada del día desde la API APOD de NASA.
 * Puede ser una imagen o un video, y muestra la explicación científica.
 */
async function cargarNoticiaDelDia() {
  try {
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    let mediaHTML = "";
    if (data.media_type === "image") {
      mediaHTML = `<img src="${data.url}" alt="${data.title}" style="max-width:400px;width:100%;height:auto;border-radius:10px;margin:1rem 0;float:left;margin-right:2rem;">`;
    } else if (data.media_type === "video") {
      mediaHTML = `
        <div style="position:relative;padding-top:56.25%;border-radius:10px;overflow:hidden;margin:1rem 0;max-width:400px;float:left;margin-right:2rem;">
          <iframe src="${data.url}" frameborder="0" allowfullscreen
                  style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>
        </div>`;
    }

    noticiaDia.innerHTML = `
      <div class="news-card" style="display:flex;align-items:flex-start;gap:2rem;overflow:hidden;">
        <div style="flex-shrink:0;">
          ${mediaHTML}
        </div>
        <div style="flex:1;">
          <h3>🛰️ Imagen del día: ${data.title}</h3>
          <p>${data.explanation}</p>
          <p><strong>Fecha:</strong> ${data.date}</p>
          ${data.hdurl ? `<a href="${data.hdurl}" target="_blank">Ver en alta resolución</a>` : ""}
        </div>
      </div>
    `;
  } catch (err) {
    console.error("Error APOD:", err);
    noticiaDia.innerHTML = `<p>No se pudo cargar la noticia del día.</p>`;
  }
}

/* ================================================================ */
/* FUNCIÓN: CARGAR NOTICIAS RECIENTES DE NASA                     */
/* ================================================================ */
/* 
 * Obtiene las últimas 5 noticias del feed RSS oficial de NASA.
 * Usa un servicio intermediario (rss2json) para convertir RSS a JSON.
 */
async function cargarNoticiasRecientes() {
  const rssURL = "https://api.rss2json.com/v1/api.json?rss_url=https://www.nasa.gov/rss/dyn/breaking_news.rss";

  try {
    const res = await fetch(rssURL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const noticias = data.items.slice(0, 5); // solo las primeras 5
    newsContainer.innerHTML = noticias.map(n => `
      <div class="news-card">
        <h3>🪐 ${n.title}</h3>
        ${n.enclosure?.link ? `<img src="${n.enclosure.link}" alt="${n.title}" style="width:60%;border-radius:10px;margin:1rem 0;">` : ""}
        <p>${n.description}</p>
        <p><strong>Fecha:</strong> ${new Date(n.pubDate).toLocaleDateString("es-AR")}</p>
        <a href="${n.link}" target="_blank">Leer más en NASA.gov</a>
      </div>
    `).join("");

  } catch (err) {
    console.error("Error noticias recientes:", err);
    newsContainer.innerHTML = `<p>No se pudieron cargar las noticias recientes.</p>`;
  }
}

/* ================================================================ */
/* INICIALIZACIÓN: EJECUTAR AMBAS FUNCIONES AL CARGAR LA PÁGINA   */
/* ================================================================ */
// Ejecutar ambas funciones
cargarNoticiaDelDia();
cargarNoticiasRecientes();
