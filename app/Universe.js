class Universe {
    constructor(){
        //new Array ha undefined
        this.dmxCh = new Array(513);
        //osc client
        this.client;
        this.isSetClient = false;
    }
    setDmx(ch,val){
        if(typeof ch !== "number" && typeof val !== "number") 
            throw new Error("ch or val is not number");
        let numRange = false;
        if(ch  <= 0)  numRange = true;
        if(ch  > 512) numRange = true;
        if(val < 0)   numRange = true;
        if(val > 255) numRange = true;
        if(numRange) throw new Error("ch or val range is wrong");

        this.dmxCh[ch] = val;
    }
    getDmx(){
        return this.dmxCh;
    }
    setOscClient(_c){
        this.client = _c;
        this.isSetClient = true;
    }
    applyFixture(fix,addr){
        let arr = fix.getDmxArray();
        for(let i=0; i<fix.getLength(); i++){
            this.dmxCh[addr+i] = arr[i];
        }
    }
    send() {
        if(!this.isSetClient) throw new Error("client is not set");
        this.dmxCh.forEach((dmx,i) => {
            if(dmx === undefined) return;
            this.client.send("/dmx/"+i,dmx);
        })
    }
}

module.exports = Universe;
