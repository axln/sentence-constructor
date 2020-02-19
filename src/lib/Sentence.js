const specialVerbs   = require('../data/special_verb');
const verbs          = require('../data/verb');
const irregularVerbs = require('../data/irregular_verb');
const contractions   = require('../data/contraction.json');
const Helper         = require("./Helper");


class Sentence {
    constructor(tenseInfo, type, parts, voice, allowContractions) {
        this.tenseInfo = tenseInfo;
        this.parts = parts;
        this.type = type;
        this.typeInfo = tenseInfo.types[type];
        this.voice = voice;
        this.allowContractions = allowContractions;
        //console.log('Sentence:', this.tenseInfo, this.typeInfo);
    }

    renderVerb(verb, param, subject) {
        switch (param) {
            case "present":
                if (verb in specialVerbs) {
                    const specialVerb = specialVerbs[verb];
                    return Helper.getVerbForPronoun(specialVerb, subject, "present");
                } else {
                    return Helper.getVerbForPronoun(verb, subject, "present");
                }
            case "past":
                if (verb in specialVerbs) {
                    const specialVerb = specialVerbs[verb];
                    return Helper.getVerbForPronoun(specialVerb, subject, "past");
                } else if (verb in irregularVerbs) {
                    return irregularVerbs[verb][0];
                } else {
                    if (verbs[verb] && verbs[verb][2]) {
                        return verbs[verb][2];
                    }
                    return verb + 'ed';
                }
            case "future":
                if (verb in specialVerbs) {
                    const specialVerb = specialVerbs[verb];
                    return Helper.getVerbForPronoun(specialVerb, subject, "future");
                } else {
                    return 'will' + verb;
                }
            case "v3":
                if (verb in irregularVerbs) {
                    return irregularVerbs[verb][1];
                } else {
                    if (verbs[verb] && verbs[verb][2]) {
                        return verbs[verb][2];
                    }
                    return verb + 'ed';
                }
            case "ing":
                return verbs[verb][1];
            default:
                return verb;
        }
    }

    applyContractions(text) {
        for (let i = 0; i < contractions.length; ++i) {
            const [pattern, replace] = contractions[i];
            text = text.replace(pattern, replace);
        }
        return text;
    }

    generateText(parts, sequenceType) {
        let text = '';
        let skipVerb = false;
        const sequence = this.typeInfo[sequenceType];

        for (let i = 0; i < sequence.length; ++i) {
            if (text !== '') {
                text += ' ';
            }
            const item =  sequence[i];
            const [name, param] = item.split(':');
            switch (name) {
                case "subject":
                    let subject = parts.subject;
                    text += subject.spelling.subject;
                    break;
                case "verb":
                    if (skipVerb) {
                        text = text.trim();
                    } else {
                        text += this.renderVerb(parts.verb, param, parts.subject);
                    }
                    break;
                case "be":
                    text += this.renderVerb("be", param, parts.subject);
                    break;
                case "object":
                    if (parts.object !== '') {
                        text += parts.object;
                    } else {
                        text = text.trim();
                    }
                    break;
                case "not":
                    text += "not";
                    break;
                case "being":
                    text += "being";
                    break;
                case "been":
                    text += "been";
                    break;
                case "will":
                    text += "will";
                    break;
                case "aux":
                    let auxVerb = this.tenseInfo.aux;
                    if (this.tenseInfo.aux_replace && parts.verb === this.tenseInfo.aux_replace) {
                        auxVerb = this.tenseInfo.aux_replace;
                        skipVerb = true;
                    }
                    text += `${this.renderVerb(auxVerb, param, parts.subject)}`;
                    break;
            }
        }
        return text;
    }

    render() {
        let text = '';
        let sequence = "active";
        if (this.voice === "passive" && this.typeInfo[this.voice]) {
            sequence = this.voice;
        }

        text = this.generateText(this.parts, sequence);

        if (this.allowContractions) {
            let contractedText = this.applyContractions(text);
            if (this.type === 'negative_interrogative' && this.typeInfo[sequence + "_contracted"]) {
                const altText = this.generateText(this.parts,  sequence + "_contracted");
                if (altText !== this.applyContractions(altText)) {
                    contractedText = this.applyContractions(altText);
                }
            }

            text = contractedText;
        }
        return Helper.capitalize(text + this.typeInfo.end);
    }
}

module.exports = Sentence;
