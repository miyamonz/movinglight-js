const Osc  = require('node-osc');
const client = new Osc.Client("{{ipaddress}}", {{port}});
const osc = {
  send: (address, arg) => {
    client.send(address,arg);
  }
}
const lerp = require('../util/lerp.js');

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
