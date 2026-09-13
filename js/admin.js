(function(){
  const categories=[
    {id:'moedas',name:'🪙 Moedas',active:true},
    {id:'cedulas',name:'💵 Cédulas',active:true},
    {id:'medalhas',name:'🏅 Medalhas',active:true},
    {id:'blisters',name:'📦 Blisters e Sachês',active:true},
    {id:'colecoes',name:'🎁 Coleções e Kits',active:true},
    {id:'acessorios',name:'🧰 Acessórios para Colecionadores',active:true},
    {id:'catalogos',name:'📚 Livros e Catálogos',active:true},
    {id:'especiais',name:'⭐ Peças Especiais',active:true},
    {id:'outros',name:'🏛️ Outros Colecionáveis',active:true}
  ];
  const seed=[
    ['01','Blister Oficial — Set das Moedas da Segunda Família do Real','170,00','2018','blisters','imagens/produto-01/foto-2.png',true],
    ['02','Moeda Comemorativa 60 Anos do Banco Central do Brasil — Edição Especial','160,00','2025','moedas','imagens/produto-02/foto-1.png',true],
    ['03','Moeda Comemorativa 1 Real — 60 Anos do Banco Central do Brasil — Edição Especial','19,00','2025','moedas','imagens/produto-03/foto-1.png',true],
    ['04','Moeda Comemorativa 1 Real — 30 Anos do Plano Real — Edição Especial','20,00','2024','moedas','imagens/produto-04/foto-1.png',true],
    ['05','Moeda Comemorativa 60 Anos BACEN — Flor de Cunho','19,00','2025','moedas','imagens/produto-05/foto-1.png',true],
    ['06','Moeda Comemorativa 30 Anos do Real — Flor de Cunho','25,00','2024','moedas','imagens/produto-06/foto-1.png',true],
    ['07','Blister Oficial — Moeda Comemorativa 30 Anos do Real','160,00','2024','blisters','imagens/produto-07/foto-1.png',true],
    ['08','Sachê Lacrado de 25 Centavos — Data Escassa / Baixíssima Tiragem','263,00','2016','blisters','imagens/produto-08/foto-1.png',true],
    ['09','Moeda Avulsa de 1 Real — Comemorativa dos 50 Anos do Banco Central','35,00','2015','moedas','imagens/produto-09/foto-1.png',true],
    ['10','Olimpíadas Rio 2016 — Blister Comemorativo da Moeda Entrega da Bandeira Olímpica — Produto Original','400,00','2012','blisters','imagens/produto-10/foto-1.png',true],
    ['11','Casal FAO — Moedas de 10 e 25 Centavos — Flor de Cunho','410,00','1995','colecoes','imagens/produto-11/foto-1.png',true],
    ['12','Moeda Comemorativa Olimpíadas Rio 2016 — Entrega da Bandeira','320,00','2012','moedas','imagens/produto-12/foto-1.png',true],
    ['13','Moeda Comemorativa 2 Reais — Bicentenário da Independência — Original','210,00','2022','moedas','imagens/produto-13/foto-1.png',true],
    ['14','Moeda 1 Real — 2019 — Comemorativa do Beija-Flor — Flor de Cunho','21,00','2019','moedas','imagens/produto-14/foto-1.png',true],
    ['15','Coleção com 16 Moedas das Olimpíadas — Flor de Cunho','160,00','','colecoes','imagens/produto-15/foto-1.png',true],
    ['16','Kit com 16 Moedas Olímpicas Comemorativas — Novas — Flor de Cunho','134,20','','colecoes','imagens/produto-16/foto-1.png',true],
    ['17','Moeda Avulsa de 1 Real 2016 — Boxe — Nova — Flor de Cunho','15,80','2016','moedas','imagens/produto-17/foto-1.png',true],
    ['18','Coleção Olímpica com as 17 Moedas — Novas — Flor de Cunho','500,00','','colecoes','imagens/produto-18/foto-1.png',true],
    ['19','Sachê de Moedas de 1 Real Comemorativas — 50 Anos do Banco do Brasil','658,20','','blisters','imagens/produto-19/foto-1.png',true],
    ['20','Sachê Lacrado de Moedas Comemorativas Beija-Flor — 50 Moedas — FC','', '2019','blisters','imagens/produto-20/foto-1.png',false],
    ['21','Moeda Soberba de 1 Real 2012 — Comemorativa da Bandeira','320,00','2012','moedas','imagens/produto-21/foto-1.png',true],
    ['22','Blister Oficial — Moeda Comemorativa 25 Anos do Plano Real — Beija-Flor','165,00','2019','blisters','imagens/produto-22/foto-1.png',true]
  ].map(x=>({id:x[0],name:x[1],price:x[2],year:x[3],category:x[4],image:x[5],available:x[6],description:''}));

  let products=JSON.parse(localStorage.getItem('gbAdminProducts')||'null')||seed;
  let categoryState=JSON.parse(localStorage.getItem('gbAdminCategories')||'null')||categories;
  const $=id=>document.getElementById(id);
  const money=v=>v?`R$ ${String(v).replace('.',',')}`:'—';
  const categoryName=id=>(categoryState.find(c=>c.id===id)||{}).name||'Sem categoria';
  function save(){localStorage.setItem('gbAdminProducts',JSON.stringify(products));localStorage.setItem('gbAdminCategories',JSON.stringify(categoryState));}
  function render(){
    const q=$('searchInput').value.trim().toLowerCase(); const cat=$('categoryFilter').value; const status=$('statusFilter').value;
    const filtered=products.filter(p=>(!q||p.name.toLowerCase().includes(q))&&(!cat||p.category===cat)&&(!status||(status==='available'?p.available:!p.available)));
    $('productList').innerHTML=filtered.map(p=>`<article class="product-row"><img class="product-thumb" src="${p.image||'images/sem-foto.png'}" onerror="this.style.visibility='hidden'" alt=""><div class="product-info"><strong>${escapeHtml(p.name)}</strong><small>${p.year||'Ano não informado'} · ${escapeHtml(categoryName(p.category))}</small></div><div class="price">${money(p.price)}</div><div><span class="status ${p.available?'ok':'off'}">${p.available?'Disponível':'Não disponível'}</span></div><div class="row-actions"><button class="icon-btn" data-edit="${p.id}">✏️ Editar</button><button class="icon-btn" data-toggle="${p.id}">${p.available?'Desativar':'Ativar'}</button></div></article>`).join('')||'<p>Nenhum produto encontrado.</p>';
    $('statProducts').textContent=products.length;$('statAvailable').textContent=products.filter(p=>p.available).length;$('statUnavailable').textContent=products.filter(p=>!p.available).length;$('statCategories').textContent=categoryState.filter(c=>c.active).length;
  }
  function escapeHtml(s){return String(s).replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));}
  function populate(){
    $('categoryFilter').innerHTML='<option value="">Todas as categorias</option>'+categoryState.filter(c=>c.active).map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
    $('category').innerHTML=categoryState.filter(c=>c.active).map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
    $('categoryList').innerHTML=categoryState.map(c=>`<div class="category-item"><div><span>${c.name}</span><small>${products.filter(p=>p.category===c.id).length} produto(s)</small></div><button class="category-toggle ${c.active?'on':'off'}" data-cat="${c.id}">${c.active?'Ativa':'Desativada'}</button></div>`).join('');
  }
  function openModal(p){
    $('modalBackdrop').hidden=false;$('modalTitle').textContent=p?'Editar produto':'Novo produto';$('productId').value=p?.id||'';$('name').value=p?.name||'';$('price').value=p?.price||'';$('year').value=p?.year||'';$('category').value=p?.category||categoryState[0].id;$('image').value=p?.image||'';$('description').value=p?.description||'';$('available').checked=p?p.available:true;
  }
  function closeModal(){$('modalBackdrop').hidden=true}
  $('newProductBtn').onclick=()=>openModal();$('closeModal').onclick=closeModal;$('cancelBtn').onclick=closeModal;$('modalBackdrop').onclick=e=>{if(e.target===$('modalBackdrop'))closeModal()};
  $('productForm').onsubmit=e=>{e.preventDefault();const id=$('productId').value||String(Date.now());const obj={id,name:$('name').value.trim(),price:$('price').value.trim(),year:$('year').value.trim(),category:$('category').value,image:$('image').value.trim(),description:$('description').value.trim(),available:$('available').checked};const idx=products.findIndex(p=>p.id===id);if(idx>=0)products[idx]=obj;else products.push(obj);save();populate();render();closeModal()};
  $('productList').onclick=e=>{const edit=e.target.closest('[data-edit]');const tog=e.target.closest('[data-toggle]');if(edit){openModal(products.find(p=>p.id===edit.dataset.edit))}if(tog){const p=products.find(p=>p.id===tog.dataset.toggle);if(p){p.available=!p.available;save();render();populate()}}};
  $('categoryList').onclick=e=>{const b=e.target.closest('[data-cat]');if(!b)return;const c=categoryState.find(c=>c.id===b.dataset.cat);if(c){c.active=!c.active;save();populate();render()}};
  $('searchInput').oninput=render;$('categoryFilter').onchange=render;$('statusFilter').onchange=render;
  populate();render();
})();
