import {Selector} from "testcafe";

const dueDateInput = Selector('#due-date'); 
const dueDate = '2024-11-07'; 
const addTodoButton = Selector('#add-todo');
const todoInput = Selector('#todo-input');
const todoList = Selector('#todo-list');

fixture("Todo-app test")
.page("https://test.petra-homolova.cz/todo/")

test("Dark mode button", async t => {
    
    const darkModeToggleButton = Selector('#dark-mode-toggle');
    const bodyElement = Selector('body');

    await t
        .click(darkModeToggleButton)
        .expect(bodyElement.hasClass('dark-mode')).ok('The dark mode class should be applied after toggling');

    await t
        .click(darkModeToggleButton)
        .expect(bodyElement.hasClass('dark-mode')).notOk('The dark mode class should be removed after toggling again');
})

test('Date for todo', async t => {
    await t
        .typeText(todoInput, 'Test Todo') 
        .eval(() => document.getElementById('due-date').value = '2024-11-07') 
        .click(addTodoButton); 

    const todoItem = todoList.child('li').withText('Test Todo');
    await t.expect(todoItem.exists).ok('The todo item should be added');

    const dueDateDisplay = todoItem.find('.due-date');
    await t.expect(dueDateDisplay.innerText).contains('2024-11-07', 'Due date should be displayed correctly');
});
