const Aspect      = require("./Aspect");
const VerbFactory = require("../Verb/VerbFactory");

class Continuous extends Aspect {
    getAux() {
        return "be";
    }

    render(line, type, negative = false, contract = false) {
        this.subject.render(line);
        this.renderAux(line);
        const verbObj = VerbFactory.create({verb: this.verb, form: "ing"});
        verbObj.render(line, "verb");

        super.render(line, type, negative, contract);
    }
}

module.exports = Continuous;
