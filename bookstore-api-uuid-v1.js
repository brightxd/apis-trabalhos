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
    const { titulo, autor, ano } = req.body;
    const novoLivro = { id: uuidv4(), titulo, autor, ano }; // usando uuidv4() para geracao de identificadores unicos
    livros.push(novoLivro);
    res.status(201).json(novoLivro);
})

// Rota para consultar um livro pelo ID:
app.get('/livros/:id', (req, res) => {
    const { id } = req.params;
    const livro = livros.find(l => l.id === id); // uuids sao strings, nao precisa parsar
    if (livro) {
      res.json(livro);
    } else {
      res.status(404).json({ message: 'Cadê meu livro?!?' });
    }
});

// Rota para atualizar um livro especificamente pelo ID
app.put('/livros/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, autor, ano } = req.body;
    const livro = livros.find(l => l.id === id); // uuids sao strings, nao precisa parsar
    if (livro) {
      livro.titulo = titulo || livro.titulo;
      livro.autor = autor || livro.autor;
      livro.ano = ano || livro.ano;
      res.json(livro);
    } else {
      res.status(404).json({ message: 'Vishkk' });
    }
});

// Rota para excluir um livro pelo ID
app.delete('/livros/:id', (req, res) => {
    const { id } = req.params;
    const index = livros.findIndex(l => l.id === id); // uuids sao strings, nao precisa parsar
    if (index !== -1) {
      livros.splice(index, 1);
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Cade o livro, vei?' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
