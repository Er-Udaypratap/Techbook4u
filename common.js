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
