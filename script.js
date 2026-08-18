/**
 * ═══════════════════════════════════════════════════════════════
 * BROADSIDE EDITORIAL JAVASCRIPT CONTROLLER
 * Interactive Systems · Live Preview Modal · Filtering · Telemetry
 * ═══════════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveClock();
  initMobileDrawer();
  initProjectFiltering();
  initLivePreviewModal();
  initContactForm();
  initScrollSpy();
  initBackToTop();
});

/**
 * 01. Live Ticker Clock (2026 EAT)
 */
function initLiveClock() {
  const clockEl = document.getElementById('liveClock');
  if (!clockEl) return;

  function updateTime() {
    const now = new Date();
    // Use East Africa Time (UTC+3)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `2026 EAT ${hours}:${minutes}:${seconds}`;
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/**
 * 02. Mobile Navigation Drawer
 */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const mobileLinks = document.querySelectorAll('.mobile-link');

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

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/**
 * 03. Project Category Filter
 */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectRows = document.querySelectorAll('.project-broadside-row');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectRows.forEach(row => {
        const category = row.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          row.style.display = 'grid';
          row.style.opacity = '1';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 04. Interactive Live Preview Inspector Modal
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

  const previewButtons = document.querySelectorAll('.preview-btn');

  function openModal(url, title) {
    modalTitle.textContent = title.toUpperCase();
    modalUrlDisplay.textContent = url;
    modalExternalLink.href = url;

    if (loader) loader.style.display = 'flex';
    iframe.src = url;

    iframe.onload = () => {
      if (loader) loader.style.display = 'none';
    };

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    iframe.src = 'about:blank';
    document.body.style.overflow = '';
  }

  previewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.getAttribute('data-url');
      const title = btn.getAttribute('data-title') || 'Live Project';
      openModal(url, title);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Viewport Device Toggles (Desktop vs Mobile)
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
 * 05. Contact Form Transmission Dispatch
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
        feedback.className = 'form-feedback error mono-text';
        feedback.textContent = 'ERROR: All mandatory dispatch fields must be specified.';
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Transmitting Dispatch...</span>';
    }

    // Construct mailto link for direct transmission
    const mailtoSubject = encodeURIComponent(`[BROADSIDE DISPATCH] ${scope} — from ${name}`);
    const mailtoBody = encodeURIComponent(`From: ${name} (${email})\nNature of Dispatch: ${scope}\n\nProject Specifications / Role Details:\n${message}`);
    const mailtoUrl = `mailto:kiflemusse@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    setTimeout(() => {
      if (feedback) {
        feedback.className = 'form-feedback success mono-text';
        feedback.innerHTML = `✓ DISPATCH TRANSMISSION CONFIRMED. Launching mail client to finalize send to <strong>kiflemusse@gmail.com</strong>...`;
      }

      window.location.href = mailtoUrl;

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Dispatch Sent &check;</span>';
      }

      form.reset();
    }, 600);
  });
}

/**
 * 06. Scroll Spy for Main Navigation
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-item');

  function onScroll() {
    const scrollPos = window.scrollY + 120;

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

/**
 * 07. Back to Top Button
 */
function initBackToTop() {
  const topBtn = document.getElementById('backToTop');
  if (!topBtn) return;

  topBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
