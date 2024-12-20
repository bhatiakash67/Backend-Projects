const fs = require('node:fs')

// test 1
// fs.readFile(__filename, () => {
//     console.log("this is raedFile 1")
//     setTimeout(() => console.log("timer inside readFile"), 0)
//     setImmediate(() => console.log("this is inner setImmediate inside readFile from check queue"))

//     process.nextTick(() => console.log("inner nextTick 1 inside readFile"))
//     Promise.resolve().then(() => console.log("inner promise 1 inside readFile"))
// })
// setTimeout(() => console.log("timer 1 from timer queue"), 0)

// process.nextTick(() => console.log("nextTick 1 from microtask queue"))
// Promise.resolve().then(() => console.log("promise 1 from microtask queue"))

// test 2
// setImmediate(() => console.log('setImmediate 1 from check queue'))
// setImmediate(() => {
//     console.log('setImmediate 2 from check queue')
//     Promise.resolve().then(()=> console.log("promise inside the setImmediate block"))
//     process.nextTick(()=> console.log('nextTick inside the setImmediate block'))
// })
// setImmediate(() => console.log('setImmediate 3 from check queue'))

// test 3
setTimeout(()=> console.log('timer'), 0)           
setImmediate(() => console.log('setImmediate 1 from check queue'))   
