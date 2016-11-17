let receiveArg;
function findMessageRecur(msgArg, obj, value) {
    var keys = Object.keys(obj);
    if(!keys.includes(msgArg[0])) {
        console.log("keyが見つかりませんでした");
        console.log("key:  ", msgArg[0]);
        console.log("keys: ", keys);
        return;
    }

    var found = msgArg[0];
    msgArg.shift();
    //objectなら下の階層へ
    if(typeof obj[found] === "object") 
        arguments.callee(msgArg, obj[found], value);
    //functionなら実行
    else if(typeof obj[found] === "function") 
        obj[found](value);
    //number, stringなら上書き
    else if(["number", "string"].includes(typeof obj[found])) {
        if(typeof value[0] === typeof obj[found]) 
            obj[found] = value[0];
        else {
            console.log("find",receiveArg, obj[found]);
        }
    }
}

function getRecur(msgArg, obj) {
    var keys = Object.keys(obj);
    if(!keys.includes(msgArg[0])) return;

    var found = msgArg[0];
    msgArg.shift();
    //objectなら下の階層へ
    if(typeof obj[found] === "object") 
        return arguments.callee(msgArg, obj[found]);
    else {
        //number, stringなら上書き
        if(["number", "string"].includes(typeof obj[found])) {
            return obj[found];
        } else
            return;
    }
}

function foreach(obj, callback){
    Object.keys(obj).forEach((key) => {
        if(typeof obj[key] === "object") {
            let keys2 = Object.keys(obj[key]);
            if(keys2.length == 0) delete obj[key];
            else
                arguments.callee(obj[key], callback);
            
            keys2 = Object.keys(obj[key]);
            if(keys2.length == 0) delete obj[key];
        }else if(typeof obj[key] === "function"){
            delete obj[key];
        }
    })
}

class OscJson {
    constructor(obj) {
        this.obj = obj;
        this.message;
    };

    //arg = ['/osc/abo', "text", 1000]
    send(arg) {
        if(!arg) {
            console.log("arg is undefined");
            return;
        }
        this.message = arg[0];
        receiveArg = this.message;
        var splited = arg.shift().split('/');
        var value = arg;
        if(splited.shift() !== '') throw new Error('message should start / .');
        findMessageRecur(splited, this.obj, value);
    }
    getArg(arg) {
        var splited = arg.shift().split('/');
        var value = arg;
        if(splited.shift() !== '') throw new Error('message should start / .');
        return getRecur(splited, this.obj);
    }
    log() {
        console.log(this.obj);
    }
    getJson() {
        let obj = this.obj;
        foreach(obj);
        return obj;
    }
    setJson() {
        
    }

}

module.exports = OscJson;
