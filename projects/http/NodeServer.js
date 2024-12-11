const http = require('node:http')
const fs = require('node:fs')

const server = http.createServer((req, res) => {
    // passing string as response
    // res.writeHead(200, {"Content-Type": "text/plain"})
    // res.end("This is the server content.")

    // passing json as response
    const superHero = {
        firstName: "Aleksandr",
        lastName: "Karelin",
    }
    // res.writeHead(200, { "Content-Type": "application/json" })
    // res.end(JSON.stringify(superHero))

    // passing html
    res.writeHead(200, { "Content-Type": "text/html" })
    fs.createReadStream("./index.html").pipe(res)

    // read file before responding, blocking.
    // const html = fs.readFileSync('./index.html', 'utf-8')
    // res.end(html)
})

server.listen(3000, () => {
    console.log('Server running on port 3000');
})