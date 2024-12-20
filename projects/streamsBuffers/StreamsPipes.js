const fs = require('node:fs')

const readableStream = fs.createReadStream('../files/file.txt', {
    encoding: 'utf-8',
    // highWaterMark: 5,
})

const writableStream = fs.createWriteStream("../files/file2.txt", {
    highWaterMark: 1
})

// manually writing chunks to writable stream 
readableStream.on("data", (chunkOfData) => {
    // buffer size is chunk.length
    console.log("Buffer size:",chunkOfData.length);
    console.log(chunkOfData)
    writableStream.write(chunkOfData) //Write chunk to writable stream
})

// End writable stream when readable stream ends
readableStream.on('end', () => {
    writableStream.end()
    console.log('Data transfer completed.')
})

// writing chunks to stream with pipes
// readableStream.pipe(writableStream)

// execute this when writing operation is completed
writableStream.on('finish', () => {
    console.log('Writing complete!');
})