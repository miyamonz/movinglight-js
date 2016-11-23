global.lerp = (x0,x1, y0,y1, x) => {
  return y0 + (y1-y0) * (x-x0) / (x1-x0);
}
global.clamp = (x,min,max) => {
    if(x < min) return min;
    if(x > max) return max;
    return x;
}
