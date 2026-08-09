let todos = [];


function addTodo(todos, taskName, priority, taskStatus, dueDate) {
  const errorTaskInput = document.querySelector("#error-task-input");
  const errorDateInput = document.querySelector("#error-date-input");

  if (!taskName) {
    errorTaskInput.innerHTML = "This field cannot be left blank.";
    return;
  } else {
    errorTaskInput.innerHTML = "";
  }

  if (!dueDate) {
    errorDateInput.innerHTML = "Please select a date.";
    return;
  } else {
    errorDateInput.innerHTML = "";
  }

  let newTodo = {
    "id": Math.floor(Math.random() * 100 + 1),
    "taskName": taskName,
    "priority": priority,
    "taskStatus": taskStatus,
    "dueDate": dueDate
  };
  todos.push(newTodo);

}

//
function modifyTodo(todos, id, newTaskName, newPriority, newTaskStatus, newDueDate) {
  const modifedTodo = {
    "id": id,
    "taskName": newTaskName,
    "priority": newPriority,
    "taskStatus": newTaskStatus,
    "dueDate": newDueDate
  }

  let indexToReplace = todos.findIndex(function (t) {
    return t.id === id;
  });

  todos[indexToReplace] = modifedTodo;
}

// By using ID, delete the whole index of that task
function deleteTodo(todos, id) {

  // 1. find the index
  let wantedIndex = -1;
  for (let i = 0; i < todos.length; ++i) {
    if (todos[i].id === id) {
      wantedIndex = i;
      // since all Ids are uniques, there can't be more one todo with the same ID
      // if we found the index, we can just break
      break;
    }
  }

  // null, undefined, false, 0, "", NaN are also falsy -- they are same as logical false
  if (wantedIndex !== -1) {
    // 2. perform the delete
    todos.splice(wantedIndex, 1);
  } else {
    throw new Error(`Todo with ID ${id} does not exist.`);
  }
}