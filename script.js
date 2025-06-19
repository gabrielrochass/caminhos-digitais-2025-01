function inicializarBotoesComprar() {
  const botoesComprar = document.querySelectorAll('.comprar-btn');

  botoesComprar.forEach(botao => {
    botao.addEventListener('click', () => {
      const nome = botao.getAttribute('data-nome');
      const preco = parseFloat(botao.getAttribute('data-preco'));

      let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      const itemExistente = carrinho.find(item => item.nome === nome);

      if (itemExistente) {
        itemExistente.quantidade += 1;
      } else {
        carrinho.push({ nome, preco, quantidade: 1 });
      }

      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      window.location.href = 'carrinho.html';
    });
  });
}

// Chame a função quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', inicializarBotoesComprar);


const container = document.getElementById('carrinho');
const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function atualizarCarrinho() {
  container.innerHTML = '';

  if (carrinho.length === 0) {
    container.innerHTML = '<p class="carrinho-vazio">O carrinho está vazio.</p>';
    return;
  }

  carrinho.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'carrinho-item-div';

    const el = document.createElement('span');
    el.className = 'carrinho-item';
    el.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}`;

    const removerBtn = document.createElement('button');
    removerBtn.textContent = 'Remover';
    removerBtn.className = 'btn-remover-item';
    removerBtn.onclick = function () {
      carrinho.splice(index, 1);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      atualizarCarrinho(); // atualiza sem recarregar a página
      atualizarTotal();
    };

    itemDiv.appendChild(el);
    itemDiv.appendChild(removerBtn);
    container.appendChild(itemDiv);
  });
}

function atualizarTotal() {
  const existente = document.querySelector('.carrinho-total');
  if (existente) existente.remove();

  if (carrinho.length > 0) {
    const total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
    const totalDiv = document.createElement('div');
    totalDiv.className = 'carrinho-total';
    totalDiv.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
    document.body.appendChild(totalDiv);
  }
}

// Inicializa
atualizarCarrinho();
atualizarTotal();
