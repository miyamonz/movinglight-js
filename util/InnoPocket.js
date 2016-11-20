let Osc        = require('node-osc');
let async      = require('async');
let RectMapper = require('../app/homography/RectMapper.js');

const fs   = require('fs')
const path = require('path')
const lerp = require('./lerp.js')

class InnoPocket {
    constructor(addr, client) {
        this.startAddr  = addr;
        this.ch    = 11;
        this._pan   = 0; //0~540
        this._tilt  = 0; //0~180

        this._color = 0;
        this._dimmer = 0;
        this._gobo = 0;
        this._isShake = false;

        this.isReady = false;

        this.setOscClient(client);

        this.dmxPan  = [0,0];
        this.dmxTilt = [0,0];
        this.rectMapper = new RectMapper();
    }
    setOscClient(client) {
        this.client = client;
        this.isReady = true;
    }

    // get pan()     { return this._pan; }
    // get tilt()    { return this._tilt; }

    sendDmx(offset, val, callback) {
        if(callback === undefined) callback = (t) => {};
        this.client.send("/dmx/" + (this.startAddr + offset), val, callback);
    }
    sendPanTilt(name, val, _callback) {
        var range, adrOffset;
        if(name === "pan") {
            range = 540;
            adrOffset = 0;
            this._pan = val
        } else if(name === "tilt") {
            range = 180;
            adrOffset = 2;
            this._tilt = val
        }else { return; }

        if(!this.isReady) {
            console.log("not init");
            return;
        }
        let bunkatsu = Math.floor(val/range*256*256);
        let ch1 = Math.floor(bunkatsu / 256);
        let ch2 = bunkatsu % 256;
        if(ch1 >= 256) {
            ch1 = 255;ch2 = 255;
        }
        let send1 = (callback) => this.sendDmx(adrOffset + 0,ch1, () => callback() );
        let send2 = (callback) => this.sendDmx(adrOffset + 1,ch2, () => callback() );
        async.parallel( [send1, send2 ], () =>  {
            if(_callback !== undefined) _callback();
        }); 

        if(name === "pan") {
            this.dmxPan = [ch1, ch2];
        }else if(name === "tilt"){
            this.dmxTilt = [ch1, ch2];
        }
    }

    sendPan(val, callback) {
        console.log("depracted. use this.pan(arg, callback)");
        this.pan(val,callback);
    }
    pan(val, callback){
        this.sendPanTilt("pan", val, callback);
    }
    sendTilt(val, callback) {
        console.log("depracted. use this.tilt(arg, callback)");
        this.tilt(val,callback);
    }
    tilt(val, callback) {
        this.sendPanTilt("tilt", val, callback);
    }

    sendOn(bool) {
        console.log("depracted. use this.light(bool)");
        this.light(bool);
    }
    light(bool) {
        let val = bool ? 255 : 0;
        this.strobe(val);
        this.dimmer(255);
    }

    //strobe
    sendStrobe(val) {
        console.log("depracted. use this.strobe(arg)");
        this.strobe(val);
    }
    strobe(val) {
        //val float
        // dmx 15..132 118段階 
        // 0 117
        // 15はclose 132はopen
        let dmx = 0;
        // let dmx = val * 117 + 15;
        if(val <= 0) dmx = 0;
        if(0 < val && val <= 117) dmx = val + 15; 
        if(117 < val)             dmx = 255; 
        this.sendDmx(6, dmx);
    }

    //dimmer
    sendDimmer(arg) {
        console.log("depracted. use this.dimmer(arg)");
        this.dimmer(arg);
    }
    dimmer(val) {
        val = Math.floor(val);
        if(val < 0) val = 0;
        if(val > 255) val = 255;
        this.sendDmx(7, val);
    }

    //gobo
    gobo(val) {
        val = (val < 0) ? 0 : (val >= 7) ? 7 : val;
        val *= 8;
        val += this._isShake ? 64 : 0;
        this.sendDmx(5, val);
    }
    isShake() {
        return this._isShake;
    }

    //black out
    blackOut(name,bool) {
        if(name      === "color")   val = bool ?  90 : 100;
        else if(name === "pantilt") val = bool ?  80 :  90;
        else if(name === "gobo")    val = bool ? 110 : 120;
        else if(name === "all")  {
            this.blackOut("color",   bool);
            this.blackOut("pantilt", bool);
            this.blackOut("gobo",    bool);
            return;
        }else if(name === "reset") val = 200;
        else{
            console.log('this.blackOut(name,bool). name = "color", "gobo","pantilt", "all", "reset" is available');
            return;
        }
        this.sendDmx(9,val);
    }

    //color
    sendColor(arg) {
        console.log("depracted. use this.color(arg)");
        this.color(arg);
    }
    color(arg) {
        let colorString = ["white","red","orange","yellow","green","blue","lightblue","pink"];
        let colorDmx = [ 0,10,20,25,30,40,45,55];
        let dmx;
        if(typeof arg === "number") {
            if(arg < 0)                arg = 0;
            if(colorDmx.length <= arg) arg = colorDmx.length-1;
            dmx = colorDmx[arg];
        }else if(typeof arg === "string") {
            if(colorString.includes(arg)){
                let index = colorString.indexOf(arg);
                dmx = colorDmx[index];
            }else dmx = 190; //なにもしない
        }
        this.sendDmx(4, dmx);
    }

    setAsCorner(index){
        this.rectMapper.setDeg(this._pan, this._tilt, index)
    }
    point(x,y) {
        if(typeof x !== "number"){
            y = x[1]
            x = x[0]
        }
        if(!this.rectMapper.isReady()) return false;
        let theta = this.rectMapper.calcDeg(x,y);
        this.pan(theta.pan)
        this.tilt(theta.tilt)
        return [this._pan, this._tilt]
    }
    getJson() {
        return {
            address: this.startAddr,
            points: this.rectMapper.getJson()
        }
    }
    setJson(json) {
        //rect.json .points
        this.rectMapper.setJson(json);
    }
    saveJson(filename = "rect.json"){
        let rectJson;
        let filePath = path.join(__dirname, "..", filename)
        try {
            rectJson = JSON.parse(fs.readFileSync(filePath).toString());
        } catch(e) {
            console.log(e);
            rectJson = []
        }
        let isExist = rectJson.some( e => e.address === this.startAddr )
        if(!isExist) rectJson.push(this.getJson());
        else {
            rectJson.forEach((p,i) => {
                if(p.address === this.startAddr) rectJson[i] = this.getJson();
            })
        }
        fs.writeFileSync(filePath, JSON.stringify(rectJson, null, "    "));
        return rectJson
    }
}

module.exports = InnoPocket;
