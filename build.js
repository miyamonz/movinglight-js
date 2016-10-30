let fs = require('fs');

build();
function build() {
    let sceneNameList = fs.readdirSync("scene/").filter((file) => /.js$/.test(file));
    console.log(sceneNameList)
    sceneNameList.forEach((filename)=>{
        let file = fs.readFileSync("./scene/scene1.js").toString();
        file = "module.exports = function() {\n" + file + "};";
        fs.writeFileSync("dst/"+filename, file);
    });

    var func = require('./dst/scene1.js');
    func();
}
