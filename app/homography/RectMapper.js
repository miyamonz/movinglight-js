//  let PolarConvert = require('./PolarConvert.js');
let sylvester = require("sylvester");
let PolarVec = require('./PolarVec.js');
let Homography   = require('./Homography.js');
let lerp = require('../../util/lerp.js')
let hom = new Homography();

class RectMapper {
  constructor(){
    this.index = 0;
    this.polarVecs = [];
    for(let i=0; i<4; i++)
      // this.points[i] = new PolarConvert();
    this.polarVecs[i] = new PolarVec();
    this.srcRect = [[0,0], [1,0], [0,1], [1,1]];
    this.dstRect;
  }
  setDeg(pan, tilt, index = 0){
      this.polarVecs[index].setPanDeg(pan);
      this.polarVecs[index].setTiltDeg(tilt);
  }
  isReady() {
    return this.polarVecs.every(p => p.isSet() == true);
  }
  calcDeg(x,y) {
      const getLinearVec = (p0,p1,t) => {
          const the0 = p0.pan ;
          const phi0 = p0.tilt;
          const the1 = p1.pan ;
          const phi1 = p1.tilt;
          const cos = th => Math.cos(th);
          const sin = th => Math.sin(th);
          let v = $V([
                  cos(phi0)*cos(the0),
                  cos(phi0)*sin(the0),
                  sin(phi0)
          ]).x(1-t);
          v = v.add($V([
                  cos(phi1)*cos(the1),
                  cos(phi1)*sin(the1),
                  sin(phi1)
          ]).x(t));
          v.toUnitVector();
          let phi   = Math.asin(v.e(3));
          // let theta = Math.asin(v.e(2)/cos(phi));
          
          let theta;
          if(v.e(1) == 0) theta = Math.PI/2;
          else theta = Math.atan(v.e(2)/v.e(1));
          if(theta <= 0) theta += Math.PI;

            // let theta = Math.asin(v.e(3));
            // let phi = Math.asin(v.e(2)/cos(theta));

          let deg = (t) => lerp(0,Math.PI, 0, 180, t);
          // console.log("phi",deg(phi0), deg(phi),   deg(phi1));
          // console.log("the",deg(the0), deg(theta), deg(the1));
          // console.log("t",t)
          return {pan: theta, tilt:phi}
      }
      
      let p = this.polarVecs.map(pv => {
          return {
              pan:  lerp(0,180,0,Math.PI, pv.panDeg),
              tilt: lerp(0,180,0,Math.PI, pv.tiltDeg),
          }
      });
      let xpos0 = getLinearVec(p[0],p[1],x);
      let xpos1 = getLinearVec(p[2],p[3],x);
      let pos = getLinearVec(xpos0, xpos1, y);
      pos.pan  = lerp(0,Math.PI, 0, 180, pos.pan);
      pos.tilt = lerp(0,Math.PI, 0, 180, pos.tilt);
      return pos;
  }
  setSrcRect(x, y) {
    this.srcRect = [[0,0],[x,0], [0,y], [x,y]];
  }
  calcDstRect(){
    if(!this.isReady()) return;
    //this.points にはdmx のpan tiltが入る
    //dst rect に、thetaにして渡す ここへん
    //dstRectに必要なのはz=const の平面の四角形
    this.dstRect = this.points.map(p => [p.getThetaPan(), p.getThetaTilt()]);
    this.getMatrix();
  }

  getMatrix() {
    if(!this.isReady()) return;
    hom.setSrc(this.srcRect);
    hom.setDst(this.dstRect);
    return hom.getMatrix();
  }
  getJson() {
    let json = {};
    this.polarVecs.forEach((p,i) => {
      json[i] = {
        pan: p.panDeg,
        tilt: p.tiltDeg
      };
    });
    return json;
  }

  setJson(json) {
    for(let i=0; i<4; i++){
      this.setDeg(json[i].pan, json[i].tilt, i);
    }
  }

  log() {
    this.points.forEach((p,i) => {
      console.info("i: ", i);
      console.info("\t pan: ", p.getThetaPan()," tilt: ",p.getThetaTilt() );
    });
  }
}

module.exports = RectMapper;
