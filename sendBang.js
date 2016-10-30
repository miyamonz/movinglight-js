var osc = require('node-osc');

var client = new osc.Client('localhost', 3001);

var message = "/start";
var arg = "scene1";
console.log("send " +message+" " + arg);
client.send(message, arg, function(){
    client.kill();
});
