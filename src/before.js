const Osc  = require('node-osc');
const client = new Osc.Client("{{ipaddress}}", {{port}});
const osc = {
  send: (address, arg) => {
    client.send(address,arg);
  }
}
//benri func
const lerp  = require('../util/lerp.js');
const clip = (min, max, t) => (t < min) ? min : (max < t) ? max : t;
const sin   = t => Math.sin(t);
const cos   = t => Math.cos(t);
const sin2pi  = t => Math.sin(t * 2 * Math.PI);
const cos2pi  = t => Math.cos(t * 2 * Math.PI);
const tan   = t => Math.tan(t);
const asin  = t => Math.asin(t);
const acos  = t => Math.acos(t);
const atan  = t => Math.atan(t);
const PI    = Math.PI;
const TWO_PI   = 2 * PI;
const floor = t => Math.floor(t);
const round = t => Math.round(t);

//inno pocket
const InnoPocket = require("../util/InnoPocket.js");
const fs = require('fs');
const rectJson = JSON.parse(fs.readFileSync("rect.json").toString());
const inno = rectJson.map( (e,i) => {
    const inno = new InnoPocket(e.address);
    inno.setJson(rectJson[i].points);
    inno.setOscClient(client);
    return inno
})
