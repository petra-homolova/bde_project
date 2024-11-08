// 1 Import the CSS file: This ensures that the styles are applied to the HTML elements.
import './style.css';

// Step 2: Define the Todo interface
// To this interface I added a priority and dueDate
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: string;
}

// Step 3: Initialize an empty array to store todos
export let todos: Todo[] = [];

// Step 4: Get references to the HTML elements
const todoInput = document.getElementById('todo-input') as HTMLInputElement; 
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;    
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;    
const priorityDropdown = document.getElementById('priority-dropdown') as HTMLSelectElement;
const dueDateInput = document.getElementById('due-date') as HTMLInputElement;
const toggleAllBtn = document.getElementById('toggle-all-btn') as HTMLButtonElement;
const darkModeToggle = document.getElementById('dark-mode-toggle') as HTMLButtonElement;

// Step 5: Function to add a new todo
// I added properties for priority and dueDate

export const addTodo = (text: string, priority: 'Low' | 'Medium' | 'High', dueDate?: string): void => {
  const newTodo: Todo = {
    id: Date.now(),
    text: text,
    completed: false,
    priority: priority,
    dueDate: dueDate
  };
  todos.push(newTodo);
  sortTodos();  
  renderTodos();
};


// Step 6: Function to render the list of todos
// I added literals for checkbox, completed button, priority level and date
const renderTodos = (): void => { 
  
  todoList.innerHTML = '';

  todos.forEach(todo => { 
    const li = document.createElement('li');
    li.className = 'todo-item'; 

    li.innerHTML = `
      <input type="checkbox" class="toggle-checkbox" ${todo.completed ? 'checked' : ''}>
      <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'};">
        ${todo.text} 
      <span class="priority-label">(${todo.priority})</span> 
      <span class="due-date" style="display: ${todo.completed ? 'none' : 'block'};">
        Due: ${todo.dueDate || 'No Due Date'}
      </span>
      </span>
      </span>
      </span>
      <button>Remove</button>
      <button id="editBtn">Edit</button>
    `;
    
    addCheckboxListener(li, todo.id);     
    addRemoveButtonListener(li, todo.id); 
    addEditButtonListener(li, todo.id); 
    todoList.appendChild(li); 
    document.getElementById('clear-completed-btn')?.addEventListener('click', clearCompletedTodos);

    updateProgressBar();
  });
};

// Step 6.1: Function to render the list of todos
renderTodos(); 


// Step 7: Event listener for the form submission
// I added value for priority and date
todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const text = todoInput.value.trim();
  const priority = priorityDropdown.value as 'Low' | 'Medium' | 'High';
  const dueDate = dueDateInput.value; 

  if (text !== '') {
    addTodo(text, priority, dueDate); 
    todoInput.value = '';
    priorityDropdown.value = 'Low';
    dueDateInput.value = ''; 
  }
});


//Improved code for step 7 - user input validation - move the error message to the top of the Typescript file
todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault(); 
  const text = todoInput.value.trim(); 
  const priority = priorityDropdown.value as 'Low' | 'Medium' | 'High';

  if (text !== '') { 
    todoInput.classList.remove('input-error'); 
    errorMessage.style.display = 'none'; 
    addTodo(text, priority); 
    todoInput.value = ''; 
  } else {
    console.log("Please enter a todo item"); 
    todoInput.classList.add('input-error'); 
    errorMessage.style.display = 'block'; 
  }
});

// Step 8: Function to removes all a todo by ID
const addRemoveButtonListener = (li: HTMLLIElement, id: number): void => {
  const removeButton = li.querySelector('button');
  removeButton?.addEventListener('click', () => removeTodo(id)); 
};

// Step 8: Function to remove a todo by ID
export const removeTodo = (id: number): void => {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos(); 
}; 


// Edit event listener - make button and add button to each todo
const addEditButtonListener = (li: HTMLLIElement, id:number) => {
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
  const colorPicker = document.getElementById('colorPicker') as HTMLInputElement; 
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

//---------------------------------------------------- OPTIONAL FEATURES -------------------------------------------------------------

//1. Button to toggle the completed status

// Add event listener for the checkbox to toggle completion status
const addCheckboxListener = (li: HTMLLIElement, id: number): void => {
  const checkbox = li.querySelector('.toggle-checkbox') as HTMLInputElement;
  checkbox?.addEventListener('change', () => toggleTodoCompletion(id, checkbox.checked));
};

// Create a function to toggle the completed status based on checkbox
const toggleTodoCompletion = (id: number, isCompleted: boolean): void => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = isCompleted; 
    renderTodos(); 
  }
};

// 2. Button to clear all completed todos

// Function to clear all completed todos - NEW FUNCTION
const clearCompletedTodos = (): void => {
  todos = todos.filter(todo => !todo.completed);
  renderTodos();
};


//3. Button to toggle all todos

// Add this function to toggle all todos as completed
const toggleAllTodos = (): void => {
  const allCompleted = todos.every(todo => todo.completed);

  todos.forEach(todo => {
    todo.completed = !allCompleted; 
  });

  renderTodos(); 
};

if (toggleAllBtn) {
  toggleAllBtn.addEventListener('click', toggleAllTodos);
}

// 4. Dropdown to set the priority level

const sortTodos = (): void => {
  todos.sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

// 5. Progress bar to show the percentage of completed todos

const updateProgressBar = (): void => {
  const completedTodos = todos.filter(todo => todo.completed).length;
  const totalTodos = todos.length;
  const progressPercentage = totalTodos ? (completedTodos / totalTodos) * 100 : 0;

  const progressBar = document.getElementById('progress-bar') as HTMLProgressElement;
  const percentageDisplay = document.getElementById('progress-percentage') as HTMLSpanElement;

  progressBar.value = progressPercentage;
  percentageDisplay.textContent = `${Math.round(progressPercentage)}%`; 
};

//6. Button to change mode

const toggleDarkMode = (): void => {
  document.body.classList.toggle('dark-mode');
};

darkModeToggle.addEventListener('click', toggleDarkMode);