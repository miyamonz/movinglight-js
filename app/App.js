let SceneList = require('./SceneList.js');
let fs = require('fs');

class App {
    constructor() {
        this.sceneList = new SceneList();
        this.autoStart = false;
    }
    getNames() {
        return this.sceneList.getNames();
    }
    start(name, callback) {
        try {
            this.sceneList.getScene(name).start(callback);
        }catch(e){
            console.log(e);
        }
    }
    stop(name, callback) {
        try {
            this.sceneList.getScene(name).stop(callback);
        }catch(e){
            console.log(e);
        }
    }
    stopAll(callback) {
        this.sceneList.getNames().forEach((name) => {
            this.stop(name);
        })
    }
    load() {
        this.stopAll();
        try {
            this.sceneList.load(); 
            console.log("loaded");
        }catch(e){
            console.log(e);
        }
    }
    watch() {
        console.log("start watching scene folder")
            fs.watch('./scene/',(event, filename) => {
                let isRename = event === "rename" && /\.js$/.test(filename);
                let isChange = event === "change" && /\.js$/.test(filename);
                if(isRename || isChange)  { 
                    console.log("---file saved!----");
                    this.load();
                    if(this.autoStart) {
                        console.log("auto bang")
                        this.start(filename);
                    }

                } else {
                    console.log("- - - - -", event, filename);
                }
            })
    }

}

module.exports = App;
