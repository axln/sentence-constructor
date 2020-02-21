const Aspect      = require("./Aspect");
const VerbFactory = require("../Verb/VerbFactory");

class Perfect extends Aspect {
    getAux() {
        return "have";
    }

    render(line, type, negative = false, contract = false) {
        this.subject.render(line);
        this.renderAux(line);
        const verbObj = VerbFactory.create({
            verb: this.verb,
            form: "v3"
        });
        verbObj.render(line, "verb");

        super.render(line, type, negative, contract);
    }
}

module.exports = Perfect;
