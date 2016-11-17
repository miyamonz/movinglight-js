let fs = require('fs');
let vm = require('vm');
let Scene = require('./Scene');
let build = require('./build');

class SceneList {
    constructor() {
        this.names  = [];
        this.scenes = {};
    }
    exists(name){
        return (this.getNames().includes(name));
    }
    getScene(name) {
        if(typeof name !== "string") throw new Error("名前はstringだけです");
        if(/\.js$/.test(name)) {
            name = name.match(/(.+)\.js$/)[1];
        }
        if(this.exists(name))
            return this.getScenes()[name];
        else
            throw new Error("存在しないシーン名です: "+name);
            // console.log("存在しないシーン名です: ",name);

    }
    getNames() { return this.names; }
    getScenes() { return this.scenes; }
    load() {
        build();
        this.names = fs.readdirSync("./dst/")
            .map((file) => file.match(/^([^.]+).(js)$/)[1]);
        this.names.forEach((name)=>{
            let filepath = '../dst/'+name+".js";
            delete require.cache[require.resolve(filepath)];
            let func = require(filepath);
            this.scenes[name] = new Scene(func);
        });
        
    }
}

module.exports = SceneList;
