// Seleciona todos os botões de comprar
document.addEventListener('DOMContentLoaded', () => {
  const botoesComprar = document.querySelectorAll('.comprar-btn');

  botoesComprar.forEach(botao => {
    botao.addEventListener('click', () => {
      const nome = botao.getAttribute('data-nome');
      const preco = parseFloat(botao.getAttribute('data-preco'));

      // Recupera o carrinho atual ou cria um novo
      let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

      // Verifica se o item já existe no carrinho
      const itemExistente = carrinho.find(item => item.nome === nome);

      if (itemExistente) {
        itemExistente.quantidade += 1;
      } else {
        carrinho.push({ nome, preco, quantidade: 1 });
      }

      // Salva no localStorage
      localStorage.setItem('carrinho', JSON.stringify(carrinho));

      // Redireciona para a página do carrinho
      window.location.href = 'carrinho.html';
    });
  });
});
