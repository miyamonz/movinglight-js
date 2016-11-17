let osc = require('node-osc');
let oscServer = new osc.Server("3002", 'localhost');          
let App = require('./app/App.js');
let app = new App(); 
app.load();

let InnoPocket = require('./util/InnoPocket.js');
let RectMapper = require('./app/homography/RectMapper.js');
let rectMapper = new RectMapper();

let client = new osc.Client("localhost", 7700);
let inno = new InnoPocket(101, client);

app.watch();
app.autoStart = true;
let OscJson = require('./util/OscJson.js');
let json = {
    "scene": {
        autoStart: function(msg) {
            app.autoStart = msg[1] == 1 ? true : false;
        },
        "start": function() {
            let arg = arguments[0];
            app.start(arg[0]);
        },
        "stop": function() {
            let arg = arguments[0];
            app.stop(arg[1]);
        },
        "load": function() {
            let arg = arguments[0];
            app.load();
        },
        "stopAll": function() { app.stopAll(); }
    },
    "mapping": {
        "pantilt": function() {
            let msg = arguments[0];
            console.log(arguments[0]);
            inno.sendOn(true);
            inno.sendDimmer(255);
            inno.sendColor(0);
            inno.sendPan(  msg[0]);
            inno.sendTilt( msg[1]);
        },
        "setCorner": function() {
            inno.setAsCorner(arguments[0][0]);
        },
        "save": function() {
            let fs = require('fs');
            fs.writeFileSync("rect.json", JSON.stringify(inno.getJson()));
            console.log("saved");
            console.log(inno.getJson());
        },
        "test": function() {
            console.log("test");
        }
    }
}
let oscJson = new OscJson(json);
console.log("osc server running at localhost 3002");
oscServer.on("message", function(msg, rinfo){            
    console.log("message: ", msg);                         
    oscJson.send(msg);
})


