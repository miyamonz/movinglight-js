let Osc  = require('node-osc');

let client = new Osc.Client("{{ipaddress}}", {{port}});
let osc = {
  send: (address, arg) => {
    client.send(address,arg);
  }
}

let InnoPocket = require("../util/InnoPocket.js");
let rectJson = require("../rect.json");
let inno = rectJson.map( e => {
    let inno = new InnoPocket(e.address);
    inno.setJson();
    inno.setOscClient(client);
    return inno
})

//ここにmoving？
