(() => {
  'use strict';

  // =========================================================
  // RUN FIRST SANDALS — CATALOGUE AND SHOPPING CART
  // =========================================================

  const PRODUCTS = Array.isArray(window.PRODUCTS)
    ? window.PRODUCTS
    : [];

  const CONFIG = window.SITE_CONFIG || {};

  const BUSINESS_NAME = CONFIG.businessName || 'Run First Sandals';
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
      howToOrder: 'How to order',
      contact: 'Contact',
      cart: 'Cart',
      search: 'Search by product code...',
      allCategories: 'All products',
      sortCode: 'Sort by product code',
      sortName: 'Sort by product name',
      noProducts: 'No products found.',
      sizes: 'Sizes',
      pairsPerCarton: 'Pairs per carton',
      carton: 'carton',
      cartons: 'cartons',
      quantity: 'Cartons',
      addToCart: 'Add to cart',
      addedToCart: 'Added to cart.',
      enterQuantity: 'Please enter at least one carton quantity.',
      shoppingCart: 'Shopping cart',
      emptyCart: 'Your cart is empty.',
      product: 'Product',
      size: 'Size',
      pairs: 'Pairs',
      subtotal: 'Total',
      remove: 'Remove',
      clearCart: 'Clear cart',
      checkout: 'Order via WhatsApp',
      totalCartons: 'Total cartons',
      totalPairs: 'Total pairs',
      confirmClear: 'Are you sure you want to clear your cart?',
      invalidQuantity: 'Please enter a valid carton quantity.',
      orderMessage: 'Hello, I would like to place the following wholesale order:',
      orderTitle: 'WHOLESALE ORDER',
      thankYou: 'Thank you for your enquiry.',
      contactWhatsApp: 'Contact us on WhatsApp',
      missingPackSize: 'Carton quantity information is unavailable.',
      howToOrderTitle: 'How to order',
      howToOrderText:
        'Choose your styles, enter the number of cartons for each size, review your cart, and send your order through WhatsApp.',
      step1: '1. Browse the catalogue and select your styles.',
      step2: '2. Enter the number of cartons required for each size.',
      step3: '3. Review your cart and check the quantities.',
      step4: '4. Send your order through WhatsApp.',
      contactTitle: 'Contact us',
      imageUnavailable: 'Image unavailable',
      languageEnglish: 'English',
      languageChinese: '简体中文',
      continueShopping: 'Continue shopping',
      pairsShort: 'pairs'
    },

    zh: {
      home: '首页',
      catalogue: '产品目录',
      howToOrder: '订购方法',
      contact: '联系我们',
      cart: '购物车',
      search: '搜索产品编号...',
      allCategories: '所有产品',
      sortCode: '按产品编号排序',
      sortName: '按产品名称排序',
      noProducts: '没有找到产品。',
      sizes: '尺码',
      pairsPerCarton: '每箱双数',
      carton: '箱',
      cartons: '箱',
      quantity: '箱数',
      addToCart: '加入购物车',
      addedToCart: '已加入购物车。',
      enterQuantity: '请输入至少一个产品的箱数。',
      shoppingCart: '购物车',
      emptyCart: '购物车是空的。',
      product: '产品',
      size: '尺码',
      pairs: '双',
      subtotal: '总计',
      remove: '删除',
      clearCart: '清空购物车',
      checkout: '通过 WhatsApp 下单',
      totalCartons: '总箱数',
      totalPairs: '总双数',
      confirmClear: '确定要清空购物车吗？',
      invalidQuantity: '请输入有效的箱数。',
      orderMessage: '您好，我想订购以下批发产品：',
      orderTitle: '批发订单',
      thankYou: '感谢您的咨询。',
      contactWhatsApp: '通过 WhatsApp 联系我们',
      missingPackSize: '没有可用的每箱双数信息。',
      howToOrderTitle: '订购方法',
      howToOrderText:
        '选择产品款式，输入每个尺码的箱数，检查购物车，然后通过 WhatsApp 发送订单。',
      step1: '1. 浏览产品目录并选择款式。',
      step2: '2. 输入每个尺码需要的箱数。',
      step3: '3. 检查购物车和订购数量。',
      step4: '4. 通过 WhatsApp 发送订单。',
      contactTitle: '联系我们',
      imageUnavailable: '图片无法显示',
      languageEnglish: 'English',
      languageChinese: '简体中文',
      continueShopping: '继续购物',
      pairsShort: '双'
    }
  };

  function t(key) {
    return TEXT[currentLanguage]?.[key] || TEXT.en[key] || key;
  }

  // =========================================================
  // LANGUAGE
  // =========================================================

  function detectLanguage() {
    const params = new URLSearchParams(window.location.search);
    const urlLanguage = params.get('lang');

    if (urlLanguage === 'zh' || urlLanguage === 'en') {
      return urlLanguage;
    }

    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);

      if (saved === 'zh' || saved === 'en') {
        return saved;
      }
    } catch (error) {
      // Continue using English if localStorage is unavailable.
    }

    return 'en';
  }

  function setLanguage(language) {
    currentLanguage = language === 'zh' ? 'zh' : 'en';

    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
    } catch (error) {
      // The page can still work without localStorage.
    }

    document.documentElement.lang =
      currentLanguage === 'zh' ? 'zh-CN' : 'en';

    const languageSelector =
      $('languageSelect') ||
      $('langSelect') ||
      $('language');

    if (languageSelector) {
      languageSelector.value = currentLanguage;
    }

    applyLanguage();
    renderProducts();
    renderCart();
  }

  function applyLanguage() {
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.getAttribute('data-i18n');

      if (TEXT[currentLanguage][key]) {
        element.textContent = t(key);
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
      const key = element.getAttribute('data-i18n-placeholder');

      if (TEXT[currentLanguage][key]) {
        element.setAttribute('placeholder', t(key));
      }
    });

    const searchInput =
      $('productSearch') ||
      $('searchInput') ||
      $('searchProducts');

    if (searchInput) {
      searchInput.placeholder = t('search');
    }

    const howToOrderTitle = $('howToOrderTitle');

    if (howToOrderTitle) {
      howToOrderTitle.textContent = t('howToOrderTitle');
    }

    const howToOrderText = $('howToOrderText');

    if (howToOrderText) {
      howToOrderText.textContent = t('howToOrderText');
    }

    const contactTitle = $('contactTitle');

    if (contactTitle) {
      contactTitle.textContent = t('contactTitle');
    }

    updateCartNavigation();
  }

  // =========================================================
  // PRODUCT INFORMATION
  // =========================================================

  function productCode(product) {
    return String(
      product.code ??
      product._id ??
      product.stockCode ??
      ''
    );
  }

  function productName(product) {
    return String(
      product.name ||
      product.description ||
      productCode(product)
    );
  }

  function productSizes(product) {
    return String(product.sizes || '').trim();
  }

  // FIX: "20 pairs" becomes 20, and "36 pairs" becomes 36.
  function packSize(product) {
    const value = String(
      product.pairsPerCarton || ''
    );

    const match = value.match(/\d+/);

    return match ? Number(match[0]) : 0;
  }

  function formatNumber(value) {
    return Number(value || 0).toLocaleString(
      currentLanguage === 'zh' ? 'zh-CN' : 'en-ZA'
    );
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => {
      const entities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      };

      return entities[character];
    });
  }

  function imagePath(product) {
    return String(
      product.image ||
      product.imageUrl ||
      product.photo ||
      ''
    );
  }

  // =========================================================
  // SIZE OPTIONS
  //
  // Examples:
  // 6637L       -> one input: 6–11
  // 6638s/m     -> S: 10–2, M: 3–8
  // 6631s/m/L   -> S: 10–2, M: 3–8, L: 6–11
  //
  // Only the size ranges listed for the product are displayed.
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

    if (sizesText) {
      return [{
        key: 'default',
        label: sizesText,
        size: sizesText
      }];
    }

    return [{
      key: 'default',
      label: currentLanguage === 'zh' ? '标准尺码' : 'Standard size',
      size: currentLanguage === 'zh' ? '标准尺码' : 'Standard size'
    }];
  }

  // =========================================================
  // PRODUCT FILTERS
  // =========================================================

  function getSearchInput() {
    return (
      $('productSearch') ||
      $('searchInput') ||
      $('searchProducts')
    );
  }

  function getCategorySelect() {
    return (
      $('categoryFilter') ||
      $('categorySelect') ||
      $('productCategory')
    );
  }

  function getSortSelect() {
    return (
      $('sortBy') ||
      $('sortSelect') ||
      $('productSort')
    );
  }

  function getProductContainer() {
    return (
      $('productsGrid') ||
      $('productGrid') ||
      $('catalogueGrid') ||
      $('products')
    );
  }

  function filteredProducts() {
    const searchInput = getSearchInput();
    const categorySelect = getCategorySelect();
    const sortSelect = getSortSelect();

    const search = searchInput
      ? searchInput.value.trim().toLowerCase()
      : '';

    const category = categorySelect
      ? categorySelect.value.trim().toLowerCase()
      : 'all';

    let results = PRODUCTS.filter((product) => {
      const searchable = [
        productCode(product),
        productName(product),
        product.category || '',
        productSizes(product),
        product.pairsPerCarton || ''
      ].join(' ').toLowerCase();

      const matchesSearch = !search || searchable.includes(search);

      const actualCategory = String(
        product.category || ''
      ).trim().toLowerCase();

      const matchesCategory =
        !category ||
        category === 'all' ||
        category === 'all products' ||
        actualCategory === category;

      return matchesSearch && matchesCategory;
    });

    // If the current product database only contains "Footwear",
    // avoid displaying an empty catalogue for unsupported categories.
    if (
      results.length === 0 &&
      category &&
      category !== 'all' &&
      category !== 'all products'
    ) {
      const categoryMatchesExist = PRODUCTS.some((product) => {
        return String(product.category || '')
          .trim()
          .toLowerCase() === category;
      });

      if (!categoryMatchesExist) {
        results = PRODUCTS.filter((product) => {
          const searchable = [
            productCode(product),
            productName(product),
            product.category || '',
            productSizes(product),
            product.pairsPerCarton || ''
          ].join(' ').toLowerCase();

          return !search || searchable.includes(search);
        });
      }
    }

    const sortValue = sortSelect ? sortSelect.value : 'code';

    if (
      sortValue === 'name' ||
      sortValue === 'name-asc' ||
      sortValue === 'nameAsc'
    ) {
      results.sort((a, b) =>
        productName(a).localeCompare(productName(b))
      );
    } else if (
      sortValue === 'name-desc' ||
      sortValue === 'nameDesc'
    ) {
      results.sort((a, b) =>
        productName(b).localeCompare(productName(a))
      );
    } else if (sortValue === 'code-desc') {
      results.sort((a, b) =>
        productCode(b).localeCompare(productCode(a), undefined, {
          numeric: true
        })
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
  // RENDER PRODUCTS
  // =========================================================

  function renderProducts() {
    const container = getProductContainer();

    if (!container) {
      console.error(
        'Product grid not found. Check the product grid ID in index.html.'
      );
      return;
    }

    const products = filteredProducts();

    if (products.length === 0) {
      container.innerHTML = `
        <p class="no-products">
          ${escapeHTML(t('noProducts'))}
        </p>
      `;
      updateProductCount(0);
      return;
    }

    container.innerHTML = products.map((product, index) => {
      const code = productCode(product);
      const name = productName(product);
      const sizes = productSizes(product);
      const pairs = packSize(product);
      const image = imagePath(product);
      const options = getSizeOptions(product);

      const safeCode = escapeHTML(code);
      const safeName = escapeHTML(name);
      const safeSizes = escapeHTML(sizes);
      const safeImage = escapeHTML(image);

      const sizeInputs = options.map((option) => {
        const optionKey = escapeHTML(option.key);
        const optionLabel = escapeHTML(option.label);

        return `
          <div class="size-order-row">
            <label
              for="qty-${index}-${optionKey}"
              class="size-order-label"
            >
              ${optionLabel}
            </label>

            <input
              id="qty-${index}-${optionKey}"
              class="cart-quantity-input"
              type="number"
              min="0"
              step="1"
              value="0"
              inputmode="numeric"
              data-product-code="${safeCode}"
              data-size-key="${optionKey}"
              aria-label="${escapeHTML(t('quantity'))} ${optionLabel}"
            />
          </div>
        `;
      }).join('');

      const imageHTML = image
        ? `
          <img
            class="product-image"
            src="${safeImage}"
            alt="${safeName}"
            loading="lazy"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
          >
          <div
            class="product-image-fallback"
            style="display:none;"
          >
            ${escapeHTML(t('imageUnavailable'))}
          </div>
        `
        : `
          <div class="product-image-fallback">
            ${escapeHTML(t('imageUnavailable'))}
          </div>
        `;

      return `
        <article
          class="product-card"
          data-product-code="${safeCode}"
        >
          <div class="product-image-wrap">
            ${imageHTML}
          </div>

          <div class="product-card-content">
            <h3 class="product-code">${safeCode}</h3>

            ${
              name !== code
                ? `<p class="product-name">${safeName}</p>`
                : ''
            }

            ${
              sizes
                ? `
                  <p class="product-size-info">
                    <strong>${escapeHTML(t('sizes'))}:</strong>
                    ${safeSizes}
                  </p>
                `
                : ''
            }

            <p class="product-pack-info">
              <strong>${escapeHTML(t('pairsPerCarton'))}:</strong>
              ${pairs > 0 ? formatNumber(pairs) : '—'}
            </p>

            <div class="size-order-inputs">
              ${sizeInputs}
            </div>

            <button
              type="button"
              class="add-cart-button"
              data-add-product="${safeCode}"
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

    updateProductCount(products.length);
  }

  function updateProductCount(count) {
    const counter =
      $('productCount') ||
      $('catalogueCount') ||
      $('resultsCount');

    if (counter) {
      counter.textContent = formatNumber(count);
    }
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

      return parsed.filter((item) => {
        return (
          item &&
          typeof item.code === 'string' &&
          typeof item.sizeKey === 'string' &&
          Number(item.cartons) > 0
        );
      });
    } catch (error) {
      console.warn('Could not load shopping cart:', error);
      return [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
      );
    } catch (error) {
      console.warn('Could not save shopping cart:', error);
    }
  }

  function findProduct(code) {
    return PRODUCTS.find(
      (product) => productCode(product) === String(code)
    );
  }

  function findSizeOption(product, sizeKey) {
    return getSizeOptions(product).find(
      (option) => option.key === sizeKey
    );
  }

  // =========================================================
  // ADD TO CART
  // =========================================================

  function addProductToCart(code, button) {
    const product = findProduct(code);

    if (!product) {
      alert('Product not found: ' + code);
      return;
    }

    const options = getSizeOptions(product);
    let addedSomething = false;

    for (const option of options) {
      const inputId =
        `qty-${getProductIndex(code)}-${option.key}`;

      const input = $(inputId);

      if (!input) {
        continue;
      }

      const rawValue = input.value.trim();

      if (rawValue === '') {
        continue;
      }

      const cartons = Number(rawValue);

      if (
        !Number.isFinite(cartons) ||
        cartons < 0 ||
        !Number.isInteger(cartons)
      ) {
        alert(t('invalidQuantity'));
        input.focus();
        return;
      }

      if (cartons === 0) {
        continue;
      }

      const existing = cart.find((item) => {
        return (
          item.code === String(code) &&
          item.sizeKey === option.key
        );
      });

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

      addedSomething = true;
    }

    if (!addedSomething) {
      alert(t('enterQuantity'));
      return;
    }

    saveCart();
    renderCart();

    // Reset the inputs for this product after adding it.
    options.forEach((option) => {
      const input = $(
        `qty-${getProductIndex(code)}-${option.key}`
      );

      if (input) {
        input.value = '0';
      }
    });

    if (button) {
      const originalText = button.textContent;

      button.textContent = t('addedToCart');

      window.setTimeout(() => {
        button.textContent = t('addToCart');
      }, 1400);
    }
  }

  function getProductIndex(code) {
    return PRODUCTS.findIndex(
      (product) => productCode(product) === String(code)
    );
  }

  // =========================================================
  // CART CALCULATIONS
  // =========================================================

  function cartTotals() {
    let totalCartons = 0;
    let totalPairs = 0;

    cart.forEach((item) => {
      const product = findProduct(item.code);

      if (!product) {
        return;
      }

      const cartons = Number(item.cartons) || 0;
      const pairsPerCarton = packSize(product);

      totalCartons += cartons;
      totalPairs += cartons * pairsPerCarton;
    });

    return {
      totalCartons,
      totalPairs
    };
  }

  // =========================================================
  // RENDER CART
  // =========================================================

  function renderCart() {
    const container = $('cartItems');

    const validCart = cart.filter((item) => {
      return findProduct(item.code);
    });

    if (validCart.length !== cart.length) {
      cart = validCart;
      saveCart();
    }

    if (container) {
      if (cart.length === 0) {
        container.innerHTML = `
          <p class="empty-cart">
            ${escapeHTML(t('emptyCart'))}
          </p>
        `;
      } else {
        container.innerHTML = cart.map((item, index) => {
          const product = findProduct(item.code);

          if (!product) {
            return '';
          }

          const pairsPerCarton = packSize(product);
          const cartons = Number(item.cartons) || 0;
          const pairs = cartons * pairsPerCarton;

          const code = escapeHTML(item.code);
          const sizeLabel = escapeHTML(
            item.sizeLabel || item.size || ''
          );

          return `
            <div class="cart-item" data-cart-index="${index}">
              <div class="cart-item-details">
                <strong class="cart-item-code">${code}</strong>

                <p>
                  ${escapeHTML(t('size'))}:
                  ${sizeLabel}
                </p>

                <p>
                  ${escapeHTML(t('pairsPerCarton'))}:
                  ${formatNumber(pairsPerCarton)}
                </p>
              </div>

              <div class="cart-item-quantity">
                <label for="cart-qty-${index}">
                  ${escapeHTML(t('quantity'))}
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
                  ${formatNumber(pairs)}
                  ${escapeHTML(t('pairs'))}
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
            updateCartQuantity(
              Number(input.dataset.cartUpdate),
              input.value
            );
          });
        });

        container.querySelectorAll('[data-cart-remove]').forEach((button) => {
          button.addEventListener('click', () => {
            removeCartItem(Number(button.dataset.cartRemove));
          });
        });
      }
    }

    const totals = cartTotals();

    if ($('cartCount')) {
      $('cartCount').textContent = formatNumber(
        cart.reduce((sum, item) => sum + (Number(item.cartons) || 0), 0)
      );
    }

    if ($('cartTotalCartons')) {
      $('cartTotalCartons').textContent = formatNumber(
        totals.totalCartons
      );
    }

    if ($('cartTotalPairs')) {
      $('cartTotalPairs').textContent = formatNumber(
        totals.totalPairs
      );
    }

    updateCartNavigation();
    updateCheckoutButton();
  }

  function updateCartNavigation() {
    const totalCartons = cart.reduce(
      (sum, item) => sum + (Number(item.cartons) || 0),
      0
    );

    const navCounter = $('navCartCount');

    if (navCounter) {
      navCounter.textContent = `${t('cart')} (${totalCartons})`;
    }

    const cartLink = $('cartLink');

    if (cartLink) {
      cartLink.textContent = `${t('cart')} (${totalCartons})`;
    }
  }

  function updateCheckoutButton() {
    const button = $('checkoutButton');

    if (button) {
      button.disabled = cart.length === 0;
    }
  }

  // =========================================================
  // UPDATE AND REMOVE CART ITEMS
  // =========================================================

  function updateCartQuantity(index, value) {
    if (!cart[index]) {
      return;
    }

    const cartons = Number(value);

    if (
      !Number.isFinite(cartons) ||
      !Number.isInteger(cartons) ||
      cartons < 1
    ) {
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
  // WHATSAPP CHECKOUT
  // =========================================================

  function checkoutWhatsApp() {
    if (cart.length === 0) {
      alert(t('emptyCart'));
      return;
    }

    if (!WHATSAPP_NUMBER) {
      alert('WhatsApp number is missing.');
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

      const pairsPerCarton = packSize(product);
      const cartons = Number(item.cartons) || 0;
      const pairs = cartons * pairsPerCarton;

      lines.push(
        `${index + 1}. ${productCode(product)}`
      );

      lines.push(
        `   ${t('size')}: ${item.sizeLabel || item.size}`
      );

      lines.push(
        `   ${t('quantity')}: ${cartons} ${t('cartons')}`
      );

      lines.push(
        `   ${t('pairsPerCarton')}: ${pairsPerCarton}`
      );

      lines.push(
        `   ${t('pairs')}: ${pairs}`
      );

      lines.push('');
    });

    lines.push('------------------------');
    lines.push(
      `${t('totalCartons')}: ${totals.totalCartons}`
    );
    lines.push(
      `${t('totalPairs')}: ${totals.totalPairs}`
    );
    lines.push('');
    lines.push(t('thankYou'));

    const message = lines.join('\n');

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, '_blank', 'noopener,noreferrer');
  }

  // =========================================================
  // EVENT LISTENERS
  // =========================================================

  function setupEventListeners() {
    const languageSelector =
      $('languageSelect') ||
      $('langSelect') ||
      $('language');

    if (languageSelector) {
      languageSelector.addEventListener('change', () => {
        setLanguage(languageSelector.value);
      });
    }

    const searchInput = getSearchInput();

    if (searchInput) {
      searchInput.addEventListener('input', renderProducts);
    }

    const categorySelect = getCategorySelect();

    if (categorySelect) {
      categorySelect.addEventListener('change', renderProducts);
    }

    const sortSelect = getSortSelect();

    if (sortSelect) {
      sortSelect.addEventListener('change', renderProducts);
    }

    const clearButton = $('clearCart');

    if (clearButton) {
      clearButton.addEventListener('click', clearCart);
    }

    const checkoutButton = $('checkoutButton');

    if (checkoutButton) {
      checkoutButton.addEventListener('click', checkoutWhatsApp);
    }
  }

  // =========================================================
  // START APPLICATION
  // =========================================================

  function init() {
    currentLanguage = detectLanguage();

    setupEventListeners();
    applyLanguage();
    renderProducts();
    renderCart();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
