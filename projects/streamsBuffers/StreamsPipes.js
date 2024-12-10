const fs = require('node:fs')

const readableStream = fs.createReadStream('../randomFiles/file.txt', {
    encoding: 'utf-8',
    highWaterMark: 5,
})

const writableStream = fs.createWriteStream("../randomFiles/file2.txt", {
    highWaterMark: 1
})
// manually writing chunks to writable stream
// readableStream.on("data", (chunkOfData) => {
//     console.log(chunkOfData);
//     writableStream.write(chunkOfData) //Write chunk to writable stream
// })

// End writable stream when readable stream ends
readableStream.on('end', () => {
    writableStream.end()
    console.log('Data transfer completed.');
})

// writing chunks to stream with pipes
readableStream.pipe(writableStream)

// execute this when writing operation is completed
writableStream.on('finish', () => {
    console.log('Writing complete!');
})