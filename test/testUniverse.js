const Universe   = require("../app/Universe.js");
const mocha      = require("mocha");
const assert     = require('assert');
const InnoPocket = require('../fixture/InnoPocket.js')

const Osc = require('node-osc')

let uni, client;
let inno;
describe('Universe', function(){
    it('init', function() {
        uni = new Universe();
        client = new Osc.Client("localhost", 7700);
        inno = new InnoPocket();
    })
    it('when it is not set client, it cant send', function() {
        try {
            uni.send();
        }catch(e){
            assert(e !== null);
        }
    })
    it('set osc client', function(){
        uni.setOscClient(client);
    })
    it("zero is bad ch", function() {
        try {
            uni.setDmx(0,126);
        }catch(e){
            assert(e !== null);
        }
    })
    it('send dmx via osc', function(){
        uni.setDmx(1,127);
        uni.setDmx(2,131);
        uni.send();
    })
    it("apply fixture", function(){
        inno.color("red");
        uni.applyFixture(inno, 101);
        assert.equal(uni.getDmx()[105], 10); 
        uni.send();
    })
})
