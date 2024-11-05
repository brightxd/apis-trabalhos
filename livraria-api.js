const { v4: uuidv4 } = require('uuid');
const express = require('express');
const app = express();
const PORT = 5000;



app.use(express.json());


let livros = [];

// GET que retorna os livros dentro da livraria;
app.get('/livros', (req, res) => {
    res.json(livros);
})

// Rota para adicionar um livro;
// Retorna status 201(entidade criada com sucesso no servidor) e o livro adiciona em formato JSON
app.post('/livros', (req, res) => {
    const{ titulo, autor, ano} = req.body; // extrai os valores titulo, autor e ano diretamente do corpo da requisicao
    const novoLivro = {id: livros.length + 1, titulo, autor, ano}; // cria um novo objeto livro a partir da ultima posicao preenchida da array
    // livros[], usando os parametros passados no corpo da requisicao
    livros.push(novoLivro);
    res.status(201).json(novoLivro);
})

// Rota para consultar um livro pelo ID:
app.get('/livros/:id', (req, res) => {
    const { id } = req.params;
    const livro = livros.find(l => l.id === parseInt(id));
    if (livro) {
      res.json(livro);
    } else {
      res.status(404).json({ message: 'Cadê meu livro?!?' });
    }
  });


// Rota para atualizar um livro especificamente pelo ID
app.put('/livros/:id', (req, res) => {
    const { id } = req.params; // extrai ID diretamente dos parametros da requisicao
    const { titulo, autor, ano } = req.body;
    const livro = livros.find(l => l.id === parseInt(id)); // parsa ID para int, pra poder usar no metodo find
    if (livro) { // verifica se o livro existe
      livro.titulo = titulo || livro.titulo; // essa linha e as abaixo verificam se o parametro em questao esta undefined ou nao
      livro.autor = autor || livro.autor; // e em seguida altera o valor ou mantem o mesmo 
      livro.ano = ano || livro.ano;
      res.json(livro); // retorna uma resposta livro, atualizada, no formato JSON
    } else {
      res.status(404).json({ message: 'Vishkk' }); // status de erro livro nao encontrado
    }
  });


// Rota para excluir um livro pelo ID
app.delete('/livros/:id', (req, res) => {
    const { id } = req.params; // extrai ID diretamente dos parametros da requisicao
    const index = livros.findIndex(l => l.id === parseInt(id)); // parsa ID para int, pra poder usar no metodo find
    if (index !== -1) {
      livros.splice(index, 1); // indice do livro a ser deletado, o qual foi parseado usando findIndex acima
      res.status(204).end(); // 204(no content), sinalizando que a entidade foi eliminada com sucesso
    } else {
      res.status(404).json({ message: 'Cade o livro, vei?' }); // status de erro livro nao encontrado
    }
  });

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`); // Rodando
  });