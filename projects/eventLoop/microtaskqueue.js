// test 1
// console.log("log 1")
// process.nextTick(()=>{
//     console.log("process.nextTick 1")
// })
// console.log("log 2")

// test 2
// Promise.resolve().then(()=>{
//     console.log("this is promise 1")
// })
// process.nextTick(()=>{
//     console.log("process.nextTick 1")
// })

// test 3
// Promise.resolve().then(() => { console.log("this is promise 1") })
// Promise.resolve().then(() => {
//     console.log("this is promise 2")
//     process.nextTick(() => {
//         console.log("this is nexttick inside the promise block")
//     })
// })

// Promise.resolve().then(() => { console.log("this is promise 3") })
// process.nextTick(() => { console.log("this is process.nextTick 1") })
// process.nextTick(() => {
//     console.log("this is process.nextTick 2")
//     process.nextTick(() => {
//         console.log("this is inner next tick inside nextTick")
//     })
// })
// process.nextTick(() => { console.log("this is process.nextTick 3") })

// test 4
// setTimeout(() => console.log("this is setTimeout 1"), 0);
// // setTimeout(() => console.log("this is setTimeout 2"), 0);
// setTimeout(() => {
//     console.log("this is setTimeout 2")
//     process.nextTick(()=> console.log("this is nextTick task inside timerblock"))
// }, 0);
// setTimeout(() => console.log("this is setTimeout 3"), 0);

// Promise.resolve().then(() => { console.log("this is promise 1") })
// Promise.resolve().then(() => {
//     console.log("this is promise 2")
//     process.nextTick(() => console.log("this is nexttick inside the promise block"))
// })

// Promise.resolve().then(() => { console.log("this is promise 3") })
// process.nextTick(() => { console.log("this is process.nextTick 1") })
// process.nextTick(() => {
//     console.log("this is process.nextTick 2")
//     process.nextTick(() => console.log("this is inner next tick inside nextTick"))
// })
// process.nextTick(() => { console.log("this is process.nextTick 3") })

// test 5
setTimeout(() => console.log("this is setTimeout 1"), 1000);
setTimeout(() => console.log("this is setTimeout 2"), 500);
setTimeout(() => console.log("this is setTimeout 3"), 0);