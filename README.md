# logstash2influx

require('logstash2influx')({
  influx: { host, port, username, password, database },
  logstash: { host, port }
});