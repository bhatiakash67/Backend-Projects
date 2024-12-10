const EventEmitter = require('node:events')
const emitter = new EventEmitter()
emitter.on("look", (personName) => {
    console.log(`Hey, ${personName}. What are you doing here?`);
})
emitter.emit("look", "Raju")