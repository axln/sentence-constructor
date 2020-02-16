module.exports = {
    renderSentence: (parts, tense, type) => {
        return "[render result]"
    },
    capitalize: (string) => {
        return string.replace('_', ' ').split(' ').map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ');
    }
};
