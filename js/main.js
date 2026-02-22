/**
 * Pipiltajtol — Scripts principales
 * - Navegación (scroll, estado)
 * - Validación del formulario de contacto
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

  // --- Formulario de contacto: validación y mensajes personalizados
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      // Quitar mensaje previo
      if (formMessage) {
        formMessage.classList.add('d-none');
        formMessage.classList.remove('alert-success', 'alert-danger', 'success', 'error');
      }

      // Validación nativa HTML5 + Bootstrap
      if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add('was-validated');
        if (formMessage) {
          formMessage.textContent = 'Por favor revisa los campos marcados en rojo.';
          formMessage.classList.add('alert', 'alert-warning', 'error');
          formMessage.classList.remove('d-none');
        }
        return;
      }

      // Simular envío (aquí iría tu lógica real: fetch, etc.)
      if (formMessage) {
        formMessage.textContent = '¡Mensaje enviado correctamente! Te responderemos pronto.';
        formMessage.classList.add('alert', 'alert-success', 'success');
        formMessage.classList.remove('d-none');
      }

      form.reset();
      form.classList.remove('was-validated');
    });
  }

  // --- Año actual en el footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
