const Aspect      = require("./Aspect");
const VerbFactory = require("../Verb/VerbFactory");

class Simple extends Aspect {
    getAux() {
        return this.verb === "be" ? "be" : "do";
    }

    render(line, type, negative = false, contract = false) {
        this.subject.render(line);
        let verbParams = {verb: this.verb};
        if (negative || type === "interrogative" || this.verb === "be") {
            this.renderAux(line);
        } else {
            verbParams.tense = this.tense;
            verbParams.subject = this.subject;
        }

        // if the verb is "be", then it's already rendered as the aux verb
        if (this.verb !== "be") {
            VerbFactory.create(verbParams).render(line);
        }

        super.render(line, type, negative, contract);
    }
}

module.exports = Simple;
