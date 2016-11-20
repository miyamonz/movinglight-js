
let timeLength = 5;
this.setLength(timeLength);
let percent = time/timeLength/1000;
for(let i=0; i<4; i++){
    at(0, () => osc.send("/tester/on/"+i, 1));
    let pos = [1,1].map(t => t*time/10);
    pos[0] = percent * 500;
    let theta = (i+1) * percent * 2*Math.PI;
    pos[1] = Math.sin(theta) * 100 + 200;
     console.log(pos, this.frame);
    osc.send("/dmx/"+i, pos);

}

