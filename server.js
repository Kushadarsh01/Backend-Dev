import fs from 'fs/promises';
import * as fileManager from './src/fileManager.js';
import { analyze } from './src/logFileAnalyzer.js';
import { sync } from './src/fileSyncTool.js';

async function main() {
    await fs.mkdir('./data', { recursive: true });
    await fs.mkdir('./syncSource', { recursive: true });
    
    await fs.writeFile('./syncSource/hello.txt', 'hello world I am Adarsh Kumar Kushwaha');

    console.log('\nFile Manager:-\n');
    await fileManager.write('./data/intro.txt', 'Hello my name is Adarsh Kumar Kushwaha');
    await fileManager.read('./data/intro.txt');
    await fileManager.copy('./data/intro.txt', './data/introCopy.txt');
    await fileManager.list('./data');
    await fileManager.copy('data/intro.txt', './data/introDelete.txt');
    await fileManager.del('./data/introDelete.txt');


    console.log('\nSyncronization Tool:-\n');
    await sync('./syncSource', './syncDestination');

    console.log('\nLog Analyzer');
    analyze('./data/dummyLog.log');
}

main();