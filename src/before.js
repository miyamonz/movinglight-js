let Osc  = require('node-osc');

let osc = {
  send: (address, arg) => {
    let client = new Osc.Client("{{ipaddress}}", {{port}});
    client.send(address,arg, function() {
      client.kill();
    })
  }
}
//ここにmoving？
