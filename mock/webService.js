const http = require('http');

const hostname = '127.0.0.1';
const port = 8421;
    
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('keepAlive', true)
    res.end('yx');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});