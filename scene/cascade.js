this.setLength(3000);
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
at(1, () => {
    inno.forEach( (e,i)=> {
        e.strobe(255);
        e.dimmer(255);
        if(i==0) e.color("red");
        if(i==1) e.color("green");
        if(i==2) e.color("blue");
    });
});

inno.forEach( (e,i)=> {
    let theta = 0.6*t + 2*i/3;
    let sayu = Math.floor(theta) % 2==0 ? 1:-1;
    x = 0.5-sayu*0.25;
    y = 0.5;
    x -= (i-1)*0.16;
    x += (sayu)*Math.cos((theta) * Math.PI*2) * 0.25;
    y += - Math.sin((theta) * Math.PI*2) * 0.5;
    let h = 29;
    let ii = Math.floor(this.frame/h);
    if(this.frame%h == 0) {
        if(ii%3==i) {
            console.log(ii,x,y)
        }
        else{
            e.strobe(136);
        }
    }
    console.log(x,y)
    e.point(x,y);
    // let dim = 255 * Math.sin((t+i/3)*Math.PI*2);
    dim = 255;
    //e.dimmer(dim);
} )
