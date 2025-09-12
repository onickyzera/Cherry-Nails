document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------
     1) Preloader
     --------------------------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    if (preloader) preloader.style.display = 'none';
  });

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
    // se não carregar Typed.js, não quebra
    console.warn('Typed.js não disponível', err);
  }

  /* ---------------------------
     3) Back to top button
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
     4) Intersection Observer (animações)
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
     5) Lightbox (galeria)
     --------------------------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (lightbox && lightboxImg && galleryItems.length > 0) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        // se for <img> ou <div> com background, tenta obter src/onclick
        const src = item.tagName.toLowerCase() === 'img' ? item.src : item.querySelector('img')?.src;
        if (src) {
          lightbox.classList.add('show');
          lightboxImg.src = src;
        }
      });
    });

    document.querySelectorAll('.lightbox-close').forEach(btn => {
      btn.addEventListener('click', () => lightbox.classList.remove('show'));
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('show');
    });
  }

  /* ---------------------------
     6) Slider genérico (serviços + galeria)
     --------------------------- */
  const createSlider = (sliderId, prevId, nextId) => {
    const slider = document.getElementById(sliderId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    if (!slider || !prevBtn || !nextBtn) return;

    // função que calcula scroll amount dinamicamente
    const getScrollAmount = () => {
      const first = slider.firstElementChild;
      if (!first) return slider.clientWidth * 0.8;
      const itemWidth = Math.round(first.getBoundingClientRect().width);
      // pega gap (fallback 18)
      const style = window.getComputedStyle(slider);
      const gap = parseFloat(style.gap || style.columnGap) || 18;
      return itemWidth + gap;
    };

    prevBtn.addEventListener('click', () => {
      const amount = getScrollAmount();
      if (slider.scrollLeft <= 0) {
        // ir pro final
        slider.scrollTo({ left: slider.scrollWidth - slider.clientWidth, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: -amount, behavior: 'smooth' });
      }
    });

    nextBtn.addEventListener('click', () => {
      const amount = getScrollAmount();
      if (Math.ceil(slider.scrollLeft + slider.clientWidth) >= slider.scrollWidth) {
        // volta pro começo
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: amount, behavior: 'smooth' });
      }
    });

    // garantir recalculo se mudar tamanho
    window.addEventListener('resize', () => {
      // nada extra necessário, getScrollAmount usa medidas ao clicar
    });
  };

  // inicializa sliders com os ids que usamos no HTML
  createSlider('services-slider', 'services-prev', 'services-next');
  createSlider('gallery-slider', 'gallery-prev', 'gallery-next');

});


/* ---------------------------
   DARK MODE TOGGLE
--------------------------- */
const darkToggle = document.createElement('button');
darkToggle.textContent = '🌙';
darkToggle.className = 'btn btn-primary';
darkToggle.id = 'darkModeToggle';
darkToggle.style.position = 'fixed';
darkToggle.style.bottom = '80px';
darkToggle.style.right = '14px';
darkToggle.style.zIndex = '9999';
document.body.appendChild(darkToggle);

darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});
