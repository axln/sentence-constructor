const App = require("./lib/App");
/*const pronouns = require("./data/pronoun");
const Subject = require("./lib/Subject");
const VerbFactory = require("./lib/Verb/VerbFactory");*/

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};

/*const Simple = require("./lib/Aspect/Simple");
const Continuous = require("./lib/Aspect/Continuous");
const Perfect = require("./lib/Aspect/Perfect");
const PerfectContinuous = require("./lib/Aspect/PerfectContinuous");*/


window.onload = () => {
    const app = new App();
    app.run();

    /*const subject = new Subject(pronouns.he);
    const tense = "future";
    const verb = "go";
    const passive = false;
    const type = "affirmative";
    //const type = "interrogative";
    const negative = true;
    const allowContraction = true;
    const TenseClass = Perfect;

    const sentence = new TenseClass(tense, subject, passive ? "be" : verb);
    const line = [];
    sentence.render(line, type, negative, allowContraction);
    if (passive) {
        const verbObj = VerbFactory.create({verb: verb, form: "v3"});
        verbObj.render(line, "verb");
    }
    if (type === "interrogative") {
        line.push({text: "?"});
    } else {
        line.push({text: "."});
    }
    console.log("line:", JSON.stringify(line, null, 2));*/
};
