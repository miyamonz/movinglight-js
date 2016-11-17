let RectMapper = require('./RectMapper.js');
let rectMapper = new RectMapper();

rectMapper.setSrcRect(10,10);
rectMapper.setDmxPan(0);
rectMapper.setDmxTilt(0);
rectMapper.next();
rectMapper.setDmxPan(11);
rectMapper.setDmxTilt(11);
rectMapper.next();
rectMapper.setDmxPan(21);
rectMapper.setDmxTilt(11);
rectMapper.next();
rectMapper.setDmxPan(11);
rectMapper.setDmxTilt( 1);

let v = rectMapper.multi([11, 10]);
console.log(rectMapper.dstRect)
console.log(v);

console.log(rectMapper.getJson());

let fs = require('fs');
// fs.writeFileSync(__dirname+"/rect.json", JSON.stringify(rectMapper.getJson()));
