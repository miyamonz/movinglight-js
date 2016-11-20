
this.setLength(2);
let pan = 292;
let tilt = 90;


let l = 2;
pan  += Math.sin(time/1000 / l * 2 * Math.PI)*40;
tilt += Math.cos(time/1000 / l * 2 * Math.PI)*20;

inno.sendPan(pan);
inno.sendTilt(tilt);

console.log(this.frame);
if(this.frame % 100 == 0) {
    let i = this.frame / 100;
    i %= 6;
    inno.sendColor(i);
}
