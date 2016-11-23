console.log(time);
this.setLength(100);


let theta = sec;

inno.forEach((e,i) => {
    e.dimmer(255);
    let pan = 90;
    let tilt = (sin2pi(theta +i/3)+1) * 0;
    let t = sec*2;
    pan += (i-1)*38;
    if(floor(t)%4 == 1)
        pan -= (i-1)*38;
    if(floor(t)%4 == 3)
        tilt += (i-1)*25;
    if(floor(t)%4 == 1)
        inno[1].color(0);
    else if(floor(t)%4 == 3)
        inno[1].color(2);
    else
        inno[1].color(1);

    let isBang = this.frame % 10 == 0;
    if(isBang) {
        let b = Math.random()*2<1;
        
    }
    tilt += 30;
    e.pan(pan);
    e.tilt(tilt);
    e.color(0);
    // e.color(floor(sec+3*i+i/3) % 8);
    e.strobe(255);
})
