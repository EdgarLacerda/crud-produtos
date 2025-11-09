const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./produtos.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
    createTable();
  }
});

// Criar tabela de produtos
function createTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT,
      preco REAL NOT NULL,
      quantidade INTEGER NOT NULL
    )
  `;
  
  db.run(sql, (err) => {
    if (err) {
      console.error('Erro ao criar tabela:', err.message);
    } else {
      console.log('Tabela "produtos" criada ou já existe.');
    }
  });
}

// Validação de dados
function validateProduct(produto) {
  const errors = [];
  
  if (!produto.nome || produto.nome.trim() === '') {
    errors.push('O campo nome não pode estar vazio.');
  }
  
  if (isNaN(produto.preco) || produto.preco <= 0) {
    errors.push('O campo preço deve ser um número positivo.');
  }
  
  if (isNaN(produto.quantidade) || produto.quantidade < 0) {
    errors.push('O campo quantidade deve ser um número positivo.');
  }
  
  return errors;
}

// ROTAS DA API

// 1. Listar todos os produtos
app.get('/api/produtos', (req, res) => {
  const sql = 'SELECT * FROM produtos ORDER BY id DESC';
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ produtos: rows });
  });
});

// 2. Exibir detalhes de um produto específico
app.get('/api/produtos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM produtos WHERE id = ?';
  
  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }
    res.json({ produto: row });
  });
});

// 3. Criar novo produto
app.post('/api/produtos', (req, res) => {
  const { nome, descricao, preco, quantidade } = req.body;
  
  // Validação
  const errors = validateProduct({ nome, preco, quantidade });
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  
  const sql = 'INSERT INTO produtos (nome, descricao, preco, quantidade) VALUES (?, ?, ?, ?)';
  
  db.run(sql, [nome, descricao || '', preco, quantidade], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      message: 'Produto criado com sucesso!',
      id: this.lastID 
    });
  });
});

// 4. Atualizar produto
app.put('/api/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, quantidade } = req.body;
  
  // Validação
  const errors = validateProduct({ nome, preco, quantidade });
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  
  const sql = 'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, quantidade = ? WHERE id = ?';
  
  db.run(sql, [nome, descricao || '', preco, quantidade, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }
    res.json({ message: 'Produto atualizado com sucesso!' });
  });
});

// 5. Excluir produto
app.delete('/api/produtos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM produtos WHERE id = ?';
  
  db.run(sql, [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }
    res.json({ message: 'Produto excluído com sucesso!' });
  });
});

// 6. Pesquisar produtos por nome
app.get('/api/produtos/buscar/:nome', (req, res) => {
  const { nome } = req.params;
  const sql = 'SELECT * FROM produtos WHERE nome LIKE ? ORDER BY id DESC';
  
  db.all(sql, [`%${nome}%`], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ produtos: rows });
  });
});

// Servir o frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.use(express.static('public'));