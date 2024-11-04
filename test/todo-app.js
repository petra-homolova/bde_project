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
    const todoForm = Selector('.todo-form').with({ visibilityCheck: true });
    const todoInput = Selector('#todo-input').with({ visibilityCheck: true });
    const dueDateInput = Selector('#due-date').with({ visibilityCheck: true });
    const priorityDropdown = Selector('#priority-dropdown').with({ visibilityCheck: true });
    const todoList = Selector('#todo-list').with({ visibilityCheck: true });

    const todoText = 'Test due date todo';
    const dueDate = '2023-12-31';
    const priority = 'Medium';

    // Wait for elements to appear before interacting with them
    await t
        .expect(todoForm.exists).ok('Todo form should be present')
        .expect(todoInput.exists).ok('Todo input should be present')
        .expect(dueDateInput.exists).ok('Due date input should be present')
        .typeText(todoInput, todoText)
        .click(priorityDropdown)
        .click(priorityDropdown.find('option').withText(priority))
        .typeText(dueDateInput, dueDate)
        .click(todoForm.find('button[type="submit"]'));

    const newTodo = todoList.child('li').withText(todoText);
    const dueDateText = newTodo.find('.due-date');

    await t
        .expect(newTodo.exists).ok('New todo should appear in the list')
        .expect(dueDateText.withText(`Due: ${dueDate}`).exists).ok('The due date should be displayed correctly');
});
