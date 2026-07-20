document.addEventListener('DOMContentLoaded', () => {
  // === Theme Toggle ===
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Apply saved theme on load
  const savedTheme = localStorage.getItem('mosaic-theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('mosaic-theme', newTheme);
    });
  }

  // === Mobile Nav Toggle ===
  const navToggle = document.getElementById('nav-toggle');
  const navMobile = document.getElementById('nav-mobile');
  const navClose = document.getElementById('nav-close');

  const openMobileNav = () => {
    if (!navMobile) return;
    navMobile.classList.add('nav-mobile--open');
    document.body.style.overflow = 'hidden';
    // Focus the close button for accessibility
    setTimeout(() => navClose?.focus(), 100);
  };

  const closeMobileNav = () => {
    if (!navMobile) return;
    navMobile.classList.remove('nav-mobile--open');
    document.body.style.overflow = '';
    navToggle?.focus();
  };

  if (navToggle) {
    navToggle.addEventListener('click', openMobileNav);
  }
  
  if (navClose) {
    navClose.addEventListener('click', closeMobileNav);
  }

  // Close mobile nav when clicking a link
  document.querySelectorAll('.nav-mobile-link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Close mobile nav on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMobile?.classList.contains('nav-mobile--open')) {
      closeMobileNav();
    }
  });

  // === Sticky Header Scroll Effect ===
  const siteHeader = document.getElementById('site-header');
  
  const handleHeaderScroll = () => {
    if (!siteHeader) return;
    if (window.scrollY > 10) {
      siteHeader.classList.add('site-header--scrolled');
    } else {
      siteHeader.classList.remove('site-header--scrolled');
    }
  };
  
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // Init on load

  // === FAQ Accordion ===
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const button = item.querySelector('.faq-question');
    if (!button) return;

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('faq-item--open');
      
      // Close all other items (optional: remove if multiple open items are desired)
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('faq-item--open');
          const otherButton = otherItem.querySelector('.faq-question');
          if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      item.classList.toggle('faq-item--open');
      button.setAttribute('aria-expanded', !isOpen);
    });
  });

  // === Scroll Reveal Animations ===
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers: just show them
    revealElements.forEach(el => el.classList.add('reveal--visible'));
  }
});
