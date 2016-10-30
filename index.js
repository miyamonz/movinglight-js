let osc = require('node-osc');
let oscServer = new osc.Server("3001", 'localhost');          

let Scene = require('./Scene');
let list = require('./sceneList.js');

list.load();
console.log("osc server running at localhost 3001");
oscServer.on("message", function(msg, rinfo){            
    console.log("message:");                         

    if(msg[0] == "/start") {
        if(typeof msg[1] === "string" && list.exist(msg[1])) {
            list.getScene(msg[1]).start(() => {
                console.log("おわり");
            });

        }else{
            console.log(`存在しません: ${msg[1]}`);
        }

    }
    if(msg[0] == "/stop") {
        if(typeof msg[1] === "string" && list.exist(msg[1])) {
            list.getScene(msg[1]).stop();
        }else{
            console.log(`存在しません: ${msg[1]}`);
        }
    }
    if(msg[0] == "/stop/all") {
        Object.keys(sceneList).forEach((key)=>{
            sceneList[key].stop();
        })
    }
})


