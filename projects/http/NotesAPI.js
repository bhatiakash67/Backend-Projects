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
                const { title, content } = newNote
                if (!title || !content) {
                    res.writeHead(400, { "Content-Type": "text/plain" })
                    return res.end("Both the fields are required to replace the old note.")
                }
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
                return res.end(JSON.stringify(note))
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
                    // no such note exists to replace
                    res.writeHead(404, { "Content-Type": "application/json" })
                    res.end(JSON.stringify({
                        error: "No such note exists to replace",
                        noteId: noteId
                    }))
                    // create a new note if no note with specified id found 
                    // updatedNote.id = noteId
                    // notes.push(updatedNote)
                    // res.writeHead(201, { "Content-Type": "application/json" })
                    // res.end(JSON.stringify(updatedNote))
                }
                else {
                    // replace the whole note for id match
                    updatedNote.id = noteId
                    notes[index] = updatedNote
                    res.writeHead(200, { "Content-Type": "application/json" })
                    res.end(JSON.stringify(notes[index]))
                }
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