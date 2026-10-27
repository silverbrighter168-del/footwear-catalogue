(() => {
  'use strict';

  const $ = id => document.getElementById(id);
  const productRoot = $('products');
  const searchInput = $('search');
  const categoryInput = $('category');
  const sortInput = $('sort');
  const count = $('resultCount');
  const empty = $('empty');

  const config = window.SITE_CONFIG || {};
  const waNumber = String(config.whatsappNumber || '').replace(/\D/g, '');
  const storageKey = 'runFirstShoppingCart';

  const translations = {
    en: {
      language: 'Language',
      contact: 'Contact',
      home: 'Home',
      catalogueNav: 'Catalogue',
      howNav: 'How to order',
      cartNav: 'Cart',
      eyebrow: 'MADE FOR EVERYDAY COMFORT',
      heroLine1: 'Find your',
      heroLine2: 'next best-seller.',
      heroText: 'Explore our footwear collection, choose your styles and send your wholesale order through WhatsApp.',
      explore: 'Explore catalogue',
      wholesale: 'Wholesale enquiries welcome',
      collection: 'THE COLLECTION',
      browse: 'Browse our styles',
      sectionDescription: 'Search for a style and add cartons to your cart.',
      searchPlaceholder: 'Search style code or name…',
      searchLabel: 'Search styles',
      allFootwear: 'All footwear',
      sandals: 'Sandals',
      slippers: 'Slippers',
      other: 'Other',
      sortCode: 'Sort: Style code',
      sortName: 'Sort: Name',
      style: 'style',
      styles: 'styles',
      inCatalogue: 'in catalogue',
      noStyles: 'No styles found',
      noStylesText: 'Try another search or clear your filters.',
      sizes: 'Size range',
      pack: 'Pairs per carton',
      cartons: 'Cartons',
      addCart: 'Add to cart',
      added: 'Added to cart',
      ready: 'READY TO ORDER?',
      talk: "Let's talk footwear.",
      contactText: 'Send us your selected styles through WhatsApp.',
      whatsapp: 'Enquire on WhatsApp',
      rights: 'All rights reserved.',
      backToTop: 'Back to top',
      photo: 'PRODUCT PHOTO',
      footwear: 'Footwear',
      howTitle: 'How to order',
      guide1: 'Choose your styles',
      guide1Text: "Browse the catalogue and check each style's size range.",
      guide2: 'Add cartons',
      guide2Text: 'Enter quantities and add styles to your cart.',
      guide3: 'Review your order',
      guide3Text: 'Check styles, carton quantities and total pairs.',
      guide4: 'Send on WhatsApp',
      guide4Text: 'Send your complete order for confirmation.',
      yourOrder: 'YOUR ORDER',
      shoppingCart: 'Shopping cart',
      cartIntro: 'Review your selected styles before sending your order.',
      emptyCart: 'Your cart is empty. Browse the catalogue to add styles.',
      totalCartons: 'Total cartons',
      totalPairs: 'Total pairs',
      clearCart: 'Clear cart',
      checkout: 'Send order on WhatsApp',
      cartNote: 'Prices are not calculated on this website. We will confirm pricing, availability and delivery with you.',
      remove: 'Remove',
      invalidQuantity: 'Please enter a carton quantity of at least 1.',
      confirmClear: 'Are you sure you want to clear your cart?',
      checkoutEmpty: 'Please add at least one style to your cart first.',
      checkoutIntro: 'Hello, I would like to place a wholesale footwear order.',
      orderHeading: 'ORDER DETAILS',
      orderStyle: 'Style',
      orderSizes: 'Size range',
      orderPack: 'Pairs per carton',
      orderCartons: 'Cartons',
      orderPairs: 'Pairs',
      orderTotalCartons: 'TOTAL CARTONS',
      orderTotalPairs: 'TOTAL PAIRS',
      orderFooter: 'Please confirm prices, stock availability and delivery.',
      orderNotice: 'Please review this order and press Send in WhatsApp to submit it.'
    },
    zh: {
      language: '语言',
      contact: '联系我们',
      home: '首页',
      catalogueNav: '产品目录',
      howNav: '订购方式',
      cartNav: '购物车',
      eyebrow: '舒适日常穿着',
      heroLine1: '寻找您的',
      heroLine2: '畅销新款。',
      heroText: '浏览鞋类产品，选择款式和箱数，并通过 WhatsApp 发送批发订单。',
      explore: '浏览产品目录',
      wholesale: '欢迎批发咨询',
      collection: '产品系列',
      browse: '浏览我们的款式',
      sectionDescription: '搜索款号并将整箱数量加入购物车。',
      searchPlaceholder: '搜索款号或名称…',
      searchLabel: '搜索款式',
      allFootwear: '所有鞋类',
      sandals: '凉鞋',
      slippers: '拖鞋',
      other: '其他',
      sortCode: '按款号排序',
      sortName: '按名称排序',
      style: '款式',
      styles: '款式',
      inCatalogue: '个款式',
      noStyles: '未找到款式',
      noStylesText: '请尝试其他搜索内容或清除筛选条件。',
      sizes: '尺码范围',
      pack: '每箱双数',
      cartons: '箱数',
      addCart: '加入购物车',
      added: '已加入购物车',
      ready: '准备订购？',
      talk: '欢迎洽谈鞋类订单。',
      contactText: '通过 WhatsApp 发送您选择的款式。',
      whatsapp: '通过 WhatsApp 咨询',
      rights: '版权所有。',
      backToTop: '返回顶部',
      photo: '产品图片',
      footwear: '鞋类',
      howTitle: '订购方式',
      guide1: '选择款式',
      guide1Text: '浏览目录并查看每款产品的尺码范围。',
      guide2: '添加箱数',
      guide2Text: '输入箱数并加入购物车。',
      guide3: '检查订单',
      guide3Text: '检查款式、箱数和总双数。',
      guide4: '通过 WhatsApp 发送',
      guide4Text: '发送完整订单以便确认。',
      yourOrder: '您的订单',
      shoppingCart: '购物车',
      cartIntro: '发送订单前请检查您选择的款式。',
      emptyCart: '购物车为空。请浏览目录并添加款式。',
      totalCartons: '总箱数',
      totalPairs: '总双数',
      clearCart: '清空购物车',
      checkout: '通过 WhatsApp 发送订单',
      cartNote: '本网站不计算价格。我们将与您确认价格、库存和送货。',
      remove: '删除',
      invalidQuantity: '请输入至少 1 箱。',
      confirmClear: '确定要清空购物车吗？',
      checkoutEmpty: '请先将至少一个款式加入购物车。',
      checkoutIntro: '您好，我想订购以下鞋类批发产品。',
      orderHeading: '订单详情',
      orderStyle: '款号',
      orderSizes: '尺码范围',
      orderPack: '每箱双数',
      orderCartons: '箱数',
      orderPairs: '双数',
      orderTotalCartons: '总箱数',
      orderTotalPairs: '总双数',
      orderFooter: '请确认价格、库存和送货安排。',
      orderNotice: '请检查订单，然后在 WhatsApp 中按发送提交。'
    }
  };

  const params = new URLSearchParams(window.location.search);
  const requestedLanguage = params.get('lang');
  let currentLanguage =
    requestedLanguage === 'zh' || requestedLanguage === 'en'
      ? requestedLanguage
      : (localStorage.getItem('runFirstLanguage') || 'en');

  if (!translations[currentLanguage]) currentLanguage = 'en';

  const t = key => translations[currentLanguage][key] ||
    translations.en[key] || key;

  function escapeHtml(value = '') {
    return String(value).replace(/[&<>"']/g, c => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[c]);
  }

  function waLink(message) {
    return waNumber
      ? `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`
      : `mailto:?subject=${encodeURIComponent('Wholesale footwear order')}&body=${encodeURIComponent(message)}`;
  }

  function getProducts() {
    return (window.PRODUCTS || []).map((p, index) => ({
      ...p,
      _id: String(p.code || `product-${index}`)
    }));
  }

  const products = getProducts();

  let cart = loadCart();

  function loadCart() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
      return saved && typeof saved === 'object' && !Array.isArray(saved)
        ? saved
        : {};
    } catch {
      return {};
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(cart));
    } catch (error) {
      console.warn('Could not save cart.', error);
    }
  }

  function findProduct(id) {
    return products.find(p => p._id === id);
  }

  function packSize(product) {
    const n = Number(product.pairsPerCarton);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
  }

  function number(value) {
    return new Intl.NumberFormat(
      currentLanguage === 'zh' ? 'zh-CN' : 'en-ZA'
    ).format(value);
  }

  /*
   * Split size ranges.
   * Examples:
   * 6637L with "6-11" => one L range.
   * 6638s/m with "10-2 3-8" => S and M.
   * 6631S/M/L with "10-2 3-8 6-11" => S, M and L.
   *
   * The size ranges must come from the product's size description.
   * Do not invent missing ranges.
   */
  function getSizeOptions(product) {
    const code = String(product.code || '').trim();
    const sizesText = String(product.sizes || '').trim();

    const letters = [];
    const suffix = code.match(/([sml](?:\s*\/\s*[sml])+)$/i);

    if (suffix) {
      suffix[1].split('/').forEach(part => {
        const letter = part.trim().toUpperCase();
        if (['S', 'M', 'L'].includes(letter) && !letters.includes(letter)) {
          letters.push(letter);
        }
      });
    } else {
      const single = code.match(/([sml])$/i);
      if (single) letters.push(single[1].toUpperCase());
    }

    const ranges = sizesText.match(/\d{1,2}\s*[-–]\s*\d{1,2}/g) || [];
    const cleanRanges = ranges.map(range =>
      range.replace(/\s+/g, '').replace('–', '-')
    );

    // If no S/M/L suffix is present, treat the product as one size range.
    if (!letters.length) {
      return [{
        key: 'default',
        label: sizesText || '—',
        pairs: packSize(product)
      }];
    }

    // For a single-size style such as 6637L, keep one box only.
    if (letters.length === 1) {
      return [{
        key: letters[0],
        label: cleanRanges[0] || sizesText || '—',
        pairs: packSize(product)
      }];
    }

    // For mixed-size styles, pair the description's ranges with S, M, L
    // in the order they are written in the product description.
    return letters.map((letter, index) => ({
      key: letter,
      label: cleanRanges[index] || '',
      pairs: packSize(product)
    }));
  }

  function cartKey(product, option) {
    return `${product._id}::${option.key}`;
  }

  function getCartRows() {
    return Object.entries(cart).map(([key, quantity]) => {
      const [productId, optionKey] = key.split('::');
      const product = findProduct(productId);

      if (!product) return null;

      const option = getSizeOptions(product)
        .find(item => item.key === optionKey);

      if (!option) return null;

      const qty = Number(quantity);
      if (!Number.isSafeInteger(qty) || qty < 1) return null;

      return { key, product, option, quantity: qty };
    }).filter(Boolean);
  }

  function render() {
    const term = searchInput.value.trim().toLowerCase();

    let items = products.filter(p =>
      (categoryInput.value === 'all' || p.category === categoryInput.value) &&
      [p.code, p.name, p.category, p.sizes].join(' ').toLowerCase().includes(term)
    );

    items.sort((a, b) =>
      sortInput.value === 'name'
        ? String(a.name || '').localeCompare(String(b.name || ''))
        : String(a.code || '').localeCompare(String(b.code || ''), undefined, { numeric: true })
    );

    count.textContent =
      `${items.length} ${items.length === 1 ? t('style') : t('styles')} ${t('inCatalogue')}`;

    empty.hidden = items.length !== 0;

    productRoot.innerHTML = items.map(product => {
      const options = getSizeOptions(product);
      const id = escapeHtml(product._id);
      const code = escapeHtml(product.code || '');
      const name = escapeHtml(product.name || '');
      const image = product.image
        ? `<img src="${escapeHtml(product.image)}" alt="${name || code}" loading="lazy">`
        : `<div class="image-placeholder"><strong>${code}</strong><span>${escapeHtml(t('photo'))}</span></div>`;

      const sizeInputs = options.map(option => `
        <div class="size-order-row">
          <label for="qty-${id}-${escapeHtml(option.key)}">
            ${options.length > 1 ? `<strong>${escapeHtml(option.key)}</strong> · ` : ''}
            ${escapeHtml(option.label || 'Size range not specified')}
          </label>
          <input
            id="qty-${id}-${escapeHtml(option.key)}"
            type="number"
            min="0"
            step="1"
            value="0"
            inputmode="numeric"
            data-size-quantity="${id}"
            data-size-key="${escapeHtml(option.key)}"
            aria-label="${code} ${escapeHtml(option.key)} ${escapeHtml(t('cartons'))}"
          >
        </div>
      `).join('');

      return `
        <article class="product-card">
          <div class="product-image">${image}</div>
          <div class="product-info">
            <div class="product-meta">
              <span class="product-code">${code}</span>
              <span class="product-tag">${escapeHtml(t('footwear'))}</span>
            </div>

            <p class="product-name">
              ${name}
              ${product.sizes ? `<br><strong>${escapeHtml(t('sizes'))}:</strong> ${escapeHtml(product.sizes)}` : ''}
              ${product.pairsPerCarton ? `<br><strong>${escapeHtml(t('pack'))}:</strong> ${number(packSize(product))}` : ''}
            </p>

            <div class="size-order-inputs">
              ${sizeInputs}
            </div>

            <button
              class="add-cart-button"
              type="button"
              data-add-cart="${id}"
            >${escapeHtml(t('addCart'))} +</button>
          </div>
        </article>
      `;
    }).join('');

    renderCart();
  }

  function renderCart() {
    const rows = getCartRows();
    const cartItems = $('cartItems');

    let cartons = 0;
    let pairs = 0;

    if (!rows.length) {
      cartItems.innerHTML =
        `<div class="cart-empty">${escapeHtml(t('emptyCart'))}</div>`;
    } else {
      cartItems.innerHTML = rows.map(row => {
        const rowPairs = row.quantity * row.option.pairs;
        cartons += row.quantity;
        pairs += rowPairs;

        return `
          <article class="cart-row">
            <div class="cart-row-main">
              <strong>${escapeHtml(row.product.code || '')}</strong>
              <span>${escapeHtml(row.product.name || '')}</span>
              <small>${escapeHtml(t('sizes'))}: ${escapeHtml(row.option.key === 'default' ? row.option.label : `${row.option.key} (${row.option.label || 'size range not specified'})`)}</small>
              <small>${escapeHtml(t('pack'))}: ${number(row.option.pairs)}</small>
            </div>

            <div class="cart-row-quantity">
              <label>${escapeHtml(t('cartons'))}</label>
              <input
                type="number"
                min="1"
                step="1"
                value="${row.quantity}"
                data-cart-quantity="${escapeHtml(row.key)}"
                aria-label="${escapeHtml(t('cartons'))}"
              >
              <button type="button" class="remove-cart-button" data-remove-cart="${escapeHtml(row.key)}">${escapeHtml(t('remove'))}</button>
            </div>

            <div class="cart-row-pairs">
              <span>${escapeHtml(t('orderPairs'))}</span>
              <strong>${number(rowPairs)}</strong>
            </div>
          </article>
        `;
      }).join('');
    }

    $('cartTotalCartons').textContent = number(cartons);
    $('cartTotalPairs').textContent = number(pairs);
    $('cartCount').textContent = number(cartons);
    $('navCartCount').textContent = number(cartons);
  }

  function addToCart(productId) {
    const product = findProduct(productId);
    if (!product) return;

    const options = getSizeOptions(product);
    let added = false;

    options.forEach(option => {
      const input = $(`qty-${productId}-${option.key}`);
      const quantity = Number(input?.value || 0);

      if (!Number.isSafeInteger(quantity) || quantity < 0) {
        return;
      }

      if (quantity > 0) {
        const key = cartKey(product, option);
        cart[key] = Number(cart[key] || 0) + quantity;
        added = true;
        input.value = '0';
      }
    });

    if (!added) {
      alert('Enter at least 1 carton in one of the size boxes.');
      return;
    }

    saveCart();
    renderCart();
  }

  function updateCartQuantity(key, value) {
    const quantity = Number(value);

    if (!Number.isSafeInteger(quantity) || quantity < 1) {
      alert(t('invalidQuantity'));
      renderCart();
      return;
    }

    cart[key] = quantity;
    saveCart();
    renderCart();
  }

  function removeFromCart(key) {
    delete cart[key];
    saveCart();
    renderCart();
  }

  function clearCart() {
    if (!getCartRows().length) return;
    if (!confirm(t('confirmClear'))) return;

    cart = {};
    saveCart();
    renderCart();
  }

  function checkout() {
    const rows = getCartRows();

    if (!rows.length) {
      alert(t('checkoutEmpty'));
      return;
    }

    let totalCartons = 0;
    let totalPairs = 0;

    const lines = [
      t('checkoutIntro'),
      '',
      '--- ' + t('orderHeading') + ' ---',
      ''
    ];

    rows.forEach(row => {
      const rowPairs = row.quantity * row.option.pairs;
      totalCartons += row.quantity;
      totalPairs += rowPairs;

      const sizeDescription = row.option.key === 'default'
        ? row.option.label
        : `${row.option.key} (${row.option.label || 'size range not specified'})`;

      lines.push(
        `${t('orderStyle')}: ${row.product.code || ''}`,
        `${t('orderSizes')}: ${sizeDescription}`,
        `${t('orderPack')}: ${row.option.pairs}`,
        `${t('orderCartons')}: ${row.quantity}`,
        `${t('orderPairs')}: ${rowPairs}`,
        ''
      );
    });

    lines.push(
      '-------------------------',
      `${t('orderTotalCartons')}: ${totalCartons}`,
      `${t('orderTotalPairs')}: ${totalPairs}`,
      '',
      t('orderFooter'),
      '',
      t('orderNotice')
    );

    const url = waNumber
      ? `https://wa.me/${waNumber}?text=${encodeURIComponent(lines.join('\n'))}`
      : `mailto:?subject=${encodeURIComponent('Wholesale footwear order')}&body=${encodeURIComponent(lines.join('\n'))}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function applyLanguage() {
    const tr = translations[currentLanguage];

    document.documentElement.lang = currentLanguage === 'zh' ? 'zh-CN' : 'en';

    const text = (selector, value) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = value;
    };

    text('.language-label', tr.language);
    text('#headerContact', tr.contact + ' ↗');
    text('[data-nav="home"]', tr.home);
    text('[data-nav="catalogue"]', tr.catalogueNav);
    text('[data-nav="how"]', tr.howNav);

    const navCart = document.querySelector('.nav-cart');
    if (navCart) navCart.firstChild.textContent = tr.cartNav + ' ';

    text('.hero-copy .eyebrow', tr.eyebrow);

    const heading = document.querySelector('.hero-copy h1');
    if (heading) heading.innerHTML =
      `${escapeHtml(tr.heroLine1)}<br><em>${escapeHtml(tr.heroLine2)}</em>`;

    text('.hero-text', tr.heroText);

    const explore = document.querySelector('.hero-copy .primary-button');
    if (explore) explore.innerHTML = `${escapeHtml(tr.explore)} <span>↓</span>`;

    const heroNote = document.querySelector('.hero-note');
    if (heroNote) heroNote.innerHTML =
      `<span class="dot"></span>${escapeHtml(tr.wholesale)}`;

    text('.section-head .eyebrow', tr.collection);
    text('.section-head h2', tr.browse);
    text('.section-description', tr.sectionDescription);

    searchInput.placeholder = tr.searchPlaceholder;
    searchInput.setAttribute('aria-label', tr.searchLabel);

    categoryInput.options[0].textContent = tr.allFootwear;
    categoryInput.options[1].textContent = tr.sandals;
    categoryInput.options[2].textContent = tr.slippers;
    categoryInput.options[3].textContent = tr.other;

    sortInput.options[0].textContent = tr.sortCode;
    sortInput.options[1].textContent = tr.sortName;

    text('#empty h3', tr.noStyles);
    text('#empty p', tr.noStylesText);

    text('.ordering-guide > .eyebrow', tr.howTitle.toUpperCase());
    text('.ordering-guide h2', tr.howTitle);

    const guideCards = document.querySelectorAll('.guide-grid article');
    const guide = [
      [tr.guide1, tr.guide1Text],
      [tr.guide2, tr.guide2Text],
      [tr.guide3, tr.guide3Text],
      [tr.guide4, tr.guide4Text]
    ];

    guideCards.forEach((card, index) => {
      if (!guide[index]) return;
      const h3 = card.querySelector('h3');
      const p = card.querySelector('p');
      if (h3) h3.textContent = guide[index][0];
      if (p) p.textContent = guide[index][1];
    });

    text('.cart-heading .eyebrow', tr.yourOrder);
    text('.cart-heading h2', tr.shoppingCart);
    text('.cart-intro', tr.cartIntro);
    text('.cart-summary div:first-child span', tr.totalCartons);
    text('.cart-summary div:last-child span', tr.totalPairs);
    text('#clearCart', tr.clearCart);

    const checkoutButton = $('checkoutButton');
    if (checkoutButton) checkoutButton.innerHTML =
      `${escapeHtml(tr.checkout)} <span>↗</span>`;

    text('.cart-note', tr.cartNote);
    text('.contact .eyebrow', tr.ready);
    text('.contact h2', tr.talk);
    text('.contact div > p:not(.eyebrow)', tr.contactText);

    const whatsappButton = $('whatsappButton');
    if (whatsappButton) {
      whatsappButton.innerHTML =
        `${escapeHtml(tr.whatsapp)} <span>↗</span>`;
      whatsappButton.href = waNumber
        ? `https://wa.me/${waNumber}?text=${encodeURIComponent(tr.checkoutIntro)}`
        : '#contact';
    }

    const footerParagraph = document.querySelector('footer p');
    if (footerParagraph) {
      footerParagraph.innerHTML =
        `© <span id="year">${new Date().getFullYear()}</span> Run First Sandals. ${escapeHtml(tr.rights)}`;
    }

    const backLink = document.querySelector('footer > a:last-child');
    if (backLink) backLink.textContent = tr.backToTop + ' ↑';

    $('language').value = currentLanguage;
    render();
  }

  productRoot.addEventListener('click', event => {
    const button = event.target.closest('[data-add-cart]');
    if (button) addToCart(button.dataset.addCart);
  });

  $('cartItems').addEventListener('click', event => {
    const button = event.target.closest('[data-remove-cart]');
    if (button) removeFromCart(button.dataset.removeCart);
  });

  $('cartItems').addEventListener('change', event => {
    const input = event.target.closest('[data-cart-quantity]');
    if (input) updateCartQuantity(input.dataset.cartQuantity, input.value);
  });

  $('clearCart').addEventListener('click', clearCart);
  $('checkoutButton').addEventListener('click', checkout);

  [searchInput, categoryInput, sortInput].forEach(element => {
    element.addEventListener('input', render);
    element.addEventListener('change', render);
  });

  $('language').addEventListener('change', () => {
    currentLanguage = $('language').value === 'zh' ? 'zh' : 'en';
    localStorage.setItem('runFirstLanguage', currentLanguage);
    applyLanguage();
  });

  $('year').textContent = new Date().getFullYear();
  applyLanguage();
})();
