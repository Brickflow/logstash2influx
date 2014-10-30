var PORT = 8099;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var message = new Buffer('{"kacsa": "∑árvíztűrő tükörfúrógép"}');

var client = dgram.createSocket('udp4');

  console.log('dogshit');

client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ PORT);
client.close();
});