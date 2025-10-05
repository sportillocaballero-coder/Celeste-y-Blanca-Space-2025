document.addEventListener('DOMContentLoaded', function() {
      const audio = document.getElementById('ambient-audio');
      const toggleBtn = document.getElementById('audio-toggle');
      let isPlaying = false;

      // Verificar si el audio se puede cargar
      audio.addEventListener('loadeddata', function() {
        console.log('✅ Audio cargado correctamente');
      });

      audio.addEventListener('error', function(e) {
        console.error('❌ Error cargando audio:', e);
        toggleBtn.textContent = '❌ Audio no disponible';
        toggleBtn.disabled = true;
      });

      toggleBtn.addEventListener('click', function() {
        if (toggleBtn.disabled) return;

        if (!isPlaying) {
          audio.play().then(() => {
            isPlaying = true;
            toggleBtn.textContent = '🔇 Pausar Audio';
            toggleBtn.setAttribute('aria-label', 'Pausar audio ambiental');
            console.log('🎵 Audio iniciado');
          }).catch(error => {
            console.log('Error al reproducir audio:', error);
            toggleBtn.textContent = '❌ Error de audio';
          });
        } else {
          audio.pause();
          isPlaying = false;
          toggleBtn.textContent = '🔊 Audio Ambiental';
          toggleBtn.setAttribute('aria-label', 'Reproducir audio ambiental');
          console.log('🔇 Audio pausado');
        }
      });

      // Controlar volumen
      audio.volume = 0.3; // 30% del volumen máximo
    });