const fileRetriever = require('./util.js');
const path = require('path');

async function main() {
    //convert relative path to absolute path for input folder
    const pth = path.resolve(__dirname, '..','input');

    //list of strings 
    const files = fileRetriever.retrieveFiles(pth, '.mp3');

    //joining the audio files from the array.
    const outputPath = path.resolve(__dirname, '..', 'output', 'output.mp3');
    await fileRetriever.joinEverything(files, outputPath);
}

main();
