/* ============================================
   СКИФ — Единый файл скриптов для 1С-Битрикс
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ============================================
     1. МОБИЛЬНОЕ МЕНЮ
     ============================================ */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileMenuIcon = document.getElementById('mobile-menu-icon');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('active');
      // Swap icon
      if (mobileMenuIcon) {
        mobileMenuIcon.innerHTML = isOpen
          ? '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'
          : '<line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/>';
      }
    });
  }

  /* ============================================
     2. МОБИЛЬНЫЙ АККОРДЕОН КАТАЛОГА
     ============================================ */
  const mobileCatalogToggle = document.getElementById('mobile-catalog-toggle');
  const mobileCatalogItems = document.getElementById('mobile-catalog-items');
  const mobileCatalogArrow = document.getElementById('mobile-catalog-arrow');

  if (mobileCatalogToggle && mobileCatalogItems) {
    mobileCatalogToggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = mobileCatalogItems.classList.toggle('active');
      if (mobileCatalogArrow) {
        mobileCatalogArrow.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0)';
      }
    });
  }

  /* ============================================
     3. ВЫПАДАЮЩЕЕ МЕНЮ КАТАЛОГА (ДЕСКТОП)
     ============================================ */
  const catalogDropdown = document.getElementById('catalog-dropdown');
  const megaMenu = document.getElementById('mega-menu');

  if (catalogDropdown && megaMenu) {
    let catalogTimeout;

    catalogDropdown.addEventListener('mouseenter', function () {
      clearTimeout(catalogTimeout);
      megaMenu.classList.add('active');
    });

    catalogDropdown.addEventListener('mouseleave', function () {
      catalogTimeout = setTimeout(function () {
        megaMenu.classList.remove('active');
      }, 150);
    });

    // Mega-menu category hover → show products
    const megaCatItems = megaMenu.querySelectorAll('.mega-menu-cat-item');
    const megaProductSets = megaMenu.querySelectorAll('.mega-menu-product-set');
    const megaCatTitle = document.getElementById('mega-menu-cat-title');

    megaCatItems.forEach(function (item) {
      item.addEventListener('mouseenter', function () {
        const catId = this.getAttribute('data-cat');
        // Activate this category
        megaCatItems.forEach(function (c) { c.classList.remove('active'); });
        this.classList.add('active');
        // Show matching product set
        megaProductSets.forEach(function (s) {
          s.style.display = s.getAttribute('data-cat') === catId ? 'grid' : 'none';
        });
        // Update title
        if (megaCatTitle) {
          megaCatTitle.textContent = this.querySelector('.cat-name') ? this.querySelector('.cat-name').textContent : 'Товары';
        }
      });
    });
  }

  /* ============================================
     4. ВЫПАДАЮЩЕЕ МЕНЮ «О КОМПАНИИ»
     ============================================ */
  const aboutDropdownWrap = document.getElementById('about-dropdown-wrap');
  const aboutDropdown = document.getElementById('about-dropdown');

  if (aboutDropdownWrap && aboutDropdown) {
    aboutDropdownWrap.addEventListener('mouseenter', function () {
      aboutDropdown.classList.add('active');
    });
    aboutDropdownWrap.addEventListener('mouseleave', function () {
      aboutDropdown.classList.remove('active');
    });
  }

  /* ============================================
     5. ПОИСК (ДЕСКТОП И МОБИЛЬНЫЙ)
     ============================================ */
  const searchToggleDesktop = document.getElementById('search-toggle-desktop');
  const searchDropdown = document.getElementById('search-dropdown');
  const searchToggleMobile = document.getElementById('search-toggle-mobile');
  const mobileSearch = document.getElementById('mobile-search');

  // Desktop search
  if (searchToggleDesktop && searchDropdown) {
    searchToggleDesktop.addEventListener('click', function () {
      searchDropdown.classList.toggle('active');
      const input = searchDropdown.querySelector('input');
      if (input && searchDropdown.classList.contains('active')) {
        setTimeout(function () { input.focus(); }, 100);
      }
    });
  }

  // Mobile search
  if (searchToggleMobile && mobileSearch) {
    searchToggleMobile.addEventListener('click', function () {
      mobileSearch.classList.toggle('active');
      const input = mobileSearch.querySelector('input');
      if (input && mobileSearch.classList.contains('active')) {
        setTimeout(function () { input.focus(); }, 100);
      }
    });
  }

  // Close search on outside click
  document.addEventListener('mousedown', function (e) {
    if (searchDropdown && !searchDropdown.contains(e.target) && searchToggleDesktop && !searchToggleDesktop.contains(e.target)) {
      searchDropdown.classList.remove('active');
    }
    if (mobileSearch && !mobileSearch.contains(e.target) && searchToggleMobile && !searchToggleMobile.contains(e.target)) {
      mobileSearch.classList.remove('active');
    }
  });

  // Search form submit
  document.querySelectorAll('.search-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = this.querySelector('input').value.trim();
      if (q) {
        window.location.href = '/search?search=' + encodeURIComponent(q);
      }
    });
  });

  /* ============================================
     6. МОДАЛКА «ЗАКАЗАТЬ ЗВОНОК»
     ============================================ */
  const callbackModal = document.getElementById('callback-modal');
  const callbackForm = document.getElementById('callback-form');

  // Open
  document.querySelectorAll('[data-open-callback]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (callbackModal) callbackModal.classList.add('active');
      // Close mobile menu if open
      if (mobileNav) mobileNav.classList.remove('active');
    });
  });

  // Close
  if (callbackModal) {
    callbackModal.querySelectorAll('[data-close-modal]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        callbackModal.classList.remove('active');
      });
    });
    callbackModal.querySelector('.modal-backdrop').addEventListener('click', function () {
      callbackModal.classList.remove('active');
    });
  }

  // Submit
  if (callbackForm) {
    callbackForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameInput = this.querySelector('[name="name"]');
      var phoneInput = this.querySelector('[name="phone"]');
      var valid = true;

      // Reset errors
      this.querySelectorAll('.form-error').forEach(function (el) { el.textContent = ''; });
      this.querySelectorAll('.form-input').forEach(function (el) { el.classList.remove('error'); });

      if (!nameInput.value.trim()) {
        nameInput.classList.add('error');
        nameInput.nextElementSibling && (nameInput.nextElementSibling.textContent = 'Введите ваше имя');
        valid = false;
      }

      var phoneDigits = phoneInput.value.replace(/\D/g, '');
      if (phoneDigits.length < 11) {
        phoneInput.classList.add('error');
        phoneInput.nextElementSibling && (phoneInput.nextElementSibling.textContent = 'Введите корректный номер телефона');
        valid = false;
      }

      if (valid) {
        // TODO: Отправка данных на сервер
        alert('Заявка отправлена! Мы перезвоним вам в ближайшее время.');
        this.reset();
        callbackModal.classList.remove('active');
      }
    });
  }

  /* ============================================
     7. МОДАЛКА ОБРАТНОЙ СВЯЗИ (FLOATING BUTTON)
     ============================================ */
  const feedbackModal = document.getElementById('feedback-modal');
  const feedbackBtn = document.getElementById('floating-feedback-btn');
  const feedbackForm = document.getElementById('feedback-form');

  if (feedbackBtn && feedbackModal) {
    feedbackBtn.addEventListener('click', function () {
      feedbackModal.classList.add('active');
    });

    feedbackModal.querySelectorAll('[data-close-modal]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        feedbackModal.classList.remove('active');
      });
    });

    feedbackModal.querySelector('.modal-backdrop').addEventListener('click', function () {
      feedbackModal.classList.remove('active');
    });
  }

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameInput = this.querySelector('[name="name"]');
      var phoneInput = this.querySelector('[name="phone"]');
      var valid = true;

      this.querySelectorAll('.form-error').forEach(function (el) { el.textContent = ''; });
      this.querySelectorAll('.form-input').forEach(function (el) { el.classList.remove('error'); });

      if (!nameInput.value.trim()) {
        nameInput.classList.add('error');
        nameInput.nextElementSibling && (nameInput.nextElementSibling.textContent = 'Введите ваше имя');
        valid = false;
      }

      var phoneDigits = phoneInput.value.replace(/\D/g, '');
      if (phoneDigits.length < 11) {
        phoneInput.classList.add('error');
        phoneInput.nextElementSibling && (phoneInput.nextElementSibling.textContent = 'Введите корректный номер телефона');
        valid = false;
      }

      if (valid) {
        alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
        this.reset();
        feedbackModal.classList.remove('active');
      }
    });
  }

  /* ============================================
     8. ФОРМАТИРОВАНИЕ ТЕЛЕФОНА
     ============================================ */
  document.querySelectorAll('input[data-phone-mask]').forEach(function (input) {
    input.addEventListener('input', function () {
      var digits = this.value.replace(/\D/g, '').slice(0, 11);
      var formatted = '';
      if (digits.length === 0) { formatted = ''; }
      else if (digits.length <= 1) { formatted = '+7'; }
      else if (digits.length <= 4) { formatted = '+7 (' + digits.slice(1); }
      else if (digits.length <= 7) { formatted = '+7 (' + digits.slice(1, 4) + ') ' + digits.slice(4); }
      else if (digits.length <= 9) { formatted = '+7 (' + digits.slice(1, 4) + ') ' + digits.slice(4, 7) + '-' + digits.slice(7); }
      else { formatted = '+7 (' + digits.slice(1, 4) + ') ' + digits.slice(4, 7) + '-' + digits.slice(7, 9) + '-' + digits.slice(9, 11); }
      this.value = formatted;
    });
  });

  function normalizeProductSlug(value) {
    return String(value || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9а-яё_-]+/gi, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function isUsefulProductText(value) {
    var text = String(value || '').trim();
    if (!text || text.length < 4) return false;
    return !/^(подробнее|в корзину|под заказ|купить)$/i.test(text);
  }

  function getProductNameFromLink(link) {
    var ownHeading = link.querySelector('h1, h2, h3, h4');
    if (ownHeading && isUsefulProductText(ownHeading.textContent)) return ownHeading.textContent;

    if (isUsefulProductText(link.textContent)) return link.textContent;

    var card = link.closest('.product-card, .mega-menu-product, [class*="product"], article');
    if (card) {
      var heading = card.querySelector('h1, h2, h3, h4');
      if (heading && isUsefulProductText(heading.textContent)) return heading.textContent;

      var titleLink = card.querySelector('a[href^="product.html"]:not(.product-card-overlay a)');
      if (titleLink && isUsefulProductText(titleLink.textContent)) return titleLink.textContent;

      var image = card.querySelector('img[alt]');
      if (image && isUsefulProductText(image.getAttribute('alt')) && image.getAttribute('alt') !== 'Прицеп') {
        return image.getAttribute('alt');
      }
    }

    return '';
  }

  document.querySelectorAll('a[href^="product.html"]').forEach(function (link) {
    var productName = getProductNameFromLink(link);
    var productSlug = normalizeProductSlug(productName);
    if (!productSlug) return;

    var href = link.getAttribute('href') || 'product.html';
    var hashIndex = href.indexOf('#');
    var hash = hashIndex >= 0 ? href.slice(hashIndex) : '';
    var cleanHref = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
    var parts = cleanHref.split('?');
    var base = parts[0] || 'product.html';
    var params = new URLSearchParams(parts[1] || '');
    if (!params.get('product')) params.set('product', productSlug);
    link.setAttribute('href', base + '?' + params.toString() + hash);
  });

  /* ============================================
     9. HERO-СЛАЙДЕР
     ============================================ */
  var heroSlides = document.querySelectorAll('.hero-slide');
  var heroTitles = document.querySelectorAll('.hero-title-slide');
  var heroDescs = document.querySelectorAll('.hero-desc-slide');
  var heroBtns = document.querySelectorAll('.hero-btn-slide');
  var heroDots = document.querySelectorAll('.hero-dot');
  var heroCounter = document.getElementById('hero-counter-current');
  var currentSlide = 0;
  var slideCount = heroSlides.length;
  var isAutoPlaying = true;
  var isAnimating = false;
  var slideInterval;

  function changeSlide(newIndex) {
    if (isAnimating || newIndex === currentSlide || slideCount === 0) return;
    isAnimating = true;

    // Previous
    heroSlides.forEach(function (s) { s.classList.remove('active', 'prev'); });
    heroSlides[currentSlide].classList.add('prev');

    // Activate new
    heroSlides[newIndex].classList.add('active');

    // Animate text out, then in
    var textEls = [];
    heroTitles.forEach(function (t, i) { if (i === currentSlide) textEls.push(t); });
    heroDescs.forEach(function (d, i) { if (i === currentSlide) textEls.push(d); });
    heroBtns.forEach(function (b, i) { if (i === currentSlide) textEls.push(b); });

    // Exit animation on old text
    textEls.forEach(function (el) {
      el.classList.remove('hero-text-enter');
      el.classList.add('hero-text-exit');
    });

    // After exit, swap and enter
    setTimeout(function () {
      heroTitles.forEach(function (t, i) {
        t.style.display = i === newIndex ? '' : 'none';
        t.classList.remove('hero-text-exit');
        if (i === newIndex) t.classList.add('hero-text-enter');
      });
      heroDescs.forEach(function (d, i) {
        d.style.display = i === newIndex ? '' : 'none';
        d.classList.remove('hero-text-exit');
        if (i === newIndex) d.classList.add('hero-text-enter');
      });
      heroBtns.forEach(function (b, i) {
        b.style.display = i === newIndex ? '' : 'none';
        b.classList.remove('hero-text-exit');
        if (i === newIndex) b.classList.add('hero-text-enter');
      });
    }, 250);

    // Dots
    heroDots.forEach(function (dot, i) {
      dot.classList.remove('active', 'paused');
      if (i === newIndex) {
        dot.classList.add('active');
        var progress = dot.querySelector('.hero-dot-progress');
        if (progress && isAutoPlaying) {
          progress.style.animation = 'none';
          progress.offsetHeight;
          progress.style.animation = 'progress 5s linear forwards';
        }
        if (!isAutoPlaying) {
          dot.classList.add('paused');
        }
      }
    });

    // Counter
    if (heroCounter) {
      heroCounter.textContent = String(newIndex + 1).padStart(2, '0');
    }

    currentSlide = newIndex;
    setTimeout(function () { isAnimating = false; }, 800);
  }

  function nextSlide() { changeSlide((currentSlide + 1) % slideCount); }
  function prevSlide() { changeSlide((currentSlide - 1 + slideCount) % slideCount); }

  function startAutoPlay() {
    stopAutoPlay();
    isAutoPlaying = true;
    slideInterval = setInterval(nextSlide, 5000);
    // Restart progress on current dot
    var activeDot = heroDots[currentSlide];
    if (activeDot) {
      activeDot.classList.remove('paused');
      var p = activeDot.querySelector('.hero-dot-progress');
      if (p) {
        p.style.animation = 'none';
        p.offsetHeight;
        p.style.animation = 'progress 5s linear forwards';
      }
    }
  }

  function stopAutoPlay() {
    clearInterval(slideInterval);
    isAutoPlaying = false;
    heroDots.forEach(function (d) { d.classList.add('paused'); });
  }

  function pauseTemporarily() {
    stopAutoPlay();
    setTimeout(startAutoPlay, 10000);
  }

  // Init dots
  heroDots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      if (i !== currentSlide) {
        changeSlide(i);
        pauseTemporarily();
      }
    });
  });

  // Init arrows
  var heroArrowLeft = document.getElementById('hero-arrow-left');
  var heroArrowRight = document.getElementById('hero-arrow-right');
  if (heroArrowLeft) heroArrowLeft.addEventListener('click', function () { prevSlide(); pauseTemporarily(); });
  if (heroArrowRight) heroArrowRight.addEventListener('click', function () { nextSlide(); pauseTemporarily(); });

  // Start slider
  if (slideCount > 0) {
    heroSlides[0].classList.add('active');
    heroDots[0] && heroDots[0].classList.add('active');
    startAutoPlay();
  }

  /* ============================================
     10. КОРЗИНА (localStorage)
     ============================================ */
  var CART_KEY = 'skif_cart';

  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch (e) { return []; }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCounter();
  }

  function addToCart(productId, productName, productPrice, productImage) {
    var cart = getCart();
    var existing = cart.find(function (item) { return item.id === productId; });
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 });
    }
    saveCart(cart);
  }

  function updateCartCounter() {
    var cart = getCart();
    var count = cart.reduce(function (sum, item) { return sum + item.quantity; }, 0);
    document.querySelectorAll('.cart-counter').forEach(function (el) {
      if (count > 0) {
        el.textContent = count;
        el.style.display = 'flex';
      } else {
        el.style.display = 'none';
      }
    });
  }

  // Init cart counter on load
  updateCartCounter();

  // Add-to-cart buttons
  document.querySelectorAll('[data-add-to-cart]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var id = parseInt(this.getAttribute('data-product-id'));
      var name = this.getAttribute('data-product-name') || 'Товар';
      var price = parseInt(this.getAttribute('data-product-price')) || 0;
      var image = this.getAttribute('data-product-image') || '';
      addToCart(id, name, price, image);

      // Visual feedback
      var original = this.innerHTML;
      this.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Добавлено!';
      this.classList.add('added');
      var self = this;
      setTimeout(function () {
        self.innerHTML = original;
        self.classList.remove('added');
      }, 1500);
    });
  });

  /* ============================================
     11. ИЗБРАННОЕ (localStorage)
     ============================================ */
  var FAV_KEY = 'skif_favorites';

  function getFavorites() {
    try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; }
    catch (e) { return []; }
  }

  function saveFavorites(favs) {
    localStorage.setItem(FAV_KEY, JSON.stringify(favs));
    updateFavoritesCounter();
  }

  function toggleFavorite(productId) {
    var favs = getFavorites();
    var idx = favs.indexOf(productId);
    if (idx >= 0) {
      favs.splice(idx, 1);
    } else {
      favs.push(productId);
    }
    saveFavorites(favs);
    return favs.indexOf(productId) >= 0;
  }

  function updateFavoritesCounter() {
    var favs = getFavorites();
    document.querySelectorAll('.favorites-counter').forEach(function (el) {
      if (favs.length > 0) {
        el.textContent = favs.length;
        el.style.display = 'flex';
      } else {
        el.style.display = 'none';
      }
    });
  }

  // Init favorites counter
  updateFavoritesCounter();

  // Init favorite buttons state
  var favs = getFavorites();
  document.querySelectorAll('[data-toggle-favorite]').forEach(function (btn) {
    var id = parseInt(btn.getAttribute('data-product-id'));
    if (favs.indexOf(id) >= 0) {
      btn.classList.add('active');
    }

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var productId = parseInt(this.getAttribute('data-product-id'));
      var isFav = toggleFavorite(productId);
      if (isFav) {
        this.classList.add('active');
      } else {
        this.classList.remove('active');
      }
    });
  });

  /* ============================================
     12. КОНТАКТНАЯ ФОРМА
     ============================================ */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      this.querySelectorAll('.form-error').forEach(function (el) { el.textContent = ''; });
      this.querySelectorAll('.form-input').forEach(function (el) { el.classList.remove('error'); });

      var nameInput = this.querySelector('[name="name"]');
      var phoneInput = this.querySelector('[name="phone"]');
      var emailInput = this.querySelector('[name="email"]');
      var privacyInput = this.querySelector('[name="privacy"]');

      if (nameInput && !nameInput.value.trim()) {
        nameInput.classList.add('error');
        var err = document.getElementById('contact-name-error');
        if (err) err.textContent = 'Введите ваше имя';
        valid = false;
      }

      if (phoneInput) {
        var phoneDigits = phoneInput.value.replace(/\D/g, '');
        if (phoneDigits.length < 11) {
          phoneInput.classList.add('error');
          var err = document.getElementById('contact-phone-error');
          if (err) err.textContent = 'Введите корректный номер телефона';
          valid = false;
        }
      }

      if (emailInput && emailInput.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        emailInput.classList.add('error');
        var err = document.getElementById('contact-email-error');
        if (err) err.textContent = 'Введите корректный email';
        valid = false;
      }

      if (privacyInput && !privacyInput.checked) {
        var err = document.getElementById('contact-privacy-error');
        if (err) err.textContent = 'Необходимо согласие на обработку данных';
        valid = false;
      }

      if (valid) {
        // TODO: Отправка на сервер
        alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
        this.reset();
      }
    });
  }

  /* ============================================
     13. COOKIE CONSENT
     ============================================ */
  var cookieConsent = document.getElementById('cookie-consent');
  if (cookieConsent) {
    var consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setTimeout(function () {
        cookieConsent.classList.add('active');
      }, 1000);
    }

    var acceptBtn = document.getElementById('cookie-accept');
    var declineBtn = document.getElementById('cookie-decline');
    var closeBtn = document.getElementById('cookie-close');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        localStorage.setItem('cookie-consent', 'accepted');
        cookieConsent.classList.remove('active');
      });
    }
    if (declineBtn) {
      declineBtn.addEventListener('click', function () {
        localStorage.setItem('cookie-consent', 'declined');
        cookieConsent.classList.remove('active');
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        localStorage.setItem('cookie-consent', 'declined');
        cookieConsent.classList.remove('active');
      });
    }
  }

  /* ============================================
     14. «ПОКАЗАТЬ ЕЩЁ» КАТЕГОРИИ
     ============================================ */
  var showMoreBtn = document.getElementById('show-more-categories');
  var hiddenCategories = document.querySelectorAll('.category-hidden');

  if (showMoreBtn && hiddenCategories.length > 0) {
    showMoreBtn.addEventListener('click', function () {
      hiddenCategories.forEach(function (el) {
        el.style.display = '';
        el.classList.remove('category-hidden');
      });
      showMoreBtn.style.display = 'none';
    });
  }

  /* ============================================
     15. ФОРМАТИРОВАНИЕ ЦЕН
     ============================================ */
  // Already formatted in HTML, but helper if needed:
  window.formatPrice = function (price) {
    return price.toLocaleString('ru-RU') + ' ₽';
  };

  /* ============================================
     16. TELEGRAM POPUP (через 30 сек)
     ============================================ */
  if (!sessionStorage.getItem('tg-popup-dismissed')) {
    setTimeout(function () {
      if (sessionStorage.getItem('tg-popup-dismissed')) return;
      var popup = document.createElement('div');
      popup.id = 'tg-popup';
      popup.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;max-width:320px;width:calc(100% - 48px);background:#fff;border:1px solid #e5e7eb;border-radius:16px;box-shadow:0 25px 50px -12px rgba(0,0,0,.25);overflow:hidden;animation:tgSlideIn .5s ease-out';
      popup.innerHTML = '<div style="position:relative;padding:20px">'
        + '<button onclick="document.getElementById(\'tg-popup\').remove();sessionStorage.setItem(\'tg-popup-dismissed\',\'1\')" style="position:absolute;top:12px;right:12px;background:none;border:none;cursor:pointer;padding:4px;border-radius:50%;color:#9ca3af" aria-label="Закрыть">'
        + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>'
        + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">'
        + '<svg width="20" height="20" viewBox="0 0 24 24" fill="#2AABEE"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>'
        + '<span style="font-weight:600;font-size:14px">Telegram</span></div>'
        + '<p style="font-size:14px;margin:0 0 16px;padding-right:16px;line-height:1.4">Добавляйтесь в наш телеграм-канал, чтобы быть в курсе всех событий.</p>'
        + '<a href="https://t.me/skif_avto_38" target="_blank" rel="noopener" style="display:flex;justify-content:center"><img src="images/qr-telegram.jpg" alt="QR-код @skif_avto_38" style="width:100%;max-width:260px;object-fit:contain;border-radius:12px"></a>'
        + '<a href="https://t.me/skif_avto_38" target="_blank" rel="noopener" style="display:block;margin-top:16px;text-align:center;padding:10px;border-radius:12px;background:#2AABEE;color:#fff;font-weight:500;font-size:14px;text-decoration:none">Подписаться</a>'
        + '</div>';
      document.body.appendChild(popup);
    }, 30000);
  }

  var tgStyle = document.createElement('style');
  tgStyle.textContent = '@keyframes tgSlideIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}';
  document.head.appendChild(tgStyle);

});

// === VK Video embeds ===
// Превращает <div data-vk-video="https://vkvideo.ru/video-XXX_YYY"> в iframe плеера VK
document.addEventListener('DOMContentLoaded', function () {
  function parseVkUrl(url) {
    if (!url) return null;
    var m = url.match(/(?:video|clip)(-?\d+)_(\d+)/);
    if (!m) return null;
    return { oid: m[1], id: m[2] };
  }
  function buildEmbed(url) {
    var p = parseVkUrl(url);
    if (!p) return null;
    return 'https://vk.com/video_ext.php?oid=' + p.oid + '&id=' + p.id + '&hd=2';
  }
  var nodes = document.querySelectorAll('.vk-video-embed[data-vk-video]');
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    var src = buildEmbed(node.getAttribute('data-vk-video'));
    if (!src) continue;
    var title = node.getAttribute('data-vk-title') || 'VK Видео';
    var iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = title;
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;');
    iframe.setAttribute('allowfullscreen', '');
    iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:0;';
    node.innerHTML = '';
    node.appendChild(iframe);
  }
});
