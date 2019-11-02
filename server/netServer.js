const net = require('net');

const server = net.createServer(socket => {
  console.log('client connected')
  socket.on('data', chunk => {
    chunk = chunk.toString();
    if(chunk == null){
      console.log('chunk is null,seems to end now')
    }
    console.log(`socket got data: ${chunk}`);
  })
  socket.on('end', () => console.log('socket ended'))
  .on('close', () => console.log('socket closed'))
  .on('error', err => console.error(`socket error: ${err.stack}`))
})

server.listen(8888,function(){console.log('server is listening8888');})
