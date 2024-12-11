const http = require('node:http')
const url = require('node:url')

const notes = [
    { id: 1, title: 'First note', content: 'This is the first note.' },
    { id: 2, title: 'Second note', content: 'This is the second note.' },
    { id: 3, title: 'Third note', content: 'This is the third note.' }
]

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true)
    const method = req.method
    if (pathname === '/notes') {
        if (method === 'GET') {
            res.writeHead(200, { "Content-Type": "application/json" })
            res.end(JSON.stringify(notes))
        }
        else if (method === 'POST') {
            let body = ''
            req.on('data', chunk => {
                body += chunk
            })
            req.on('end', () => {
                const newNote = JSON.parse(body)
                newNote.id = notes.length + 1
                notes.push(newNote)
                res.writeHead(201, { "Content-Type": "application/json" })
                res.end(JSON.stringify(newNote))
            })
        }
    } else if (pathname.startsWith('/notes/')) {
        const noteId = parseInt(pathname.split('/')[2])
        if (method === 'GET') {
            const note = notes.find(n => n.id === noteId)
            if (note) {
                res.writeHead(200, { "Content-Type": "application/json" })
                res.end(JSON.stringify(note))
            }
            else {
                res.writeHead(404, { "Content-Type": "text/plain" })
                res.end("Note not found.")
            }
        }
        else if (method === 'PUT') {
            let body = ''
            req.on('data', chunk => {
                body += chunk
            })
            req.on('end', () => {
                const updatedNote = JSON.parse(body)
                const index = notes.findIndex(n => n.id === noteId)
                if (index === -1) {
                    res.writeHead(404, { "Content-Type": "text/plain" })
                    res.end("Note. not found.")
                    return

                }
                notes[index] = { ...notes[index], ...updatedNote }
                res.writeHead(200, { "Content-Type": "application/json" })
                res.end(JSON.stringify(notes[index]))
            })
        }
        else if (method === 'DELETE') {
            const index = notes.findIndex(n => n.id == noteId)
            if (index !== -1) {
                notes.splice(index, 1)
                res.writeHead(204)
                res.end()
            } else {
                res.writeHead(404, { "Content-Type": "text/plain" })
                res.end("Note not found.")
            }
        }
    }
    else {
        res.writeHead(404, { "Content-Type": "text/plain" })
        res.end("Page not found.")
    }
})
const PORT = 3000
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})