import { createServer } from 'node:http'

const server = createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    
    if (req.url === '/') {
        res.end('Hello, World!')
    } else if (req.url === '/about') {
        res.end('About Page')
    } else {
        res.statusCode = 404
        res.end('Not Found')
    }
})

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})
