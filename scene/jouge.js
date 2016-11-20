this.setLength(3000)
let t = time /1000
let colors = ["red","blue","blue"]
colors = colors.map(c => c=0)

inno.forEach((e,i) => {
    let kesu = Math.floor(t/1.5 % 6)
    // e.light((kesu+i) % 6 !==0);
    e.light(true);
    e.dimmer(255)
    e.pan(90);
    let pan  = Math.sin((t/3) * 2*Math.PI)
    let tilt = Math.cos((t/3) * 2*Math.PI)
    pan = 0;
    pan += Math.sin(t*0.2);
    // pan = lerp(-1,1,0,540,pan)
    pan = lerp(-1,1,0,540,pan)
    tilt = 0;
    let yoko1 = Math.cos((t * 0.4 + 0*i/2)*2*Math.PI)
    let yoko2 = Math.sin((t * 0.4 + 0*i/2)*2*Math.PI)
    tilt = lerp(-1,1,0,45,tilt);
    // pan += (i-1)*19
    // pan += (i-1)*30*yoko1
    // tilt += (i-1)*11*yoko2
    //
    //rotate
    // pan  += 38 * Math.cos((t*2+i/3)*2*Math.PI)
    let theta = Math.sin(t*0.1*2*Math.PI)
    tilt += 17 * Math.sin((t+i/3)*2*Math.PI)
    e.pan(pan);
    e.tilt(5+tilt);
    // console.log(pan,tilt)
})


let intsec = Math.floor(sec/2) % 8;
console.log(intsec, "---------")
// if(intsec == 0) 
colors = colors.map((c,i) => c=i)
inno.forEach((e,i) => {
    if(this.frame % 100 == 0)
        e.color(colors[(i)%3])
})

