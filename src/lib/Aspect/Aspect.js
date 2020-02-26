const VerbFactory  = require("../Verb/VerbFactory");
const contractions = require('../../data/contraction.json');

class Aspect {
    constructor(tense, subject, verb) {
        this.tense   = tense;
        this.subject = subject;
        this.verb    = verb;
    }

    getAux() {
        // must be implemented in descendants
        return null;
    }

    renderAux(line) {
        const auxVerb = VerbFactory.create({
            verb: this.getAux(),
            tense: this.tense,
            subject: this.subject
        });
        auxVerb.render(line, "aux");
    }

    replaceItemsIfExist(line, contraction) {
        const [pattern1, type1, pattern2, type2] = contraction[0].split(/[ :]/);
        const [replace, replaceType] = contraction[1].split(":");

        for (let i = 0; i < line.length - 1; ++i) {
            const item1 = line[i];
            const item2 = line[i + 1];

            if (
                item1.text === pattern1 && item1.type === type1 &&
                item2.text === pattern2 && item2.type === type2
            ) {
                // replace 2 items with new contracted item
                line.splice(i, 2, {
                    text: replace,
                    type: replaceType
                });
            }
        }
    }

    applyContraction(line) {
        for (let i = 0; i < contractions.length; ++i) {
            this.replaceItemsIfExist(line, contractions[i]);
        }
    }

    render(line, type, negative, contract) {
        if (negative) {
            // not is always after aux
            line.insert(2, {
                text: "not",
                type: "negation"
            });
        }

        // inverse aux and subject for interrogative sentences
        if (type === "interrogative") {
            line.move(1, 0);
        }

        // move not along with aux if contraction is allowed for negative sentence
        if (negative && contract) {
            line.move(2, 1);
        }

        if (contract) {
            this.applyContraction(line);
        }
    }
}

module.exports = Aspect;
