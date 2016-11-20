let moment = require('moment');
let async  = require('async');

class Scene {
  constructor() {
    this.interval = 50;
    this.startTime;
    this.sceneLength   = moment.duration(1, "s");
    this.frame       = 0;
    this.isRunning   = false;

    this.timeNew;
    this.timeOld;

    if(typeof arguments[0] == "function")
      this.func    = arguments[0];
  }
  setLength(time) {
    this.sceneLength   = moment.duration(time, "s");
  }
  getLength(time) {
      return this.sceneLength;
  }

  //time
  getElapsedNew() { return moment.duration(this.timeNew.diff(this.startTime)); }
  getElapsedOld() { return moment.duration(this.timeOld.diff(this.startTime)); }
  getElapsedTime() {
    let endTime = moment(this.startTime).add(this.sceneLength);
    let oldTime = this.getElapsedOld();
    let newTime = this.getElapsedNew();
    //最後のフレームはぴったりのを返す（ずるい）
    if(oldTime < this.sceneLength && this.sceneLength <= newTime ) {
      this.timeNew = endTime;
      return this.sceneLength;
    }
    return newTime;
    // return this.timeNew.diff(this.startTime);
  }
  sec() {
    return this.getElapsedTime().asMilliseconds() / 1000;
  }
  at(time) {
    // time *= 1000; //milisec
    let oldTime = this.getElapsedOld();
    let newTime = this.getElapsedNew();
    return (oldTime < time && time <= newTime); 
  }

  //repeat
  init() {
    this.startTime   = moment();
    this.frame       = 0;
    this.isRunning   = true;

    this.timeNew = moment();
    this.timeOld = moment().add(-1,"ms");

  }

  start(cb) {
    if(this.isRunning) {
      console.log("alreay running"); 
      return;
    }
    this.isRunning = true;
    this.init();
    async.whilst(
        () => {
          this.timeNew = moment();
          return  this.isRunning && this.getElapsedTime() <= this.sceneLength;
        },
        callback => {
          this.repeatFunc();
          setTimeout(callback, this.interval);
        },
        (err) => { 
          this.isRunning = false;
          if(cb) cb();
        }
        );
  }
  stop() {
    if(this.isRunning) {
      this.isRunning = false;
    }else{
    }
  }
  repeatFunc() {
    this.func(this.getElapsedTime().asMilliseconds());
    this.after();
  }
  after(){
    this.frame++;
    this.timeOld = this.timeNew;
  }

}

module.exports = Scene;
