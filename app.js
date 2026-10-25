const productRoot = document.getElementById('products');
const searchInput = document.getElementById('search');
const categoryInput = document.getElementById('category');
const sortInput = document.getElementById('sort');
const count = document.getElementById('resultCount');
const empty = document.getElementById('empty');
const config = window.SITE_CONFIG || {};
const waNumber = (config.whatsappNumber || '').replace(/\D/g, '');
const waBase = 'https://wa.me/' + waNumber;
const waLink = (message) => waNumber ? waBase + '?text=' + encodeURIComponent(message) : 'mailto:?subject=' + encodeURIComponent('Wholesale footwear enquiry') + '&body=' + encodeURIComponent(message);
document.getElementById('whatsappButton').href = waLink(config.introMessage || 'Hello, I am interested in your shoe catalogue.');
document.getElementById('headerContact').href = waNumber ? waLink('Hello, I would like to enquire about wholesale footwear.') : '#contact';
document.getElementById('year').textContent = new Date().getFullYear();
function render(){
 const term = searchInput.value.trim().toLowerCase();
 let items = (window.PRODUCTS || []).filter(p => (categoryInput.value === 'all' || p.category === categoryInput.value) && [p.code,p.name,p.category,p.sizes].join(' ').toLowerCase().includes(term));
 items.sort((a,b) => sortInput.value === 'name' ? a.name.localeCompare(b.name) : a.code.localeCompare(b.code, undefined, {numeric:true}));
 count.textContent = `${items.length} ${items.length === 1 ? 'style' : 'styles'} in catalogue`;
 empty.hidden = items.length !== 0;
 productRoot.innerHTML = items.map(p => {
  const message = `${config.introMessage || 'Hello, I am interested in these shoe styles:'}\n${p.code} — ${p.name}${p.sizes ? '\nSizes: '+p.sizes : ''}${p.pairsPerCarton ? '\nPack: '+p.pairsPerCarton : ''}`;
  const image = p.image ? `<img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=&quot;image-placeholder&quot;><strong>${String(p.code).replace(/[&<>\"]/g,'')}</strong><span>PRODUCT PHOTO</span></div>'">` : `<div class="image-placeholder"><strong>${String(p.code).replace(/[&<>\"]/g,'')}</strong><span>PRODUCT PHOTO</span></div>`;
  return `<article class="product-card"><div class="product-image">${image}</div><div class="product-info"><div class="product-meta"><span class="product-code">${escapeHtml(p.code)}</span><span class="product-tag">${escapeHtml(p.category || 'Footwear')}</span></div><p class="product-name">${escapeHtml(p.name)}${p.sizes ? ' · Sizes '+escapeHtml(p.sizes) : ''}</p><a class="product-link" href="${waLink(message)}" ${waNumber ? 'target="_blank" rel="noopener"' : ''}>Enquire about style <span>↗</span></a></div></article>`;
 }).join('');
}
function escapeHtml(value=''){return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
[searchInput,categoryInput,sortInput].forEach(el => el.addEventListener('input',render));
render();
