this.setLength(100);
let pos = [];
pos[0] = [[100,40],[44,33],[100,6],[44,6]];
pos[1] = [[118,39],[56,38],[118,6],[56,6]];
pos[2] = [[131,36],[70,42],[131,6],[70,8]];
let kaku = 3;
at(100, () => {
    console.log("send")
    inno.forEach((ii,i) => {
        ii.sendOn(true);
        ii.sendDimmer(255);
        ii.sendColor(i)
        let pan = pos[i][kaku][0];
        let tilt = pos[i][kaku][1];
        // ii.sendPan( pan )
        // ii.sendTilt(tilt)
        // console.log("pan", pan )
        // console.log("tilt",tilt )
    })
})

t = time/1000;
t *= 1.0;
let x = Math.cos(2*t) /2+0.5
let y = Math.cos(3*t) /2+0.5
let pp = [
    [0,0],
    [1,0],
    [0,1],
    [1,1],
];
let num = Math.floor(t) % 4;
// [x,y] = pp[num]
// console.log(x,y)
inno.forEach((ino,i) => {
    let a = ino.point(x,0);
    if(i == 0) console.log(x,a)
})
// console.log(t, a)

