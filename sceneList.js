let fs = require('fs');
let Scene = require('./Scene');

// let global = ("global", eval)("this");
// var global = Function("return this")();


let list = {
    sceneList: {},
    load: function() {
        let sceneNameList = fs.readdirSync("scene/").filter((file) => /.js$/.test(file));
        sceneNameList.forEach((filename)=>{
            let file = fs.readFileSync("./scene/scene1.js").toString();
            file = "var func = function() {" + file + "}";
            eval(file);
            let key = filename.match(/^([^.]+).(js)$/)[1];
            this.sceneList[key] = new Scene(func);
        })

    },
    getScene:function(name) {
        return this.sceneList[name];
    },
    exist: function(name) {
        return name in this.sceneList;
    }
}

module.exports = list;
