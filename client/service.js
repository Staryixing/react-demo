// client test
const WebSocket = require('ws');

let count = 0;
let ws = new WebSocket('ws://localhost:3000/test');

ws.on('open', function () {
    console.log(`[CLIENT] open()`);
    ws.send('Hello!');
});

// 响应收到的消息:
ws.on('message', function (message) {
    console.log(`[CLIENT] Received: ${message}`);
})

// ws.on('open', function() {
//   console.log(`[CLIENT] open()`)
//   ws.send('Hello!')
// });

// ws.on('message', function(message){
//   console.log(`[CLIENT] Received: ${message}`)
//   count++;
//   if(count > 3){
//     ws.send('Goodbye!')
//     ws.close()
//   }else{
//     setTimeout(() => {
//       ws.send(`Hello, I am Mr No.${count}!`)
//     }, 1000)
//   }
// })