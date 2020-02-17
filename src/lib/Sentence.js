const specialVerbs   = require('../data/special_verb');
const verbs          = require('../data/verb');
const irregularVerbs = require('../data/irregular_verb');
const contractions   = require('../data/contraction.json');
const Helper         = require("./Helper");


class Sentence {
    constructor(tenseInfo, typeInfo, parts, allowContractions = true) {
        this.tenseInfo = tenseInfo;
        this.parts = parts;
        this.typeInfo = typeInfo;
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

    render() {
        let text = '';
        let skipVerb = false;
        for (let i = 0; i < this.typeInfo.sequence.length; ++i) {
            if (text !== '') {
                text += ' ';
            }
            const item =  this.typeInfo.sequence[i];
            const [name, param] = item.split(':');
            switch (name) {
                case "subject":
                    let subject = this.parts.subject;
                    text += subject.spelling.subject;
                    break;
                case "verb":
                    if (skipVerb) {
                        text = text.trim();
                    } else {
                        text += this.renderVerb(this.parts.verb, param, this.parts.subject);
                    }
                    break;
                case "object":
                    if (this.parts.object !== '') {
                        text += this.parts.object;
                    } else {
                        text = text.trim();
                    }
                    break;
                case "not":
                    text += "not";
                    break;
                case "been":
                    text += "been";
                    break;
                case "will":
                    text += "will";
                    break;
                case "aux":
                    let auxVerb = this.tenseInfo.aux;
                    if (this.tenseInfo.aux_replace && this.parts.verb === this.tenseInfo.aux_replace) {
                        auxVerb = this.tenseInfo.aux_replace;
                        skipVerb = true;
                    }
                    text += this.renderVerb(auxVerb, param, this.parts.subject);
                    break;
            }
        }
        if (this.allowContractions) {
            for (let i = 0; i < contractions.length; ++i) {
                const [pattern, replace] = contractions[i];
                text = text.replace(pattern, replace);
            }
        }
        return Helper.capitalize(text + this.typeInfo.end);
    }
}

module.exports = Sentence;