const Helper = require('./Helper');
const Sentence = require('./Sentence');

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
    negative: "Negative",
    interrogative: "Interrogative",
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
        this.contractCheckbox = document.getElementById('contract');

        this.tenseCombo.onchange = this.updateSentence.bind(this);
        this.aspectCombo.onchange = this.updateSentence.bind(this);
        this.typeCombo.onchange = this.updateSentence.bind(this);
        this.pronounCombo.onchange = this.updateSentence.bind(this);
        this.verbCombo.onchange = this.updateSentence.bind(this);
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
        const allowContractions =  this.contractCheckbox.checked;
        //console.log(tenseOption.value, aspectOption.value, typeOption.value);
        const parts = {
            subject: pronouns[pronounOption.value],
            verb: verbOption.value,
            object: this.objectText.value
        };
        this.generateSentence(tenseOption.value, aspectOption.value, typeOption.value, parts, allowContractions);
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
            opt.innerHTML = Helper.capitalize(tense);
            opt.value = tense;
            this.tenseCombo.appendChild(opt);
        }
    }

    generateSentence(tense, aspect, type, parts, allowContractions) {
        const tenseInfo = tenses[tense][aspect];
        const typeInfo = tenses[tense][aspect].types[type];
        const sentence = new Sentence(tenseInfo, typeInfo, parts, allowContractions );
        this.sentenceText.innerHTML = sentence.render();
    }
}

module.exports = App;