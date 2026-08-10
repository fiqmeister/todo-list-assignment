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
        //const confirmation = confirm("Do you want to delete the task: " + t.taskName + "?");
        const confirmation = Swal.fire({
          title: 'Are you sure you want to delete this task?',
          html: `"${t.taskName}?"`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
        }).then((result) => {
          if (result.isConfirmed) {
            deleteTodo(todos, t.id);
            renderTodos(todos);
            Swal.fire('Deleted!', 'Your task has been deleted.', 'success')
          }
        })
      })
      // if (confirmation) {
      //   deleteTodo(todos, t.id);
      //   renderTodos(todos);
      // }
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
    // change the date format to DD-MM-YYYY
    const formattedDueDate = formatDate(dueDate);

    const inputCheck = addTodo(todos, taskName, selectedPriority, selectedStatus, formattedDueDate);
    renderTodos(todos);

    if (inputCheck) {
      inputTaskName.value = "";
      inputDueDate.value = "";
      Swal.fire({
        title: 'Added to list !',
        html: `Your task <br><b>"${taskName}"</b><br> has been successfully added.`,
      });
    }

  })
  document.querySelector("#saveBtn").addEventListener("click", function () {
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
  // function to change dueDate format from YYYY-MM-DD to DD-MM-YYYY
  function formatDate(dateString) {
    const dateParts = dateString.split("-");
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  }

  // Search Button and render only what is found in the search result
  document.querySelector("#searchBtn").addEventListener("click", function () {
    const query = document.querySelector("#searchTerms").value;
    const result = findTodo(todos, query);
    renderTodos(result);
  })
  // Clear Button
  document.querySelector("#clearBtn").addEventListener("click", function () {
    document.querySelector("#searchTerms").value = "";
    renderTodos(todos);
  })
});

