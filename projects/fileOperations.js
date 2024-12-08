const fsCallback = require('node:fs')
const fsPromise = require('node:fs').promises

console.log('first');
// // reading file in blocking way
// const fileContents = fsCallback.readFileSync("./projects/file.txt", "utf-8")
// console.log(fileContents);

// console.log('second');
// // reading file in non-blocking way
// fsCallback.readFile("./projects/file.txt", "utf-8", (error, data) => {
//     if (error) console.log(error);
//     else console.log(data);
// })
// console.log('thrid');


// // writing into file with blocking way
// fsCallback.writeFileSync("./projects/newFile.txt", "Creating file by JS is magic.")
// // writing into file with non-blocking way
// fsCallback.writeFile("./projects/newFile2.txt", "Hello, this is the second file creation magic.", (err) => {
//     if (err) console.log(err);
//     else console.log('file built');
// })

// writing into files with non-blocking way with promises
fsPromise.writeFile("./projects/newFile.txt", "This will appear in the file if successfull 2.")
    .then(console.log('file writing successful'))
    .catch(err => console.log(err))

// reading file in non-blocking way with promises
fsPromise.readFile("./projects/newFile.txt", "utf-8")
    .then(data => console.log('are we readY?', data))
    .catch((error) => console.log(error))

// delete file
fsPromise.unlink("./projects/newFile.txt")
    .then(console.log('file has been deleted'))
    .catch(err => console.log(err))