const Aspect      = require("./Aspect");
const VerbFactory = require("../Verb/VerbFactory");

class PerfectContinuous extends Aspect {
    getAux() {
        return "have";
    }

    render(line, type, negative = false, contract = false) {
        this.subject.render(line);
        this.renderAux(line);
        line.push({
            text: "been",
            type: "aux",
            form: "v3"
        });
        const verbObj = VerbFactory.create({
            verb: this.verb,
            form: "ing"
        });
        verbObj.render(line, "verb");

        super.render(line, type, negative, contract);
    }
}

module.exports = PerfectContinuous;
