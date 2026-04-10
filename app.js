const { readFileSync, writeFileSync } = require("fs");

const text = readFileSync("./data/input.txt", "utf8");

// Solution 1 :

const countWords = require("./src/fileOperations.js");
countWords("./data/input.txt");
console.log("Word count output created in output/wordCount.txt\n");

// Solution 2 :

const { capitalizeString, reverseString, countVowels } = require("./src/stringUtils.js");
const result = `
Original Text: ${text.trim()}
Capitalized: ${capitalizeString(text.trim())}
Reversed: ${reverseString(text.trim())}
Vowel Count: ${countVowels(text)}
`;
writeFileSync("./output/stringUtils.txt", result);
console.log("String utilities output created in output/stringUtils.txt\n");

// Solution 3 :

const systemInfoLogger = require("./src/SysInfoLogger.js");
setInterval(() => {
    systemInfoLogger();
}, 5000);
console.log("System information logging started.\n");

// Solution 4 :

const startTodoServer = require("./src/todo.js");
startTodoServer();

// Solution 5 :

const demonstrateEventLoop = require("./src/eventLoop.js");
demonstrateEventLoop();