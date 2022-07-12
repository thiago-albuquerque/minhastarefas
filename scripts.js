let input = document.querySelector('#container input');
let btn = document.querySelector('#container button');
let lista = document.querySelector('#container ul');

// Converte a string => lista
let tarefas = JSON.parse(localStorage.getItem('@listaTarefas')) || [];

// Adiciona tarefa no array
function addTarefa(){
    if( input.value === '' ){
        alert('Digite alguma tarefa!');
        return false;
    }else{
        let novaTarefa = input.value;

        tarefas.push(novaTarefa);
        input.value = '';

        renderizarTarefa();
        salvarDados();
    }    
}
btn.onclick = addTarefa;

// Cria e renderiza tarefas na tela
function renderizarTarefa(){
    lista.innerHTML = '';

    tarefas.map(todo => {
        let li = document.createElement('li');
        li.setAttribute('class', 'listaTarefas');
        let textoTarefa = document.createTextNode(todo);

        // Pega a posição da tarefa
        let posicao = tarefas.indexOf(todo);

        // Cria botão para EXCLUIR tarefa
        let iconeExcluir = document.createElement('ion-icon');
        iconeExcluir.setAttribute('class', 'deleteIcone');
        iconeExcluir.setAttribute('name', 'trash-outline');
        iconeExcluir.setAttribute('onclick', `deletarTarefa(${posicao})`);

        li.appendChild(textoTarefa);
        li.appendChild(iconeExcluir);
        lista.appendChild(li);
    });
}
renderizarTarefa();

// Salva tarefa no local storage
function salvarDados(){
    // Converte a lista => string
    localStorage.setItem('@listaTarefas', JSON.stringify(tarefas));
}

// Deleta tarefa
function deletarTarefa(posicao){
    tarefas.splice(posicao, 1);

    renderizarTarefa();
    salvarDados();
}