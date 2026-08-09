document.addEventListener("DOMContentLoaded", function () {
  // all the code here

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
      `
      todoTable.appendChild(newTableRow);
    }
  }
  renderTodos(todos);

  document.querySelector("#addBtn").addEventListener("click", function () {
    const taskName = document.querySelector("#taskName").value;
    const dueDate = document.querySelector("#dueDate").value;
    const selectedPriority = document.querySelector(`[name="priority"]:checked`).value;
    const selectedStatus = document.querySelector(`[name="status"]:checked`).value;

    addTodo(todos, taskName, selectedPriority, selectedStatus, dueDate);
    renderTodos(todos);

  })
});
