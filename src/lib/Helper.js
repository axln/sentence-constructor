const irregularVerbs = require("../data/irregular_verb");
const verbs = require("../data/verb");

module.exports = {
    capitalize: (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    createOption(title, value) {
        const opt = document.createElement('option');
        opt.innerHTML = title;
        opt.value = value;
        return opt;
    },

    getVerbForPronoun(verb, pronoun, tense) {
        if (typeof verb == 'object') {
            let item = verb[tense];
            if (typeof item == 'string') {
                return item;
            }
            item = item[pronoun.person - 1];
            if (typeof item == 'string') {
                return item;
            }
            return item[pronoun.grammarNumber];
        } else {
            switch (tense) {
                case "present":
                    if (pronoun.person === 3 && pronoun.grammarNumber === 'singular') {
                        return verbs[verb][0]
                    } else {
                        return verb;
                    }
                case "past":
                    if (verb in irregularVerbs) {
                        return irregularVerbs[verb][0];
                    } else {
                        return verb + 'ed';
                    }
                default:
                    return verb;
            }
        }
    },

    preprocessContractions(contractions) {
        contractions = [...contractions];
        for (let i = 0; i < contractions.length; ++i) {
            let [pattern, replace] = contractions[i];
            const process = text => {
                return text.split(" ").map(part => {
                    let [word, type] = part.split(":");
                    return `<span class="${type}">${word}</span>`
                }).join(" ");
            };
            pattern = process(pattern);
            replace = process(replace);
            contractions[i] = [pattern, replace];
        }
        return contractions;
    }
};
