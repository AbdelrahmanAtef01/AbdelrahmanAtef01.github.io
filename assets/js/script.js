'use strict';

/* ---- Sidebar toggle ---- */
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

sidebarBtn.addEventListener('click', function () {
  sidebar.classList.toggle('active');
});


/* ---- Page navigation ---- */
const navLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    const target = this.textContent.trim().toLowerCase();

    pages.forEach(function (page, i) {
      if (target === page.dataset.page) {
        page.classList.add('active');
        navLinks[i].classList.add('active');
        window.scrollTo(0, 0);
      } else {
        page.classList.remove('active');
        navLinks[i].classList.remove('active');
      }
    });
  });
});


/* ---- Portfolio filter (mobile select) ---- */
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');

if (select) {
  select.addEventListener('click', function () {
    this.classList.toggle('active');
  });
}

selectItems.forEach(function (item) {
  item.addEventListener('click', function () {
    const val = this.textContent.trim().toLowerCase();
    selectValue.textContent = this.textContent.trim();
    select.classList.remove('active');
    filterProjects(val);
  });
});


/* ---- Portfolio filter (desktop buttons) ---- */
const filterBtns = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');
let activeFilterBtn = filterBtns[0];

function filterProjects(value) {
  filterItems.forEach(function (item) {
    if (value === 'all' || value === item.dataset.category) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    const val = this.textContent.trim().toLowerCase();
    selectValue.textContent = this.textContent.trim();
    filterProjects(val);

    activeFilterBtn.classList.remove('active');
    this.classList.add('active');
    activeFilterBtn = this;
  });
});


/* ---- Scroll reveal ---- */
function initReveal() {
  const revealTargets = document.querySelectorAll(
    '.service-card, .tech-item, .timeline-item, .cert-item, .project-item.active, .skill-group, .highlights-list li'
  );

  revealTargets.forEach(function (el) {
    el.classList.add('reveal');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealTargets.forEach(function (el) {
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', initReveal);

navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    setTimeout(initReveal, 100);
  });
});
