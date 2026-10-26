const productRoot = document.getElementById('products');
const searchInput = document.getElementById('search');
const categoryInput = document.getElementById('category');
const sortInput = document.getElementById('sort');
const count = document.getElementById('resultCount');
const empty = document.getElementById('empty');

const config = window.SITE_CONFIG || {};
const waNumber = (config.whatsappNumber || '').replace(/\D/g, '');
const waBase = 'https://wa.me/' + waNumber;

const translations = {
  en: {
    pageTitle: 'Run First Sandals | Wholesale Footwear Catalogue',
    description: "Explore Run First Sandals' wholesale footwear catalogue. Browse sandal and slipper styles by code, check available sizes and carton quantities, and contact us for wholesale enquiries.",
    language: 'Language',
    english: 'English',
    chinese: '简体中文',
    contact: 'Contact to order',
    eyebrow: 'MADE FOR EVERYDAY COMFORT',
    heroLine1: 'Find your',
    heroLine2: 'next best-seller.',
    heroText: 'Explore the Run First Sandals footwear collection by style code. Found something you like? Contact us directly to discuss wholesale orders.',
    explore: 'Explore catalogue',
    wholesale: 'Wholesale enquiries welcome',
    collection: 'THE COLLECTION',
    browse: 'Browse our styles',
    sectionDescription: 'Search by style code or narrow the collection to find what you need.',
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
    ready: 'READY TO ORDER?',
    talk: "Let's talk footwear.",
    contactText: "Send us the style codes you're interested in and we'll help with your wholesale enquiry.",
    whatsapp: 'Enquire on WhatsApp',
    rights: 'All rights reserved.',
    backToTop: 'Back to top',
    enquireStyle: 'Enquire about style',
    sizes: 'Sizes',
    pack: 'Pack',
    photo: 'PRODUCT PHOTO',
    footwear: 'Footwear',
    whatsappMessage: 'Hello, I would like to enquire about wholesale footwear.',
    introMessage: 'Hello, I am interested in these shoe styles:'
  },

  zh: {
    pageTitle: 'Run First Sandals | 鞋类批发目录',
    description: '浏览 Run First Sandals 鞋类批发目录，按款号查看凉鞋和拖鞋款式、尺码及每箱数量，并联系我们咨询批发订单。',
    language: '语言',
    english: 'English',
    chinese: '简体中文',
    contact: '联系订购',
    eyebrow: '舒适日常穿着',
    heroLine1: '寻找您的',
    heroLine2: '畅销新款。',
    heroText: '按款号浏览 Run First Sandals 鞋类系列。找到喜欢的款式？欢迎直接联系我们洽谈批发订单。',
    explore: '浏览产品目录',
    wholesale: '欢迎批发咨询',
    collection: '产品系列',
    browse: '浏览我们的款式',
    sectionDescription: '输入款号搜索，或使用筛选选项查找所需款式。',
    searchPlaceholder: '搜索款号或名称…',
    searchLabel: '搜索款式',
    allFootwear: '所有鞋类',
    sandals: '凉鞋',
    slippers: '拖鞋',
    other: '其他',
    sortCode: '排序：款号',
    sortName: '排序：名称',
    style: '款式',
    styles: '款式',
    inCatalogue: '个款式',
    noStyles: '未找到款式',
    noStylesText: '请尝试其他搜索内容或清除筛选条件。',
    ready: '准备订购？',
    talk: '欢迎洽谈鞋类订单。',
    contactText: '请发送您感兴趣的款号，我们将协助您处理批发咨询。',
    whatsapp: '通过 WhatsApp 咨询',
    rights: '版权所有。',
    backToTop: '返回顶部',
    enquireStyle: '咨询此款式',
    sizes: '尺码',
    pack: '每箱数量',
    photo: '产品图片',
    footwear: '鞋类',
    whatsappMessage: '您好，我想咨询鞋类批发。',
    introMessage: '您好，我对以下鞋款感兴趣：'
  }
};

/* Direct links can override the saved browser language:
   ?lang=zh = Chinese
   ?lang=en = English
   No language parameter = saved choice, or English by default. */
const urlParams = new URLSearchParams(window.location.search);
const requestedLanguage = urlParams.get('lang');

let currentLanguage;

if (requestedLanguage === 'zh') {
  currentLanguage = 'zh';
} else if (requestedLanguage === 'en') {
  currentLanguage = 'en';
} else {
  currentLanguage = localStorage.getItem('runFirstLanguage') || 'en';
}

if (!translations[currentLanguage]) {
  currentLanguage = 'en';
}

function t(key) {
  return translations[currentLanguage][key] || translations.en[key] || key;
}

function makeWhatsAppLink(message) {
  return waNumber
    ? waBase + '?text=' + encodeURIComponent(message)
    : 'mailto:?subject=' + encodeURIComponent('Wholesale footwear enquiry') +
      '&body=' + encodeURIComponent(message);
}

function applyLanguage() {
  const tr = translations[currentLanguage];

  document.documentElement.lang = currentLanguage === 'zh' ? 'zh-CN' : 'en';
  document.title = tr.pageTitle;

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = tr.description;
  }

  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  };

  setText('.top-contact', tr.contact + ' ↗');
  setText('.hero-copy .eyebrow', tr.eyebrow);

  const heroHeading = document.querySelector('.hero-copy h1');
  if (heroHeading) {
    heroHeading.innerHTML =
      `${escapeHtml(tr.heroLine1)}<br><em>${escapeHtml(tr.heroLine2)}</em>`;
  }

  setText('.hero-text', tr.heroText);

  const exploreButton = document.querySelector('.primary-button[href="#catalogue"]');
  if (exploreButton) {
    exploreButton.innerHTML = `${escapeHtml(tr.explore)} <span>↓</span>`;
  }

  const heroNote = document.querySelector('.hero-note');
  if (heroNote) {
    heroNote.innerHTML = `<span class="dot"></span>${escapeHtml(tr.wholesale)}`;
  }

  setText('.section-head .eyebrow', tr.collection);
  setText('.section-head h2', tr.browse);
  setText('.section-description', tr.sectionDescription);

  searchInput.placeholder = tr.searchPlaceholder;
  searchInput.setAttribute('aria-label', tr.searchLabel);

  categoryInput.options[0].textContent = tr.allFootwear;
  categoryInput.options[1].textContent = tr.sandals;
  categoryInput.options[2].textContent = tr.slippers;
  categoryInput.options[3].textContent = tr.other;

  sortInput.options[0].textContent = tr.sortCode;
  sortInput.options[1].textContent = tr.sortName;

  setText('#empty h3', tr.noStyles);
  setText('#empty p', tr.noStylesText);

  setText('.contact .eyebrow', tr.ready);
  setText('.contact h2', tr.talk);
  setText('.contact div > p:not(.eyebrow)', tr.contactText);

  const whatsappButton = document.getElementById('whatsappButton');
  if (whatsappButton) {
    whatsappButton.innerHTML = `${escapeHtml(tr.whatsapp)} <span>↗</span>`;
    whatsappButton.href = makeWhatsAppLink(tr.introMessage);
  }

  const footerParagraph = document.querySelector('footer p');
  if (footerParagraph) {
    footerParagraph.innerHTML =
      `© <span id="year">${new Date().getFullYear()}</span> Run First Sandals. ${escapeHtml(tr.rights)}`;
  }

  const backLink = document.querySelector('footer > a:last-child');
  if (backLink) {
    backLink.textContent = tr.backToTop + ' ↑';
  }

  const selector = document.getElementById('language');
  if (selector) {
    selector.value = currentLanguage;
  }

  const headerContact = document.getElementById('headerContact');
  if (headerContact) {
    headerContact.href = waNumber
      ? makeWhatsAppLink(tr.whatsappMessage)
      : '#contact';
  }

  render();
}

function render() {
  const term = searchInput.value.trim().toLowerCase();

  let items = (window.PRODUCTS || []).filter(p =>
    (categoryInput.value === 'all' || p.category === categoryInput.value) &&
    [p.code, p.name, p.category, p.sizes].join(' ').toLowerCase().includes(term)
  );

  items.sort((a, b) =>
    sortInput.value === 'name'
      ? a.name.localeCompare(b.name)
      : a.code.localeCompare(b.code, undefined, { numeric: true })
  );

  count.textContent =
    `${items.length} ${items.length === 1 ? t('style') : t('styles')} ${t('inCatalogue')}`;

  empty.hidden = items.length !== 0;

  productRoot.innerHTML = items.map(p => {
    const message =
      `${t('introMessage')}\n${p.code} — ${p.name}` +
      `${p.sizes ? '\n' + t('sizes') + ': ' + p.sizes : ''}` +
      `${p.pairsPerCarton ? '\n' + t('pack') + ': ' + p.pairsPerCarton : ''}`;

    const safeCode = escapeHtml(p.code);
    const safeName = escapeHtml(p.name);

    const image = p.image
      ? `<img src="${escapeHtml(p.image)}" alt="${safeName}" loading="lazy"
          onerror="this.parentElement.innerHTML='<div class=&quot;image-placeholder&quot;><strong>${safeCode}</strong><span>${escapeHtml(t('photo'))}</span></div>'">`
      : `<div class="image-placeholder"><strong>${safeCode}</strong><span>${escapeHtml(t('photo'))}</span></div>`;

    return `
      <article class="product-card">
        <div class="product-image">${image}</div>
        <div class="product-info">
          <div class="product-meta">
            <span class="product-code">${safeCode}</span>
            <span class="product-tag">${escapeHtml(t('footwear'))}</span>
          </div>
          <p class="product-name">
            ${safeName}${p.sizes ? ' · ' + escapeHtml(t('sizes')) + ' ' + escapeHtml(p.sizes) : ''}
          </p>
          <a class="product-link" href="${makeWhatsAppLink(message)}"
            ${waNumber ? 'target="_blank" rel="noopener"' : ''}>
            ${escapeHtml(t('enquireStyle'))} <span>↗</span>
          </a>
        </div>
      </article>`;
  }).join('');
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[c]);
}

const languageSelector = document.getElementById('language');

if (languageSelector) {
  languageSelector.addEventListener('change', () => {
    currentLanguage = languageSelector.value === 'zh' ? 'zh' : 'en';

    localStorage.setItem('runFirstLanguage', currentLanguage);

    applyLanguage();
  });
}

[searchInput, categoryInput, sortInput].forEach(element => {
  element.addEventListener('input', render);
});

applyLanguage();
