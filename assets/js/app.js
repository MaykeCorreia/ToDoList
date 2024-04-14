// Função para adicionar uma nova tarefa à lista
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

// carrega as tarefas do Local Storage
window.onload = function() {
    carregaTarefasDoLocalStorage();
};
