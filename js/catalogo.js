(function () {
  function esc(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function money(v) {
    return Number(v).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  function render() {
    const grid = document.getElementById('grid');
    if (!grid || typeof produtos === 'undefined') return;

    grid.innerHTML = produtos.map(function (p) {
      const addButton = p.preco
        ? `<button class="add-cart" onclick="addToCart('${p.id}')">🛒 Adicionar</button>`
        : '';

      return `
        <article class="card" data-search="${esc(p.nome + ' ' + (p.ano || ''))}">
          <a class="card-media" href="produto-${p.id}.html">
            <img src="${p.fotos[0] || ''}" alt="${esc(p.nome)}" loading="lazy">
          </a>
          <div class="card-body">
            <div class="year">${esc(p.ano || '')}</div>
            <h3><a href="produto-${p.id}.html">${esc(p.nome)}</a></h3>
            <div class="price ${p.preco ? '' : 'unavailable'}">
              ${p.preco ? money(p.preco) : 'Não disponível'}
            </div>
            <div class="card-actions">
              <a class="btn" href="produto-${p.id}.html">Ver produto</a>
              ${addButton}
            </div>
          </div>
        </article>`;
    }).join('');

    if (window.applySearch) window.applySearch();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
