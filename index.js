let osc = require('node-osc');
let oscServer = new osc.Server("3001", 'localhost');          

let Scene = require('./app/Scene');
let App = require('./app/App.js');
let app = new App(); 
app.load();

console.log("osc server running at localhost 3001");

oscServer.on("message", function(msg, rinfo){            
    console.log("message: ", msg);                         
    if(msg[0] == "/start")
        app.start(msg[1]);
    if(msg[0] == "/stop")
        app.stop(msg[1]);
    if(msg[0] == "/stop/all") 
        app.stopAll();
    if(msg[0] == "/load") 
        app.load();
})


