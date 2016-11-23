this.setLength(1000);
inno.forEach((e,i) => {
    at(1, () =>{
        colors = ["red","green","blue"]
        inno[i].color(colors[i])
    })
    let pan = 90;
    // let tilt = (sin2pi(sec/2 + i/3)+1)*30;
    let tilt = 20;
    pan += (i-1)*38;
    // tilt += sin2pi(sec*0.4 + i/3)*20;
    let timing = floor(sec*0.8 + 2*i/3);
    if(i==0) console.log(timing)
    if(timing % 2 == 0){
        pan +=360;
    }
    e.pan(pan);
    e.tilt(tilt);
})
