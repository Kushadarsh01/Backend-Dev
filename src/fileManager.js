import fs from 'fs/promises';

export async function read(file) {
    try {
        const data = await fs.readFile(file, 'utf8');
        console.log('Read:', data);
    } catch (err) {
        console.log('failed to read', err.message);
    }
}

export async function write(file, content) {
    try {
        await fs.writeFile(file, content);
        console.log(`Saved to ${file}`);
    } catch (err) {
        console.log('failed to write', err.message);
    }
}

export async function copy(src, dest) {
    try {
        await fs.copyFile(src, dest);
        console.log(`Copied file to ${dest}`);
    } catch (err) {
        console.log('copy failed', err.message);
    }
}

export async function del(file) {
    try {
        await fs.unlink(file);
        console.log('Deleted', file);
    } catch (err) {
        console.log('delete failed', err.message);
    }
}

export async function list(dir) {
    try {
        const files = await fs.readdir(dir);
        console.log(`Files in ${dir}:`, files);
    } catch (err) {
        console.log('list failed', err.message);
    }
}