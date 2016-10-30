let osc = require('node-osc');
let oscServer = new osc.Server("3001", 'localhost');          

let Scene = require('./Scene');

// let func = function() {
//     console.log(this.sec);
//     console.log("やっaほ");
// }
// let scene = new Scene(func);
let scene = new Scene(function() {
  console.log(`経過時間は${this.sec}だよん`);
});

let sceneList = {};
sceneList["scene1"] = scene;

console.log("osc server running at localhost 3001");
oscServer.on("message", function(msg, rinfo){            
  console.log("message:");                         

  if(msg[0] == "/start") {
    if(typeof msg[1] === "string" && sceneList[msg[1]]) {
      scene.start(() => {
        console.log("おわり");
      });

    }else{
      console.log(`存在しません: ${msg[1]}`);
    }

  }
  if(msg[0] == "/stop") {
    if(typeof msg[1] === "string" && sceneList[msg[1]]) {
      scene.stop();

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


