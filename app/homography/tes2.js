let RectMapper = require('./RectMapper.js');
let rectMapper = new RectMapper();
let fs = require('fs');
let json = JSON.parse( fs.readFileSync("./rect.json") );
console.log(json);
rectMapper.setJson(json);
let v = rectMapper.multi([4,0]);
console.log(v);

