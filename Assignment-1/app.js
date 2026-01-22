const fs = require("fs");

const { countWords } = require("./fileOperations");
const { capitalizeString, reverseString, countVowels } = require("./stringUtils");

const text = fs.readFileSync("input.txt", "utf8");

countWords("input.txt");

const result = `
Original Text: ${text.trim()}
Capitalized: ${capitalizeString(text.trim())}
Reversed: ${reverseString(text.trim())}
Vowel Count: ${countVowels(text)}
`;

fs.writeFileSync("stringUtils.txt", result);