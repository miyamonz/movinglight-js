module.exports = function(x0,x1, y0,y1, x) {
  return y0 + (y1-y0) * (x-x0) / (x1-x0);
}
