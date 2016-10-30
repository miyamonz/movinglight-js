let fs = require('fs');
let vm = require('vm');
let Scene = require('./Scene');
let build = require('./build.js');

// let list = {
//     sceneList: {},
//     load: function() {
//         this.sceneList = {};
//         build();
//         let sceneNameList = fs.readdirSync("./dst/").filter((file) => /.js$/.test(file));
//         sceneNameList.forEach((filename)=>{
//             //require!!?!?
//             let func = require('../dst/'+filename);
//             let key = filename.match(/^([^.]+).(js)$/)[1];
//             this.sceneList[key] = new Scene(func);
//         })
//     },
//     getScene: function(name) {
//         return this.sceneList[name];
//     },
//     exist: function(name) {
//         return name in this.sceneList;
//     }
// }
// function addjs(name) {
//     if(/.js$/.test(name)) return name;
//     else return name+".js"; 
// }

class SceneList {
    constructor() {
        this.names  = [];
        this.scenes = {};
    }
    exists(name){
        if(!this.getNames().includes(name)) console.log("いないよ");
        return (this.getNames().includes(name));
    }
    getScene(name) {
        if(typeof name !== "string") return;
        if(this.exists(name))
            return this.getScenes()[name];
        else
            console.log("dont exist")
    }
    getNames() { return this.names; }
    getScenes() { return this.scenes; }
    load() {
        build();
        this.names = fs.readdirSync("./dst/")
            .map((file) => file.match(/^([^.]+).(js)$/)[1]);
        this.names .forEach((name)=>{
            let filepath = '../dst/'+name+".js";
            console.log(require.resolve(filepath));
            delete require.cache[require.resolve(filepath)];
            let func = require(filepath);
            this.scenes[name] = new Scene(func);
        });
    }
}

module.exports = SceneList;
