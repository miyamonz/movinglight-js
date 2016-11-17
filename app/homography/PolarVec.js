function lerp(x0,x1, y0,y1, x) {
  return y0 + (y1-y0) * (x-x0) / (x1-x0);
}
class PolarVec {
  constructor() {
    this.panDeg = 0;
    this.tiltDeg = 0;
    
    this.panDmx;
    this.tiltDmx;

    this.isSetPan = false;
    this.isSetTilt = false;
  }
  setPanDeg(deg) {
      this.panDeg = deg;
      this.panDmx = lerp(0,540,0,256,deg);
      this.isSetPan = true;
  }
  setTiltDeg(deg) {
      this.tiltDeg = deg;
      this.tiltDmx = lerp(0,180,0,256,deg);
      this.isSetTilt = true;
  }
  isSet() {return this.isSetPan && this.isSetTilt;}
  
  // getPointOnPlane(){
  //   if(! this.isSet()) throw new Error("don't set pan or tilt");
  //   let t0 = this.getThetaPan();
  //   let t1 = this.getThetaTilt();
  //   let x = 1 / Math.tan(t0);
  //   let y = Math.tan(t1) / Math.sin(t0);
  //   x = Math.round(x*1000)/1000;
  //   y = Math.round(y*1000)/1000;
  //   return [x,y];
  // }
}

module.exports = PolarVec;
