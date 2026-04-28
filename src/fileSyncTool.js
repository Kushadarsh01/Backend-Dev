import fs from 'fs/promises';
import path from 'path';

export async function sync(source, dest) {
    try {
        await fs.mkdir(dest, { recursive: true });
        
        const files = await fs.readdir(source, { withFileTypes: true });

        for (let file of files) {
            const srcPath = path.join(source, file.name);
            const destPath = path.join(dest, file.name);

            if (file.isFile()) {
                try {
                    await fs.access(destPath);
                    console.log(`Skipping ${file.name}, already exists`);
                } catch {
                    await fs.copyFile(srcPath, destPath);
                    console.log(`Synced ${file.name}`);
                }
            } else if (file.isDirectory()) {
                await sync(srcPath, destPath);
            }
        }
    } catch (err) {
        console.log('Sync error:', err.message);
    }
}