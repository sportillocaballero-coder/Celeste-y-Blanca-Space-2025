document.addEventListener('DOMContentLoaded', function() {
      const audio = document.getElementById('ambient-audio');
      const toggleBtn = document.getElementById('audio-toggle');
      let isPlaying = false;

      // Check if audio can be loaded
      audio.addEventListener('loadeddata', function() {
        console.log('✅ Audio loaded correctly');
      });

      audio.addEventListener('error', function(e) {
        console.error('❌ Error loading audio:', e);
        toggleBtn.textContent = '❌ Audio not available';
        toggleBtn.disabled = true;
      });

      toggleBtn.addEventListener('click', function() {
        if (toggleBtn.disabled) return;

        if (!isPlaying) {
          audio.play().then(() => {
            isPlaying = true;
            toggleBtn.textContent = '🔇 Pause Audio';
            toggleBtn.setAttribute('aria-label', 'Pause ambient audio');
            console.log('🎵 Audio started');
          }).catch(error => {
            console.log('Error playing audio:', error);
            toggleBtn.textContent = '❌ Audio error';
          });
        } else {
          audio.pause();
          isPlaying = false;
          toggleBtn.textContent = '🔊 Ambient Audio';
          toggleBtn.setAttribute('aria-label', 'Play ambient audio');
          console.log('🔇 Audio paused');
        }
      });

      // Control volume
      audio.volume = 0.3; // 30% of maximum volume
    });