# 📦 Sistema CRUD de Produtos

> **Sistema web completo de gerenciamento de produtos com Create, Read, Update, Delete e busca em tempo real.**

---

## 🎯 PARA O RECRUTADOR - COMO RODAR EM 5 MINUTOS

### ✅ O que você precisa ter instalado:

1. **Node.js** (versão 14+) → [Baixar aqui](https://nodejs.org/)
2. **Git** → [Baixar aqui](https://git-scm.com/)

**Verificar se está instalado:**
```bash
node --version
npm --version
git --version
```

Se algum comando não funcionar, instale o software correspondente e **reinicie o terminal**.

---

## 🚀 PASSO A PASSO PARA RODAR

### **1. Clone o repositório**
```bash
git clone 
cd crud-produtos
```

**Exemplo:**
```bash
git clone https://github.com/seu-usuario/crud-produtos.git
cd crud-produtos
```

### **2. Instale as dependências**
```bash
npm install
```
*Aguarde 30-60 segundos enquanto baixa as bibliotecas necessárias.*

### **3. Inicie o servidor (escolha UMA das 3 opções)**

#### **Opção 1: `npm start` ← RECOMENDADO**
```bash
npm start
```
- ✅ Modo padrão e estável
- ✅ Melhor para avaliar o projeto
- ✅ Use este comando para a primeira execução

#### **Opção 2: `npm run dev`**
```bash
npm run dev
```
- ✅ Modo desenvolvimento com auto-reload
- ✅ Reinicia automaticamente ao modificar o código
- ✅ Útil se você quiser fazer alterações e testar

#### **Opção 3: `node server.js`**
```bash
node server.js
```
- ✅ Execução direta do Node.js
- ✅ Não depende do npm
- ✅ Mesmo resultado que `npm start`

**Mensagens que devem aparecer no terminal:**
```
✅ Conectado ao banco de dados SQLite
✅ Tabela produtos criada/verificada
✅ Dados iniciais inseridos
🚀 Servidor rodando em http://localhost:3000
```

### **4. Acesse no navegador**
```
http://localhost:3000
```

**🎉 PRONTO! A aplicação está rodando com 5 produtos de exemplo já cadastrados.**

> ⚠️ **Importante:** Não feche o terminal enquanto usa a aplicação. Para parar o servidor, pressione `Ctrl + C`.

---

## 🖥️ O QUE VOCÊ VAI VER

Ao abrir `http://localhost:3000`, você encontrará:

### Interface Principal
- **Cabeçalho azul** com título do sistema
- **Botão "Novo Produto"** (verde) no topo
- **Campo de busca** para filtrar produtos
- **Tabela com 5 produtos de exemplo:**
  1. Notebook Dell - R$ 3.500,00
  2. Mouse Logitech - R$ 450,00
  3. Teclado Mecânico - R$ 380,00
  4. Monitor LG - R$ 850,00
  5. Webcam HD - R$ 280,00

### Cada produto na tabela mostra:
- ID, Nome, Descrição, Preço, Quantidade
- Botões **"✏️ Editar"** e **"🗑️ Excluir"**

---

## 🧪 TESTANDO AS FUNCIONALIDADES

### ✅ 1. CRIAR PRODUTO
1. Clique em **"Novo Produto"** (botão verde)
2. Preencha o formulário:
   - Nome: `Mouse Gamer`
   - Descrição: `Mouse RGB 16000 DPI`
   - Preço: `250.00`
   - Quantidade: `20`
3. Clique em **"Salvar"**
4. ✅ Produto aparece na tabela + mensagem de sucesso verde

### ✅ 2. BUSCAR PRODUTO
1. No campo de busca, digite: `note`
2. ✅ Tabela filtra automaticamente mostrando apenas "Notebook Dell"
3. Apague o texto para ver todos novamente

### ✅ 3. EDITAR PRODUTO
1. Clique em **"✏️ Editar"** em qualquer produto
2. Modifique os dados (ex: mude o preço para `3200.00`)
3. Clique em **"Salvar"**
4. ✅ Produto atualizado na tabela

### ✅ 4. EXCLUIR PRODUTO
1. Clique em **"🗑️ Excluir"** em qualquer produto
2. Confirme a exclusão no alerta
3. ✅ Produto removido da tabela + mensagem de sucesso

### ✅ 5. VALIDAÇÕES
**Teste criar um produto inválido:**
- Deixe o nome vazio → ❌ Erro: "O campo nome não pode estar vazio"
- Digite preço negativo (-10) → ❌ Erro: "O campo preço deve ser um número positivo"
- Digite quantidade negativa (-5) → ❌ Erro: "O campo quantidade deve ser um número inteiro não-negativo"

---

## 📊 DIFERENÇAS ENTRE OS 3 COMANDOS

| Comando | Descrição | Quando Usar |
|---------|-----------|-------------|
| `npm start` | Inicia o servidor normalmente | ✅ **Recomendado para avaliar o projeto** |
| `npm run dev` | Inicia com nodemon (auto-reload) | Para fazer modificações e testar mudanças |
| `node server.js` | Execução direta do Node.js | Quando npm apresentar problemas |

**Todos os 3 comandos fazem a mesma coisa:** iniciam o servidor na porta 3000.

A diferença é que `npm run dev` reinicia automaticamente quando você modifica o código, enquanto os outros dois exigem que você pare (Ctrl+C) e reinicie manualmente.

---

## 🏗️ TECNOLOGIAS UTILIZADAS

### Backend
- **Node.js** + **Express** - Servidor e API REST
- **SQLite3** - Banco de dados (arquivo local)
- **CORS** - Comunicação entre frontend e backend

### Frontend
- **HTML5** + **Tailwind CSS** - Interface moderna e responsiva
- **JavaScript** (Vanilla) - Interatividade e AJAX

### Arquitetura
- **API RESTful** - 6 endpoints (GET, POST, PUT, DELETE)
- **SPA** - Todas operações sem recarregar a página
- **Validação** - Frontend e Backend

---

## 📁 ESTRUTURA DO PROJETO

```
crud-produtos/
├── server.js           # Backend: Express + API + Banco de Dados
├── database.db         # Banco SQLite (criado automaticamente)
├── package.json        # Dependências do projeto
├── .gitignore         # Arquivos ignorados pelo Git
├── README.md          # Esta documentação
└── public/
    └── index.html     # Frontend: HTML + CSS + JavaScript
```

---

## 🔌 ENDPOINTS DA API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/produtos` | Lista todos os produtos |
| GET | `/api/produtos/:id` | Detalhes de um produto específico |
| POST | `/api/produtos` | Cria um novo produto |
| PUT | `/api/produtos/:id` | Atualiza um produto |
| DELETE | `/api/produtos/:id` | Exclui um produto |
| GET | `/api/produtos/buscar/nome?nome=...` | Busca produtos por nome |

**Exemplo de requisição (Criar Produto):**
```json
POST http://localhost:3000/api/produtos
Content-Type: application/json

{
  "nome": "Smartphone",
  "descricao": "iPhone 15 Pro",
  "preco": 7999.00,
  "quantidade": 3
}
```

---

## ✨ FUNCIONALIDADES IMPLEMENTADAS

### Backend ✅
- [x] CRUD completo (Create, Read, Update, Delete)
- [x] Busca parcial por nome (SQL LIKE)
- [x] Validação de dados (nome obrigatório, preço positivo, quantidade não-negativa)
- [x] Tratamento de erros
- [x] Mensagens de sucesso/erro descritivas
- [x] Banco de dados SQLite criado automaticamente
- [x] Dados iniciais inseridos automaticamente

### Frontend ✅
- [x] Interface moderna e responsiva
- [x] Tabela dinâmica de produtos
- [x] Formulário modal para criar/editar
- [x] Busca em tempo real
- [x] Confirmação antes de excluir
- [x] Feedback visual (mensagens de sucesso/erro)
- [x] Validação de formulários
- [x] Todas operações via AJAX (sem recarregar página)
- [x] Formatação de preços em R$

---

## 🐛 PROBLEMAS COMUNS E SOLUÇÕES

### ❌ "node não é reconhecido como comando"
**Solução:** Node.js não está instalado.
- Instale em: https://nodejs.org/
- Reinicie o terminal
- Teste: `node --version`

### ❌ "Porta 3000 já está em uso"
**Solução 1:** Feche a aplicação que está usando a porta 3000

**Solução 2:** Mude a porta no arquivo `server.js`:
```javascript
const PORT = 3001; // linha 6
```
Reinicie e acesse: `http://localhost:3001`

### ❌ "Cannot find module 'express'"
**Solução:** Dependências não foram instaladas.
```bash
npm install
```

### ❌ Página não carrega
**Soluções:**
1. Verifique se o servidor está rodando (veja mensagens no terminal)
2. Limpe o cache do navegador (Ctrl + Shift + R)
3. Tente em modo anônimo
4. Certifique-se de acessar `http://localhost:3000` (não `file://`)

### ❌ Resetar banco de dados
Se quiser começar do zero:
```bash
# Pare o servidor (Ctrl + C)
# Delete o arquivo database.db
rm database.db        # Mac/Linux
del database.db       # Windows
# Reinicie o servidor
npm start
```

---

## ⚡ COMANDOS ÚTEIS

```bash
# Iniciar servidor (escolha um)
npm start
npm run dev
node server.js

# Parar servidor
Ctrl + C

# Reinstalar dependências
npm install

# Limpar e reinstalar
rm -rf node_modules package-lock.json  # Mac/Linux
npm install

rmdir /s node_modules                  # Windows
del package-lock.json                  # Windows
npm install
```

---

## 📋 CHECKLIST DE AVALIAÇÃO

Verifique se conseguiu:

- [ ] Clonar o repositório
- [ ] Instalar dependências com `npm install`
- [ ] Iniciar servidor (com um dos 3 comandos)
- [ ] Acessar `http://localhost:3000`
- [ ] Ver 5 produtos na tabela
- [ ] Criar um novo produto
- [ ] Buscar produto por nome
- [ ] Editar um produto existente
- [ ] Excluir um produto (com confirmação)
- [ ] Ver validações funcionando (campos obrigatórios)
- [ ] Ver mensagens de sucesso/erro
- [ ] Todas operações sem recarregar a página

**✅ Se marcou todos: Projeto funcionando perfeitamente!**

---

## 📞 INFORMAÇÕES ADICIONAIS

### 💾 Banco de Dados
- **SQLite** (arquivo local)
- Criado automaticamente na primeira execução
- Arquivo: `database.db` na raiz do projeto
- 5 produtos de exemplo inseridos automaticamente

### 🔒 Validações
**Backend:**
- Nome não pode estar vazio
- Preço deve ser número positivo
- Quantidade deve ser número inteiro não-negativo

**Frontend:**
- Campos obrigatórios marcados com *
- Validação HTML5 nativa
- Feedback visual de erros

### 🎨 Interface
- Design moderno com Tailwind CSS
- Responsiva (funciona em desktop, tablet e mobile)
- Animações suaves
- Feedback visual em todas as ações

---

## 🎓 OBSERVAÇÕES TÉCNICAS

### Por que 3 comandos diferentes?

1. **`npm start`**: Comando padrão definido no `package.json`. Executa `node server.js`.

2. **`npm run dev`**: Script customizado que usa `nodemon` para desenvolvimento. Reinicia automaticamente quando você salva alterações no código.

3. **`node server.js`**: Execução direta do Node.js sem passar pelo npm. Útil para debug ou quando há problemas com npm.

### Tecnologias escolhidas

- **SQLite**: Simples de configurar, não precisa instalar servidor de banco separado
- **Express**: Framework minimalista e popular para Node.js
- **Tailwind**: CSS moderno via CDN, sem necessidade de build
- **Vanilla JS**: Sem frameworks frontend, código mais leve e direto

### Boas práticas implementadas

- ✅ Validação de dados no backend e frontend
- ✅ Tratamento de erros adequado
- ✅ Separação de responsabilidades (backend/frontend)
- ✅ Código comentado e organizado
- ✅ API RESTful seguindo convenções
- ✅ Mensagens descritivas de erro
- ✅ Documentação completa

---

## 📄 LICENÇA

Projeto de código aberto desenvolvido para avaliação técnica.

---

## 👨‍💻 DESENVOLVEDOR

Este projeto demonstra conhecimento em:
- ✅ Node.js e Express
- ✅ Banco de dados SQL (SQLite)
- ✅ API RESTful
- ✅ Frontend moderno (HTML5, CSS3, JavaScript)
- ✅ Validações e tratamento de erros
- ✅ Documentação técnica

---

**⏱️ Tempo estimado para rodar:** 3-5 minutos  
**🔗 Repositório:** https://github.com/EdgarLacerda/crud-produtos  
**📧 Contato:** edgarlacerdaa@gmail.com
**📷 Link da gravação https://drive.google.com/file/d/1dODrPBEivCRpNCv1NVq77VXaqUCASrYI/view?usp=sharing

---

**Desenvolvido com dedicação para demonstração de habilidades técnicas** 💙
