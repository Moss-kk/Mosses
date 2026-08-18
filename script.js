/**
 * ═══════════════════════════════════════════════════════════════
 * MOSSES PORTFOLIO — MINIMALIST INTERACTIVE CONTROLLER
 * Live Frame Inspector · CV Modal · Contact Dispatch · Mobile Drawer
 * ═══════════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initLivePreviewModal();
  initCvModal();
  initContactForm();
  initScrollSpy();
});

/**
 * 01. Mobile Drawer Navigation
 */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
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
 * 02. Live Project Inspector Modal
 */
function initLivePreviewModal() {
  const modal = document.getElementById('previewModal');
  const iframe = document.getElementById('previewIframe');
  const modalTitle = document.getElementById('modalTitle');
  const modalUrlDisplay = document.getElementById('modalUrlDisplay');
  const modalExternalLink = document.getElementById('modalExternalLink');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const desktopViewBtn = document.getElementById('desktopViewBtn');
  const mobileViewBtn = document.getElementById('mobileViewBtn');
  const frameWrapper = document.getElementById('modalFrameWrapper');
  const loader = document.getElementById('modalLoader');

  if (!modal || !iframe) return;

  const triggerButtons = document.querySelectorAll('.preview-trigger-btn');

  function openInspector(url, title) {
    if (modalTitle) modalTitle.textContent = title.toUpperCase();
    if (modalUrlDisplay) modalUrlDisplay.textContent = url;
    if (modalExternalLink) modalExternalLink.href = url;

    if (loader) loader.style.display = 'flex';
    iframe.src = url;

    iframe.onload = () => {
      if (loader) loader.style.display = 'none';
    };

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeInspector() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    iframe.src = 'about:blank';
    document.body.style.overflow = '';
  }

  triggerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.getAttribute('data-url');
      const title = btn.getAttribute('data-title') || 'Live Project';
      openInspector(url, title);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeInspector);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeInspector();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeInspector();
    }
  });

  // Desktop vs Mobile Viewport Toggle
  if (desktopViewBtn && mobileViewBtn && frameWrapper) {
    desktopViewBtn.addEventListener('click', () => {
      desktopViewBtn.classList.add('active');
      mobileViewBtn.classList.remove('active');
      frameWrapper.classList.remove('mobile-mode');
    });

    mobileViewBtn.addEventListener('click', () => {
      mobileViewBtn.classList.add('active');
      desktopViewBtn.classList.remove('active');
      frameWrapper.classList.add('mobile-mode');
    });
  }
}

/**
 * 03. CV Modal Handler
 */
function initCvModal() {
  const cvModal = document.getElementById('cvModal');
  const cvCloseBtn = document.getElementById('cvModalCloseBtn');
  const cvTriggers = document.querySelectorAll('.cv-btn-trigger');

  if (!cvModal) return;

  function openCvModal(e) {
    if (e) e.preventDefault();
    cvModal.classList.add('open');
    cvModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCvModal() {
    cvModal.classList.remove('open');
    cvModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  cvTriggers.forEach(btn => {
    btn.addEventListener('click', openCvModal);
  });

  if (cvCloseBtn) cvCloseBtn.addEventListener('click', closeCvModal);

  cvModal.addEventListener('click', (e) => {
    if (e.target === cvModal) closeCvModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cvModal.classList.contains('open')) {
      closeCvModal();
    }
  });
}

/**
 * 04. Contact Form Transmission
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
      submitBtn.innerHTML = '<span>Preparing Message...</span>';
    }

    const mailSubject = encodeURIComponent(`[NEW INQUIRY] ${scope} — ${name}`);
    const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${scope}\n\nMessage:\n${message}`);
    const mailUrl = `mailto:kiflemusse@gmail.com?subject=${mailSubject}&body=${mailBody}`;

    setTimeout(() => {
      if (feedback) {
        feedback.className = 'form-status success mono-text';
        feedback.innerHTML = `✓ Ready! Opening your email client to send to <strong>kiflemusse@gmail.com</strong>...`;
      }

      window.location.href = mailUrl;

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Message Sent &check;</span>';
      }

      form.reset();
    }, 400);
  });
}

/**
 * 05. Navigation Scroll Spy
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-item');

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
