document.addEventListener('DOMContentLoaded', () => {

 
  /* ---------------------------
     2) Typed.js (hero)
  --------------------------- */
  try {
    if (document.getElementById('typed-text') && window.Typed) {
      new Typed('#typed-text', {
        strings: ['personalidade.', 'delicadeza.', 'estilo em cada detalhe.'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
      });
    }
  } catch (err) {
    console.warn('Typed.js não disponível', err);
  }

  /* ---------------------------
     3) Dark Mode Toggle (persistente)
  --------------------------- */
  const darkToggle = document.getElementById('darkModeToggle');
  const DARK_KEY = 'cherry_dark_mode';
  const saved = localStorage.getItem(DARK_KEY);
  if (saved === '1') {
    document.body.classList.add('dark-mode');
    darkToggle.textContent = '☀️';
  } else {
    darkToggle.textContent = '🌙';
  }

  darkToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem(DARK_KEY, isDark ? '1' : '0');
    darkToggle.textContent = isDark ? '☀️' : '🌙';
  });

  /* ---------------------------
     4) Back to top button
  --------------------------- */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) backToTop.classList.add('show');
      else backToTop.classList.remove('show');
    });
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------------------
     5) Intersection Observer (animações)
  --------------------------- */
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => entry.target.classList.add('is-visible'), delay);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  /* ---------------------------
     6) Lightbox (galeria)
  --------------------------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (lightbox && lightboxImg && galleryItems.length > 0) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const src = item.tagName.toLowerCase() === 'img' ? item.src : item.querySelector('img')?.src;
        if (src) {
          lightbox.classList.add('show');
          lightboxImg.src = src;
          lightbox.setAttribute('aria-hidden', 'false');
        }
      });
    });

    document.querySelectorAll('.lightbox-close').forEach(btn => {
      btn.addEventListener('click', () => {
        lightbox.classList.remove('show');
        lightbox.setAttribute('aria-hidden', 'true');
      });
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('show');
        lightbox.setAttribute('aria-hidden', 'true');
      }
    });
  }

  /* ---------------------------
     7) Slider genérico (serviços + galeria)
  --------------------------- */
  const createSlider = (sliderId, prevId, nextId) => {
    const slider = document.getElementById(sliderId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    if (!slider || !prevBtn || !nextBtn) return;

    const getScrollAmount = () => {
      const first = slider.firstElementChild;
      if (!first) return Math.round(slider.clientWidth * 0.8);
      const itemWidth = Math.round(first.getBoundingClientRect().width);
      const style = window.getComputedStyle(slider);
      const gap = parseFloat(style.gap || style.columnGap) || 20;
      return itemWidth + gap;
    };

    prevBtn.addEventListener('click', () => {
      const amount = getScrollAmount();
      if (slider.scrollLeft <= 0) {
        slider.scrollTo({ left: slider.scrollWidth - slider.clientWidth, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: -amount, behavior: 'smooth' });
      }
    });

    nextBtn.addEventListener('click', () => {
      const amount = getScrollAmount();
      if (Math.ceil(slider.scrollLeft + slider.clientWidth) >= slider.scrollWidth) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: amount, behavior: 'smooth' });
      }
    });

    // keyboard access: left/right when slider focused
    slider.setAttribute('tabindex', '0');
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prevBtn.click();
      if (e.key === 'ArrowRight') nextBtn.click();
    });
  };

  // inicializa sliders
  createSlider('services-slider', 'services-prev', 'services-next');
  createSlider('gallery-slider', 'gallery-prev', 'gallery-next');

});
