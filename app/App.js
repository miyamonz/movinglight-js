let list = require('./sceneList.js');

class App {
    constructor() {
        this.sceneList = list;
    }
    getNames() {
        return Object.keys(this.sceneList.getScenes);
    }
    start(name, callback) {
        if(typeof name !== "string") return;
        if(getNames().include(name)) 
            this.sceneList.getScene(name).start();
        else
            console.log("存在しないscene名");
    }
    stop(name, callback) {
        if(typeof name !== "string") return;
        this.sceneList.getScene(name).stop();
    }
    stopAll(callback) {
        getNames().forEach((name) => {
            this.sceneList.getScene(name).stop();
        })
    }
    load() {
    }
    
}

module.exports = App;
