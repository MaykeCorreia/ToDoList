// Função para carregar as tarefas da localStorage
function carregarTarefas() {
    const tarefasArmazenadas = localStorage.getItem('tarefas');
    if (tarefasArmazenadas !== null) {
        return JSON.parse(tarefasArmazenadas);
    } else {
        return [];
    }
}

// Função para salvar as tarefas na localStorage
function salvarTarefas(tarefas) {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Função para adicionar uma nova tarefa à lista
function adicionaTarefaNaLista() {
    const novaTarefa = document.getElementById('input_nova_tarefa').value;
    if (novaTarefa.trim() !== '') {
        const tarefas = carregarTarefas();
        tarefas.push({ texto: novaTarefa, concluida: false });
        salvarTarefas(tarefas);
        atualizarListaTarefas();
        document.getElementById('input_nova_tarefa').value = '';
    }
}

// Função para criar um novo item na lista de tarefas
function criaNovoItemDaLista(textoDaTarefa, concluida, indice) {
    const listaTarefas = document.getElementById('lista_de_tarefas');
    const novoItem = document.createElement('li');
    novoItem.innerText = textoDaTarefa;
    novoItem.setAttribute('data-indice', indice);

    // Adiciona evento de clique para editar tarefa
    novoItem.addEventListener('click', function() {
        editaTarefa(this);
    });

    // Adiciona evento de clique para marcar/desmarcar tarefa como concluída
    if (concluida) {
        novoItem.classList.add('concluida');
    }
    novoItem.addEventListener('click', function() {
        marcaDesmarcaTarefa(this);
    });

    // Adiciona botão para excluir tarefa
    const botaoExcluir = document.createElement('button');
    botaoExcluir.innerText = 'Excluir';
    botaoExcluir.addEventListener('click', function(event) {
        event.stopPropagation(); // Evita que o clique no botão acione a edição da tarefa
        excluirTarefa(indice);
    });
    novoItem.appendChild(botaoExcluir);

    listaTarefas.appendChild(novoItem);
}

// Função para atualizar a lista de tarefas na página
function atualizarListaTarefas() {
    const listaTarefas = document.getElementById('lista_de_tarefas');
    listaTarefas.innerHTML = ''; // Limpa a lista antes de atualizar
    const tarefas = carregarTarefas();
    tarefas.forEach((tarefa, indice) => {
        criaNovoItemDaLista(tarefa.texto, tarefa.concluida, indice);
    });
}

// Função para marcar ou desmarcar uma tarefa como concluída
function marcaDesmarcaTarefa(elementoTarefa) {
    const indice = elementoTarefa.getAttribute('data-indice');
    const tarefas = carregarTarefas();
    tarefas[indice].concluida = !tarefas[indice].concluida;
    salvarTarefas(tarefas);
    atualizarListaTarefas();
}

// Função para editar uma tarefa
function editaTarefa(elementoTarefa) {
    const indice = elementoTarefa.getAttribute('data-indice');
    const tarefas = carregarTarefas();
    const textoAtual = tarefas[indice].texto;
    const novoTexto = prompt('Editar tarefa:', textoAtual);
    if (novoTexto !== null) {
        tarefas[indice].texto = novoTexto;
        salvarTarefas(tarefas);
        atualizarListaTarefas();
    }
}

// Função para excluir uma tarefa
function excluirTarefa(indice) {
    const tarefas = carregarTarefas();
    tarefas.splice(indice, 1);
    salvarTarefas(tarefas);
    atualizarListaTarefas();
}

// Chama a função para carregar e exibir as tarefas ao iniciar a página
atualizarListaTarefas();
// carrega as tarefas do Local Storage
window.onload = function() {
    carregaTarefasDoLocalStorage();
};

function adicionaTarefaNaLista() {
    const novaTarefa = document.getElementById('input_nova_tarefa').value;
    if (novaTarefa.trim() !== '') {
        criaNovoItemDaLista(novaTarefa);
        document.getElementById('input_nova_tarefa').value = '';
        salvaTarefasNoLocalStorage();
    }
}

function criaNovoItemDaLista(textoDaTarefa) {
    const listaTarefas = document.getElementById('lista_de_tarefas');
    let qtdTarefas = listaTarefas.children.length;
    const novoItem = document.createElement('li');
    novoItem.innerText = textoDaTarefa;
    novoItem.id = `tarefa_id_${qtdTarefas++}`;

    novoItem.addEventListener('dblclick', function() {
        editaTarefa(this);
    });

    novoItem.appendChild(criaInputCheckBoxTarefa(novoItem.id));
    listaTarefas.appendChild(novoItem);
}

function editaTarefa(tarefa) {
    const textoTarefa = tarefa.innerText;
    const inputEdicao = document.createElement('input');
    inputEdicao.type = 'text';
    inputEdicao.value = textoTarefa;

    inputEdicao.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            finalizaEdicaoTarefa(tarefa, inputEdicao);
            salvaTarefasNoLocalStorage();
        }
    });

    tarefa.innerHTML = '';
    tarefa.appendChild(inputEdicao);
    inputEdicao.focus();
}

function finalizaEdicaoTarefa(tarefa, inputEdicao) {
    const novoTexto = inputEdicao.value;
    tarefa.innerHTML = novoTexto;
    tarefa.addEventListener('dblclick', function() {
        editaTarefa(this);
    });
    tarefa.appendChild(criaInputCheckBoxTarefa(tarefa.id));
}

function criaInputCheckBoxTarefa(idTarefa) {
    const inputTarefa = document.createElement('input');
    inputTarefa.type = 'checkbox';
    inputTarefa.setAttribute('onclick', `mudaEstadoTarefa('${idTarefa}')`);
    return inputTarefa;
}

function mudaEstadoTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa);
    if (tarefaSelecionada.style.textDecoration === 'line-through') {
        tarefaSelecionada.style.textDecoration = 'none';
    } else {
        tarefaSelecionada.style.textDecoration = 'line-through';
    }

    salvaTarefasNoLocalStorage(); // salva as tarefas atualizadas
}

function resetTarefas() {
    const listaTarefas = document.getElementById('lista_de_tarefas');
    const tarefas = listaTarefas.querySelectorAll('li');

    tarefas.forEach(tarefa => {
        if (tarefa.style.textDecoration === 'line-through') {
            listaTarefas.removeChild(tarefa);
        }
    });

    salvaTarefasNoLocalStorage(); // salva as tarefas
}

function salvaTarefasNoLocalStorage() {
    const listaTarefas = document.getElementById('lista_de_tarefas');
    const tarefas = listaTarefas.querySelectorAll('li');
    const tarefasArray = [];

    tarefas.forEach(tarefa => {
        tarefasArray.push({
            id: tarefa.id,
            texto: tarefa.innerText,
            concluida: tarefa.style.textDecoration === 'line-through'
        });
    });

    localStorage.setItem('tarefas', JSON.stringify(tarefasArray));
}

function carregaTarefasDoLocalStorage() {
    const tarefasArray = JSON.parse(localStorage.getItem('tarefas')) || [];

    tarefasArray.forEach(tarefa => {
        criaNovoItemDaLista(tarefa.texto);
        const tarefaElement = document.getElementById(tarefa.id);
        if (tarefa.concluida) {
            tarefaElement.style.textDecoration = 'line-through';
        }
    });
}
