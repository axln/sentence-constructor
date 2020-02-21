const irregularVerbs = require("../../data/irregular_verb");
const verbs          = require("../../data/verb");

class Verb {
    constructor(params) {
        this.verb    = params.verb;
        this.subject = params.subject || null;
        this.tense   = params.tense   || null;
        this.form    = params.form    || null;
    }

    renderForSubject() {
        switch (this.tense) {
            case "past":
                return this.getForm(2);
            case "present":
                const { grammarNumber, person } = this.subject;
                if (person === 3 && grammarNumber === "singular") {
                    return Verb.getSForm(this.verb);
                } else {
                    return this.verb;
                }
            case "future":
                return this.verb;
        }
    }

    render(line, type = "verb") {
        if (this.subject && this.tense) {
            if (this.tense === "future") {
                line.push({
                    text: "will",
                    type: "aux"
                });
            } else if (this.tense === "future_in_past") {
                line.push({
                    text: "would",
                    type: "aux"
                });
            }
            line.push({
                text: this.renderForSubject(type),
                type
            });
        } else {
            switch (this.form) {
                case "v3":
                    line.push({
                        text: this.getForm(3),
                        type,
                        form: "v3"
                    });
                    break;
                case "ing":
                    line.push({
                        text: Verb.getIngForm(this.verb),
                        type,
                        form: "ing"
                    });
                    break;
                default:
                    line.push({
                        text: this.verb,
                        type,
                        form: "base"
                    });
                    break;
            }
        }
    }

    static getIngForm(verb) {
        if (verb in verbs && verbs[verb][1]) {
            // special case of ing-form
            return verbs[verb][1];
        } else {
            return verb + "ing";
        }
    }

    static getSForm(verb) {
        if (verbs[verb]) {
            // predefined -s version
            return verbs[verb][0];
        } else {
            return verb + "s";
        }
    }

    getForm(formNumber) {
        if (this.verb in irregularVerbs) {
            // get v2 form (simple past) or v3 form (past participle)
            return irregularVerbs[this.verb][formNumber - 2];
        } else if (verbs[this.verb] && verbs[this.verb][2]) {
            // special case of ed-form
            return verbs[this.verb][2];
        } else {
            return this.verb + "ed";
        }
    }
}

module.exports = Verb;
