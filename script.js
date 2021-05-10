const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')

function criaTarefa(textValue) {
    const li = document.createElement('li')
    
    li.innerText = textValue

    li.innerText += ' '

    tarefas.appendChild(li)
    btnApagar(li)
    salvaTarefa()
}

inputTarefa.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        if (!inputTarefa.value) {
            return 
        }
        criaTarefa(inputTarefa.value)
        inputTarefa.value = ''
    }
})

btnTarefa.addEventListener('click', function() {
    if (!inputTarefa.value) {
        return 
    }
    criaTarefa(inputTarefa.value)
    inputTarefa.value = ''
})

function btnApagar(li) {
    const btnApagar = document.createElement('button')
    btnApagar.innerHTML = '<i class="far fa-trash-alt"></i>'
    btnApagar.setAttribute('class', 'apagar')
    li.appendChild(btnApagar)
}

document.addEventListener('click', function(e) {
    const element = e.target
    if(element.classList.contains('apagar')){
        element.parentElement.remove()
        salvaTarefa()
    }
})

function salvaTarefa() {
    const liTarefas = tarefas.querySelectorAll('li')
    const listaTarefas = []

    for(let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
        listaTarefas.push(tarefaTexto)
    }

    const tarefasJSON = JSON.stringify(listaTarefas)
    localStorage.setItem('tarefas', tarefasJSON)
}

function addTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas')
    const listaTarefas = JSON.parse(tarefas)

    for(let tarefa of listaTarefas) {
        criaTarefa(tarefa)
    }
}
addTarefasSalvas()