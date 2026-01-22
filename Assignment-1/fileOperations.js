const fs = require('fs');
const path = require('path');

const inputFilePath = 'input.txt';
const outputFilePath = 'wordCount.txt';
const fileContent = "Hello World!, My name is Adarsh Kumar Kushwaha, I am learning Backend Development from Bridgelabz.";

function createFile(filePath, content) {
    try {
        fs.writeFileSync(filePath, content, 'utf8');
    } catch (error) {
        console.error("Error creating file:", error);
    }
}

function readFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error("Error reading file:", error);
        return null;
    }
}

function countWords(content) {
    if (!content) return 0;
    const words = content.trim().split(/\s+/);
    return words.length;
}

createFile(inputFilePath, fileContent);

const content = readFile(inputFilePath);

const wordCount = countWords(content);

createFile(outputFilePath, `Word Count: ${wordCount}`);

module.exports = {
    countWords
};