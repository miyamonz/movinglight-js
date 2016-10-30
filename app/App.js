let list = require('./sceneList.js');

class App {
    constructor() {
        this.sceneList = list;
    }
    getNames() {
        return Object.keys(this.sceneList);
    }
    start(name, callback) {
        if(typeof name !== "string") return;
        if(getNames().include(name)) 
            this.sceneList[name].start();
        else
            console.log("存在しないscene名");
    }
    stop(name, callback) {
        if(typeof name !== "string") return;
        this.sceneList[name].stop();
    }
    stopAll(callback) {
        getNames().forEach((key) => {
            this.sceneList[key].stop();
        })
    }
    
}

module.exports = App;
