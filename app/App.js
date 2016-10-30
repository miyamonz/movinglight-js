let SceneList = require('./SceneList.js');

class App {
    constructor() {
        this.sceneList = new SceneList();
    }
    getNames() {
        return this.sceneList.getNames();
    }
    start(name, callback) {
        if(this.sceneList.exists(name))
            this.sceneList.getScene(name).start(callback);
    }
    stop(name, callback) {
        if(this.sceneList.exists(name))
            this.sceneList.getScene(name).stop(callback);
    }
    stopAll(callback) {
        this.sceneList.getNames().forEach((name) => {
            this.stop(name);
        })
    }
    load() {
        this.stopAll();
        this.sceneList.load(); 
    }
    
}

module.exports = App;
