const Helper = require('./Helper');
const Sentence = require('./Sentence');

const Simple = require("./Aspect/Simple");
const Continuous = require("./Aspect/Continuous");
const Perfect = require("./Aspect/Perfect");
const PerfectContinuous = require("./Aspect/PerfectContinuous");
const VerbFactory = require("./Verb/VerbFactory");
const Subject = require("./Subject");

const pronouns = require("../data/pronoun");
const tenses = require("../data/tense");
const verbs = require("../data/verb");
const irregularVerbs = require("../data/irregular_verb");

const aspects = {
    simple: "Simple (Indefinite)",
    continuous: "Continuous (Progressive)",
    perfect: "Perfect",
    perfect_continuous: "Perfect Continuous (Progressive)"
};

const sentenceTypes = {
    affirmative: "Affirmative",
    interrogative: "Interrogative",
    negative: "Negative",
    negative_interrogative: "Negative Interrogative"
};

class App {
    constructor() {
        this.tenseCombo  = document.getElementById('tense');
        this.aspectCombo = document.getElementById('aspect');
        this.typeCombo = document.getElementById('type');
        this.pronounCombo = document.getElementById('pronoun');
        this.verbCombo = document.getElementById('verb');
        this.objectText = document.getElementById('object');
        this.sentenceText = document.getElementById('sentence');
        this.sentence2Text = document.getElementById('sentence2');
        this.voiceCombo = document.getElementById('voice');
        this.contractCheckbox = document.getElementById('contract');

        this.tenseCombo.onchange = this.updateSentence.bind(this);
        this.aspectCombo.onchange = this.updateSentence.bind(this);
        this.typeCombo.onchange = this.updateSentence.bind(this);
        this.pronounCombo.onchange = this.updateSentence.bind(this);
        this.verbCombo.onchange = this.updateSentence.bind(this);
        this.voiceCombo.onchange = this.updateSentence.bind(this);
        this.objectText.oninput = this.updateSentence.bind(this);
        this.contractCheckbox.onchange = this.updateSentence.bind(this);
    }

    run() {
        this.fillTenseCombo();
        this.fillAspectCombo();
        this.fillTypeCombo();
        this.fillPronounCombo();
        this.fillVerbCombo();
        this.objectText.value = 'a teacher';

        this.tenseCombo.selectedIndex = 1; // present
        this.verbCombo.selectedIndex = 1; // be

        this.updateSentence();
    }

    updateSentence() {
        const tenseOption = this.tenseCombo.options[this.tenseCombo.selectedIndex];
        const aspectOption = this.aspectCombo.options[this.aspectCombo.selectedIndex];
        const typeOption = this.typeCombo.options[this.typeCombo.selectedIndex];
        const pronounOption = this.pronounCombo.options[this.pronounCombo.selectedIndex];
        const verbOption = this.verbCombo.options[this.verbCombo.selectedIndex];
        const voiceOption = this.voiceCombo.options[this.voiceCombo.selectedIndex];
        const allowContractions =  this.contractCheckbox.checked;
        //console.log(tenseOption.value, aspectOption.value, typeOption.value);
        const parts = {
            subject: pronouns[pronounOption.value],
            verb: verbOption.value,
            object: this.objectText.value
        };
        this.generateSentence(tenseOption.value, aspectOption.value, typeOption.value, parts, voiceOption.value, allowContractions);
    }

    fillAspectCombo() {
        for (let value in aspects) {
            const option = Helper.createOption(aspects[value], value);
            this.aspectCombo.appendChild(option);
        }
    }

    fillTypeCombo() {
        for (let value in sentenceTypes) {
            const option = Helper.createOption(sentenceTypes[value], value);
            this.typeCombo.appendChild(option);
        }
    }

    fillPronounCombo() {
        for (let value in pronouns) {
            const option = Helper.createOption(value.replace("_", " "), value);
            this.pronounCombo.appendChild(option);
        }
    }

    fillVerbCombo() {
        for (let value in verbs) {
            const option = Helper.createOption(value, value);
            if (value in irregularVerbs) {
                option.className = 'verbOption';
            }

            this.verbCombo.appendChild(option);
        }
    }

    fillTenseCombo() {
        for (let tense in tenses) {
            const opt = document.createElement('option');
            opt.innerHTML = Helper.capitalize(tense.replace(/_/g, " "));
            opt.value = tense;
            this.tenseCombo.appendChild(opt);
        }
    }

    static getAspectClass(aspect) {
        switch (aspect) {
            case "simple":
                return Simple;
            case "continuous":
                return Continuous;
            case "perfect":
                return Perfect;
            case "perfect_continuous":
                return PerfectContinuous;
            default: return null;
        }
    }

    generateSentence(tense, aspect, type, parts, voice, allowContractions) {
        const tenseInfo = tenses[tense][aspect];
        const sentence = new Sentence(tenseInfo, type, parts, voice, allowContractions);
        this.sentenceText.innerHTML = sentence.render();
        for (let i = 0; i < this.sentenceText.childNodes.length; ++i) {
            const node = this.sentenceText.childNodes[i];
            if (node.nodeType !== 1) {
                continue;
            }
            node.textContent = Helper.capitalize(node.textContent);
            break;
        }

        // temporarily
        return;

        // tense engine v2
        let AspectClass = App.getAspectClass(aspect);
        let sentenceType;
        let negative;
        switch(type) {
            case "affirmative":
                sentenceType = "affirmative";
                negative = false;
                break;
            case "negative":
                sentenceType = "affirmative";
                negative = true;
                break;
            case "interrogative":
                sentenceType = "interrogative";
                negative = false;
                break;
            case "negative_interrogative":
                sentenceType = "interrogative";
                negative = true;
                break;


        }
        const passive = voice === "passive";
        const subject2 = new Subject(parts.subject);
        const sentence2 = new AspectClass(tense, subject2, passive ? "be" : parts.verb);
        const line = [];
        sentence2.render(line, sentenceType, negative, allowContractions);
        if (passive) {
            const verbObj = VerbFactory.create({verb: parts.verb, form: "v3"});
            verbObj.render(line, "verb");
        }
        if (parts.object && parts.object.trim() !== "") {
            line.push({
                text: parts.object,
                type: "object"
            });
        }
        if (type === "interrogative") {
            line.push({text: "?"});
        } else {
            line.push({text: "."});
        }

        this.sentence2Text.innerHTML = "";

        line.forEach((item, index) => {
            const div = document.createElement("div");
            const span = document.createElement('span');
            span.innerHTML = item.text;

            if (index < line.length - 2) {
                span.innerHTML += " "
            }
            div.appendChild(span);
            this.sentence2Text.appendChild(div);
        });
    }
}

module.exports = App;
