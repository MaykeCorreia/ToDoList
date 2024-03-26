function adicionaTarefaNaLista() {
    const novaTarefa = document.getElementById('input_nova_tarefa').value;
    if (novaTarefa.trim() !== '') {
        criaNovoItemDaLista(novaTarefa);
        document.getElementById('input_nova_tarefa').value = '';
    }
}

function criaNovoItemDaLista(textoDaTarefa) {
    const listaTarefas = document.getElementById('lista_de_tarefas');
    let qtdTarefas = listaTarefas.children.length;
    const novoItem = document.createElement('li');
    novoItem.innerText = textoDaTarefa;
    novoItem.id = `tarefa_id_${qtdTarefas++}`;

    // Adiciona evento de duplo clique para editar
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
        }
    });
    // Se a tecla Enter for pressionada, finaliza a função
    tarefa.innerHTML = '';
    tarefa.appendChild(inputEdicao);
    inputEdicao.focus();
}

function finalizaEdicaoTarefa(tarefa, inputEdicao) {
    const novoTexto = inputEdicao.value;
    tarefa.innerHTML = novoTexto;
    // Adiciona evento de duplo clique novamente para permitir futuras edições
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
}

function resetTarefas() {
    const listaTarefas = document.getElementById('lista_de_tarefas');
    const tarefas = listaTarefas.querySelectorAll('li');

    tarefas.forEach(tarefa => {
        if (tarefa.style.textDecoration === 'line-through') {
            listaTarefas.removeChild(tarefa);
        }
    });
    // Adiciona função de Resetar todos as tarefas riscadas(Concluidas)
}
