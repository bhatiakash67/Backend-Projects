const crypto = require('node:crypto')

process.env.UV_THREADPOOL_SIZE = 8
const maxCalls = 8

const start = Date.now()
for (let i = 0; i < maxCalls; i++) {
    crypto.pbkdf2("password", "salt", 10000, 512, "sha512", () => {
        console.log(`Hash: ${i + 1}`, Date.now() - start)
    })
} 