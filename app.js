(() => {
  'use strict';

  // RUN FIRST SANDALS — CATALOGUE AND SHOPPING CART

  const PRODUCTS = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : [];
  const CONFIG = window.SITE_CONFIG || {};
  const BUSINESS_NAME = 'Run First Sandals';
  const WHATSAPP_NUMBER = String(CONFIG.whatsappNumber || '27822990061').replace(/\D/g, '');
  const CART_STORAGE_KEY = 'runFirstShoppingCart';
  const LANGUAGE_STORAGE_KEY = 'runFirstLanguage';
  const $ = (id) => document.getElementById(id);

  let currentLanguage = 'en';
  let cart = loadCart();

  const TEXT = {
    en: {
      home: 'Home',
      catalogue: 'Catalogue',
      how: 'How to order',
      contact: 'Contact',
      cart: 'Cart',
      search: 'Search style code or name…',
      all: 'All footwear',
      sortCode: 'Sort: Style code',
      sortName: 'Sort: Name',
      noProducts: 'No styles found. Try another search.',
      sizes: 'Sizes',
      pairsPerCarton: 'Pairs per carton',
      cartons: 'Cartons',
      addToCart: 'Add to cart',
      added: 'Added!',
      enterQuantity: 'Enter at least one carton quantity.',
      invalidQuantity: 'Enter a whole number of cartons.',
      emptyCart: 'Your cart is empty. Browse the catalogue to add styles.',
      size: 'Size',
      pairs: 'pairs',
      remove: 'Remove',
      clearCart: 'Clear cart',
      checkout: 'Send order on WhatsApp',
      totalCartons: 'Total cartons',
      totalPairs: 'Total pairs',
      confirmClear: 'Are you sure you want to clear your cart?',
      orderTitle: 'WHOLESALE ORDER',
      orderMessage: 'Hello, I would like to place the following wholesale order:',
      thankYou: 'Please confirm pricing, availability and delivery.',
      imageUnavailable: 'Image unavailable',
      contactWhatsApp: 'Enquire on WhatsApp',
      noPackSize: 'Carton quantity unavailable',
      language: 'Language',
      emptySearch: 'No styles found',
      howTitle: 'How to order',
      howText: 'Choose your styles, enter carton quantities, review your cart and send your order through WhatsApp.',
      contactTitle: "Let's talk footwear.",
      heroEyebrow: 'MADE FOR EVERYDAY COMFORT',
      heroTitle: 'Find your next best-seller.',
      heroDescription: 'Explore the Run First Sandals footwear collection by style code. Choose your styles, enter carton quantities and send your order directly to us through WhatsApp.',
      explore: 'Explore catalogue',
      wholesaleWelcome: 'Wholesale enquiries welcome',
      artLabel: 'FOOTWEAR COLLECTION',
      collectionEyebrow: 'THE COLLECTION',
      catalogueTitle: 'Browse our styles',
      catalogueDescription: 'Search for a style, check its size range and add cartons to your cart.',
      sandals: 'Sandals',
      slippers: 'Slippers',
      other: 'Other',
      loading: 'Loading catalogue…',
      emptyTitle: 'No styles found',
      emptyDescription: 'Try another search or clear your filters.',
      orderingEyebrow: 'SIMPLE ORDERING',
      step1Title: 'Choose your styles',
      step1Text: "Browse the catalogue and check each style's available size range.",
      step2Title: 'Add cartons',
      step2Text: 'Enter the carton quantity for each style and add it to your cart.',
      step3Title: 'Review your order',
      step3Text: 'Check your selected styles, carton quantities and total pairs.',
      step4Title: 'Send on WhatsApp',
      step4Text: 'Send the complete order to us through WhatsApp for confirmation.',
      yourOrder: 'YOUR ORDER',
      cartonsLabel: 'cartons',
      cartIntro: 'Review your selected styles before sending your order.',
      priceNote: 'Prices are not calculated on this website. We will confirm pricing, availability and delivery with you.',
      contactEyebrow: 'READY TO ORDER?',
      contactDescription: "Send us your selected styles through WhatsApp and we'll help with your wholesale enquiry.",
      footerRights: 'All rights reserved.',
      backToTop: 'Back to top ↑'
    },

    zh: {
      home: '首页',
      catalogue: '产品目录',
      how: '订购方法',
      contact: '联系我们',
      cart: '购物车',
      search: '搜索产品编号或名称…',
      all: '所有鞋类',
      sortCode: '按产品编号排序',
      sortName: '按名称排序',
      noProducts: '没有找到款式，请尝试其他搜索。',
      sizes: '尺码',
      pairsPerCarton: '每箱双数',
      cartons: '箱',
      addToCart: '加入购物车',
      added: '已加入！',
      enterQuantity: '请输入至少一个产品的箱数。',
      invalidQuantity: '请输入整数箱数。',
      emptyCart: '购物车是空的，请浏览产品目录并添加款式。',
      size: '尺码',
      pairs: '双',
      remove: '删除',
      clearCart: '清空购物车',
      checkout: '通过 WhatsApp 发送订单',
      totalCartons: '总箱数',
      totalPairs: '总双数',
      confirmClear: '确定要清空购物车吗？',
      orderTitle: '批发订单',
      orderMessage: '您好，我想订购以下批发产品：',
      thankYou: '请确认价格、库存和送货安排。',
      imageUnavailable: '图片无法显示',
      contactWhatsApp: '通过 WhatsApp 咨询',
      noPackSize: '没有每箱双数信息',
      language: '语言',
      emptySearch: '没有找到款式',
      howTitle: '订购方法',
      howText: '选择款式，输入箱数，检查购物车，然后通过 WhatsApp 发送订单。',
      contactTitle: '欢迎咨询鞋类产品。',
      heroEyebrow: '舒适每一天',
      heroTitle: '寻找下一个畅销款。',
      heroDescription: '按产品编号浏览 Run First Sandals 鞋类目录。选择款式，输入订购箱数，然后通过 WhatsApp 直接发送订单。',
      explore: '浏览产品目录',
      wholesaleWelcome: '欢迎批发咨询',
      artLabel: '鞋类系列',
      collectionEyebrow: '产品系列',
      catalogueTitle: '浏览所有款式',
      catalogueDescription: '搜索款式，查看尺码范围，并将整箱产品加入购物车。',
      sandals: '凉鞋',
      slippers: '拖鞋',
      other: '其他',
      loading: '正在加载产品目录…',
      emptyTitle: '没有找到款式',
      emptyDescription: '请尝试其他搜索词或清除筛选条件。',
      orderingEyebrow: '简单订购',
      step1Title: '选择款式',
      step1Text: '浏览产品目录并查看每款产品的可选尺码范围。',
      step2Title: '添加箱数',
      step2Text: '输入每款产品的订购箱数，然后加入购物车。',
      step3Title: '检查订单',
      step3Text: '核对所选款式、订购箱数和产品总双数。',
      step4Title: '通过 WhatsApp 发送',
      step4Text: '通过 WhatsApp 发送完整订单，以便我们确认。',
      yourOrder: '您的订单',
      cartonsLabel: '箱',
      cartIntro: '发送订单前，请检查您选择的款式。',
      priceNote: '本网站不计算价格。我们将与您确认价格、库存和送货安排。',
      contactEyebrow: '准备好订购了吗？',
      contactDescription: '通过 WhatsApp 发送您选择的款式，我们将协助您处理批发咨询。',
      footerRights: '版权所有。',
      backToTop: '返回顶部 ↑'
    }
  };

  function t(key) {
    return TEXT[currentLanguage]?.[key] || TEXT.en[key] || key;
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[character]);
  }

  function loadCart() {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (!stored) return [];

      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return [];

      return parsed.filter((item) =>
        item &&
        typeof item.code === 'string' &&
        typeof item.sizeKey === 'string' &&
        Number.isInteger(Number(item.cartons)) &&
        Number(item.cartons) > 0
      );
    } catch (error) {
      return [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.warn('Could not save cart.', error);
    }
  }

  function detectLanguage() {
    const urlLanguage = new URLSearchParams(window.location.search).get('lang');

    if (urlLanguage === 'zh' || urlLanguage === 'en') {
      return urlLanguage;
    }

    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'zh' || saved === 'en') return saved;
    } catch (error) {
      // Use English if local storage is unavailable.
    }

    return 'en';
  }

  function setLanguage(language) {
    currentLanguage = language === 'zh' ? 'zh' : 'en';

    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
    } catch (error) {
      // Language still works for this page view.
    }

    document.documentElement.lang = currentLanguage === 'zh' ? 'zh-CN' : 'en';

    if ($('language')) $('language').value = currentLanguage;

    updateStaticText();
    renderProducts();
    renderCart();
    updateContactButton();
  }

  function setText(selector, key) {
    const element = document.querySelector(selector);
    if (element) element.textContent = t(key);
  }

  function updateStaticText() {
    if ($('language')) {
      $('language').setAttribute('aria-label', t('language'));
    }

    if ($('search')) {
      $('search').placeholder = t('search');
      $('search').setAttribute('aria-label', t('search'));
    }

    const category = $('category');
    if (category && category.options.length >= 4) {
      category.options[0].textContent = t('all');
      category.options[1].textContent = t('sandals');
      category.options[2].textContent = t('slippers');
      category.options[3].textContent = t('other');
    }

    const sort = $('sort');
    if (sort && sort.options.length >= 2) {
      sort.options[0].textContent = t('sortCode');
      sort.options[1].textContent = t('sortName');
    }

    const headerContact = $('headerContact');
    if (headerContact) {
      headerContact.textContent = `${t('contact')} ↗`;
    }

    const navLabels = {
      home: 'home',
      catalogue: 'catalogue',
      how: 'how',
      contact: 'contact'
    };

    document.querySelectorAll('[data-nav]').forEach((link) => {
      const key = navLabels[link.dataset.nav];
      if (key) link.textContent = t(key);
    });

    const navCart = document.querySelector('.nav-cart');
    if (navCart) {
      const counter = $('navCartCount');
      navCart.textContent = `${t('cart')} `;
      if (counter) navCart.appendChild(counter);
    }

    setText('.hero .eyebrow', 'heroEyebrow');

    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
      heroTitle.innerHTML = currentLanguage === 'zh'
        ? '寻找下一个<br><em>畅销款。</em>'
        : 'Find your<br><em>next best-seller.</em>';
    }

    setText('.hero-text', 'heroDescription');

    const exploreButton = document.querySelector('.hero .primary-button');
    if (exploreButton) {
      exploreButton.innerHTML =
        `${escapeHTML(t('explore'))} <span>↓</span>`;
    }

    const heroNote = document.querySelector('.hero-note');
    if (heroNote) {
      heroNote.innerHTML =
        `<span class="dot"></span> ${escapeHTML(t('wholesaleWelcome'))}`;
    }

    const artLabel = document.querySelector('.art-label');
    if (artLabel) {
      artLabel.innerHTML = currentLanguage === 'zh'
        ? '鞋类系列'
        : 'FOOTWEAR<br>COLLECTION';
    }

    setText('.catalogue .section-head .eyebrow', 'collectionEyebrow');
    setText('.catalogue .section-head h2', 'catalogueTitle');
    setText('.section-description', 'catalogueDescription');
    setText('#empty h3', 'emptyTitle');
    setText('#empty p', 'emptyDescription');

    setText('#how-to-order > .eyebrow', 'orderingEyebrow');
    setText('#how-to-order > h2', 'howTitle');

    // Explicitly translate each ordering card.
    const guideTranslations = [
      ['step1Title', 'step1Text'],
      ['step2Title', 'step2Text'],
      ['step3Title', 'step3Text'],
      ['step4Title', 'step4Text']
    ];

    guideTranslations.forEach((keys, index) => {
      const article = document.querySelector(
        `#how-to-order .guide-grid article:nth-child(${index + 1})`
      );

      if (!article) return;

      const heading = article.querySelector('h3');
      const paragraph = article.querySelector('p');

      if (heading) heading.textContent = t(keys[0]);
      if (paragraph) paragraph.textContent = t(keys[1]);
    });

    setText('.cart-heading .eyebrow', 'yourOrder');
    setText('.cart-heading h2', 'cart');
    setText('.cart-intro', 'cartIntro');
    setText('.cart-note', 'priceNote');

    setText('#contact .eyebrow', 'contactEyebrow');
    setText('#contact h2', 'contactTitle');
    setText('#contact > div > p:not(.eyebrow)', 'contactDescription');

    const clearButton = $('clearCart');
    if (clearButton) clearButton.textContent = t('clearCart');

    const checkoutButton = $('checkoutButton');
    if (checkoutButton) {
      checkoutButton.innerHTML =
        `${escapeHTML(t('checkout'))} <span>↗</span>`;
    }

    const whatsappButton = $('whatsappButton');
    if (whatsappButton) {
      whatsappButton.innerHTML =
        `${escapeHTML(t('contactWhatsApp'))} <span>↗</span>`;
    }

    const footer = document.querySelector('footer > p');
    if (footer) {
      footer.innerHTML =
        `© <span id="year">${new Date().getFullYear()}</span> Run First Sandals. ${escapeHTML(t('footerRights'))}`;
    }

    const footerLink = document.querySelector('footer > a:last-child');
    if (footerLink) footerLink.textContent = t('backToTop');

    updateCartNavigation();
  }

  function productCode(product) {
    return String(product.code ?? '');
  }

  function productName(product) {
    return String(product.name || productCode(product));
  }

  function productSizes(product) {
    return String(product.sizes || '').trim();
  }

  function packSize(product) {
    const match = String(product.pairsPerCarton || '').match(/\d+/);
    return match ? Number(match[0]) : 0;
  }

  function imagePath(product) {
    return String(product.image || '');
  }

  function formatNumber(number) {
    return Number(number || 0).toLocaleString(
      currentLanguage === 'zh' ? 'zh-CN' : 'en-ZA'
    );
  }

  function getSizeOptions(product) {
    const code = productCode(product);
    const sizesText = productSizes(product);

    const ranges = sizesText.match(/\d{1,2}\s*[-–—]\s*\d{1,2}/g) || [];
    const cleanedRanges = ranges.map((range) =>
      range.replace(/\s+/g, '').replace(/—/g, '–')
    );

    const suffixMatch = code.match(/([sml](?:\s*\/\s*[sml])+)$/i);
    let letters = [];

    if (suffixMatch) {
      letters = suffixMatch[1]
        .split('/')
        .map((letter) => letter.trim().toUpperCase());
    } else {
      const singleMatch = code.match(/([sml])$/i);
      if (singleMatch) letters = [singleMatch[1].toUpperCase()];
    }

    if (letters.length > 0) {
      return letters.map((letter, index) => ({
        key: `${letter}-${index}`,
        label: cleanedRanges[index]
          ? `${letter} (${cleanedRanges[index]})`
          : letter,
        size: cleanedRanges[index] || letter
      }));
    }

    if (cleanedRanges.length > 0) {
      return cleanedRanges.map((range, index) => ({
        key: `size-${index}`,
        label: range,
        size: range
      }));
    }

    return [{
      key: 'default',
      label: sizesText || (currentLanguage === 'zh' ? '标准尺码' : 'Standard size'),
      size: sizesText || 'Standard size'
    }];
  }

  function filteredProducts() {
    const searchTerm = $('search').value.trim().toLowerCase();
    const categoryValue = $('category').value.trim().toLowerCase();
    const sortValue = $('sort').value;

    let results = PRODUCTS.filter((product) => {
      const searchable = [
        productCode(product),
        productName(product),
        productSizes(product),
        product.pairsPerCarton || '',
        product.category || ''
      ].join(' ').toLowerCase();

      const matchesSearch = !searchTerm || searchable.includes(searchTerm);

      const matchesCategory =
        categoryValue === 'all' ||
        categoryValue === '' ||
        String(product.category || '').toLowerCase() === categoryValue;

      return matchesSearch && matchesCategory;
    });

    // If the source catalogue does not contain category data, don't hide all products.
    if (
      results.length === 0 &&
      categoryValue !== 'all' &&
      categoryValue !== '' &&
      !PRODUCTS.some((product) =>
        String(product.category || '').toLowerCase() === categoryValue
      )
    ) {
      results = PRODUCTS.filter((product) => {
        const searchable = [
          productCode(product),
          productName(product),
          productSizes(product),
          product.pairsPerCarton || ''
        ].join(' ').toLowerCase();

        return !searchTerm || searchable.includes(searchTerm);
      });
    }

    if (sortValue === 'name') {
      results.sort((a, b) => productName(a).localeCompare(productName(b)));
    } else {
      results.sort((a, b) =>
        productCode(a).localeCompare(
          productCode(b),
          undefined,
          { numeric: true }
        )
      );
    }

    return results;
  }

  function renderProducts() {
    const container = $('products');
    const emptyState = $('empty');
    const results = filteredProducts();

    $('resultCount').textContent =
      `${formatNumber(results.length)} ${currentLanguage === 'zh' ? '个款式' : 'styles'}`;

    if (emptyState) emptyState.hidden = results.length !== 0;

    if (results.length === 0) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = results.map((product) => {
      const code = productCode(product);
      const name = productName(product);
      const sizes = productSizes(product);
      const pairs = packSize(product);
      const image = imagePath(product);
      const options = getSizeOptions(product);
      const productIndex = PRODUCTS.indexOf(product);

      const sizeInputs = options.map((option) => `
        <div class="size-order-row">
          <label class="size-order-label"
            for="qty-${productIndex}-${escapeHTML(option.key)}">
            ${escapeHTML(option.label)}
          </label>
          <input
            id="qty-${productIndex}-${escapeHTML(option.key)}"
            class="cart-quantity-input"
            type="number"
            min="0"
            step="1"
            value="0"
            inputmode="numeric"
            aria-label="${escapeHTML(t('cartons'))}: ${escapeHTML(option.label)}"
          >
        </div>
      `).join('');

      const imageHTML = image
        ? `
          <img
            class="product-image"
            src="${escapeHTML(image)}"
            alt="${escapeHTML(name)}"
            loading="lazy"
            onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
          >
          <div class="product-image-fallback" style="display:none">
            ${escapeHTML(t('imageUnavailable'))}
          </div>
        `
        : `
          <div class="product-image-fallback">
            ${escapeHTML(t('imageUnavailable'))}
          </div>
        `;

      return `
        <article class="product-card" data-product-code="${escapeHTML(code)}">
          <div class="product-image-wrap">${imageHTML}</div>
          <div class="product-card-content">
            <h3 class="product-code">${escapeHTML(code)}</h3>
            ${name !== code
              ? `<p class="product-name">${escapeHTML(name)}</p>`
              : ''}
            ${sizes
              ? `<p class="product-size-info"><strong>${escapeHTML(t('sizes'))}:</strong> ${escapeHTML(sizes)}</p>`
              : ''}
            <p class="product-pack-info">
              <strong>${escapeHTML(t('pairsPerCarton'))}:</strong>
              ${pairs > 0
                ? formatNumber(pairs)
                : escapeHTML(t('noPackSize'))}
            </p>
            <div class="size-order-inputs">${sizeInputs}</div>
            <button type="button" class="add-cart-button"
              data-add-product="${escapeHTML(code)}">
              ${escapeHTML(t('addToCart'))}
            </button>
          </div>
        </article>
      `;
    }).join('');

    container.querySelectorAll('[data-add-product]').forEach((button) => {
      button.addEventListener('click', () => {
        addProductToCart(button.dataset.addProduct, button);
      });
    });
  }

  function findProduct(code) {
    return PRODUCTS.find((product) => productCode(product) === String(code));
  }

  function getProductIndex(code) {
    return PRODUCTS.findIndex((product) => productCode(product) === String(code));
  }

  function addProductToCart(code, button) {
    const product = findProduct(code);
    if (!product) return;

    const productIndex = getProductIndex(code);
    const options = getSizeOptions(product);
    let added = false;

    for (const option of options) {
      const input = $(`qty-${productIndex}-${option.key}`);
      if (!input || input.value.trim() === '') continue;

      const cartons = Number(input.value);

      if (!Number.isInteger(cartons) || cartons < 0) {
        alert(t('invalidQuantity'));
        input.focus();
        return;
      }

      if (cartons === 0) continue;

      const existing = cart.find((item) =>
        item.code === String(code) && item.sizeKey === option.key
      );

      if (existing) {
        existing.cartons += cartons;
      } else {
        cart.push({
          code: String(code),
          sizeKey: option.key,
          size: option.size,
          sizeLabel: option.label,
          cartons
        });
      }

      added = true;
    }

    if (!added) {
      alert(t('enterQuantity'));
      return;
    }

    saveCart();
    renderCart();

    options.forEach((option) => {
      const input = $(`qty-${productIndex}-${option.key}`);
      if (input) input.value = '0';
    });

    if (button) {
      button.textContent = t('added');

      window.setTimeout(() => {
        button.textContent = t('addToCart');
      }, 1200);
    }
  }

  function cartTotals() {
    return cart.reduce((totals, item) => {
      const product = findProduct(item.code);
      if (!product) return totals;

      const cartons = Number(item.cartons) || 0;
      const pairsPerCarton = packSize(product);

      totals.cartons += cartons;
      totals.pairs += cartons * pairsPerCarton;

      return totals;
    }, { cartons: 0, pairs: 0 });
  }

  function updateCartNavigation() {
    const totalCartons = cart.reduce(
      (sum, item) => sum + (Number(item.cartons) || 0),
      0
    );

    const navCounter = $('navCartCount');
    if (navCounter) navCounter.textContent = formatNumber(totalCartons);
  }

  function renderCart() {
    const container = $('cartItems');

    cart = cart.filter((item) => findProduct(item.code));
    saveCart();

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty">${escapeHTML(t('emptyCart'))}</div>
      `;
    } else {
      container.innerHTML = cart.map((item, index) => {
        const product = findProduct(item.code);
        const cartons = Number(item.cartons) || 0;
        const pairsPerCarton = packSize(product);
        const pairs = cartons * pairsPerCarton;

        return `
          <div class="cart-item" data-cart-index="${index}">
            <div class="cart-item-details">
              <strong class="cart-item-code">${escapeHTML(productCode(product))}</strong>
              <p>${escapeHTML(t('size'))}: ${escapeHTML(item.sizeLabel || item.size)}</p>
              <p>${escapeHTML(t('pairsPerCarton'))}: ${formatNumber(pairsPerCarton)}</p>
            </div>
            <div class="cart-item-quantity">
              <label for="cart-qty-${index}">${escapeHTML(t('cartons'))}</label>
              <input
                id="cart-qty-${index}"
                class="cart-update-quantity"
                type="number"
                min="1"
                step="1"
                value="${cartons}"
                data-cart-update="${index}"
              >
              <p>${formatNumber(pairs)} ${escapeHTML(t('pairs'))}</p>
            </div>
            <button type="button" class="cart-remove-button"
              data-cart-remove="${index}">
              ${escapeHTML(t('remove'))}
            </button>
          </div>
        `;
      }).join('');

      container.querySelectorAll('[data-cart-update]').forEach((input) => {
        input.addEventListener('change', () => {
          updateCartQuantity(Number(input.dataset.cartUpdate), input.value);
        });
      });

      container.querySelectorAll('[data-cart-remove]').forEach((button) => {
        button.addEventListener('click', () => {
          removeCartItem(Number(button.dataset.cartRemove));
        });
      });
    }

    const totals = cartTotals();

    const cartCount = $('cartCount');
    if (cartCount) cartCount.textContent = formatNumber(totals.cartons);

    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
      cartBadge.innerHTML =
        `<span id="cartCount">${formatNumber(totals.cartons)}</span> ${escapeHTML(t('cartonsLabel'))}`;
    }

    $('cartTotalCartons').textContent = formatNumber(totals.cartons);
    $('cartTotalPairs').textContent = formatNumber(totals.pairs);

    const summaryLabels = document.querySelectorAll('.cart-summary > div > span');
    if (summaryLabels[0]) summaryLabels[0].textContent = t('totalCartons');
    if (summaryLabels[1]) summaryLabels[1].textContent = t('totalPairs');

    $('checkoutButton').disabled = cart.length === 0;
    updateCartNavigation();
  }

  function updateCartQuantity(index, value) {
    if (!cart[index]) return;

    const cartons = Number(value);

    if (!Number.isInteger(cartons) || cartons < 1) {
      alert(t('invalidQuantity'));
      renderCart();
      return;
    }

    cart[index].cartons = cartons;
    saveCart();
    renderCart();
  }

  function removeCartItem(index) {
    if (index < 0 || index >= cart.length) return;

    cart.splice(index, 1);
    saveCart();
    renderCart();
  }

  function clearCart() {
    if (cart.length === 0) return;
    if (!window.confirm(t('confirmClear'))) return;

    cart = [];
    saveCart();
    renderCart();
  }

  function createWhatsAppURL(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  function updateContactButton() {
    const button = $('whatsappButton');

    if (button) {
      button.href = createWhatsAppURL(
        currentLanguage === 'zh'
          ? '您好，我想咨询批发鞋类产品。'
          : 'Hello, I am interested in your wholesale footwear catalogue.'
      );
    }
  }

  function checkoutWhatsApp() {
    if (cart.length === 0) {
      alert(t('emptyCart'));
      return;
    }

    const totals = cartTotals();

    const lines = [
      `${BUSINESS_NAME} — ${t('orderTitle')}`,
      '',
      t('orderMessage'),
      ''
    ];

    cart.forEach((item, index) => {
      const product = findProduct(item.code);
      if (!product) return;

      const cartons = Number(item.cartons) || 0;
      const pairsPerCarton = packSize(product);
      const pairs = cartons * pairsPerCarton;

      lines.push(`${index + 1}. ${productCode(product)}`);
      lines.push(`   ${t('size')}: ${item.sizeLabel || item.size}`);
      lines.push(`   ${t('cartons')}: ${cartons}`);
      lines.push(`   ${t('pairsPerCarton')}: ${pairsPerCarton}`);
      lines.push(`   ${t('pairs')}: ${pairs}`);
      lines.push('');
    });

    lines.push('------------------------');
    lines.push(`${t('totalCartons')}: ${totals.cartons}`);
    lines.push(`${t('totalPairs')}: ${totals.pairs}`);
    lines.push('');
    lines.push(t('thankYou'));

    window.open(
      createWhatsAppURL(lines.join('\n')),
      '_blank',
      'noopener,noreferrer'
    );
  }

  function init() {
    currentLanguage = detectLanguage();

    if ($('language')) {
      $('language').value = currentLanguage;

      $('language').addEventListener('change', () => {
        setLanguage($('language').value);
      });
    }

    if ($('search')) $('search').addEventListener('input', renderProducts);
    if ($('category')) $('category').addEventListener('change', renderProducts);
    if ($('sort')) $('sort').addEventListener('change', renderProducts);

    if ($('clearCart')) $('clearCart').addEventListener('click', clearCart);
    if ($('checkoutButton')) {
      $('checkoutButton').addEventListener('click', checkoutWhatsApp);
    }

    if ($('year')) $('year').textContent = new Date().getFullYear();

    document.documentElement.lang = currentLanguage === 'zh' ? 'zh-CN' : 'en';

    updateStaticText();
    renderProducts();
    renderCart();
    updateContactButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
