const net = require('net');
const port = 8888;
const socket = net.connect({ port }, () => {
  console.log('client connected');

  socket.write('aaa11');
  socket.write('bbb22');
  socket.write('ccc33');
});

socket.on('end', () => console.log('socket ended'))
    .on('close', () => console.log('socket closed'))
    .on('error', err => {
    console.error(`socket error: ${err.stack}`);
  });
