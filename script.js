let allcheckbox = {
    t1: false,
    t2: false,
    t3: false,
    t4: false,
    t5: false,
  };
  // Criei esse array para controle das tarefas
  let array_de_tarefas = [];
  
  
  function atualizar(element) {
    var id_element = element.id;
    let novo_array = [];
  
    // a ideia é a mesma da deleção:
    //percorro o array anterior inteiro verificando cada id
    for (let i = 0; i < array_de_tarefas.length; i++) {
      if (array_de_tarefas[i].id == id_element) {
        // Aqui altero a valor do boleano que tem o mesmo id que foi clicado
  
        // a propriedade feito vai receber o contrário de seu valor atual
        array_de_tarefas[i].feito = !array_de_tarefas[i].feito;
      }
  
      // adiciono no novo array
      novo_array.push(array_de_tarefas[i]);
    }
    // Atualizo o localStorage
  
    localStorage.setItem("tarefas_localStorage", JSON.stringify(novo_array));
  
    // atualizo o navegador para que o onload seja ativado novamente
    location.reload();
  }
  
  onload = function () {
    let tarefas = document.getElementById("tarefas");
    // A ideia é a mesma porém nesse caos nos iremos percorrer o array populando novamente os itens baseado noa array
    // que está no localStorage
    let valor_localStorage = localStorage.getItem("tarefas_localStorage");
    if (valor_localStorage != null) {
      array_de_tarefas = JSON.parse(valor_localStorage);
  
      for (let i = 0; i < array_de_tarefas.length; i++) {
        tarefas.innerHTML += `<div class="tarefa"> 
          <input type="checkbox" ${
            array_de_tarefas[i].feito == true ? "checked" : ""
          } onchange="atualizar(this)" id="${array_de_tarefas[i].id}">
                 <p> 
                ${array_de_tarefas[i].conteudo} 
                </p>
                <button class="excluir" onclick="excluir('${
                  array_de_tarefas[i].id
                }')"> 
                <img class="lixeira" src="./assets/lixeira.png" alt="lixeira"></button> </div>`;
      }
    }
  };
  
  function criar() {
    let tarefas = document.getElementById("tarefas");
    let inputN = document.getElementById("new");
    let value = inputN.value;
  
    // Crio a tarefa com um número aleatório, para poder ser identificado na exclusão e alteração do input
    // um boleano que cada input teria separado e o conteúdo de fato
    let tarefa_atual = { id: Math.random(), conteudo: value, feito: false };
  
    //  Adiciono no array usando o push
    array_de_tarefas.push(tarefa_atual);
  
    // Adiciono o array no localStorage
    localStorage.setItem(
      "tarefas_localStorage",
      JSON.stringify(array_de_tarefas)
    );
  
    return (tarefas.innerHTML += `<div class="tarefa"> 
    <input type="checkbox" ${
      tarefa_atual.feito == true ? "checked" : ""
    } onchange="atualizar(this)" id="${tarefa_atual.id}">
           <p> 
          ${tarefa_atual.conteudo} 
          </p>
          <button class="excluir" onclick="excluir('${tarefa_atual.id}')"> 
          <img class="lixeira" src="./assets/lixeira.png" alt="lixeira"></button> </div>`);
  }
  
  // Para fazer a exclusão:
  // lembre-se que agora estamos passando o id para a função
  function excluir(id_da_tarefa) {
    // Crio um array vazio
    const novo_array = [];
  
    //percorro o array anterior inteiro verificando cada id
    for (let i = 0; i < array_de_tarefas.length; i++) {
      if (array_de_tarefas[i].id != id_da_tarefa) {
        // Aqui adiciono todas as tarefas que tem o id diferente do passado
        // como argumento
        novo_array.push(array_de_tarefas[i]);
      }
    }
    // Atualizo o localStorage
  
    localStorage.setItem("tarefas_localStorage", JSON.stringify(novo_array));
  
    // atualizo o navegador para que o onload seja ativado novamente
    location.reload();
  }
  