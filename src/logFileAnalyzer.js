import fs from 'fs';

export function analyze(filepath) {
    const stream = fs.createReadStream(filepath, 'utf8');

    let linesCount = 0;
    let errCount = 0;
    let warnCount = 0;
    let leftover = ''; 

    stream.on('data', (chunk) => {
        const lines = (leftover + chunk).split('\n');
        leftover = lines.pop(); 

        for (let line of lines) {
            if (!line.trim()) continue; 
            
            linesCount++;
            
            const txt = line.toUpperCase();
            if (txt.includes('ERROR') || txt.includes('FAIL')) {
                errCount++;
            } else if (txt.includes('WARN')) {
                warnCount++;
            }
        }
    });

    stream.on('end', () => {
        if (leftover.trim()) {
            linesCount++;
            const txt = leftover.toUpperCase();
            if (txt.includes('ERROR') || txt.includes('FAIL')) errCount++;
            if (txt.includes('WARN')) warnCount++;
        }

        console.log(`\nStats for ${filepath}:`);
        console.log(`Total lines: ${linesCount}`);
        console.log(`Errors: ${errCount}`);
        console.log(`Warnings: ${warnCount}`);
    });

    stream.on('error', (err) => {
        console.log('Stream failed:', err.message);
    });
}