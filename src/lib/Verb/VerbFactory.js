const Be   = require("./Be");
const Do   = require("./Do");
const Have = require("./Have");
const Verb = require("./Verb");

module.exports = {
    create: (params) => {
        switch (params.verb) {
            case "be":
                return new Be(params);
            case "do":
                return new Do(params);
            case "have":
                return new Have(params);
            default:
                return new Verb(params);
        }
    }
};
