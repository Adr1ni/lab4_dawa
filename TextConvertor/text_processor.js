// text_processor.js

function splitWord(text) {
    return text.split(' ');
}

function extractSubstring(text, start, end) {
    return text.substring(start, end);
}

function removeSpaces(text) {
    return text.replace(/\s/g, '');
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function toLowerCase(text) {
    return text.toLowerCase();
}

function toUpperCase(text) {
    return text.toUpperCase();
}

function countCharacters(text) {
    return text.length;
}

module.exports = {
    splitWord,
    extractSubstring,
    removeSpaces,
    capitalize,
    toLowerCase,
    toUpperCase,
    countCharacters
};
