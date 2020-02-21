const Verb = require("./Verb");

class Do extends Verb {
    renderForSubject(type) {
        switch (this.tense) {
            case "past":
                // v2 (simple past)
                return "did";
            case "present":
                const { grammarNumber, person } = this.subject;
                if (person === 3 || grammarNumber === "singular") {
                    return "does";
                } else {
                    return "do";
                }
            case "future":
                return "do";
        }
    }
}

module.exports = Do;
