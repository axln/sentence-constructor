const Helper = require("./lib/Helper");

const pronouns = require("./data/pronoun");
const tenses = require("./data/tense");
const verbs = require("./data/verb");

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
