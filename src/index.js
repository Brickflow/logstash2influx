'use strict'
var influx = require('influx');
var dgram = require('dgram');

module.exports = function(conf) {
  var client = influx(conf.influx);
  var server = dgram.createSocket('udp4');

  server.on('listening', function () {
    var address = server.address();
    console.log('UDP server listening on ' + address.address + ':' +
        address.port + ' for logstash events.');
  });

  server.on('message', function (message, remote){
    var transformedMessage = {};
    console.log('DATA:', remote.address + ':' + remote.port + '-' + message);
    try {
      transformedMessage = JSON.parse(message.toString());
    } catch(err){
      console.log('cannot parse logstash JSON');
      transformedMessage = {message: "cannot parse logstash JSON"};
    } finally {
      client.writePoint(transformedMessage.message, transformedMessage,{}, function(err, res){
        if(!err){
          console.log('DATA LOGGED');
        }
      })
    }
  });

  server.bind(conf.logstash.port, conf.logstash.host);
};
