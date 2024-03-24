function adicionaTarefaNaLista() {
    // debugger - descomentar para acompanhar o fluxo da página
    // seleciona o elemento de input text que tem o texto da nova tarefa
    const novaTarefa = document.getElementById('input_nova_tarefa').value;
    if (novaTarefa.trim() !== '') { // Verifica se o campo não está vazio
        criaNovoItemDaLista(novaTarefa);
        document.getElementById('input_nova_tarefa').value = ''; // Limpa o campo após adicionar a tarefa
    }
}

function criaNovoItemDaLista(textoDaTarefa) {
    // recupera a lista de tarefas
    const listaTarefas = document.getElementById('lista_de_tarefas');
    // guarda o tamanho da lista de tarefas
    let qtdTarefas = listaTarefas.children.length;

    // cria um novo elemento do tipo li (lista)
    const novoItem = document.createElement('li');

    // adiciona o texto digitado no texto da tarefa
    novoItem.innerText = textoDaTarefa;
    // adiciona um ID no novo elemento
    novoItem.id = `tarefa_id_${qtdTarefas++}`;

    novoItem.appendChild(criaInputCheckBoxTarefa(novoItem.id));

    listaTarefas.appendChild(novoItem);
}

function criaInputCheckBoxTarefa(idTarefa) {
    // cria o elemento de input
    const inputTarefa = document.createElement('input');
    // seta o elemento para ser do tipo checkbox
    inputTarefa.type = 'checkbox';
    // seta o onclick do input
    inputTarefa.setAttribute('onclick', `mudaEstadoTarefa('${idTarefa}')`);
    return inputTarefa;
}

function mudaEstadoTarefa(idTarefa) {
    //Risca o texto de tarefa concluída;
    const tarefaSelecionada = document.getElementById(idTarefa);
    if (tarefaSelecionada.style.textDecoration == 'line-through') {
        tarefaSelecionada.style = 'text-decoration: none;';
    } else {
        tarefaSelecionada.style = 'text-decoration: line-through;';
    }
}

function resetTarefas() {
    const listaTarefas = document.getElementById('lista_de_tarefas');
    const tarefas = listaTarefas.querySelectorAll('li');

    tarefas.forEach(tarefa => {
        if (tarefa.style.textDecoration === 'line-through') {
            listaTarefas.removeChild(tarefa); // Remove apenas as tarefas riscadas
        }
    });
}

