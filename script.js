let tarefas = []


function atualizar(element) {
  let tarefa = element.id;
  let tarefas_atualizadas = []

  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].id == tarefa) {

      tarefas[i].check = !tarefas[i].check
    }
    tarefas_atualizadas.push(tarefas[i])
  }
  localStorage.setItem("tarefas_salvas", JSON.stringify(tarefas_atualizadas))

}

onload = function () {
  let div_tarefas = document.getElementById("tarefas");
  let tarefas_localStorage = localStorage.getItem("tarefas_salvas");

  if (tarefas_localStorage != null) {
    tarefas = JSON.parse(tarefas_localStorage);

    for (let i = 0; i < tarefas.length; i++) {
      (div_tarefas.innerHTML += `<div class="tarefa"> 
  <input type="checkbox" ${tarefas[i].check == true ? "checked" : ""
        } onchange="atualizar(this)" id="${tarefas[i].id}">
         <p> 
        ${tarefas[i].conteudo} 
        </p>
        <button class="excluir" onclick="excluirTarefa('${tarefas[i].id}')"> 
        <img class="lixeira" src="./assets/lixeira.png" alt="lixeira"></button> </div>`);
    }
  }
}









function criarTarefa() {
  let input = document.getElementById("novo");
  let valor = input.value.trim();
  let div_tarefas = document.getElementById("tarefas");

  let tarefa = { id: Math.random(), conteudo: valor, check: false };

  input.value = ""

  if (valor != "") {

    (div_tarefas.innerHTML += `<div class="tarefa"> 
  <input type="checkbox" ${tarefa.check == true ? "checked" : ""
      } onchange="atualizar(this)" id="${tarefa.id}">
         <p> 
        ${tarefa.conteudo} 
        </p>
        <button class="excluir" onclick="excluirTarefa('${tarefa.id}')"> 
        <img class="lixeira" src="./assets/lixeira.png" alt="lixeira"></button> </div>`);

    tarefas.push(tarefa)
    localStorage.setItem("tarefas_salvas", JSON.stringify(tarefas));

    input.className = "ok"
  }
  else {
    input.className = "erro"
  }

}


function excluirTarefa(element_id) {
  let tarefa_atual = document.getElementById(element_id);
  let div_pai = tarefa_atual.parentElement;
  div_pai.parentNode.removeChild(div_pai)

  let novas_tarefas = []

  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].id != element_id) {

      novas_tarefas.push(tarefas[i]);

    }
    else {
      tarefas.splice(i, 1)
    }

  }
  localStorage.setItem("tarefas_salvas", JSON.stringify(novas_tarefas));
}