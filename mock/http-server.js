const http =  require('http');
const fs = require('fs');

http.createServer(function (request, response){
  console.log('request come', request.url)
  const html = fs.readFileSync('service.html', 'utf8')
  const img = fs.readFileSync('test.jpeg')

  if(request.url === '/'){
    response.writeHead(200, {
      'Content-Type': 'text/html',
    })
    response.end(html)
  } else {
    response.writeHead(200, {
      'Content-Type': 'image/jpg'
    })
    response.end(img)
  }

}).listen(8888)
