let moment = require('moment');
let async  = require('async');
class Scene {
    constructor() {
        this.startTime;
        this.elapsedTime;
        this.sec;
        this.sceneTime = 5;

        if(typeof arguments[0] == "function")
            this.func    = arguments[0];
        this.frame = 0;
        this.isRunning = false;
    }
    init() {
        let now          = moment();
        this.startTime   = now;
        this.elapsedTime = 0;
        this.sec         = 0;
        this.frame       = 0;

    }

    start(callback) {
        if(this.isRunning) {
            console.log("alreay running"); 
            return;
        }

        this.isRunning = true;
        console.log("start!"); 
        this.init();
        async.whilst(
                () => this.isRunning && this.sec <= this.sceneTime,
                callback => {
                    this.repeatFunc.call(this);
                    setTimeout(callback, 10);
                },
                (err) => { 
                    this.isRunning = false;
                    if(callback) callback();
                }
                );
    }
    stop() {
        if(this.isRunning) {
            this.isRunning = false;
        }else{
            console.log("not running"); 
        }
    }
    repeatFunc() {
        this.before();
        this.func();
        this.after();
    }
    before() {
        let now          = moment();
        this.elapsedTime = now.diff(this.startTime);
        this.sec         = this.elapsedTime / 1000;
        console.log(`before: elapsed ${this.sec} sec`);
    }
    after(){
        this.frame++;
    }

}

module.exports = Scene;
