var taskId = 0;

function catchTasksInfo() {
  task = {
    id: taskId+1,
    typed: document.getElementById("taskTyped").value,
    /*taskUrgency: document.getElementById('urgencyTask').value,*/
  }
  return task;
}

function createTask() {
  let taskInfo = catchTasksInfo();
  taskId++
  const tasksArea = document.querySelector("#tasksArea");
  const taskBox = `
    <div class="taskBox" id="taskId${taskInfo.id}">
      <div class="tasksInfos">
        <h2 class="taskNumber">Tarefa nº${taskInfo.id}</h2>
        <div class="taskControl">
        <button class="finishButton" onclick="finishTask()">Finalizou</button>
        <button id="buttonTaskId${taskInfo.id}" class="deleteButton" onclick="deleteTask()">X</button>
        </div>
      </div>
      <span class="taskDescription">${taskInfo.typed}</span>
    </div>`;
  tasksArea.innerHTML += taskBox;

  cleanInput();
}

function deleteTask() {
  const el = document.querySelector("#tasksArea");
  el.addEventListener('click', (e) => {
    const buttonDelete = e.target.id; //mostra qual botão está sendo clicado
    const taskObject = document.getElementById(buttonDelete);  
    const taskBox = taskObject.parentNode.parentNode.parentNode;  // parentNode == parentElement ***
    const boxId = taskBox.getAttribute('id');
    const boxFrame = document.getElementById(boxId)
    boxFrame.remove();
  })
  
}

function finishTask() {
  window.alert("finalizou");
}

function cleanInput (){
  const inputTask = document.querySelector('#taskTyped');
  const inputUrgency = document.querySelector('#urgencyTask');

  inputTask.value = '';
}
