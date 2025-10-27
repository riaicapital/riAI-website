// Video Modal Functionality
export function initVideoModal(buttonId, videoUrl) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;

  let hoverTimeout;
  let modal = document.getElementById('video-modal');

  // Create modal if it doesn't exist
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'video-modal';
    modal.className = 'video-modal';
    modal.innerHTML = `
      <div class="video-modal-content">
        <span class="video-modal-close">&times;</span>
        <iframe class="video-modal-frame" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    `;
    document.body.appendChild(modal);

    // Close modal on X click
    modal.querySelector('.video-modal-close').addEventListener('click', () => {
      closeVideoModal();
    });

    // Close modal on outside click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeVideoModal();
      }
    });
  }

  // Show modal on button click
  btn.addEventListener('click', () => {
    openVideoModal(videoUrl);
  });

  // Show modal on hover (2 seconds delay)
  btn.addEventListener('mouseenter', () => {
    hoverTimeout = setTimeout(() => {
      openVideoModal(videoUrl);
    }, 1000);
  });

  btn.addEventListener('mouseleave', () => {
    clearTimeout(hoverTimeout);
  });
}

function openVideoModal(videoUrl) {
  const modal = document.getElementById('video-modal');
  const iframe = modal.querySelector('.video-modal-frame');
  
  // Extract video ID from YouTube URL
  const videoId = extractVideoId(videoUrl);
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  const modal = document.getElementById('video-modal');
  const iframe = modal.querySelector('.video-modal-frame');
  
  iframe.src = '';
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function extractVideoId(url) {
  if (!url) return '';
  
  // Handle different YouTube URL formats
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : '';
}

