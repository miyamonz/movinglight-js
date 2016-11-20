
this.setLength(5000);
let theta;

theta = time / 400;
inno.sendPan(267 + Math.sin(theta) * 30);
inno.sendTilt(20 + Math.sin(theta * 2) * 15);
