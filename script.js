/**
 * MOSSES PORTFOLIO — DEV FULL-STACK INTERACTIVE JAVASCRIPT
 * Mobile Navigation Drawer, Interactive Eagle AI Chat, Scroll-Spy & Mailto Form
 */

document.addEventListener('DOMContentLoaded', () => {
  // ─── 01. Mobile Navigation Drawer ───
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

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openDrawer);
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }

  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        closeDrawer();
      }
    });
  }

  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // ─── 02. Interactive Eagle Investments AI Chat Simulation ───
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
        typingDiv.innerHTML = `<p class="text-cyan">Analyzing financial data...</p>`;
        eagleChatThread.appendChild(typingDiv);
        eagleChatThread.scrollTop = eagleChatThread.scrollHeight;

        // 3. Simulate response after brief delay
        setTimeout(() => {
          const answer = financialAiResponses[query] || 
            `Analyzing query regarding "${query}". Model recommends diversified treasury hedges and automated portfolio rebalancing.`;
          typingDiv.innerHTML = `<p>${answer}</p>`;
          eagleChatThread.scrollTop = eagleChatThread.scrollHeight;
        }, 600);
      });
    });
  }

  // ─── 03. Scroll-Spy Navigation Highlighting ───
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    let currentId = '';
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // ─── 04. Contact Form Mailto Dispatch ───
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
