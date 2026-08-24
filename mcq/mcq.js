/* ============================================================
   techbook4u — common.js
   Injects shared header and footer markup into any page.
   Include this file + a <div id="site-header"></div> and
   <div id="site-footer"></div> wherever those should appear.

   `basePath` should be set on <body data-base="../"> for pages
   inside subfolders (mcq/, interview/) so links resolve correctly.
   ============================================================ */

(function () {
  var base = document.body.getAttribute('data-base') || '';

  /* ---------------- Header ---------------- */
  var headerHTML =
    '<header class="site-header" id="siteHeader">' +
      '<div class="container header-inner">' +
        '<a href="' + base + 'index.html" class="logo" aria-label="techbook4u home">' +
          '<span class="logo-bracket">&lt;</span>techbook4u<span class="logo-bracket">/&gt;</span>' +
        '</a>' +
        '<nav class="main-nav" id="mainNav" aria-label="Primary navigation">' +
          '<ul>' +
            '<li><a href="' + base + 'index.html">Home</a></li>' +
            '<li><a href="' + base + 'courses/index.html">Courses</a></li>' +
            '<li><a href="' + base + 'mcq/index.html">MCQs</a></li>' +
            '<li><a href="' + base + 'interview/index.html">Interview</a></li>' +
            '<li><a href="' + base + 'challenge/index.html">Challenge</a></li>' +
            '<li><a href="' + base + 'jobs/index.html">Jobs</a></li>' +
            '<li><a href="' + base + 'other-courses/index.html">Other Courses</a></li>' +
            '<li class="nav-share-item"><a href="#" id="shareLink" class="nav-share-link" target="_blank" rel="noopener noreferrer">📤 Share on WhatsApp</a></li>' +
          '</ul>' +
        '</nav>' +
        '<div class="header-actions">' +
          '<button class="nav-toggle" id="navToggle" aria-label="Toggle navigation menu" aria-expanded="false">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</header>';

  /* ---------------- Footer ---------------- */
  var footerHTML =
    '<footer class="site-footer">' +
      '<div class="container footer-grid">' +
        '<div class="footer-brand">' +
          '<a href="' + base + 'index.html" class="logo logo-footer">' +
            '<span class="logo-bracket">&lt;</span>techbook4u<span class="logo-bracket">/&gt;</span>' +
          '</a>' +
          '<p>A free educational platform to learn, practice and compete — helping students turn preparation into real opportunities.</p>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>Explore</h4>' +
          '<ul>' +
            '<li><a href="' + base + 'courses/index.html">Courses</a></li>' +
            '<li><a href="' + base + 'mcq/index.html">MCQs</a></li>' +
            '<li><a href="' + base + 'interview/index.html">Interview Tips</a></li>' +
            '<li><a href="' + base + 'challenge/index.html">Challenges</a></li>' +
            '<li><a href="' + base + 'jobs/index.html">Jobs</a></li>' +
            '<li><a href="' + base + 'other-courses/index.html">Other Courses</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>Company</h4>' +
          '<ul>' +
            '<li><a href="' + base + 'index.html#about">About</a></li>' +
            '<li><a href="' + base + 'index.html#contact">Contact</a></li>' +
            '<li><a href="' + base + 'privacy-policy.html">Privacy Policy</a></li>' +
            '<li><a href="' + base + 'terms-and-conditions.html">Terms &amp; Conditions</a></li>' +
            '<li><a href="' + base + 'disclaimer.html">Disclaimer</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>Contact</h4>' +
          '<ul>' +
            '<li><a href="mailto:support@techbook4u.com">support@techbook4u.com</a></li>' +
            '<li>Mon–Sat, 10am – 6pm IST</li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="container footer-bottom">' +
        '<p>&copy; 2026 techbook4u. All Rights Reserved.</p>' +
      '</div>' +
    '</footer>';

  document.addEventListener('DOMContentLoaded', function () {
    var headerMount = document.getElementById('site-header');
    if (headerMount) headerMount.outerHTML = headerHTML;

    var footerMount = document.getElementById('site-footer');
    if (footerMount) footerMount.outerHTML = footerHTML;

    // Highlight current nav link based on page
    var path = window.location.pathname;
    document.querySelectorAll('.main-nav a').forEach(function (link) {
      var href = link.getAttribute('href') || '';
      if (href.indexOf('#') === -1 && path.indexOf(href.replace('../', '').replace('./', '')) !== -1 && href !== base + 'index.html') {
        link.classList.add('active');
      }
    });

    // Note: mobile nav-toggle click binding and the WhatsApp share
    // link href are both handled by script.js (which always runs
    // after this header injection completes, both on index.html's
    // static header and on injected headers here).
  });
})();
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
/* ============================================================
   techbook4u — quiz.js
   Generic quiz engine used by every practice page.
   Expects markup produced by the quiz page template:
   - .quiz-question blocks, each with data-correct="B" etc.
   - input[type=radio] name="qN"
   - #quizForm, #submitQuizBtn, #quizResult, #scoreText, #quizProgressFill
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  var quizForm = document.getElementById('quizForm');
  if (!quizForm) return;

  var questions = quizForm.querySelectorAll('.quiz-question');
  var progressFill = document.getElementById('quizProgressFill');
  var progressText = document.getElementById('quizProgressText');
  var submitBtn = document.getElementById('submitQuizBtn');
  var resultBox = document.getElementById('quizResult');
  var scoreText = document.getElementById('scoreText');
  var scoreSub = document.getElementById('scoreSub');

  var total = questions.length;

  function countAnswered() {
    var answered = 0;
    questions.forEach(function (q) {
      if (q.querySelector('input[type="radio"]:checked')) answered++;
    });
    return answered;
  }

  function updateProgress() {
    var answered = countAnswered();
    var pct = total ? Math.round((answered / total) * 100) : 0;
    if (progressFill) progressFill.style.width = pct + '%';
    if (progressText) progressText.textContent = answered + ' / ' + total + ' answered';
  }

  quizForm.addEventListener('change', updateProgress);
  updateProgress();

  quizForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var answered = countAnswered();
    if (answered < total) {
      var ok = window.confirm('You have only answered ' + answered + ' of ' + total + ' questions. Submit anyway?');
      if (!ok) return;
    }

    var score = 0;

    questions.forEach(function (q) {
      var correctValue = q.getAttribute('data-correct');
      var selected = q.querySelector('input[type="radio"]:checked');
      var labels = q.querySelectorAll('.quiz-options label');

      labels.forEach(function (label) {
        var input = label.querySelector('input[type="radio"]');
        label.classList.remove('correct-answer', 'wrong-answer');
        if (input.value === correctValue) {
          label.classList.add('correct-answer');
        } else if (selected && input === selected && input.value !== correctValue) {
          label.classList.add('wrong-answer');
        }
        input.disabled = true;
      });

      var explanation = q.querySelector('.quiz-explanation');
      if (explanation) explanation.classList.add('show');

      if (selected && selected.value === correctValue) score++;
    });

    var percent = total ? Math.round((score / total) * 100) : 0;

    if (scoreText) scoreText.textContent = score + ' / ' + total;
    if (scoreSub) {
      var verdict = percent >= 80 ? 'Excellent work! \uD83C\uDF89' : percent >= 50 ? 'Good effort — keep practicing!' : 'Keep practicing, you will get there!';
      scoreSub.textContent = percent + '% correct — ' + verdict;
    }
    if (resultBox) {
      resultBox.classList.add('show');
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (submitBtn) submitBtn.disabled = true;
  });
});
