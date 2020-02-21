const Verb = require("./Verb");

class Have extends Verb {
    renderForSubject(type) {
        switch (this.tense) {
            case "past":
                // v2 simple past
                return "had";
            case "present":
                const { grammarNumber, person } = this.subject;
                if (person === 3 && grammarNumber === "singular") {
                    return "has";
                } else {
                    return "have";
                }
            case "future":
                return "have";
        }
    }
}

module.exports = Have;
