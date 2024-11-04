// 1 Import the CSS file: This ensures that the styles are applied to the HTML elements.
import './style.css';

// Step 2: Define the Todo interface
// Define the Todo interface: This interface defines the structure of a todo item.
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: 'Low' | 'Medium' | 'High';
}

// Step 3: Initialize an empty array to store todos
// Initialize an empty array: This array will store the list of todos.
export let todos: Todo[] = [];

// Step 4: Get references to the HTML elements
// Get references to the HTML elements: These references will be used to interact with the DOM
const todoInput = document.getElementById('todo-input') as HTMLInputElement; 
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;    
const todoList = document.getElementById('todo-list') as HTMLUListElement;   
const priorityDropdown = document.getElementById('priority-dropdown') as HTMLSelectElement;

// Step 5: Function to add a new todo
// Function to add a new todo: This function creates a new todo object and adds it to the array.

export const addTodo = (text: string, priority: 'Low' | 'Medium' | 'High'): void => {
  const newTodo: Todo = {
    id: Date.now(),
    text: text,
    completed: false,
    priority: priority,
  };
  todos.push(newTodo);
  sortTodos();  
  renderTodos();
};


// Step 6: Function to render the list of todos
// Function to render the list of todos: This function updates the DOM to display the current list of todos.
const renderTodos = (): void => { // void because no return - what we are doing is updating the DOM
  // Clear the current list
  todoList.innerHTML = '';

  // Iterate over the todos array and create list items for each todo
  todos.forEach(todo => { // In this specific case, .forEach is more suitable because we are directly modifying the DOM for each todo item.
    const li = document.createElement('li');
    li.className = 'todo-item'; // Add a class to the list item
    // Use template literals to create the HTML content for each list item
    li.innerHTML = `
      <input type="checkbox" class="toggle-checkbox" ${todo.completed ? 'checked' : ''}>
      <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'};">
        ${todo.text} <span class="priority-label">(${todo.priority})</span> <!-- Display priority -->
      </span>
      </span>
      <button>Remove</button>
      <button id="editBtn">Edit</button>
    `;
    // addRemoveButtonListener is further down in the code. We have onclick in the function instead of template literals. More safe to use addEventListener.
    
    addCheckboxListener(li, todo.id);     
    addRemoveButtonListener(li, todo.id); // Add event listener to the remove button. li is the parent element, and todo.id is the ID of the todo. 
    addEditButtonListener(li, todo.id); // Add event listener to the remove button. li is the parent element, and todo.id is the ID of the todo. 
    todoList.appendChild(li); // Append the list item to the ul element

    updateProgressBar();
  });
};

// Step 6.1: Function to render the list of todos
// Initial render
renderTodos(); // Call the renderTodos function to display the initial list of todos : Should be at the end of the code to ensure that the function is defined before it is called.
// The initial render is important to display the list of todos when the page is first loaded. Without it, the list would be empty until a new todo is added.
// Move it when code is complete ( refactoring ) 


// Step 7: Event listener for the form submission
// Event listener for the form submission: This listener handles the form submission, adds the new todo, and clears the input field.
todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const text = todoInput.value.trim();
  const priority = priorityDropdown.value as 'Low' | 'Medium' | 'High';

  if (text !== '') {
    addTodo(text, priority);
    todoInput.value = '';
    priorityDropdown.value = 'Low'; // Reset dropdown to default
  }
});


//Improved code for step 7 - user input validation - move the error message to the top of the Typescript file
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement; // Should be moved to the top + added to the HTML file

todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  const text = todoInput.value.trim(); // Get the value of the input field and remove any leading or trailing whitespace
  const priority = priorityDropdown.value as 'Low' | 'Medium' | 'High';

  if (text !== '') { // Check if the input field is empty
    todoInput.classList.remove('input-error'); // Remove the error highlight if present
    errorMessage.style.display = 'none'; // Hide the error message
    addTodo(text, priority); // Add the todo item
    todoInput.value = ''; // Clear the input field
  } else {
    console.log("Please enter a todo item"); // Provide feedback to the user
    todoInput.classList.add('input-error'); // Add a class to highlight the error
    errorMessage.style.display = 'block'; // Show the error message
  }
});

// Step 8: Function to removes all a todo by ID
// Function to add event listener to the remove button - this function has an callback function that removes the todo item from the array.
const addRemoveButtonListener = (li: HTMLLIElement, id: number): void => {
  const removeButton = li.querySelector('button');
  removeButton?.addEventListener('click', () => removeTodo(id)); // We have an optional chaining operator here to avoid errors if the button is not found - for example, if the button is removed from the DOM.
};

// Step 8: Function to remove a todo by ID
// Function to remove a todo by ID: This function removes a todo from the array based on its ID.
export const removeTodo = (id: number): void => {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos(); // Re-render the updated list of todos
}; 


// Edit event listener - make button and add button to each todo
const addEditButtonListener = (li: HTMLLIElement, id:number) => {
  // make use of the editBtn id to edit the todo
  const editButton = li.querySelector('#editBtn')
  editButton?.addEventListener('click', () => editTodo(id)) 
}

// Edit function - prompt user to edit the todo : editTodo
const editTodo = (id:number) => {
  const todo = todos.find(todo => todo.id === id)
  if (todo) {
    const text = prompt('Edit todo', todo.text)
    if (text) {
      todo.text = text
      renderTodos()
    }
  }
}

// COLOR PICKER

// Function to change the background color of the page based on the color picker value
const changeBackgroundColor = (color: string): void => {
  document.body.style.backgroundColor = color;
};

// Function to initialize the color picker event listener
const initializeColorPicker = (): void => {
  const colorPicker = document.getElementById('colorPicker') as HTMLInputElement; // encapsulate the color picker element to this function
  if (colorPicker) {
    colorPicker.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      changeBackgroundColor(target.value);
    });
  } else {
    console.error('Color picker element not found');
  }
};

// Call the initializeColorPicker function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeColorPicker();
});

//Optional features list: 

// Option 1: Add a button to toggle the completed status of a todo item
// Function to toggle the completed status of a todo + 
// Add a button to toggle the completed status of a todo item

// Add event listener for the checkbox to toggle completion status
const addCheckboxListener = (li: HTMLLIElement, id: number): void => {
  const checkbox = li.querySelector('.toggle-checkbox') as HTMLInputElement;
  checkbox?.addEventListener('change', () => toggleTodoCompletion(id, checkbox.checked));
};

// Create a function to toggle the completed status based on checkbox
const toggleTodoCompletion = (id: number, isCompleted: boolean): void => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = isCompleted; // Set the completion status based on checkbox
    renderTodos(); // Re-render the updated list of todos
  }
};

// Option 2: Add a button to clear all completed todos
// Add a button to clear all completed todos
// Function to clear all completed todos
// Add a button to toggle all todos

// Function to clear all completed todos - NEW FUNCTION
const clearCompletedTodos = (): void => {
  todos = todos.filter(todo => !todo.completed);
  renderTodos();
};

// Event listeners for the new buttons - NEW EVENT LISTENERS
document.getElementById('clear-completed-btn')?.addEventListener('click', clearCompletedTodos);

// Option 3: Add a button to toggle all todos
// Edit a todo item and update it
// Add an input field to edit a todo item
// Save the updated todo item
// Cancel the editing of a todo item
// Add a button to cancel the editing of a todo item

// Add this function to toggle all todos as completed
const toggleAllTodos = (): void => {
  // Check if all todos are completed
  const allCompleted = todos.every(todo => todo.completed);

  // Update the completed status of each todo
  todos.forEach(todo => {
    todo.completed = !allCompleted; // If all are completed, uncheck them; otherwise, check all
  });

  renderTodos(); // Re-render the todo list
};

// Event listener for the toggle button
const toggleAllBtn = document.getElementById('toggle-all-btn') as HTMLButtonElement;

if (toggleAllBtn) {
  toggleAllBtn.addEventListener('click', toggleAllTodos);
}

/** 
 DO IT FOR BDE PART

  Option 6: Due Date for Todos:
  Add a date input field to set a due date for each todo item.
  Display the due date next to each todo item.
  Highlight overdue todos.
  Priority Levels:

*/

// Option 7: Add a dropdown to set the priority level (e.g., Low, Medium, High) for each todo item.
// Display the priority level next to each todo item.
// Sort todos by priority.

const sortTodos = (): void => {
  todos.sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

// Option 10: Add a progress bar to show the percentage of completed todos.
// Update the progress bar as todos are marked as completed or incomplete.
// Dark Mode Toggle:

const updateProgressBar = (): void => {
  const completedTodos = todos.filter(todo => todo.completed).length;
  const totalTodos = todos.length;
  const progressPercentage = totalTodos ? (completedTodos / totalTodos) * 100 : 0;

  const progressBar = document.getElementById('progress-bar') as HTMLProgressElement;
  const percentageDisplay = document.getElementById('progress-percentage') as HTMLSpanElement;

  progressBar.value = progressPercentage;
  percentageDisplay.textContent = `${Math.round(progressPercentage)}%`; // Update the text to show the percentage
};

//Option 11: Add a button to toggle between light and dark modes.
//Change the app's theme based on the selected mode.

const darkModeToggle = document.getElementById('dark-mode-toggle') as HTMLButtonElement;

const toggleDarkMode = (): void => {
  document.body.classList.toggle('dark-mode');
};

// Add event listener to dark mode toggle button
darkModeToggle.addEventListener('click', toggleDarkMode);
