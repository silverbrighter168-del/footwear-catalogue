(() => {
  'use strict';

  // =========================================================
  // RUN FIRST SANDALS — CATALOGUE AND SHOPPING CART
  // =========================================================

  const PRODUCTS = Array.isArray(window.PRODUCTS)
    ? window.PRODUCTS
    : [];

  const CONFIG = window.SITE_CONFIG || {};

  const BUSINESS_NAME = 'Run First Sandals';

  const WHATSAPP_NUMBER = String(
    CONFIG.whatsappNumber || '27822990061'
  ).replace(/\D/g, '');

  const CART_STORAGE_KEY = 'runFirstShoppingCart';
  const LANGUAGE_STORAGE_KEY = 'runFirstLanguage';

  const $ = (id) => document.getElementById(id);

  let currentLanguage = 'en';
  let cart = loadCart();

  // =========================================================
  // TRANSLATIONS
  // =========================================================

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
      contactTitle: "Let's talk footwear."
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
      contactTitle: '欢迎咨询鞋类产品。'
    }
  };

  function t(key) {
    return TEXT[currentLanguage]?.[key] || TEXT.en[key] || key;
  }

  // =========================================================
  // LANGUAGE
  // =========================================================

  function detectLanguage() {
    const urlLanguage =
      new URLSearchParams(window.location.search).get('lang');

    if (urlLanguage === 'zh' || urlLanguage === 'en') {
      return urlLanguage;
    }

    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);

      if (saved === 'zh' || saved === 'en') {
        return saved;
      }
    } catch (error) {
      // Use English if storage is unavailable.
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

    document.documentElement.lang =
      currentLanguage === 'zh' ? 'zh-CN' : 'en';

    $('language').value = currentLanguage;

    updateStaticText();
    renderProducts();
    renderCart();
    updateContactButton();
  }

  function updateStaticText() {
    const languageSelect = $('language');

    if (languageSelect) {
      languageSelect.setAttribute('aria-label', t('language'));
    }

    const search = $('search');

    if (search) {
      search.placeholder = t('search');
    }

    const category = $('category');

    if (category && category.options.length) {
      category.options[0].textContent = t('all');
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

      if (key) {
        link.textContent = t(key);
      }
    });

    const howSection = $('how-to-order');

    if (howSection) {
      const heading = howSection.querySelector('h2');

      if (heading) {
        heading.textContent = t('howTitle');
      }
    }

    const contactSection = $('contact');

    if (contactSection) {
      const heading = contactSection.querySelector('h2');

      if (heading) {
        heading.textContent = t('contactTitle');
      }
    }

    const clearButton = $('clearCart');

    if (clearButton) {
      clearButton.textContent = t('clearCart');
    }

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

    updateCartNavigation();
  }

  // =========================================================
  // PRODUCT HELPERS
  // =========================================================

  function productCode(product) {
    return String(product.code ?? '');
  }

  function productName(product) {
    return String(product.name || productCode(product));
  }

  function productSizes(product) {
    return String(product.sizes || '').trim();
  }

  // FIX: "20 pairs", "36 pairs", and "48 pairs" are parsed correctly.
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

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[character]);
  }

  // =========================================================
  // SIZE OPTIONS
  //
  // Only use the size ranges actually listed in products.js.
  // Mixed-size products get separate quantity inputs.
  // =========================================================

  function getSizeOptions(product) {
    const code = productCode(product);
    const sizesText = productSizes(product);

    const ranges = sizesText.match(
      /\d{1,2}\s*[-–—]\s*\d{1,2}/g
    ) || [];

    const cleanedRanges = ranges.map((range) =>
      range.replace(/\s+/g, '').replace(/—/g, '–')
    );

    const suffixMatch = code.match(
      /([sml](?:\s*\/\s*[sml])+)$/i
    );

    let letters = [];

    if (suffixMatch) {
      letters = suffixMatch[1]
        .split('/')
        .map((letter) => letter.trim().toUpperCase());
    } else {
      const singleMatch = code.match(/([sml])$/i);

      if (singleMatch) {
        letters = [singleMatch[1].toUpperCase()];
      }
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

  // =========================================================
  // SEARCH, CATEGORY AND SORTING
  // =========================================================

  function filteredProducts() {
    const searchTerm = $('search').value.trim().toLowerCase();
    const category = $('category').value.trim().toLowerCase();
    const sortValue = $('sort').value;

    let results = PRODUCTS.filter((product) => {
      const searchable = [
        productCode(product),
        productName(product),
        productSizes(product),
        product.pairsPerCarton || '',
        product.category || ''
      ].join(' ').toLowerCase();

      const matchesSearch =
        !searchTerm || searchable.includes(searchTerm);

      // All current products are category "Footwear".
      // Therefore Sandals/Slippers/Other cannot be accurately
      // separated until their category data is updated.
      const matchesCategory =
        category === 'all' ||
        category === '' ||
        String(product.category || '').toLowerCase() === category;

      return matchesSearch && matchesCategory;
    });

    // Avoid a misleading empty catalogue when the chosen category
    // doesn't exist in products.js. Search still works.
    if (
      results.length === 0 &&
      category !== 'all' &&
      category !== '' &&
      !PRODUCTS.some((product) =>
        String(product.category || '').toLowerCase() === category
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
      results.sort((a, b) =>
        productName(a).localeCompare(productName(b))
      );
    } else {
      results.sort((a, b) =>
        productCode(a).localeCompare(productCode(b), undefined, {
          numeric: true
        })
      );
    }

    return results;
  }

  // =========================================================
  // RENDER PRODUCT CATALOGUE
  // =========================================================

  function renderProducts() {
    const container = $('products');
    const emptyState = $('empty');
    const results = filteredProducts();

    $('resultCount').textContent =
      `${formatNumber(results.length)} ${currentLanguage === 'zh' ? '个款式' : 'styles'}`;

    if (emptyState) {
      emptyState.hidden = results.length !== 0;
    }

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
          <label
            class="size-order-label"
            for="qty-${productIndex}-${escapeHTML(option.key)}"
          >
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
          <div class="product-image-wrap">
            ${imageHTML}
          </div>

          <div class="product-card-content">
            <h3 class="product-code">${escapeHTML(code)}</h3>

            ${name !== code
              ? `<p class="product-name">${escapeHTML(name)}</p>`
              : ''}

            ${sizes
              ? `
                <p class="product-size-info">
                  <strong>${escapeHTML(t('sizes'))}:</strong>
                  ${escapeHTML(sizes)}
                </p>
              `
              : ''}

            <p class="product-pack-info">
              <strong>${escapeHTML(t('pairsPerCarton'))}:</strong>
              ${pairs > 0
                ? formatNumber(pairs)
                : escapeHTML(t('noPackSize'))}
            </p>

            <div class="size-order-inputs">
              ${sizeInputs}
            </div>

            <button
              type="button"
              class="add-cart-button"
              data-add-product="${escapeHTML(code)}"
            >
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

  // =========================================================
  // CART STORAGE
  // =========================================================

  function loadCart() {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);

      if (!stored) {
        return [];
      }

      const parsed = JSON.parse(stored);

      if (!Array.isArray(parsed)) {
        return [];
      }

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

  function findProduct(code) {
    return PRODUCTS.find((product) => productCode(product) === String(code));
  }

  function getProductIndex(code) {
    return PRODUCTS.findIndex((product) => productCode(product) === String(code));
  }

  // =========================================================
  // ADD PRODUCTS TO CART
  // =========================================================

  function addProductToCart(code, button) {
    const product = findProduct(code);

    if (!product) {
      return;
    }

    const productIndex = getProductIndex(code);
    const options = getSizeOptions(product);

    let added = false;

    for (const option of options) {
      const input = $(`qty-${productIndex}-${option.key}`);

      if (!input || input.value.trim() === '') {
        continue;
      }

      const cartons = Number(input.value);

      if (!Number.isInteger(cartons) || cartons < 0) {
        alert(t('invalidQuantity'));
        input.focus();
        return;
      }

      if (cartons === 0) {
        continue;
      }

      const existing = cart.find((item) =>
        item.code === String(code) &&
        item.sizeKey === option.key
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

      if (input) {
        input.value = '0';
      }
    });

    if (button) {
      button.textContent = t('added');

      window.setTimeout(() => {
        button.textContent = t('addToCart');
      }, 1200);
    }
  }

  // =========================================================
  // CART TOTALS
  // =========================================================

  function cartTotals() {
    return cart.reduce((totals, item) => {
      const product = findProduct(item.code);

      if (!product) {
        return totals;
      }

      const cartons = Number(item.cartons) || 0;
      const pairsPerCarton = packSize(product);

      totals.cartons += cartons;
      totals.pairs += cartons * pairsPerCarton;

      return totals;
    }, {
      cartons: 0,
      pairs: 0
    });
  }

  // =========================================================
  // RENDER CART
  // =========================================================

  function renderCart() {
    const container = $('cartItems');

    cart = cart.filter((item) => findProduct(item.code));
    saveCart();

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty">
          ${escapeHTML(t('emptyCart'))}
        </div>
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
              <strong class="cart-item-code">
                ${escapeHTML(productCode(product))}
              </strong>

              <p>
                ${escapeHTML(t('size'))}:
                ${escapeHTML(item.sizeLabel || item.size)}
              </p>

              <p>
                ${escapeHTML(t('pairsPerCarton'))}:
                ${formatNumber(pairsPerCarton)}
              </p>
            </div>

            <div class="cart-item-quantity">
              <label for="cart-qty-${index}">
                ${escapeHTML(t('cartons'))}
              </label>

              <input
                id="cart-qty-${index}"
                class="cart-update-quantity"
                type="number"
                min="1"
                step="1"
                value="${cartons}"
                data-cart-update="${index}"
              >

              <p>
                ${formatNumber(pairs)} ${escapeHTML(t('pairs'))}
              </p>
            </div>

            <button
              type="button"
              class="cart-remove-button"
              data-cart-remove="${index}"
            >
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

    $('cartCount').textContent = formatNumber(totals.cartons);
    $('cartTotalCartons').textContent = formatNumber(totals.cartons);
    $('cartTotalPairs').textContent = formatNumber(totals.pairs);

    $('checkoutButton').disabled = cart.length === 0;

    updateCartNavigation();
  }

  function updateCartNavigation() {
    const totalCartons = cart.reduce(
      (sum, item) => sum + (Number(item.cartons) || 0),
      0
    );

    const navCounter = $('navCartCount');

    if (navCounter) {
      navCounter.textContent = formatNumber(totalCartons);
    }
  }

  // =========================================================
  // CHANGE OR REMOVE CART ITEMS
  // =========================================================

  function updateCartQuantity(index, value) {
    if (!cart[index]) {
      return;
    }

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
    if (index < 0 || index >= cart.length) {
      return;
    }

    cart.splice(index, 1);

    saveCart();
    renderCart();
  }

  function clearCart() {
    if (cart.length === 0) {
      return;
    }

    if (!window.confirm(t('confirmClear'))) {
      return;
    }

    cart = [];

    saveCart();
    renderCart();
  }

  // =========================================================
  // WHATSAPP
  // =========================================================

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

      if (!product) {
        return;
      }

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

  // =========================================================
  // INITIALISE
  // =========================================================

  function init() {
    currentLanguage = detectLanguage();

    $('language').value = currentLanguage;

    $('language').addEventListener('change', () => {
      setLanguage($('language').value);
    });

    $('search').addEventListener('input', renderProducts);
    $('category').addEventListener('change', renderProducts);
    $('sort').addEventListener('change', renderProducts);

    $('clearCart').addEventListener('click', clearCart);
    $('checkoutButton').addEventListener('click', checkoutWhatsApp);

    $('year').textContent = new Date().getFullYear();

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
