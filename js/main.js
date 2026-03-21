/**
 * Pipiltajtol — Scripts principales
 * - Navegación (scroll, estado)
 * - Animaciones al scroll
 * - Año en el footer
 */

(function () {
  'use strict';

  // --- Navegación: efecto al hacer scroll
  const mainNav = document.getElementById('mainNav');
  if (mainNav) {
    function updateNavbar() {
      if (window.scrollY > 50) {
        mainNav.classList.add('scrolled');
      } else {
        mainNav.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', updateNavbar);
    updateNavbar();
  }

  // --- Enlaces suaves (Bootstrap ya usa scroll-behavior: smooth en CSS)
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Cerrar menú móvil si está abierto
        const navbarCollapse = document.querySelector('#navbarNav');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const toggle = document.querySelector('[data-bs-toggle="collapse"]');
          if (toggle) toggle.click();
        }
      }
    });
  });

  // --- Animaciones al entrar en viewport
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  animatedElements.forEach(function (el) {
    observer.observe(el);
  });

  // --- Contadores animados (página Lo que estamos logrando)
  const countersSection = document.getElementById('countersSection');
  if (countersSection) {
    let countersPlayed = false;
    const counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || countersPlayed) return;
          countersPlayed = true;
          countersSection.querySelectorAll('.counter-value').forEach(function (el) {
            const target = parseInt(el.getAttribute('data-target'), 10);
            if (isNaN(target)) return;
            const duration = 2200;
            const start = performance.now();
            function tick(now) {
              const t = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - t, 3);
              el.textContent = String(Math.round(eased * target));
              if (t < 1) {
                requestAnimationFrame(tick);
              } else {
                el.textContent = String(target);
              }
            }
            requestAnimationFrame(tick);
          });
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    );
    counterObserver.observe(countersSection);
  }

  // --- Año actual en el footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
