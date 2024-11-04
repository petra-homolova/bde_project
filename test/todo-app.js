import {Selector} from "testcafe";

fixture("Wordpress test")
.page("https://test.petra-homolova.cz/todo/")

test("Dark mode button", async t => {
    
    const darkModeToggleButton = Selector('#dark-mode-toggle');
    const bodyElement = Selector('body');

    // Click the Dark Mode Toggle button
    await t
        .click(darkModeToggleButton)
        .expect(bodyElement.hasClass('dark-mode')).ok('The dark mode class should be applied after toggling');

    // Click again to turn off Dark Mode
    await t
        .click(darkModeToggleButton)
        .expect(bodyElement.hasClass('dark-mode')).notOk('The dark mode class should be removed after toggling again');
})

test('Date for todo', async t => {
    const todoForm = Selector('.todo-form');
    const todoInput = Selector('#todo-input');
    const dueDateInput = Selector('#due-date');
    const priorityDropdown = Selector('#priority-dropdown');
    const todoList = Selector('#todo-list');

    const todoText = 'Test due date todo';
    const dueDate = '2023-12-31';
    const priority = 'Medium';

    // Add a new todo with a due date
    await t
        .typeText(todoInput, todoText)
        .click(priorityDropdown)
        .click(priorityDropdown.find('option').withText(priority)) // Select Medium priority
        .typeText(dueDateInput, dueDate) // Set the due date
        .click(todoForm.find('button[type="submit"]'));

    // Verify the todo item appears in the list with the correct due date
    const newTodo = todoList.child('li').withText(todoText);
    const dueDateText = newTodo.find('.due-date');

    await t
        .expect(newTodo.exists).ok('New todo should appear in the list')
        .expect(dueDateText.withText(`Due: ${dueDate}`).exists).ok('The due date should be displayed correctly');
});
