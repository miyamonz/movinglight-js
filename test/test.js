import "mocha"
import assert from 'assert'
import InnoPocket from '../util/InnoPocket.js'

import osc from 'node-osc'
import Homography from '../app/homography/Homography.js';
import PolarVec   from '../app/homography/PolarVec.js'
import RectMapper from '../app/homography/RectMapper.js'

const homo = new Homography();
describe('Homography', function(){
    it('init', function() {
        let expectSrc = [[0,0],[1,0],[0,1],[1,1]]
        let src = homo.getSrc();
        assert.deepEqual(src, expectSrc);
    })
    it('mult', function() {
        homo.setDst([[5,5],[5,7],[7,5],[7,7]]);
        let vec = homo.getMulti([0,0]);
        assert.deepEqual(vec, [5,5]);
        vec = homo.getMulti([1,0]);
        assert.deepEqual(vec, [5,7]);
    })
})

const polarVecs = [...Array(4).keys()].map(i => new PolarVec());
const pt = [[30,60], [10,65], [40,20], [5,10]];
describe('PolarVec', function() {
    beforeEach(function(){
        pt.forEach((deg, i) => {
            polarVecs[i].setPanDeg(deg[0]);
            polarVecs[i].setTiltDeg(deg[1]);
        })
    })
    it('set vec', function() {
        assert(polarVecs[0].panDeg === pt[0][0])
    })
})
const rectMapper = new RectMapper();
describe('RectMapper', function(){
    it('set vecs', function() {
        [...Array(4).keys()].forEach( i =>{
            rectMapper.setDeg(pt[i][0], pt[i][1],i);
        })
    })
    it('calc', function() {
        let a =rectMapper.calcDeg(0,1);
        const deg = d => d*180/Math.PI;
        let round = n => Math.round(n*10000) / 10000;

        for(let i=0; i<4; i++){
            var degree = deg(rectMapper.calcDeg(i%2,Math.floor(i/2)).pan)
            assert.equal(pt[i][0],round(degree));
            var degree = deg(rectMapper.calcDeg(i%2,Math.floor(i/2)).tilt)
            assert.equal(pt[i][1],round(degree));
        }
    })
})

const client = new osc.Client("localhost", 3000);
const inno   = new InnoPocket(101, client);
describe('InnoPocket', function() {
    it('not set pantilt', function(){
        assert(!inno.point(0,0));
    })
    it('pan, tilt', function() {
        inno.sendPan(100);
        assert.equal(100, inno.pan);
        inno.sendTilt(10);
        assert.equal(10, inno.tilt);
    })
    it('rectMapper', function() {
        pt.forEach((p,i)=> {
            inno.sendPan(p[0]);
            inno.sendTilt(p[1]);
            inno.setAsCorner(i);
        })
        inno.point(0,0);
    })
    it('json', function() {
        let json = inno.getJson();
        inno.saveJson();
    })
})

