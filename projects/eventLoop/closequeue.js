const fs = require('node:fs')

const readableStream = fs.createReadStream(__filename)
readableStream.close()
readableStream.on("close", () => console.log('this is from readStream close event callback.'))

setImmediate(() => console.log("this is the setImmediate 1"))
setTimeout(() => console.log("this is the setTimeout 1"), 0);
Promise.resolve().then(() => console.log("this is the promise 1"))
process.nextTick(() => console.log("this is the nextTick 1")) 