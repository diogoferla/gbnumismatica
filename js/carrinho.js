const CART_KEY = 'gb_numismatica_carrinho';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

function addToCart(id) {
  const product = produtos.find(p => p.id === id);
  if (!product || !product.preco) return;

  const cart = getCart();
  const item = cart.find(x => x.id === id);

  if (item) {
    item.qtd++;
  } else {
    cart.push({
      id: product.id,
      nome: product.nome,
      preco: product.preco,
      foto: product.fotos[0],
      qtd: 1
    });
  }

  saveCart(cart);
  showToast('Produto adicionado ao carrinho.');
}

function removeFromCart(id) {
  saveCart(getCart().filter(x => x.id !== id));
  renderCart();
}

function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find(x => x.id === id);
  if (!item) return;

  item.qtd += delta;

  if (item.qtd <= 0) {
    removeFromCart(id);
    return;
  }

  saveCart(cart);
  renderCart();
}

function updateCartCount() {
  const total = getCart().reduce((sum, item) => sum + item.qtd, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
  });
}

function money(value) {
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function renderCart() {
  const container = document.getElementById('cart-items');
  if (!container) return;

  const cart = getCart();
  const actions = document.getElementById('cart-actions');

  if (!cart.length) {
    container.innerHTML = `
      <div class="empty-cart">
        <h2>Seu carrinho está vazio</h2>
        <p>Escolha seus produtos para começar.</p>
        <a class="btn" href="moedas.html">Ver moedas e coleções</a>
      </div>`;
    document.getElementById('cart-total').textContent = money(0);
    if (actions) actions.style.display = 'none';
    return;
  }

  let total = 0;

  container.innerHTML = cart.map(item => {
    const subtotal = Number(item.preco) * item.qtd;
    total += subtotal;

    return `
      <div class="cart-item">
        <img src="${item.foto}" alt="${item.nome}">
        <div>
          <h3>${item.nome}</h3>
          <div class="label">${money(item.preco)} cada</div>
        </div>
        <div class="qty-controls">
          <button onclick="changeQty('${item.id}', -1)">−</button>
          <strong>${item.qtd}</strong>
          <button onclick="changeQty('${item.id}', 1)">+</button>
        </div>
        <div class="item-price">
          <strong>${money(subtotal)}</strong><br>
          <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remover</button>
        </div>
      </div>`;
  }).join('');

  document.getElementById('cart-total').textContent = money(total);
  if (actions) actions.style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCart();
});
