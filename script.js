/* ============================================================
   techbook4u — script.js
   Handles: mobile nav toggle, active nav highlighting on scroll,
   newsletter form submission, WhatsApp share link, job filter.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------- Mobile Nav Toggle ---------------- */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile menu when a nav link is clicked
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------- Active Link Highlighting on Scroll ---------------- */
  var sections = document.querySelectorAll('main section[id], main[id]');
  var navLinks = document.querySelectorAll('.main-nav a');

  function setActiveLink() {
    var scrollPos = window.scrollY + 120;
    var currentId = null;

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (currentId && link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ---------------- Header shrink-on-scroll shadow ---------------- */
  var header = document.getElementById('siteHeader');
  function toggleHeaderShadow() {
    if (window.scrollY > 8) {
      header.style.boxShadow = '0 4px 16px rgba(10,42,102,0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  }
  window.addEventListener('scroll', toggleHeaderShadow, { passive: true });
  toggleHeaderShadow();

  /* ---------------- Newsletter Form ---------------- */
  var newsletterForm = document.getElementById('newsletterForm');
  var newsletterMsg = document.getElementById('newsletterMsg');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = document.getElementById('newsletterEmail');
      var email = emailInput.value.trim();
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        newsletterMsg.textContent = 'Please enter a valid email address.';
        newsletterMsg.style.color = '#FFB4B4';
        return;
      }

      // TODO: Replace with real backend / newsletter API integration.
      newsletterMsg.textContent = 'Thanks for subscribing! Check your inbox to confirm.';
      newsletterMsg.style.color = '#00E0C6';
      newsletterForm.reset();
    });
  }

  /* ---------------- Reveal-on-scroll for cards (subtle) ---------------- */
  if ('IntersectionObserver' in window) {
    var revealTargets = document.querySelectorAll('.card, .code-window, .mcq-card-demo');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 500ms ease, transform 500ms ease';
      observer.observe(el);
    });
  }

  /* ---------------- Jobs Page Filter ---------------- */
  var jobFilterBar = document.getElementById('jobFilterBar');
  var jobListings = document.getElementById('jobListings');

  if (jobFilterBar && jobListings) {
    var jobCards = jobListings.querySelectorAll('.job-card');
    var filterButtons = jobFilterBar.querySelectorAll('button');

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var filter = btn.getAttribute('data-filter');
        jobCards.forEach(function (card) {
          var categories = (card.getAttribute('data-category') || '').split(' ');
          var show = (filter === 'all') || categories.indexOf(filter) !== -1;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---------------- WhatsApp Share Link ---------------- */
  var shareLink = document.getElementById('shareLink');
  if (shareLink) {
    var shareText = encodeURIComponent(document.title + ' — ' + window.location.href);
    shareLink.setAttribute('href', 'https://wa.me/?text=' + shareText);
  }

});
