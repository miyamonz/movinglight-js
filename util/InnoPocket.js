let Osc = require('node-osc');
let async = require('async');
let RectMapper = require('../app/homography/RectMapper.js');
function lerp(x0,x1, y0,y1, x) {
    return y0 + (y1-y0) * (x-x0) / (x1-x0);
}
class InnoPocket {
    constructor(addr, client) {
        this.StartAddr  = addr;
        this.ch    = 11;
        this._pan   = 0; //0~540
        this._tilt  = 0; //0~180

        this.color = 0;
        this.dimmer = 0;

        this.isReady = false;

        this.setOscClient(client);

        this.dmxPan  = [0,0];
        this.dmxTilt = [0,0];
        this.rectMapper = new RectMapper();
        // this.isClose = true;
    }
    // setOscClient(address, port) {
    //     this._address = address;
    //     this._port = port;
    //     this.client = new Osc.Client(address, port); 
    //     this.isClose = false;
    //     this.client._sock.on("close", () => this.isClose = true );
    //     this.isReady  =true;
    // }
    setOscClient(client) {
        this.client = client;
        this.isReady = true;
    }

    get pan()     { return this._pan; }
    set pan(val)  { this._pan = val; }
    get tilt()    { return this._tilt; }
    set tilt(val) { this._tilt = val; }

    sendDmx(offset, val, callback) {
        this.client.send("/dmx/" + (this.StartAddr + offset), val, callback);
    }
    sendPanTilt(name, val, _callback) {
        if(name === "pan") {
            var range = 540;
            var adrOffset = 0;
        } else if(name === "tilt") {
            var range = 180;
            var adrOffset = 2;
        }else { return; }

        if(!this.isReady) {
            console.log("not init");
            return;
        }
        if(val !== undefined) 
            this._pan = val;
        let bunkatsu = Math.floor(this._pan/range*256*256);
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
    sendPan(val, callback){
        this.sendPanTilt("pan", val, callback);
    }
    sendTilt(val, callback) {
        this.sendPanTilt("tilt", val, callback);
    }
    sendOn(bool) {
        let val = bool ? 255 : 0;
        this.sendStrobe(val);
    }
    sendStrobe(val, callback) {
        // val 15..132 118段階 
        // 15はclose 132はopen
        let dmx = 0;
        if(val <= 0) dmx = 0;
        if(0 < val && val <= 117) dmx = val + 15; 
        if(117 < val)             dmx = 255; 
        let sendStrobe = (callback) => this.sendDmx(6, dmx, () => callback() );
        async.series([sendStrobe], () => {
            if(callback !== undefined) callback();
        })
    }
    sendDimmer(val, callback) {
        val = Math.floor(val);
        if(val < 0) val = 0;
        if(val > 255) val = 255;
        let sendDimmer = (callback) => this.sendDmx(7, val, () => callback() );
        async.series([sendDimmer], () => {
            if(callback !== undefined) callback();
        })
    }
    sendColor(arg, callback) {
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
        let func = (callback) => this.sendDmx(4, dmx, () => callback() );
        async.series([func], () => {
            if(callback !== undefined) callback();
        })
    }

    setAsCorner(index){
        this.rectMapper.index = index;
        this.rectMapper.setDmxPan(  this.dmxPan[0]  + this.dmxPan[1]/256); 
        this.rectMapper.setDmxTilt( this.dmxTilt[0] + this.dmxTilt[1]/256); 
    }
    point(x,y) {
        this.rectMapper.multi([x,y]);
    }
    getJson() {
        return this.rectMapper.getJson();
    }
    setJson(json) {
        this.rectMapper.setJson(json);
    }
}

module.exports = InnoPocket;
