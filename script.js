/**
 * ═══════════════════════════════════════════════════════════════
 * MOSSES PORTFOLIO — CLEAN INTERACTIVE CONTROLLER
 * Mobile Drawer · Email Client Dispatch · Navigation Scroll Spy
 * ═══════════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initContactForm();
  initScrollSpy();
});

/**
 * 01. Mobile Navigation Drawer
 */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const navLinks = document.querySelectorAll('.mobile-link');

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) closeDrawer();
  });

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/**
 * 02. Contact Form Dispatch
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.senderName.value.trim();
    const email = form.senderEmail.value.trim();
    const scope = form.projectScope.value;
    const message = form.senderMessage.value.trim();

    if (!name || !email || !message) {
      if (feedback) {
        feedback.className = 'form-status error mono-text';
        feedback.textContent = 'Please fill in all required fields.';
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Opening your email client...</span>';
    }

    const mailSubject = encodeURIComponent(`[PORTFOLIO CONTACT] ${scope} — ${name}`);
    const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${scope}\n\nMessage:\n${message}`);
    const mailUrl = `mailto:kiflemusse@gmail.com?subject=${mailSubject}&body=${mailBody}`;

    if (feedback) {
      feedback.className = 'form-status success mono-text';
      feedback.innerHTML = `✓ Opening your email client to send to <strong>kiflemusse@gmail.com</strong>...`;
    }

    setTimeout(() => {
      window.location.href = mailUrl;

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Open Email Client &rarr;</span>';
      }

      form.reset();
    }, 300);
  });
}

/**
 * 03. Navigation Scroll Spy
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  function onScroll() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}
