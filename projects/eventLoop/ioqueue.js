const fs = require('node:fs')


// fs.readFile(__filename, () => console.log("readFile 1"))
// setTimeout(() => console.log("timer 1"), 0);

// test 1
// process.nextTick(() => console.log("nextTick 1"))
// Promise.resolve().then(() => console.log("promise 1"))
// console.log('tihs is a sync task')

// test 2
// process.nextTick(() => console.log("nextTick 1"))
// Promise.resolve().then(() => console.log("promise 1"))
// setTimeout(() => console.log("timer 1"), 0);

// test 3
// setTimeout(() => console.log("timer 1 from timer queue"), 0)
// setImmediate(() => console.log("this is setImmediate from check queue"))
// process.nextTick(() => console.log("nextTick 1 from microtask queue"))
// Promise.resolve().then(() => console.log("promise 1 from microtask queue"))

// test 4
fs.readFile(__filename, () => {
    console.log("this is raedFile 1")
    setImmediate(() => console.log("this is inner setImmediate inside readFile from check queue"))
})
setTimeout(() => console.log("timer 1 from timer queue"), 0)

process.nextTick(() => console.log("nextTick 1 from microtask queue"))
Promise.resolve().then(() => console.log("promise 1 from microtask queue"))