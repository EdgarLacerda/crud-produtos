const API_URL = 'http://localhost:3000/api/produtos';
let produtoEditando = null;
let produtoParaExcluir = null;

// Carregar produtos ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
    
    // Buscar ao pressionar Enter
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            buscarProdutos();
        }
    });
});

// Carregar todos os produtos
async function carregarProdutos() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        renderizarProdutos(data.produtos);
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        mostrarErro('Erro ao carregar produtos. Verifique se o servidor está rodando.');
    }
}

// Buscar produtos por nome
async function buscarProdutos() {
    const termo = document.getElementById('searchInput').value.trim();
    
    if (termo === '') {
        carregarProdutos();
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/buscar/${encodeURIComponent(termo)}`);
        const data = await response.json();
        renderizarProdutos(data.produtos);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

// Renderizar produtos na tabela
function renderizarProdutos(produtos) {
    const tbody = document.getElementById('produtosBody');
    
    if (produtos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="loading">Nenhum produto encontrado.</td></tr>';
        return;
    }
    
    tbody.innerHTML = produtos.map(p => `
        <tr>
            <td>#${p.id}</td>
            <td><strong>${p.nome}</strong></td>
            <td>${p.descricao || '-'}</td>
            <td><strong>R$ ${parseFloat(p.preco).toFixed(2)}</strong></td>
            <td>${p.quantidade}</td>
            <td>
                <button class="btn-edit" onclick="editarProduto(${p.id})">Editar</button>
                <button class="btn-delete" onclick="confirmarExcluir(${p.id})">Excluir</button>
            </td>
        </tr>
    `).join('');
}

// Abrir modal para novo produto
function abrirModal() {
    produtoEditando = null;
    document.getElementById('modalTitle').textContent = 'Novo Produto';
    limparFormulario();
    document.getElementById('modal').style.display = 'block';
}

// Fechar modal
function fecharModal() {
    document.getElementById('modal').style.display = 'none';
    limparFormulario();
}

// Limpar formulário
function limparFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('descricao').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('errors').classList.remove('show');
    document.getElementById('errors').innerHTML = '';
}

// Salvar produto (criar ou atualizar)
async function salvarProduto() {
    const produto = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        preco: parseFloat(document.getElementById('preco').value),
        quantidade: parseInt(document.getElementById('quantidade').value)
    };
    
    try {
        let response;
        
        if (produtoEditando) {
            // Atualizar
            response = await fetch(`${API_URL}/${produtoEditando}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(produto)
            });
        } else {
            // Criar
            response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(produto)
            });
        }
        
        const data = await response.json();
        
        if (response.ok) {
            fecharModal();
            carregarProdutos();
            alert(data.message);
        } else {
            mostrarErros(data.errors);
        }
    } catch (error) {
        console.error('Erro ao salvar produto:', error);
        mostrarErro('Erro ao salvar produto.');
    }
}

// Editar produto
async function editarProduto(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        const produto = data.produto;
        
        produtoEditando = id;
        document.getElementById('modalTitle').textContent = 'Editar Produto';
        document.getElementById('nome').value = produto.nome;
        document.getElementById('descricao').value = produto.descricao || '';
        document.getElementById('preco').value = produto.preco;
        document.getElementById('quantidade').value = produto.quantidade;
        
        document.getElementById('modal').style.display = 'block';
    } catch (error) {
        console.error('Erro ao carregar produto:', error);
    }
}

// Confirmar exclusão
function confirmarExcluir(id) {
    produtoParaExcluir = id;
    document.getElementById('confirmModal').style.display = 'block';
}

// Fechar modal de confirmação
function fecharConfirm() {
    document.getElementById('confirmModal').style.display = 'none';
    produtoParaExcluir = null;
}

// Confirmar e executar exclusão
async function confirmarExclusao() {
    if (!produtoParaExcluir) return;
    
    try {
        const response = await fetch(`${API_URL}/${produtoParaExcluir}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (response.ok) {
            fecharConfirm();
            carregarProdutos();
            alert(data.message);
        }
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        alert('Erro ao excluir produto.');
    }
}

// Mostrar erros de validação
function mostrarErros(erros) {
    const errorsDiv = document.getElementById('errors');
    errorsDiv.innerHTML = '<ul>' + erros.map(e => `<li>${e}</li>`).join('') + '</ul>';
    errorsDiv.classList.add('show');
}

// Mostrar erro genérico
function mostrarErro(mensagem) {
    alert(mensagem);
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    const confirmModal = document.getElementById('confirmModal');
    
    if (event.target == modal) {
        fecharModal();
    }
    if (event.target == confirmModal) {
        fecharConfirm();
    }
}