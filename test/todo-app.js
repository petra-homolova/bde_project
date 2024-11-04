import {Selector} from "testcafe";

fixture("Wordpress test")
.page("https://test.petra-homolova.cz/todo/")

test("Dummy", async t => {
    
    await t
        .expect(true).eql(true);

})