this.setLength(10);
console.log(this.sec());
var now = this.sec();
// osc.send("/hia", now);

var num = 10;
for(let i=0; i<num; i++){
  if(this.at(i))
    osc.send("/num", i/num);

}
