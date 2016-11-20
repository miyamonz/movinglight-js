let t = time /1000;

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

let h = 3;
if(this.frame%h == 0) {
    let ii = Math.floor(this.frame/h);
    console.log(ii);
    inno.forEach( (e,i)=> {
        // e.point(pp[ii%4])
            x = y = 0.5;
            x -= (i-1)*0.11;
            x += Math.sin(0.6*t * Math.PI*2) * 0.5
            y += Math.cos(0.6*t * Math.PI*2) * 0.5
        if(ii%3==i) {
            // e.strobe(86);
            let n = 5;
                console.log(x,y)
            e.point(x,y);
            // e.color(0)
            e.dimmer(255)
        }
        else{
            e.point(x,y);
            e.strobe(117);
            // e.color(0);
            e.dimmer(0)
        }
        e.color(i)
    } )
}
