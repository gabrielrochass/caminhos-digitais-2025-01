function inicializarBotoesComprar() {
  const botoesComprar = document.querySelectorAll('.comprar-btn'); // Seleciona todos os botões de compra

  botoesComprar.forEach(botao => {
    // Adiciona um evento de clique a cada botão -> quando clicado, adiciona o item ao carrinho
    botao.addEventListener('click', () => {
      // Obtém os dados do item a partir dos atributos do botão
      const nome = botao.getAttribute('data-nome');
      const preco = parseFloat(botao.getAttribute('data-preco'));
      
      // Obtém o carrinho do localStorage ou inicializa como um array vazio
      let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []; 
      const itemExistente = carrinho.find(item => item.nome === nome);

      if (itemExistente) {
        itemExistente.quantidade += 1;
      } else {
        carrinho.push({ nome, preco, quantidade: 1 });
      }

      // Atualiza o carrinho no localStorage e redireciona para a página do carrinho
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      window.location.href = 'carrinho.html';
    });
  });
}

// Chame a função quando o DOM estiver pronto -> o DOM significa que todos os elementos HTML foram carregados 
document.addEventListener('DOMContentLoaded', inicializarBotoesComprar);


// Cria o carrinho de compras
const container = document.getElementById('carrinho'); // Seleciona o elemento onde os itens do carrinho serão exibidos
const carrinho = JSON.parse(localStorage.getItem('carrinho')) || []; // Obtém o carrinho do localStorage ou inicializa como um array vazio

function atualizarCarrinho() {
  container.innerHTML = '';

  // Verifica se o carrinho está vazio e exibe uma mensagem apropriada
  if (carrinho.length === 0) {
    container.innerHTML = '<p class="carrinho-vazio">O carrinho está vazio.</p>';
    return;
  }

  // Cria um elemento para cada item no carrinho e adiciona ao container
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
  // Remove o total existente antes de recalcular
  const existente = document.querySelector('.carrinho-total');
  if (existente) existente.remove();

  // Calcula o total do carrinho e exibe
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
