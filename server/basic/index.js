var debug = require('debug')('http')
  , http = require('http')
  , name = 'My App';
  const deprecate = require('depd')('koa');
debug('booting %o', name);
const server = http.createServer((req, res) => {
  if(true){
    deprecate('123123123232')
  }
  debug(req.method + ' ' + req.url);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay1');
});

server.listen(3000)