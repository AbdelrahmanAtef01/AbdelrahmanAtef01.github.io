'use strict';

/* ================================================================
   PORTFOLIO — Abdelrahman Atef
   GSAP + ScrollTrigger  ·  Preloader  ·  Custom Cursor  ·  Filters
   ================================================================ */

(function () {
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- PRELOADER ---------- */
  const preloader    = document.getElementById('preloader');
  const preCount     = document.getElementById('preloader-count');
  const preProgress  = document.getElementById('preloader-progress');
  const preloaderName = document.querySelector('.preloader-name');

  const preTl = gsap.timeline({
    onComplete: function () {
      gsap.to(preloader, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: function () {
          preloader.style.display = 'none';
          initHero();
          initScrollAnimations();
        }
      });
    }
  });

  preTl.to(preloaderName, {
    clipPath: 'inset(0 0 0% 0)',
    duration: 0.6,
    ease: 'power2.out'
  });

  preTl.to({ val: 0 }, {
    val: 100,
    duration: 1.6,
    ease: 'power1.inOut',
    onUpdate: function () {
      var v = Math.round(this.targets()[0].val);
      preCount.textContent = v;
      preProgress.style.width = v + '%';
    }
  }, '-=0.3');


  /* ---------- CUSTOM CURSOR ---------- */
  var cursor   = document.getElementById('cursor');
  var follower = document.getElementById('cursor-follower');

  if (window.matchMedia('(pointer:fine)').matches && cursor && follower) {
    var mx = 0, my = 0;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      gsap.to(cursor, { x: mx, y: my, duration: 0.12, ease: 'power2.out' });
      gsap.to(follower, { x: mx, y: my, duration: 0.35, ease: 'power2.out' });
    });

    document.querySelectorAll('a, button, [data-magnetic]').forEach(function (el) {
      el.addEventListener('mouseenter', function () { follower.classList.add('hover'); });
      el.addEventListener('mouseleave', function () { follower.classList.remove('hover'); });
    });
  }


  /* ---------- MAGNETIC BUTTONS ---------- */
  if (window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('[data-magnetic]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var rect = el.getBoundingClientRect();
        var dx = e.clientX - (rect.left + rect.width / 2);
        var dy = e.clientY - (rect.top + rect.height / 2);
        gsap.to(el, { x: dx * 0.25, y: dy * 0.25, duration: 0.3, ease: 'power2.out' });
      });
      el.addEventListener('mouseleave', function () {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' });
      });
    });
  }


  /* ---------- NAV SHOW/HIDE ---------- */
  var nav = document.getElementById('nav');
  var lastScroll = 0;

  window.addEventListener('scroll', function () {
    var st = window.scrollY;
    if (st > 400) {
      nav.classList.add('visible');
    } else {
      nav.classList.remove('visible');
    }
    lastScroll = st;
  });

  // Smooth-scroll for nav anchor links
  document.querySelectorAll('.nav-links a, .hero-ctas a, .nav-brand').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' });
        }
      }
    });
  });


  /* ---------- HERO ENTRANCE ---------- */
  function initHero() {
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.name-line span', {
      y: 0,
      duration: 1,
      stagger: 0.12
    });

    tl.to('.hero-label', {
      opacity: 1,
      y: 0,
      duration: 0.7
    }, '-=0.5');

    tl.to('.hero-desc', {
      opacity: 1,
      y: 0,
      duration: 0.7
    }, '-=0.4');

    tl.to('.hero-ctas', {
      opacity: 1,
      y: 0,
      duration: 0.7
    }, '-=0.3');

    // Gentle orb float
    gsap.to('.orb-1', {
      x: 40, y: 30,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    gsap.to('.orb-2', {
      x: -35, y: -25,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    gsap.to('.orb-3', {
      x: 25, y: -30,
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }


  /* ---------- SCROLL-TRIGGERED REVEALS ---------- */
  function initScrollAnimations() {
    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    // Stagger service cards
    ScrollTrigger.batch('.service-card', {
      start: 'top 88%',
      onEnter: function (batch) {
        gsap.to(batch, {
          opacity: 1, y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power2.out'
        });
      }
    });

    // Stagger stack items
    ScrollTrigger.batch('.stack-item', {
      start: 'top 90%',
      onEnter: function (batch) {
        gsap.to(batch, {
          opacity: 1, y: 0,
          stagger: 0.04,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    });

    // Stagger cert cards
    ScrollTrigger.batch('.cert-card', {
      start: 'top 88%',
      onEnter: function (batch) {
        gsap.to(batch, {
          opacity: 1, y: 0,
          stagger: 0.06,
          duration: 0.6,
          ease: 'power2.out'
        });
      }
    });

    // Stagger project cards (visible ones)
    ScrollTrigger.batch('.project-card:not(.hidden)', {
      start: 'top 88%',
      onEnter: function (batch) {
        gsap.to(batch, {
          opacity: 1, y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out'
        });
      }
    });
  }


  /* ---------- RESUME TABS ---------- */
  var tabBtns  = document.querySelectorAll('[data-resume-tab]');
  var tabPanels = document.querySelectorAll('[data-resume-panel]');

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.dataset.resumeTab;

      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      tabPanels.forEach(function (panel) {
        if (panel.dataset.resumePanel === target) {
          panel.classList.add('active');
          gsap.fromTo(panel, { opacity: 0, y: 16 }, {
            opacity: 1, y: 0,
            duration: 0.45,
            ease: 'power2.out'
          });
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });


  /* ---------- PROJECT FILTER ---------- */
  var filterBtns    = document.querySelectorAll('[data-filter]');
  var projectCards  = document.querySelectorAll('.project-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var value = btn.dataset.filter;

      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      projectCards.forEach(function (card) {
        var match = value === 'all' || card.dataset.category === value;

        if (match) {
          card.classList.remove('hidden');
          gsap.fromTo(card,
            { opacity: 0, scale: 0.92, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power2.out' }
          );
        } else {
          gsap.to(card, {
            opacity: 0, scale: 0.92,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: function () { card.classList.add('hidden'); }
          });
        }
      });
    });
  });

  // Initial GSAP default for stack items, service cards, cert cards, project cards
  gsap.set('.stack-item', { opacity: 0, y: 20 });
  gsap.set('.service-card', { opacity: 0, y: 30 });
  gsap.set('.cert-card', { opacity: 0, y: 20 });
  gsap.set('.project-card', { opacity: 0, y: 24 });

})();
