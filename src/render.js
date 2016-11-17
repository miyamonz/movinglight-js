{{&before}}
module.exports = function(time) {
    let sec = time /1000;
    let at = (time,func) => {
        if(this.at(time)) func();
    }
{{&file}}
}
