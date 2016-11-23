const mocha      = require("mocha");
const assert     = require('assert');
const Osc        = require('node-osc');

const Universe   = require("../app/Universe.js");
const Fixture    = require('../fixture/Fixture.js');
const InnoPocket = require('../fixture/InnoPocket.js');

let uni, client, fixture, inno;
describe('Fixture', function(){
    it('init', function() {
        uni     = new Universe();
        client  = new Osc.Client("localhost", 7700);
        fixture = new Fixture();
        inno    = new InnoPocket();
    })
})
describe('InnoPocket', function(){
    it('color',function(){
        inno.color("white");
        let arr = inno.getDmxArray();
        assert.equal(arr[4],0);
    })
    it('dimmer',function(){
        inno.dimmer(250);
        let arr = inno.getDmxArray();
        assert.equal(arr[7],250);
    })
    it('gobo',function(){
        inno.gobo(2);
        let arr = inno.getDmxArray();
        assert.equal(arr[5],16);
    })
    it('shake',function(){
        inno.shake(true);
        let arr = inno.getDmxArray();
        assert.equal(arr[5],80);
    })
    it("pantilt", function(){
        inno.pan(90);
        inno.tilt(11);
        let arr = inno.getDmxArray();
        assert(arr[0] !== undefined);
        assert(arr[1] !== undefined);
        assert(arr[2] !== undefined);
        assert(arr[3] !== undefined);
    })
    it("strobe", function(){
        inno.strobe(123);
        let arr = inno.getDmxArray();
        assert(arr[6] !== undefined);
    })
    it("speed", function(){
        inno.speed(128);
        assert.equal(inno.getDmxArray()[8], 128);
    })
    it("func", function(){
        inno.blackOutAll(true);
    })
    it("curve", function(){
        inno.curve("standard");
    })
    afterEach(function(){
        // console.log(inno.getDmxArray())
    })

})
