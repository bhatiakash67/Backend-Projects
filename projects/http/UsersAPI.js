const http = require('node:http')
const url = require('url')
const PORT = process.env.PORT || 3000

const users = [
    { id: 1, name: "Raj kumar", email: 'raj@kumar.com', city: 'lapcare', job: 'web dev' },
    { id: 2, name: "Ram kumar", email: 'ram@kumar.com', city: 'pune', job: 'ui/ux' },
    { id: 3, name: "Shyam Kumar", email: 'shyam@kumar.com', city: 'mumbai', job: 'product designer' },
    { id: 4, name: "Local Kumar", email: 'local@host.com', city: 'Raipur', job: 'product manager' },
]

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true)
    const method = req.method

    if (pathname == '/users') {
        if (method === 'GET') {
            res.writeHead(200, { "Content-Type": "application/json" })
            res.end(JSON.stringify(users))
        }
        else if (method === 'POST') {
            let body = ''
            req.on('data', (chunk) => {
                body += chunk
            })
            req.on('end', () => {
                let newUser = JSON.parse(body)
                newUser.id = users.length + 1
                newUser = {
                    id: newUser.id, ...newUser
                }
                users.push(newUser)
                res.writeHead(201, { "Content-Type": "application/json" })
                res.end(JSON.stringify(newUser))
            })
        }
    }
    else if (pathname.startsWith('/users/')) {
        const userId = parseInt(pathname.split('/')[2])

        if (method === 'GET') {
            const user = users.find(u => u.id === userId)
            if (user) {
                res.writeHead(200, { "Content-Type": "application/json" })
                res.end(JSON.stringify(user))
            }
            else {
                res.writeHead(404, { "Content-Type": "application/json" })
                res.end(`No user with User ID:${userId} exists.`)
            }
        }
        else if (method === 'PUT') {
            let body = ''
            req.on('data', (chunk) => {
                body += chunk
            })
            req.on('end', () => {
                let updatedUser
                try {
                    updatedUser = JSON.parse(body)
                    if (!Object.keys(updatedUser).length) {
                        res.writeHead(400, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: "Invalid or empty payload." }));
                        return;
                    }
                } catch (err) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Malformed JSON payload." }));
                    return;
                }
                const index = users.findIndex(u => u.id == userId)
                if (index === -1) {
                    // create a new user if not found
                    // updatedUser.id = userId
                    // users.push(updatedUser)
                    // res.writeHead(201, { "Content-Type": "application/json" })
                    // res.end(JSON.stringify(users[updatedUser]))

                    // no such user exists to replace
                    res.writeHead(404, { "Content-Type": "application/json" })
                    res.end(JSON.stringify({
                        userId: userId,
                        error: "No such user exists to replace."
                    }))
                } else {
                    // replace that id matching resource completely
                    updatedUser.id = userId
                    users[index] = {
                        id: updatedUser.id,
                        ...updatedUser
                    }
                    res.writeHead(200, { "Content-Type": "application/json" })
                    res.end(JSON.stringify(users[index]))
                }
            })
        }
        else if (method === 'PATCH') {
            let body = ''
            req.on('data', (chunk) => {
                body += chunk
            })
            req.on('end', () => {
                const index = users.findIndex(u => u.id == userId)
                const updatedUser = JSON.parse(body)
                if (index === -1) {
                    res.writeHead(404, { "Content-Type": "text/plain" })
                    res.end(`No user with ID Number: ${userId} exists.`)
                    return
                }
                if (!Object.keys(updatedUser).length) {
                    res.writeHead(400, { "Content-Type": "text/plain" })
                    res.end("Invalid or empty payload.")
                    return
                }
                users[index] = { ...users[index], ...updatedUser }
                res.writeHead(200, { "Content-Type": "application/json" })
                res.end(JSON.stringify(users[index]))
            })
        }
        else if (method === 'DELETE') {
            const index = users.findIndex(u => u.id == userId)
            if (index !== -1) {
                users.splice(index, 1)
                res.writeHead(204)
                res.end()
            }
            else {
                res.writeHead(404, { "Content-Type": "text/plain" })
                res.end("No such user exists.")
            }
        }
    }
    else {
        res.writeHead(404, { "Content-Type": "text/plain" })
        res.end("Page not found.")
    }
})

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})