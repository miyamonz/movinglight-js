let fs = require('fs');
let Scene = require('./Scene');
let build = require('./build.js');
// let global = ("global", eval)("this");
// var global = Function("return this")();


let list = {
    sceneList: {},
    load: function() {
        build();

        let sceneNameList = fs.readdirSync("scene/").filter((file) => /.js$/.test(file));
        sceneNameList.forEach((filename)=>{
            let func = require('./dst/'+filename);
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
