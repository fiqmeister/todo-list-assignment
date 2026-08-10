const JSON_BIN_BASE_URL = "https://api.jsonbin.io/v3";
// "https://api.jsonbin.io/v3";
// "https://zany-lamp-69jvgqrp4p9vh5v65-3001.app.github.dev/"
const JSON_BIN_ID = "6a788e61da38895dfecd459f";

let todos = [];
//Add Todo with simple validation
function addTodo(todos, taskName, priority, taskStatus, dueDate) {
  let newTodo = {
    "id": Math.floor(Math.random() * 100 + 1),
    "taskName": taskName,
    "priority": priority,
    "taskStatus": taskStatus,
    "dueDate": dueDate
  };
  todos.push(newTodo);
  return true; //return true for adding new task
}

//Replace function when user editing the parameters
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
//load data from JSONBin via URL & Bin ID
async function loadTodos() {
  const response = await axios.get(`${JSON_BIN_BASE_URL}/b/${JSON_BIN_ID}/latest`);
  return response.data.record;
}
//save data into JSONBin via URL & Bin ID
async function saveTodos(todos) {
  try {
    await axios.put(`${JSON_BIN_BASE_URL}/b/${JSON_BIN_ID}`, todos);
    Swal.fire("Your task list has been successfully saved!");
  } catch (error) {
    Swal.fire("Failed to save task list!");
  }
}
//find task by word search, loop to search the data that contains the word
  function findTodo(todos, query){
    const result = [];

    for (let t of todos){
      const tname = t.taskName.toLowerCase();
      //console.log("checking:", tname, "against", query.toLowerCase());
      if (tname.includes(query.toLowerCase())) {
        result.push(t);
      }
    }
    return result;
  }