this.setLength(100);
let t = time /1000;

t = time/1000;
t *= 1.0;
let x = cos2pi(2*t) /2+0.5
let y = cos2pi(3*t) /2+0.5
let pp = [
    [0,0],
    [1,0],
    [1,1],
    [0,1],
];
let num = floor(t) % 4;
at(2,() => {
    inno.forEach((e,i) => {
        e.gobo(0);
        e.color(i*2);
    })

})

inno.forEach( (e,i)=> {
    // e.point(pp[ii%4])
    x = y = 0.5;
    x -= (i-1)*0.11;
    x += sin(0.3*t * TWO_PI) * 0.5
    y += cos(0.3*t * TWO_PI) * 0.5;
    let h = 29;
    let ii = floor(this.frame/h);
    if(this.frame%h == 0) {
        if(ii%3==i) {
            // e.strobe(86);
            let n = 5;
            console.log(ii,x,y)
        }
        else{
            e.strobe(117);
        }
    }
    e.point(x,y);
    let dim = 255 * sin((t+i/3)*TWO_PI)
    e.dimmer(dim);
    if(dim<1){
        let color = ii;
        e.color((ii*3+i)%8);
        
    }
} )
