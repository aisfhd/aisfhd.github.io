/**
* Template Name: Personal
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Updated: Mar 05 2025 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Skill Progress module (Laboratory Work 10)
   * Skill Kanban board with categories, XP, level/rank and progress bar.
   */
  function initSkillProgress() {
    const board = document.querySelector('#skill-progress');
    if (!board) return;

    const skills = [
      { name: 'Python', status: 'completed', xp: 50 },
      { name: 'Java', status: 'completed', xp: 45 },
      { name: 'SQL', status: 'completed', xp: 40 },
      { name: 'TypeScript', status: 'in-progress', xp: 35 },
      { name: 'React', status: 'in-progress', xp: 30 },
      { name: 'GraphQL', status: 'in-progress', xp: 25 },
      { name: 'Cloud Architecture', status: 'planned', xp: 40 },
      { name: 'Kubernetes', status: 'planned', xp: 35 }
    ];

    const statusLabel = {
      planned: 'Planned',
      'in-progress': 'In Progress',
      completed: 'Completed'
    };

    const levelTable = [
      { min: 0, max: 49, level: 1, rank: 'Beginner' },
      { min: 50, max: 149, level: 2, rank: 'Trainee' },
      { min: 150, max: 299, level: 3, rank: 'Specialist' },
      { min: 300, max: Infinity, level: 4, rank: 'Professional' }
    ];

    const totalXP = skills.reduce((sum, s) => sum + s.xp, 0);
    const completedCount = skills.filter(s => s.status === 'completed').length;
    const levelEntry = levelTable.find(l => totalXP >= l.min && totalXP <= l.max);
    const nextIndex = levelTable.indexOf(levelEntry) + 1;
    const nextEntry = levelTable[nextIndex];

    // Count per category for column headers
    const counts = {
      planned: skills.filter(s => s.status === 'planned').length,
      'in-progress': skills.filter(s => s.status === 'in-progress').length,
      completed: skills.filter(s => s.status === 'completed').length
    };

    document.getElementById('count-planned').textContent = counts.planned;
    document.getElementById('count-in-progress').textContent = counts['in-progress'];
    document.getElementById('count-completed').textContent = counts.completed;

    // Create skill cards: status badge + name + XP
    skills.forEach(skill => {
      const col = document.getElementById('column-' + skill.status);
      const card = document.createElement('div');
      card.className = 'skill-card';
      card.innerHTML =
        '<div class="skill-card-status">' + statusLabel[skill.status] + '</div>' +
        '<div class="skill-card-info">' +
        '<div class="skill-card-name">' + skill.name + '</div>' +
        '<div class="skill-card-xp">+' + skill.xp + ' XP</div>' +
        '</div>';
      col.appendChild(card);
    });

    // Update top stats
    document.getElementById('stat-total-xp').textContent = totalXP;
    document.getElementById('stat-level').textContent = levelEntry.level;
    document.getElementById('stat-rank').textContent = levelEntry.rank;
    document.getElementById('stat-total-skills').textContent = skills.length;
    document.getElementById('stat-completed-skills').textContent = completedCount;
    document.getElementById('stat-completion-pct').textContent =
      Math.round((completedCount / skills.length) * 100) + '%';

    // Progress bar with current / target XP
    const bar = document.getElementById('progress-bar');
    const text = document.getElementById('progress-text');
    const current = document.getElementById('progress-current');
    const target = document.getElementById('progress-target');
    let pct;
    if (nextEntry) {
      const range = nextEntry.min - levelEntry.min;
      const progress = totalXP - levelEntry.min;
      pct = Math.min(100, Math.max(0, (progress / range) * 100));
      text.textContent = Math.round(pct) + '%';
      current.textContent = totalXP + ' XP';
      target.textContent = '/ ' + nextEntry.min + ' XP';
    } else {
      pct = 100;
      text.textContent = '100%';
      current.textContent = totalXP + ' XP';
      target.textContent = ' — max level reached';
    }
    bar.setAttribute('aria-valuenow', Math.round(pct));

    new Waypoint({
      element: board,
      offset: '80%',
      handler: function() {
        bar.style.width = Math.round(pct) + '%';
      }
    });
  }

  window.addEventListener('load', initSkillProgress);

})();