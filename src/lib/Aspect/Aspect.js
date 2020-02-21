const VerbFactory = require("../Verb/VerbFactory");

class Aspect {
    constructor(tense, subject, verb) {
        this.tense   = tense;
        this.subject = subject;
        this.verb    = verb;
    }

    getAux() {
        return "have";
    }

    renderAux(line) {
        const auxVerb = VerbFactory.create({
            verb: this.getAux(),
            tense: this.tense,
            subject: this.subject
        });
        auxVerb.render(line, "aux");
    }

    render(line, type, negative = false, contract = false) {
        // swipe subject and aux for questions
        if (type === "interrogative") {
            line.move(1, 0);
        }

        // not is always after aux
        if (negative) {
            line.insert(2, {
                text: "not",
                type: "negation"
            });
            if (contract) {
                line.move(2, 1);
            }
        }
    }
}

module.exports = Aspect;
