const Verb = require("./Verb");

class Be extends Verb {
    renderForSubject() {
        const { grammarNumber, person } = this.subject;
        switch (this.tense) {
            case "past":
                if (grammarNumber === "plural" || person === 2) {
                    return "were";
                } else {
                    return "was";
                }
            case "present":
                if (grammarNumber === "plural" || person === 2) {
                    return "are";
                } else if (person === 1) {
                    return "am";
                } else {
                    return "is";
                }
            case "future":
                return "be";
        }
    }
}

module.exports = Be;
