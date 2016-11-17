const InnoPocket = require('./InnoPocket.js');
const sleep = require('sleep');
const async = require('async');
const Client = require('node-osc').Client;
let client = new Client("localhost", 7700);
let inno = new InnoPocket(101);
inno.setOscClient(client);

initFunc = (callback) => {
    inno.sendPan(0);
    inno.sendDimmer(255);
    inno.sendColor("white");
    setTimeout(callback, 1000);
};

let n = 0;
let max = 15;
each = [
    () => n<=max,
    (callback) =>  {
        // inno.sendPan(n/max*540);
        inno.sendTilt(n/max *90);
        inno.sendDimmer(255);
        inno.sendColor("white");
        n++;
        setTimeout(callback, 500);
    },
    () =>client.kill()
]
async.series([
        initFunc,
        () => async.whilst(each[0], each[1], each[2])
])
//todo
//pointモード　
//そのためにはchannel全部保存せな
