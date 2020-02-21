class Subject {
    constructor(params) {
        this.spelling      = params.spelling;
        this.person        = params.person;
        this.grammarNumber = params.grammarNumber;
    }
    render(line) {
        line.push({
            text: this.spelling.subject,
            type: "pronoun"
        });
    }
}

module.exports = Subject;
