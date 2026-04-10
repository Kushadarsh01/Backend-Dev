const fs = require('fs');

function demonstrateEventLoop() {
    console.log('1. [Sync] Script Start');

    setTimeout(() => {
        console.log('5. [Macrotask] setTimeout 0ms');
    }, 0);

    setImmediate(() => {
        console.log('6. [Macrotask] setImmediate');
    });

    process.nextTick(() => {
        console.log('3. [Microtask] process.nextTick');
    });

    Promise.resolve()
    .then(() => {
        console.log('4. [Microtask] Promise.resolve');
    });

    console.log('2. [Sync] Script End');
}

module.exports = demonstrateEventLoop;