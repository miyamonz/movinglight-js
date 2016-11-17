let sylvester = require("sylvester");

class Homography {
  constructor(){
    this.src = [[0,0], [1,0], [0,1], [1,1]];
    this.dst = [[0,0], [1,0], [0,1], [1,1]];
    this.mat;

  }
  setSrc(src) {
    this.src = src;
  }
  setDst(dst) {
    this.dst = dst;
  }

  getSrc() {
    return this.src;
  }
  getDst() {
    return this.dst;
  }
  getMatrix() {
    let i, M = [], V = [];
    let  x, y, X, Y;
    for(i=0;i<4;i++) {
      x = this.src[i][0];
      y = this.src[i][1];
      X = this.dst[i][0];
      Y = this.dst[i][1];
      M.push([x, y, 1, 0, 0, 0, -x*X, -y*X]);
      M.push([0, 0, 0, x, y, 1, -x*Y, -y*Y]);
      V.push(X);
      V.push(Y);
    }
    let ans = $M(M).inv().x($V(V));
    let mat = [ 
      [ans.e(1), ans.e(2), ans.e(3)],
      [ans.e(4), ans.e(5), ans.e(6)],
      [ans.e(7), ans.e(8), 1]
    ];
    this.mat = mat;
    return mat;
  }
  getMulti(vec) {
    this.getMatrix();
    let result = $M(this.mat).x($V([vec[0], vec[1], 1]));
    return [result.e(1)/result.e(3), result.e(2)/result.e(3)];
  }
}

module.exports = Homography;
