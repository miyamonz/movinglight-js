this.setLength(10000);
let pos = [];
pos[0] = [[98,44],[36,34],[100,6],[37,6]];
pos[1] = [[132,39],[56,44],[134,6],[58,6]];
pos[2] = [[149,30],[92,51],[149,6],[97,6]];
at(119, () => {
    console.log("send--------------")
        inno.forEach((ii,i) => {
            let kaku = 3;
            let pan  = pos[i][kaku][0];
            let tilt = pos[i][kaku][1];
            // ii.pan( pan );
            // ii.tilt(tilt);
            // ii.setAsCorner(kaku);
            // ii.saveJson();
            ii.gobo(0)
        })
})
let t = time /1000;
inno.forEach((e,i) => {
    let x = Math.sin((t*0.1 + i/1)*2*Math.PI)/2+0.5;
    let y = Math.sin((t*0.2 + i/1)*2*Math.PI)/2+0.5;
    // let a = e.point(x,y);
    // console.log(a)
})

t = time/1000;
t *= 1.0;
let x = Math.cos(2*t) /2+0.5
let y = Math.cos(3*t) /2+0.5
let pp = [
    [0,0],
    [1,0],
    [1,1],
    [0,1],
];
let num = Math.floor(t) % 4;

let h = 30;
if(this.frame%h == 0) {
    let ii = Math.floor(this.frame/h);
    console.log(ii);

    inno.forEach( (e,i)=> {
        // e.point(pp[ii%4])

        if(ii%3==i) {
            e.strobe(102);
            let x = Math.random();
            let y = Math.random();
            e.point(x,y);
            e.color(1)
            e.dimmer(255)
        }
        else{
            e.strobe(166);
            e.color(0);
            e.dimmer(54)
        }
    } )
}
