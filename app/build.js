let fs = require('fs');
let Mustache = require('mustache');
let config = require('../config.json');

module.exports = function build() {
    let sceneNameList = fs.readdirSync("./scene/").filter((file) => /.js$/.test(file));
    console.log(sceneNameList)
    sceneNameList.forEach((filename)=>{
        let before = fs.readFileSync("./src/before.js").toString();
        let view = {
            before: ()=> Mustache.render(before, config), 
            file: ()=> fs.readFileSync("./scene/scene1.js").toString(),
            port: 3000,
        };
        let render = fs.readFileSync("./src/render.js").toString();
        let dstText = Mustache.render(render,view);
        fs.writeFileSync("./dst/"+filename, dstText);
    });
}
