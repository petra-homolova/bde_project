import {Selector} from "testcafe";

const dueDateInput = Selector('#due-date'); 
const dueDate = '2024-11-07'; 

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
    await t.wait(1000);

    await t
        .expect(dueDateInput.exists).ok('Due date input should be present')
        .typeText(dueDateInput, dueDate)
        .expect (dueDateInput.value).eql(dueDate, 'Due date input should display the correct date');
});
