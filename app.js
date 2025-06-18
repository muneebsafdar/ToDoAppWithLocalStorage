document.addEventListener("DOMContentLoaded", function (e) {
  let tasksArray = JSON.parse(localStorage.getItem("Tasks")) || [];

  fillTheTasksArea();

  function createWholeTaskElement(task) {
    const taskDiv = document.createElement("div");
    const paragrah = document.createElement("p");
    const DeleteButton = document.createElement("button");

    taskDiv.className =
      "task w-full flex justify-between bg-gray-600 p-2 mb-2 items-center rounded";
    paragrah.className = "font-bold text-white";
    DeleteButton.className =
      "border-[1px] border-white rounded px-5 py-2 bg-gray-800 text-white cursor-pointer";
    DeleteButton.id = "delete";

    

    paragrah.textContent = task.taskDescription;
    DeleteButton.textContent = "Delete";
    DeleteButton.setAttribute('idOfTask',String(task.id))


    DeleteButton.addEventListener("click", function (e) {
      removeTask(e.target)
      
    });

    taskDiv.appendChild(paragrah);
    taskDiv.appendChild(DeleteButton);

    return taskDiv;
  }

  function setStorage() {
    localStorage.setItem("Tasks", JSON.stringify(tasksArray));
  }

  function fillTheTasksArea() {
    tasksArray.forEach(function (task) {
      document
        .querySelector("#items_list")
        .appendChild(createWholeTaskElement(task));
    });
  }

  function removeTask(task){
    console.log(tasksArray.length);
    tasksArray=tasksArray.filter((t) => t.id != task.getAttribute("idOfTask"))
    console.log(tasksArray.length);
    task.parentElement.remove()
    setStorage()

  }

  document.querySelector("#Btn_add").addEventListener("click", function (e) {
    const task = String(document.querySelector("#textbox").value);

    if (task === "") {
      alert("please enter valid task");
    } else {
     
      const taskObject = {
        id: Date.now(),
        taskDescription: task,
        completed: false,
      };

      tasksArray.push(taskObject);
      setStorage();
       document
        .querySelector("#items_list")
        .appendChild(createWholeTaskElement(taskObject));
    }
    document.querySelector("#textbox").value=""
  });
});




