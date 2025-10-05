
/* NEWS LOADING SCRIPT        */

/* 
 * This script gets information from APIs to display:
 * - Astronomy Picture of the Day (APOD)
 * - Recent news from NASA RSS feed
 * - Error handling if APIs don't respond
 */

// NASA API key to access their services
const API_KEY = "Ie3jrajsuZ1DfwEZdR91Se2lS5gazb1lvojY0NRe"; // ⚠️WARNING: put your real API key from api.nasa.gov

// DOM elements where news will be displayed
const noticiaDia = document.getElementById("noticia-dia");
const newsContainer = document.getElementById("news-container");


/* FUNCTION: LOAD ASTRONOMY PICTURE OF THE DAY                     */

/* 
 * Gets the featured image of the day from NASA's APOD API.
 * Can be an image or video, and shows the scientific explanation.
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
          <h3>🛰️ Picture of the day: ${data.title}</h3>
          <p>${data.explanation}</p>
          <p><strong>Date:</strong> ${data.date}</p>
          ${data.hdurl ? `<a href="${data.hdurl}" target="_blank">View in high resolution</a>` : ""}
        </div>
      </div>
    `;
  } catch (err) {
    console.error("APOD Error:", err);
    noticiaDia.innerHTML = `<p>Could not load picture of the day.</p>`;
  }
}


/* FUNCTION: LOAD RECENT NASA NEWS                     */

/* 
 * Gets the latest 5 news from NASA's official RSS feed.
 * Uses an intermediate service (rss2json) to convert RSS to JSON.
 */
async function cargarNoticiasRecientes() {
  const rssURL = "https://api.rss2json.com/v1/api.json?rss_url=https://www.nasa.gov/rss/dyn/breaking_news.rss";

  try {
    const res = await fetch(rssURL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const noticias = data.items.slice(0, 5); // only first 5
    newsContainer.innerHTML = noticias.map(n => `
      <div class="news-card">
        <h3>🪐 ${n.title}</h3>
        ${n.enclosure?.link ? `<img src="${n.enclosure.link}" alt="${n.title}" style="width:60%;border-radius:10px;margin:1rem 0;">` : ""}
        <p>${n.description}</p>
        <p><strong>Date:</strong> ${new Date(n.pubDate).toLocaleDateString("en-US")}</p>
        <a href="${n.link}" target="_blank">Read more on NASA.gov</a>
      </div>
    `).join("");

  } catch (err) {
    console.error("Recent news error:", err);
    newsContainer.innerHTML = `<p>Could not load recent news.</p>`;
  }
}


/* INITIALIZATION: EXECUTE BOTH FUNCTIONS WHEN PAGE LOADS   */

// Execute both functions
cargarNoticiaDelDia();
cargarNoticiasRecientes();
