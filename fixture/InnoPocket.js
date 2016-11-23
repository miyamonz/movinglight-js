require('../util/math.js');
const Fixture = require('./Fixture.js')

class InnoPocket extends Fixture {
    constructor() {
        super();
        super.setLength(11);
        super.setNames([
            "pan1"  ,
            "pan2"  ,
            "tilt1" ,
            "tilt2" ,
            "color" ,
            "gobo"  ,
            "strobe",
            "dimmer",
            "speed" ,
            "func"  ,
            "curve" ,
        ]);

        //color
        this.colorString = ["white","red","orange","yellow","green","blue","lightblue","pink"];
        this.colorDmx = [ 0,10,20,25,30,40,45,55];
        this._gobo = 0;
        this._isShake = false;

        this.isReady = false;

        this.dmxPan  = [0,0];
        this.dmxTilt = [0,0];
    }
    getPanTilt(val, range) {
        let bunkatsu = Math.floor(val/range*256*256);
        let ch1 = Math.floor(bunkatsu / 256);
        let ch2 = bunkatsu % 256;
        if(ch1 >= 256) {
            ch1 = 255;ch2 = 255;
        }
        return [ch1,ch2];
    }
    pan(val){
        let ch = this.getPanTilt(val,540);
        super.setByName("pan1",ch[0]);
        super.setByName("pan2",ch[1]);
    }
    tilt(val) {
        let ch = this.getPanTilt(val, 180);
        super.setByName("tilt1",ch[0]);
        super.setByName("tilt2",ch[1]);
    }

    //color
    color(arg) {
        let dmx;
        if(typeof arg === "number") {
            if(arg < 0)                arg = 0;
            if(colorDmx.length <= arg) arg = this.colorDmx.length-1;
            dmx = this.colorDmx[arg];
        }else if(typeof arg === "string") {
            if(this.colorString.includes(arg)){
                let index = this.colorString.indexOf(arg);
                dmx = this.colorDmx[index];
            }else dmx = 190; //なにもしない
        }
        super.setByName("color",dmx);
    }
    printColor(){
        console.log(this.colorString);
    }

    //gobo
    gobo(val) {
        val = clamp(val, 0,7);
        this._gobo = val;
        val *= 8;
        val += this._isShake ? 64 : 0;
        super.setByName("gobo",val);
    }
    shake(bool){
        if(typeof bool !== "boolean") throw new Error("shake must be bool");
        this._isShake = bool;
        this.gobo(this._gobo);
    }
    isShake() {
        return this._isShake;
    }
    //gobo
    gobo(val) {
        val = clamp(val, 0,7);
        this._gobo = val;
        val *= 8;
        val += this._isShake ? 64 : 0;
        super.setByName("gobo",val);
    }
    shake(bool){
        if(typeof bool !== "boolean") throw new Error("shake must be bool");
        this._isShake = bool;
        this.gobo(this._gobo);
    }
    isShake() {
        return this._isShake;
    }
    light(bool) {
        let val = bool ? 255 : 0;
        this.strobe(val);
        this.dimmer(255);
    }

    //strobe
    strobe(val) {
        //val float
        // dmx 15..132 
        // 15はclose 132はopen
        // 0 ~117 の118段階
        let dmx = 0;
        // let dmx = val * 117 + 15;
        if(val <= 0) dmx = 0;
        if(0 < val && val <= 117) dmx = val + 15; 
        if(117 < val)             dmx = 255; 
        // this.sendDmx(6, dmx);
        super.setByName("strobe", dmx);
    }

    //dimmer
    dimmer(val) {
        val = Math.round(val);
        val = clamp(val,0,255);
        super.setByName("dimmer", val);
    }

    //speed
    speed(val){
        val = clamp(val, 0, 255);
        super.setByName("speed",val);

    }

    //black out
    blackOutPos(bool){
        if(typeof bool !== "boolean") throw new Error("blackout only get boolean")
        let val = bool ?  80 :  90;
        super.setByName("func", val);
    }
    blackOutColor(bool){
        if(typeof bool !== "boolean") throw new Error("blackout only get boolean")
        let val = bool ?  90 : 100;
        super.setByName("func", val);
    }
    blackOutGobo(bool){
        if(typeof bool !== "boolean") throw new Error("blackout only get boolean")
        let val = bool ? 110 : 120;
        super.setByName("func", val);
    }
    blackOutAll(bool){
        if(typeof bool !== "boolean") throw new Error("blackout only get boolean")
        this.blackOutPos(bool);
        this.blackOutColor(bool);
        this.blackOutGobo(bool);
    }

    //curve
    curve(name){
        if(typeof name !== "string") throw new Error("curve only get string");
        let dmx;
        if(name === "standard")     dmx = 0;
        if(name === "stage")        dmx = 1;
        if(name === "tv")           dmx = 2;
        if(name === "architectual") dmx = 3;
        if(name === "theater")      dmx = 4;
        if(name === "default")      dmx = 5;
        if(dmx === undefined) throw new Error(`invalid name ${name}`);
        dmx = dmx*43;
        super.setByName("curve", dmx);
    }
}

module.exports = InnoPocket;
