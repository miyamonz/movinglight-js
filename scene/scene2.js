let timeLength = 5;
this.setLength(timeLength);
let percent = time/timeLength/1000;

let center = [400,400];
for(let i=0; i<4; i++){
    at(0, () => osc.send("/tester/on/"+i, 1));
    let pos = [1,1].map(t => t*time/10);
    let vel = Math.sin(percent*2*Math.PI)*1;
    let theta = (vel + (i/4)) * 2*Math.PI;
    pos[0] = Math.cos(theta) * 100;
    pos[1] = Math.sin(theta) * 100;
    pos[0] += center[0];
    pos[1] += center[1];
    console.log(pos, this.frame);
    osc.send("/tester/pos/"+i, pos);
}
