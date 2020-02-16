const Helper = require("./lib/Helper");

const pronouns = require("./data/pronoun");
const tenses = require("./data/tense");
const verbs = require("./data/verb");


function fillTenseCombo() {
    const tenseCombo = document.getElementById('tense');
    const aspectCombo = document.getElementById('aspect');

    tenseCombo.onchange = () => {
        const option = tenseCombo.options[tenseCombo.selectedIndex];
        console.log('tenseCombo change:', option.value);
        const aspects = tenses[option.value];

        aspectCombo.innerHTML = '';
        for (let aspect in aspects) {
            const opt = document.createElement('option');
            opt.innerHTML = Helper.capitalize(aspect);
            if (aspects[aspect].alt_name) {
                opt.innerHTML += ` (${Helper.capitalize(aspects[aspect].alt_name)})`;
            }
            opt.value = aspect;
            aspectCombo.appendChild(opt);
        }
    };

    for (let tense in tenses) {
        const opt = document.createElement('option');
        opt.innerHTML = Helper.capitalize(tense);
        opt.value = tense;
        tenseCombo.appendChild(opt);
    }
    tenseCombo.selectedIndex = 1;
}

window.onload = () => {
    fillTenseCombo();

    /*
    console.log('singular:', pronouns.filter(obj => obj.grammarNumber === 'singular').map(obj => obj.spelling.subject));
    console.log("plural:", pronouns.filter(obj => obj.grammarNumber === 'plural').map(obj => obj.spelling.subject));

    console.log('1st:', pronouns.filter(obj => obj.person === 1).map(obj => obj.spelling.subject));
    console.log("2nd:", pronouns.filter(obj => obj.person === 2).map(obj => obj.spelling.subject));
    console.log("3rd:", pronouns.filter(obj => obj.person === 3).map(obj => obj.spelling.subject));

    const firstSentence = Helper.renderSentence({
        "subject": pronouns[0],
        "verb": verbs[1],
        "object": "a doctor"
    }, tenses.present.simple, "affirmative");

    console.log("firstSentence:", firstSentence);

    */

};
