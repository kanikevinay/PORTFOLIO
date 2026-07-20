/* ================================================================
   KANIKE VINAY — script.js
   - Mobile nav toggle
   - Navbar scroll shadow
   - Scroll-reveal with IntersectionObserver
   - Footer year
   ================================================================ */

/* ── Mobile nav ── */
const menuToggle = document.getElementById('menu-toggle');
const navLinks   = document.getElementById('nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

/* ── Navbar scroll shadow ── */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
}

/* ── Footer year ── */
const footerYear = document.getElementById('footer-year');
if (footerYear) footerYear.textContent = new Date().getFullYear();

/* ── Copy email to clipboard ── */
const emailCopyBtn = document.getElementById('email-copy-btn');
const copyHint     = document.getElementById('copy-hint');

if (emailCopyBtn && copyHint) {
  emailCopyBtn.addEventListener('click', () => {
    const email = 'kanikevinay709@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      copyHint.textContent = 'Copied!';
      emailCopyBtn.classList.add('copied');
      setTimeout(() => {
        copyHint.textContent = 'Copy';
        emailCopyBtn.classList.remove('copied');
      }, 2000);
    }).catch(() => {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = email;
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      copyHint.textContent = 'Copied!';
      emailCopyBtn.classList.add('copied');
      setTimeout(() => {
        copyHint.textContent = 'Copy';
        emailCopyBtn.classList.remove('copied');
      }, 2000);
    });
  });
}

/* ── Scroll reveal ── */
(function () {
  // Reveal whole sections
  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        sectionObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07 });

  document.querySelectorAll('.reveal').forEach(el => sectionObs.observe(el));

  // Reveal individual child cards with stagger
  const childObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal-child'));
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 75);
        childObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });

  document.querySelectorAll('.reveal-child').forEach(el => childObs.observe(el));
})();