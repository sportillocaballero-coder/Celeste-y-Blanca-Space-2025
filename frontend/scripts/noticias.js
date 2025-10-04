// noticias.js
const API_KEY = "Ie3jrajsuZ1DfwEZdR91Se2lS5gazb1lvojY0NRe"; // reemplazá DEMO_KEY por la tuya
const newsContainer = document.getElementById("news-container");

async function cargarAPOD() {
  try {
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    let mediaHTML = "";
    if (data.media_type === "image") {
      mediaHTML = `<img src="${data.url}" alt="${data.title}" style="width:100%;border-radius:10px;margin:1rem 0;">`;
    } else if (data.media_type === "video") {
      mediaHTML = `
        <div style="position:relative;padding-top:56.25%;border-radius:10px;overflow:hidden;margin:1rem 0;">
          <iframe src="${data.url}" title="${data.title}" frameborder="0" allowfullscreen
                  style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>
        </div>`;
    } else {
      mediaHTML = `<p>Contenido no soportado (${data.media_type}).</p>`;
    }

    newsContainer.innerHTML = `
      <div class="news-card">
        <h3>🛰️ Imagen del día: ${data.title}</h3>
        ${mediaHTML}
        <p>${data.explanation}</p>
        <p><strong>Fecha:</strong> ${data.date}</p>
        ${data.hdurl ? `<a href="${data.hdurl}" target="_blank">Ver en alta resolución</a>` : ""}
      </div>`;
  } catch (err) {
    console.error("Error NASA APOD:", err);
    newsContainer.innerHTML = `
      <div class="news-card">
        <h3>No se pudieron cargar las noticias</h3>
        <p>Revisá tu API Key o el límite de la NASA API. Probá recargar en unos minutos.</p>
      </div>`;
  }
}

cargarAPOD();