const http = require('node:http')
const url = require('node:url')

http.createServer(function (req, res) {
    // breakdown pathname with its queries into components
    const parsedUrl = url.parse(req.url, true)
    console.log(parsedUrl)
    if (parsedUrl.pathname === '/') {
        res.writeHead(200, { "Content-Type": 'text/plain' })
        res.end("Home Page")
    }
    else if (parsedUrl.pathname === '/about') {
        res.writeHead(200, { "Content-Type": 'text/plain' })
        res.end("About Page")
    }
    else if (parsedUrl.pathname === '/contact') {
        res.writeHead(200, { "Content-Type": 'text/plain' })
        res.end("Contact Page")
    }
    else if (parsedUrl.pathname === '/url') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        // get queries from the pathname
        const q = parsedUrl.query
        console.log(q)
        const year = q.year || "Year not provided."
        const month = q.month || "Month not provided."
        let text = `Year: ${year}, Month: ${month}`
        res.end(text)
    }
    else {
        res.writeHead(404, { "Content-Type": 'text/plain' })
        res.end("Page not found.")
    }
}).listen(8080, () => {
    console.log('The server is running on 8080 port')
});