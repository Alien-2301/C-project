//file system - act of operation on the hardware system
//path - provide utilites to figure navigation (at a purely logical level);

const fs = require('fs');
const path =  require('path'); 
const ffmpeg = require('fluent-ffmpeg');


/** the function access the folder, isolate the format, compute the absolute path and return the lists of audio
 * @param {string} directory folder where we search the file (example: input)
 * @param {string} extension extensions of the file you are searching for (example: ".mp3")
 * @return {string []}  lists of absolute path 
 */

function retrieveFiles(directory, extension){
    //reading the folder
    const files = fs.readdirSync(directory);
    //extension reader
    let srcFiles = files.filter(file => path.extname(file) === extension);

    srcFiles = srcFiles.map(file => {
        //list of file names - absolute path (relative to input folder)
        return path.join(directory, file);   
    });
    return srcFiles;
}

/**
 * @param {string []} listOfFiles list of absolute path
 * @param {string} storeInThisFile where the files would be saved
 */

function joinEverything(listOfFiles, storeInThisFile) {
    if (!Array.isArray(listOfFiles)) {
      throw new TypeError("ListOfFiles should be an array");
    }
    if (listOfFiles.length < 2) {
      throw new TypeError("Be kind and give me a LIST of files you moron");
    }
  
    let command = null;
    listOfFiles.forEach((individualFile, index) => {
      if (index === 0) {
        command = ffmpeg(individualFile);
      } else {
        command = command.input(individualFile);
      }
    });
    return new Promise((accept, reject) => {
      command.mergeToFile(storeInThisFile).on("end", accept).on("error", reject);
    });
  }

  module.exports = {joinEverything, retrieveFiles};