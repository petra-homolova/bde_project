import {Selector} from "testcafe";

// Selectors for the date input
const dueDateInput = Selector('input#due-date-input'); // Adjust this selector as needed

// Example test data
const dueDate = '2024-11-04'; // Change to the appropriate date format

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
    await t
        .expect(dueDateInput.exists).ok('Due date input should be present') // Check if the input exists
        .typeText(dueDateInput, dueDate) // Type the date into the input
        .expect(dueDateInput.value).eql(dueDate, 'Due date input should display the correct date'); // Verify that the input shows the correct date    
});
