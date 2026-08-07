document.addEventListener("DOMContentLoaded", function() {
  // all the code here
  function main() {  
    let todos = []; // store all the todos

    // add three todos
    addTodo(todos, "Walk the dog", "Medium", "Pending", "25-08-2026");
    addTodo(todos, "Clean the room", "Low", "Completed", "16-08-2026");
    addTodo(todos, "Pay the bill", "High", "In-Progress", "30-08-2026"); 
  }

  main();
  
});