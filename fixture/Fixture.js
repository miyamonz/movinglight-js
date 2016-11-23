class Fixture {
    constructor(){
        this.array = [];
        this.isSetLength = false;
        this.nameToIndex = {};
    }
    //todo addname すればlength必要ないかも
    setLength(num){
        if(typeof num !== "number") throw new Error("num should be number");
        for(let i=0; i<num; i++){
            this.array[i] = undefined;
        }
        this.isSetLength = true;
    }
    getLength(){
        return this.array.length;
    }
    setNames(nameArray){
        if(typeof nameArray[0] !== "string") throw new Error("names should be string");
        nameArray.forEach((name,i) => {
            this.nameToIndex[name] = i;
        })
    }
    addName(index, name){
        if(typeof name  !== "string") throw new Error("name should be string");
        this.nameToIndex[name] = index;
    }
    setByName(name, val) {
        if(typeof val !== "number") throw new Error("val should be number");
        if(typeof name  !== "string") throw new Error("name should be string");
        if(val<0) throw new Error("val cant less than 0");
        if(val>255) throw new Error("val cant more than 255");
        this.array[this.nameToIndex[name]] = Math.floor(val);

    }
    getDmxArray() {
        if(!this.isSetLength) throw new Error('length is not set');
        return this.array;
    }
}
module.exports = Fixture;
