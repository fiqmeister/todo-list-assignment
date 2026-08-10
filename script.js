document.addEventListener("DOMContentLoaded", async function () {
  // get data from JSONbin and render
  todos = await loadTodos();
  renderTodos(todos);

  // Render todos list into the table
  function renderTodos(todos) {
    const todoTable = document.querySelector("#tableBody");
    todoTable.innerHTML = "";

    for (let i = 0; i < todos.length; i++) {
      const rowNumber = i + 1;
      const t = todos[i];
      const newTableRow = document.createElement("tr");
      newTableRow.innerHTML = `
                    <th>${rowNumber}</th>
                    <td>${t.taskName}</td>
                    <td>${t.priority}</td>
                    <td>${t.dueDate}</td>
                    <td>${t.taskStatus}</td>
                    <td class="text-end"><button class="editBtn btn btn-primary btn-sm">Edit</button>
                    <button class="deleteBtn btn btn-danger btn-sm">Delete</button>
                    </td>                    
      `
      // Delete Button action
      newTableRow.querySelector(".deleteBtn").addEventListener("click", function () {
        const confirmation = confirm("Do you want to delete the task: " + t.taskName + "?");
        if (confirmation) {
          deleteTodo(todos, t.id);
          renderTodos(todos);
        }
      })

      // Update Button action
      newTableRow.querySelector(".editBtn").addEventListener("click", function () {
        const editName = prompt("New Task Name", t.taskName);
        const editPriority = prompt("New Priority", t.priority);
        const editStatus = prompt("New Status", t.taskStatus);
        modifyTodo(todos, t.id, editName, editPriority, editStatus);
        renderTodos(todos);
      })
      todoTable.appendChild(newTableRow);
    }
  }
  renderTodos(todos);
  //Add Button
  document.querySelector("#addBtn").addEventListener("click", function () {
    const inputTaskName = document.querySelector("#taskName");
    const taskName = inputTaskName.value;

    const inputDueDate = document.querySelector("#dueDate");
    const dueDate = inputDueDate.value;

    const selectedPriority = document.querySelector(`[name="priority"]:checked`).value;
    const selectedStatus = document.querySelector(`[name="status"]:checked`).value;

    const validationResult = inputValidation(taskName, dueDate);

    // run validation first before continuing to addTodo
    if (!validationResult) {
      return; //if validation fails, stop here
    }

    const inputCheck = addTodo(todos, taskName, selectedPriority, selectedStatus, dueDate);
    renderTodos(todos);

    if (inputCheck) {
      inputTaskName.value = "";
      inputDueDate.value = "";
    }

  })
  document.querySelector("#saveBtn").addEventListener("click", function (){
    saveTodos(todos);
  })
  //Validation function for the Task Name textinput & date input 
  function inputValidation(taskName, dueDate) {
    const errorTaskInput = document.querySelector("#error-task-input");
    const errorDateInput = document.querySelector("#error-date-input");

    if (!taskName) {
      errorTaskInput.innerHTML = "This field cannot be left blank.";
      return false;
    } else {
      errorTaskInput.innerHTML = "";
    }

    if (!dueDate) {
      errorDateInput.innerHTML = "Please select a date.";
      return false;
    } else {
      errorDateInput.innerHTML = "";
    }
    return true;
  }
});
document.querySelector("#searchBtn").addEventListener("click", async function () {
  const query = document.querySelector("#searchTerms").value;
  const result = await findTodo(todos, query);
  renderTodos(result);
})
