const http = require('node:http')

const server = http.createServer((req, res)=> {
    res.writeHead(200, {"Content-Type": "text/plain"})
    res.end("This is the server content.")
})

server.listen(3012, ()=> {
    console.log('Server running on port 3012');
})