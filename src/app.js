const pronouns = require("./data/pronount");

console.log('singular:', pronouns.filter(obj => obj.grammarNumber === 'singular').map(obj => obj.spelling.subject));
console.log("plural:", pronouns.filter(obj => obj.grammarNumber === 'plural').map(obj => obj.spelling.subject));
