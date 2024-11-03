import {Selector} from "testcafe";

fixture("Wordpress test")
.page("http://good-health-and-well-being.local/wp-admin/")

test("Valid login", async t => {
    
    await t
        .expect(Selector("#user_login").exists).ok("Login input not found")
        .typeText(Selector("#user_login"), "Petra")
        .typeText(Selector("#user_pass"), "smudlicky1414")
        .click(Selector("#wp-submit"))
        .expect(Selector("body").hasClass("wp-admin")).eql(true);

})

test("Invalid login", async t => {
    
    await t
        .typeText(Selector("#user_login"), "invalid")
        .typeText(Selector("#user_pass"), "invalidpass")
        .click(Selector("#wp-submit"))
        .expect(Selector("body").hasClass("wp-admin")).eql(false);

})