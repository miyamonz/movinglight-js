console.log(time);
this.setLength(100);


let theta = time /1000 * 2;
let tilt = (Math.sin(theta)+1) * 90;

inno.sendPan(tilt);
