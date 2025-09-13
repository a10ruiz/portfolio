class VideoGallery extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <div class="vertical-video-gallery">
          <button class="nav-btn prev-btn">&lt;</button>
          <div class="video-wrapper"></div>
          <button class="nav-btn next-btn">&gt;</button>
          <button class="audio-btn">🔊 Activar sonido</button>
          <a class="link-btn" href="#" target="_blank">🔗 Ver en TikTok</a>
        </div>
        <style>
          .vertical-video-gallery {
            position: relative;
            width: 320px;
            height: 568px;
            background: #000;
            border-radius: 1rem;
            margin: 2rem auto;
            overflow: visible;
          }
          .video-wrapper {
            position: relative;
            width: 320px;
            height: 568px;
          }
          video {
            position: absolute;
            object-fit: cover;
            border-radius: 1rem;
            transition: opacity 0.3s ease, transform 0.3s ease;
            pointer-events: none;
            user-select: none;
            opacity: 0;
            z-index: 1;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            transform: scale(0.9);
            filter: blur(0.3px);
          }
          video.visible {
            opacity: 1;
            pointer-events: none;
          }
          video.current {
            opacity: 1 !important;
            z-index: 3 !important;
            pointer-events: auto !important;
            filter: none !important;
            transform: scale(1) !important;
          }
          video.prev {
            left: -40% !important;
          }
          video.next {
            left: auto !important;
            right: -40% !important;
          }
          .nav-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0,0,0,0.6);
            border: none;
            color: white;
            padding: 0.5rem;
            border-radius: 50%;
            cursor: pointer;
            z-index: 4;
            font-size: 1.5rem;
            user-select: none;
          }
          .prev-btn { left: 0.5rem; }
          .next-btn { right: 0.5rem; }

          .audio-btn{
            position: absolute;
            top: 0.5rem;
            left: 60%;
            z-index: 5;
            padding: 0.5;
            font-size: 0.9rem;
            border: none;
            border-radius: 0.5rem;
            background: rgba(101, 100, 100, 0.8);
            color: #fff;
            cursor: pointer;
            text-decoration: none;
            margin-top: 0.5;
          }

          .link-btn {
            bottom: 0.3rem;
            font-size: 0.9rem;
            left: 50%;
            transform: translateX(-50%);
            position: absolute;
            z-index: 5; 
            padding: 0.5rem;
            background: rgba(255, 253, 253, 0.84);
            color: #000;
            cursor: pointer;
            text-decoration: none;
            border-radius: 0.5rem;
          }
        </style>
      `;
      this.initGallery();
    }

    initGallery() {
      this.videos = [
        'assets/img/videos/tiktok2.mp4',
        'assets/img/videos/tiktok_tierrasraras.mp4',
        'assets/img/videos/tiktok1.mp4',
        'assets/img/videos/tiktok3.mp4',
        'assets/img/videos/tiktok_pajaros.mp4',
        'assets/img/videos/tiktok_rivera.mp4',
        'assets/img/videos/tiktok_sena.mp4',
        'assets/img/videos/tiktok_feli.mp4',


      ];

      this.urls = [
        'https://www.tiktok.com/@malditobulo/video/7489120681028750614?lang=es',
        'https://www.tiktok.com/@malditobulo/video/7548120380100201750?lang=es',
        'https://www.tiktok.com/@malditobulo/video/7501320102122360086?lang=es',
        'https://www.tiktok.com/@malditobulo/video/7441647775441292577?lang=es',
        'https://www.tiktok.com/@malditobulo/video/7373948759111126305?lang=es',
        'https://www.tiktok.com/@malditobulo/video/7439786392080682272?lang=es',
        'https://www.tiktok.com/@malditobulo/video/7394861570234289441?lang=es',
        'https://www.tiktok.com/@malditobulo/video/7352916994720632097?lang=es',

      ];

      this.index = 0;
      this.wrapper = this.querySelector('.video-wrapper');

      this.videoElements = this.videos.map((src) => {
        const v = document.createElement('video');
        v.src = src;
        v.muted = true;
        v.playsInline = true;
        v.preload = 'auto';
        v.loop = true;
        v.style.opacity = '0';
        this.wrapper.appendChild(v);
        return v;
      });

      this.querySelector('.prev-btn').addEventListener('click', () => this.change(-1));
      this.querySelector('.next-btn').addEventListener('click', () => this.change(1));

      this.audioBtn = this.querySelector('.audio-btn');
      this.audioBtn.addEventListener('click', () => {
        const currentVideo = this.videoElements[this.index];
        currentVideo.muted = false;
        currentVideo.volume = 1;
        currentVideo.play().catch(() => {});
      });

      this.linkBtn = this.querySelector('.link-btn');

      this.updateVideos();
    }

    updateVideos() {
      const len = this.videoElements.length;

      this.videoElements.forEach((video) => {
        video.pause();
        video.className = '';
        video.style.opacity = '0';
        video.style.zIndex = '1';
        video.muted = true;
      });

      const prevIndex = (this.index - 1 + len) % len;
      const nextIndex = (this.index + 1) % len;

      const prevVideo = this.videoElements[prevIndex];
      prevVideo.classList.add('visible', 'prev');
      prevVideo.style.opacity = '0.3';

      const currentVideo = this.videoElements[this.index];
      currentVideo.classList.add('visible', 'current');
      currentVideo.style.opacity = '1';
      currentVideo.style.zIndex = '3';
      currentVideo.play().catch(() => {});

      const nextVideo = this.videoElements[nextIndex];
      nextVideo.classList.add('visible', 'next');
      nextVideo.style.opacity = '0.3';

      this.linkBtn.href = this.urls[this.index];
    }

    change(direction) {
      this.index = (this.index + direction + this.videos.length) % this.videos.length;
      this.updateVideos();
    }
  }

  customElements.define('video-gallery', VideoGallery);