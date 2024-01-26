class Task {
  constructor(title, text, importance) {
    this.title = title || "Pending Task";
    this.text = text || "No description.";
    this.importance = importance;
    this.taskId;
    this.createCard();
  }

  createCard() {
    const listaCard = document.querySelector("#card-list");
    const newCard = document.createElement("div");

    this.id = this.createId();

    const contentCard = `
      <div class="card-title">
        <div class="check-title">
          <button class="check" type="button"></button>
          <span class="name">${this.title}</span>
        </div>
        <div class="buttons">
          <button class="card-btn btn-edit">
            <i class="bi bi-pencil-fill"></i>
          </button>
          <button class="card-btn btn-close">
            <i class="bi bi-x-circle-fill"></i>
          </button>
        </div>
      </div>

      <p class="card-body">
        ${this.text}
      </p>`;

    const importance = this.putImportanceOnCard(this.importance);

    newCard.classList.add("card", "active", `${importance}`);

    newCard.setAttribute("data-taskId", this.id);

    newCard.innerHTML = contentCard;
    listaCard.appendChild(newCard);
  }

  createId() {
    const tasks = document.querySelectorAll("[data-taskId]");
    let creatingId;

    if (tasks.length > 1) {
      const ids = [];
      let id;

      tasks.forEach((task) => {
        id = task.getAttribute("data-taskId");
        ids.push(id);
      });

      do {
        creatingId = this.generateRandomString();
      } while (ids.includes());

      return creatingId;
    } else {
      creatingId = this.generateRandomString();
      return creatingId;
    }
  }

  generateRandomString() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";
    const length = 10;
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  remove(task) {
    const taskHTML = task.taskHTML;

    taskHTML.classList.add("fade-out");

    taskHTML.addEventListener("transitionend", () => {
      cardList.removeChild(taskHTML);
    });

    checkTasks();
  }

  edit(task) {
    task.title = document.querySelector("#title").value;
    task.text = document.querySelector("#text").value;
    task.importance = document.querySelector("#priority").value;

    return task;
  }

  putImportanceOnCard(imp) {
    let putImportanceOnCard;

    switch (imp) {
      case "1":
        putImportanceOnCard = "border-green";
        break;
      case "2":
        putImportanceOnCard = "border-yellow";
        break;
      case "3":
        putImportanceOnCard = "border-red";
        break;
      default:
        putImportanceOnCard = "border-normal";
        break;
    }

    return putImportanceOnCard;
  }
}
