this.setLength(100);

let w = 30;
let h = 30;
let rect = [
    [0,0],
    [w,0],
    [w,h],
    [0,h]
]
rect = rect.map(p => {
    return [p[0]+270, p[1]+10];
})

for(let i=0; i<100; i++){
    at(i*1000+1, () => {
        console.log(time);
        // inno.sendPan(i*10);
        // inno.sendTilt(0);
        inno.sendOn(true);
        inno.sendDimmer(255);
        inno.sendPan(rect[i%4][0]);
        inno.sendTilt(rect[i%4][1]);
        inno.sendColor(i%4);

    });
}
return;
// inno.sendPan(time/this.getLength()*540);
var kaku = (Math.sin(1 * time/3000)+1)*30;
inno.sendPan(230+kaku);
var kaku = (Math.sin(2 * time/3000)+1)*20;
inno.sendTilt(0+kaku);
