/**
 * MOSSES PORTFOLIO — 3D TEXTLOOP VARIANTS JAVASCRIPT (v16.0)
 * 3D rotateX + Blur Filter TextLoop Controller, Mobile CardSwipe with Dot Pagination,
 * Continuous Floating Pill Tabs, Copy Toasts & Interactive AI Chat
 */

document.addEventListener('DOMContentLoaded', () => {
  // ─── 01. 3D TextLoop Variants Controller ───
  const textLoopWrapper = document.getElementById('heroTextLoopWrapper');
  const textLoopItems = document.querySelectorAll('.text-loop-item');

  let currentLoopIndex = 0;
  let textLoopTimer = null;

  function updateWrapperWidth(activeEl) {
    if (!textLoopWrapper || !activeEl) return;
    const width = activeEl.offsetWidth;
    if (width > 0) {
      textLoopWrapper.style.width = `${width}px`;
    }
  }

  function rotateTextLoop(nextIndex) {
    if (textLoopItems.length === 0) return;
    const currentItem = textLoopItems[currentLoopIndex];
    const nextIdx = nextIndex !== undefined ? nextIndex : (currentLoopIndex + 1) % textLoopItems.length;
    const nextItem = textLoopItems[nextIdx];

    // 1. Current item exits to top with rotateX(-90deg) & blur(4px)
    currentItem.classList.remove('active');
    currentItem.classList.add('exit');

    // 2. Next item animates in from bottom with rotateX(0deg) & blur(0px)
    nextItem.classList.remove('exit');
    nextItem.classList.add('active');

    updateWrapperWidth(nextItem);
    currentLoopIndex = nextIdx;

    // Reset previous item classes after transition completes
    setTimeout(() => {
      currentItem.classList.remove('exit');
    }, 560);
  }

  if (textLoopWrapper && textLoopItems.length > 0) {
    // Set initial width
    setTimeout(() => {
      updateWrapperWidth(textLoopItems[0]);
    }, 80);

    // Auto-cycle loop
    function startTextLoop() {
      clearTimeout(textLoopTimer);
      textLoopTimer = setInterval(() => {
        rotateTextLoop();
      }, 2800);
    }

    startTextLoop();

    // Click wrapper to immediately trigger next phrase
    textLoopWrapper.addEventListener('click', () => {
      rotateTextLoop();
      startTextLoop();
    });

    window.addEventListener('resize', () => {
      const activeItem = document.querySelector('.text-loop-item.active');
      if (activeItem) updateWrapperWidth(activeItem);
    });
  }

  // ─── 02. Mobile CardSwipe Dot Pagination Synchronization ───
  function setupScrollSwipeDots(trackId, dotsContainerId) {
    const track = document.getElementById(trackId);
    const dotsContainer = document.getElementById(dotsContainerId);
    if (!track || !dotsContainer) return;

    const dots = dotsContainer.querySelectorAll('.dot');
    const cards = track.children;
    if (dots.length === 0 || cards.length === 0) return;

    // Track scroll
    track.addEventListener('scroll', () => {
      const scrollLeft = track.scrollLeft;
      const cardWidth = cards[0]?.offsetWidth || 300;
      const activeIdx = Math.round(scrollLeft / cardWidth);

      dots.forEach((dot, i) => {
        if (i === activeIdx) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }, { passive: true });

    // Click dot to scroll
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        if (cards[idx]) {
          cards[idx].scrollIntoView({
            behavior: 'smooth',
            inline: 'start',
            block: 'nearest'
          });
        }
      });
    });
  }

  // Setup mobile swipe dots for Services and Experience
  setupScrollSwipeDots('servicesSwipeTrack', 'servicesDots');
  setupScrollSwipeDots('experienceSwipeTrack', 'expDots');

  // ─── 03. Continuous Tabs: Sliding Spring Active Pill ───
  const tabsNav = document.getElementById('continuousTabsNav');
  const tabButtons = document.querySelectorAll('.tab-pill-btn');
  const slidingPill = document.getElementById('slidingActivePill');
  const sections = document.querySelectorAll('section[id]');

  function updateSlidingPill(activeBtn) {
    if (!tabsNav || !slidingPill || !activeBtn) return;
    const navRect = tabsNav.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();

    const leftOffset = btnRect.left - navRect.left;
    const btnWidth = btnRect.width;

    slidingPill.style.transform = `translateX(${leftOffset}px)`;
    slidingPill.style.width = `${btnWidth}px`;
    slidingPill.style.opacity = '1';
  }

  // Initialize pill position
  const initialActive = document.querySelector('.tab-pill-btn.active') || tabButtons[0];
  if (initialActive) {
    setTimeout(() => updateSlidingPill(initialActive), 60);
  }

  // Handle Tab Click
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      updateSlidingPill(btn);
    });
  });

  // Scroll-Spy to update continuous tabs
  function onScrollSpy() {
    let currentId = '';
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      tabButtons.forEach((btn) => {
        if (btn.getAttribute('data-tab') === currentId) {
          if (!btn.classList.contains('active')) {
            tabButtons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            updateSlidingPill(btn);
          }
        }
      });
    }
  }

  window.addEventListener('scroll', onScrollSpy, { passive: true });
  window.addEventListener('resize', () => {
    const currentActive = document.querySelector('.tab-pill-btn.active');
    if (currentActive) updateSlidingPill(currentActive);
  });

  // ─── 04. Scroll Reveal Observer ───
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-revealed'));
  }

  // ─── 05. Interactive Project Card Swipe & Carousel ───
  const carouselTrack = document.getElementById('projectCarouselTrack');
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');
  const counterEl = document.getElementById('carouselCounter');
  const carouselCards = document.querySelectorAll('#projectCarouselTrack .compact-card');

  let currentSlide = 0;
  const totalSlides = carouselCards.length;

  function updateCarousel() {
    if (counterEl) {
      counterEl.textContent = `${currentSlide + 1} / ${totalSlides}`;
    }
    if (carouselTrack && carouselCards[currentSlide]) {
      carouselCards[currentSlide].scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
        block: 'nearest'
      });
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    });
  }

  if (carouselTrack) {
    carouselTrack.addEventListener('scroll', () => {
      const scrollLeft = carouselTrack.scrollLeft;
      const cardWidth = carouselCards[0]?.offsetWidth || 300;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex >= 0 && newIndex < totalSlides && newIndex !== currentSlide) {
        currentSlide = newIndex;
        if (counterEl) counterEl.textContent = `${currentSlide + 1} / ${totalSlides}`;
      }
    }, { passive: true });
  }

  // ─── 06. Copy to Clipboard with Toast Notification ───
  const copyButtons = document.querySelectorAll('.copy-link-btn');
  const toast = document.getElementById('toastNotification');
  let toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg || 'Link copied to clipboard!';
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const url = btn.getAttribute('data-url') || window.location.href;
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(url);
        } else {
          const input = document.createElement('input');
          input.value = url;
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          document.body.removeChild(input);
        }
        showToast(`Copied: ${url}`);
      } catch (err) {
        showToast('Link copied to clipboard!');
      }
    });
  });

  // ─── 07. Mobile Navigation Drawer ───
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) closeDrawer();
    });
  }
  mobileLinks.forEach((link) => link.addEventListener('click', closeDrawer));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // ─── 08. Interactive Eagle Investments AI Chat Simulation ───
  const eagleChatThread = document.getElementById('eagleChatThread');
  const chatChips = document.querySelectorAll('.chat-chip');

  const financialAiResponses = {
    "What are treasury bill yields in East Africa?":
      "East African T-bill yields currently range between 14.5%–17.2% across 91-day and 364-day tenors, reflecting local liquidity conditions and central bank monetary tightening.",
    "Explain dollar-cost averaging in emerging markets.":
      "Dollar-Cost Averaging (DCA) in emerging markets mitigates currency volatility and FX slippage by distributing asset purchases in fixed intervals across foreign-denominated index funds.",
    "How do capital markets protect against local inflation?":
      "Capital allocation in high-yield dividend equities, indexed commercial real estate, and export-driven agricultural commodities historically outpaces inflationary currency depreciation."
  };

  if (eagleChatThread && chatChips.length > 0) {
    chatChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-prompt') || chip.textContent.trim();
        
        // 1. Append User Bubble
        const userDiv = document.createElement('div');
        userDiv.className = 'chat-bubble user-bubble';
        userDiv.innerHTML = `<p>${query}</p>`;
        eagleChatThread.appendChild(userDiv);
        eagleChatThread.scrollTop = eagleChatThread.scrollHeight;

        // 2. Show Typing Indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-bubble bot-bubble';
        typingDiv.innerHTML = `<p class="text-terracotta font-code">Analyzing financial data...</p>`;
        eagleChatThread.appendChild(typingDiv);
        eagleChatThread.scrollTop = eagleChatThread.scrollHeight;

        // 3. Simulate response
        setTimeout(() => {
          const answer = financialAiResponses[query] || 
            `Analyzing query regarding "${query}". Model recommends diversified treasury hedges and automated portfolio rebalancing.`;
          typingDiv.innerHTML = `<p>${answer}</p>`;
          eagleChatThread.scrollTop = eagleChatThread.scrollHeight;
        }, 550);
      });
    });
  }

  // ─── 09. Contact Form Mailto Dispatch ───
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName')?.value.trim() || '';
      const email = document.getElementById('senderEmail')?.value.trim() || '';
      const scope = document.getElementById('projectScope')?.value || 'General Inquiry';
      const message = document.getElementById('senderMessage')?.value.trim() || '';

      if (!name || !email || !message) {
        if (formFeedback) {
          formFeedback.textContent = 'Please fill out all required fields.';
          formFeedback.className = 'form-status error';
        }
        return;
      }

      const subject = encodeURIComponent(`Project Inquiry: ${scope} — ${name}`);
      const body = encodeURIComponent(
        `Hi Mussie,\n\nName: ${name}\nEmail: ${email}\nTopic: ${scope}\n\nMessage:\n${message}\n\nSent from portfolio contact form.`
      );

      const mailtoUrl = `mailto:kiflemusse@gmail.com?subject=${subject}&body=${body}`;

      if (formFeedback) {
        formFeedback.textContent = 'Opening your email client...';
        formFeedback.className = 'form-status success';
      }

      window.location.href = mailtoUrl;
    });
  }
});
