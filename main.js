/*

Global arrays. There ought to be a 1:1 relationship of each index of your todos
and each index of your isDone.

For example, isDone[3] would hold the "done-ness" information for todos[3].

*/

let todos = [];
let isDone = [];
let completeRef = [];

// When the html finishes loading, launch `init`.
window.onload = init;

// Set up all event listeners.
function init() {
    // When they click the add todo button, run `addTodo`.
    document.querySelector('#add-todo')
        .addEventListener('click', addTodo);
        
    // When they click the clear done todos button, run `clearDoneTodos`.
    document.querySelector('#clear-done-todos')
        .addEventListener('click', clearDoneTodos);
    
    // When they click the clear all todos button, run `clearAllTodos`.
    document.querySelector('#clear-all-todos')
        .addEventListener('click', clearAllTodos);
        
}

function addTodo(event) {
    // Stop page from reloading on button click.
    event.preventDefault();

    // Get new todo from the new todo input field.
    const input = document.querySelector('#new-todo').value;

    // Clear the input field of all text.
    resetInput();

    // Put the todo and its "done-ness" in their respective arrays.
    todos.push(input);
    isDone.push(false);

    // Create a new html element and put our new todo's text in there.
    const newLine = document.createElement('li');
    newLine.innerText = input;
    newLine.className = 'todo-line'
    
    // Add an event listener on the newly created html element to launch
    // `toggleDone` when it's clicked.
    newLine.addEventListener('click', toggleDone);

    // Put our new element on the list part of our page!
    document.querySelector('#todo-list').appendChild(newLine);

}


function clearAllTodos(event) {
    // Stop page from reloading on button click.
    event.preventDefault();
    
    // Remove all todos from BOTH arrays.
    for(let i = 0; i < todos.length; i++){
        todos.pop();
        isDone.pop();
    }
    
    // Remove all todos from the html.
    // You'll have to write that function too, but we'll call it here:
    removeAllChildrenOfOl();
}

function clearDoneTodos(event) {
    // Stop page from reloading on button click.
    event.preventDefault();
    /*
        Find which todos need to be removed and remove them from BOTH arrays.
        If you did it right when making them, you should be able to check the
        `isDone` array to figure out which ones are, in fact, done. Remember
        that there is a 1:1 relationship between `todos` indices and `isDone`
        indices!

        One way to do this is to build up a new array. Give that a try first!

    */
    // for(let i = 0; i < todos.length; i++){
    //     if(isDone[i] = true){
    //         todos.splice(i, 1);
    //         isDone.splice(i, 1);
    //     }
    // }

    while(isDone.includes(true)){
        isDone.splice(isDone.indexOf(true));
    }

    for(let i = 0; i < completeRef.length; i++){
        todos.splice(todos.indexOf(completeRef[i]), 1);
    }

    /*
        Now remove the done todos from the html.

        Although it's not technically efficient as there is a slight time cost
        to rendering new elements on a web page, you might think not of removing
        certain todos but making a new set of lis to replace what we have. You
        may even already have some code to clear the whole list!

        You could do it the harder but more html efficient way instead, though.

        Your call.
    */
    removeAllChildrenOfOl();
    
    const list = document.querySelector('#todo-list');
    for(let i = 0; i < todos.length; i++){
        const newLine = document.createElement('li');
        newLine.innerText = todos[i];
        list.appendChild(newLine);

    }
    // updateOL();


}

function toggleDone(event) {
    // No need to run `event.preventDefault` here; that default behavior only
    // applies to buttons.

    // Grab the HTML element that was clicked.
    // If you don't know, the event parameter has what you need... somewhere.
    const clickedLine = event.target;
    const lineText = clickedLine.innerText;

    // Find the index of the array that this todo resides in. There are a couple
    // ways to do this, and I'm sure you'll figure one out!
    let index = todos.indexOf(lineText);

    // *IF* it's not done yet, apply strikethrough. Otherwise, take that
    // strikethrough away!


    // Toggle the "done-ness" of the same todo, using the isDone array.
    if(isDone[index] === true){
        isDone[index] = false;
        completeRef.splice(completeRef[todos[index]], 1)
        clickedLine.style.textDecoration = 'none';
    } else if(isDone[index] === false){
        isDone[index] = true;
        completeRef.push(todos[index]);
        clickedLine.style.textDecoration = 'line-through';
    }

}

function removeAllChildrenOfOl() {
    // Grab the ol.
    let list = document.querySelector('#todo-list')

    // Remove all its children.
    // The way I like to do that is to continue to remove children as long as
    // there are some to remove.
    // Look at the methods `.hasChildNodes` and `removeChild`.
    // There are other ways too, though. Feel free to poke around.
    while(list.hasChildNodes()){
        list.removeChild(list.firstChild);
    }
}

// Updating the list after being cleared by certain functions to simplify removal of completed/specific todos
function updateOL(){
    removeAllChildrenOfOl();
    const newLine = document.createElement('li');
    let list = document.querySelector('#todo-list');

    for(let i = 0; i < todos.length; i++){
        newLine.innerText = todos[i];
        if(isDone[i] === false){
            list.appendChild(newLine)
            newLine.className = 'todo-line';
            newLine.style.textDecoration = 'none';
            console.log('Todo added')
        } else if(isDone[i] === true){
            list.appendChild(newLine)
            newLine.className = 'complete-line';
            newLine.style.textDecoration = 'line-through';
            console.log('Complete added')
        }
        // list.appendChild(newLine);
    }

}


// Resetting inputs
function resetInput(){
    let input = document.querySelector('#new-todo');
    input = '';
}