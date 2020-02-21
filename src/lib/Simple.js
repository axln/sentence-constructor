const Aspect      = require("./Aspect");
const VerbFactory = require("./VerbFactory");

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

class Simple extends Aspect {
    renderAux(line) {
        switch (this.tense) {
            case "past":
                line.push({
                    text: "did",
                    type: "aux"
                });
                break;
            case "future":
                line.push({
                    text: "will",
                    type: "aux"
                });
                break;
            case "present":
                const doVerb = VerbFactory.create({
                    verb: "do",
                    tense: this.tense,
                    subject: this.subject
                });
                doVerb.render(line, "aux");
        }
    }

    render(line, type, negative = false, contract = false) {
        this.subject.render(line);
        const addAux = (this.verb !== "be") && ((type === "interrogative") || negative) && ["past", "present"].includes(this.tense);
        if (addAux) {
            this.renderAux(line);
            line.push({
                text: this.verb,
                type: "verb"
            });
        } else {

        }
        const verbObj = VerbFactory.create({
            verb: addAux ? "do" : this.verb,
            tense: this.tense,
            subject: this.subject
        });
        verbObj.render(line, "verb", addAux);
        if (negative) {
            line.push({
                text: "not",
                type: "negation"
            });
        }
        if (addAux) {
            line.push({
                text: this.verb,
                type: "verb"
            });
        }
        if (type === "interrogative") {
            line.move(1, 0);
        }
        if (contract) {
            line.move(2, 1);
        }
    }
}

module.exports = Simple;
