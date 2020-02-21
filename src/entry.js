const App = require("./lib/App");
const pronouns = require("./data/pronoun");
const Subject = require("./lib/Subject");

const Simple = require("./lib/Simple");

window.onload = () => {
    const app = new App();
    app.run();
    const subject = new Subject(pronouns.he);

    const sentence = new Simple("present", subject, "work");
    const line = [];
    //sentence.render(line, "affirmative");
    sentence.render(line, "affirmative", true, false);
    console.log("line:", JSON.stringify(line, null, 2));
};
