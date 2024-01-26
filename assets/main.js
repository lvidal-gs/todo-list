const modal = document.querySelector("#modal");
const activeModal = document.querySelector("#new-task");
const closeModalBtn = document.querySelector("#close-modal");
const createTask = document.querySelector("#create-task");
const editTaskBtn = document.querySelector("#edit-task");
const cardList = document.querySelector("#card-list");
const background = document.querySelector("#shadow-background");
const date = document.querySelector("#date");

const event = new Date(Date.now());
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

date.innerHTML = event.toLocaleDateString("en-US", options);

window.onload = () => {
  checkTasks();
};

function showModal(edit = false) {
  background.classList.toggle("active");
  modal.classList.add("active");

  if (edit) {
    editTaskBtn.style.display = "block";
    createTask.style.display = "none";
  } else {
    createTask.style.display = "block";
    editTaskBtn.style.display = "none";
  }
}

activeModal.addEventListener("click", () => {
  showModal();
  const clearInputs = document.querySelectorAll("#modal input");
  document.querySelector("#priority").value = 0;
  clearInputs.forEach((input) => {
    input.value = "";
  });
});

closeModalBtn.addEventListener("click", () => {
  closeModal();
});

createTask.addEventListener("click", () => {
  let title = document.querySelector("#title").value;
  let text = document.querySelector("#text").value;
  let priority = document.querySelector("#priority").value;

  const task = new Task(title, text, priority);
  const escapedTaskId = CSS.escape(task.id);

  const taskElement = document.querySelector(
    `[data-taskid="${escapedTaskId}"]`
  );

  const removeBtn = taskElement.querySelector(".btn-close");
  const editBtn = taskElement.querySelector(".btn-edit");
  const buttonCheck = taskElement.querySelector("button.check");

  const dataTask = {
    task,
    taskHTML: taskElement,
  };

  removeBtn.addEventListener("click", () => {
    removeTask(dataTask);
  });

  editBtn.addEventListener("click", () => {
    openEditModal(dataTask);
  });

  buttonCheck.addEventListener("click", () => {
    checkTask(dataTask);
  });

  checkTasks();
  closeModal();
});

function checkTasks() {
  const dontExist = document.querySelector("#noTasks");
  const taskCards = cardList.querySelectorAll(".card").length;

  const controlDontExists =
    taskCards == 0
      ? (dontExist.style.display = "block")
      : (dontExist.style.display = "none");
}

function closeModal() {
  modal.classList.remove("active");
  background.classList.toggle("active");
}

function removeTask(data) {
  data.task.remove(data);
}

function openEditModal({ task }) {
  const selectModal = document.querySelector("#modal select");
  const inputsModal = document.querySelectorAll("#modal input");

  inputsModal[0].value = task.title;
  inputsModal[1].value = task.text;
  selectModal.value = task.importance;

  showModal(true);

  const editBtn = document.querySelector("#edit-task");

  const editTaskHandler = () => {
    task.edit(task);
    changeCard(task);
    closeModal();
    editBtn.removeEventListener("click", editTaskHandler);
  };

  editBtn.addEventListener("click", editTaskHandler);
}

const inputsModal = document.querySelectorAll(".input-field input");

inputsModal.forEach((input) => {
  const divEl = input.parentElement;
  input.addEventListener("focus", () => {
    divEl.querySelector(".bar").classList.add("bar-active");
  });

  input.addEventListener("blur", () => {
    divEl.querySelector(".bar").classList.remove("bar-active");
  });
});

function changeCard(task) {
  const escapedTaskId = CSS.escape(task.id);
  const cardElement = document.querySelector(
    `[data-taskid="${escapedTaskId}"]`
  );
  const importance = task.putImportanceOnCard(task.importance);

  cardElement.querySelector(".name").innerHTML = task.title;
  cardElement.querySelector(".card-body").innerHTML = task.text;
  if (cardElement.classList.length > 0) {
    var lastIndex = cardElement.classList.length - 1;
    var lastClass = cardElement.classList[lastIndex];
    cardElement.classList.remove(lastClass);
  }

  cardElement.classList.add(importance);
}

function checkTask({ task }) {
  const taskElement = document.querySelector(`[data-taskid='${task.id}']`);
  const btn = taskElement.querySelector(".check");
  const title = taskElement.querySelector(".name");
  const text = taskElement.querySelector(".card-body");

  if (btn.classList.contains("checked")) {
    btn.classList.remove("checked");
    title.classList.remove("line-it");
    text.classList.remove("line-it");
    taskElement.classList.remove("checked");
  } else {
    taskElement.classList.add("checked");
    btn.classList.add("checked");
    title.classList.add("line-it");
    text.classList.add("line-it");
  }
}
