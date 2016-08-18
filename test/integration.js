'use strict';

describe('The CLI called', function () {
    var run = require('../src/run.js');
    var args;

    this.timeout(10000);

    // chai
    require('chai').should();

    // std-mocks
    var stdMocks = require('std-mocks');

    function stdout() {
        return stdMocks.flush().stdout.join('');
    }

    // mock-stdin
    var stdin = require('mock-stdin').stdin();

    // tmp
    var tmp = require('tmp');

    // resources
    var fs = require('fs');
    var gv = fs.readFileSync('test/resources/source.gv', 'utf8');
    var dotXdot = fs.readFileSync('test/resources/dot.xdot', 'utf8');
    var circoXdot = fs.readFileSync('test/resources/circo.xdot', 'utf8');
    var dotSvg = fs.readFileSync('test/resources/dot.svg', 'utf8');

    beforeEach(function () {
        args = {K: null, T: 'xdot', V: false, o: null, files: [], prog: 'dot'};

        stdMocks.use();
    });

    afterEach(function () {
        stdMocks.restore();
        stdMocks.flush();

        stdin.reset(true);
    });

    describe('without arguments', function () {
        it('should produce stdout xdot from stdin dot', function () {
            run(args);
            stdin.send(gv);
            stdin.end();
            stdout().should.equal(dotXdot);
        });
        it('should use the layout of the called executable', function () {
            args.prog = 'circo';
            run(args);
            stdin.send(gv);
            stdin.end();
            stdout().should.equal(circoXdot);
        });
    });

    describe('with -K', function () {
        it('should use the specified layout regardless of the called executable', function () {
            args.prog = 'fdp';
            args.K = 'circo';
            run(args);
            stdin.send(gv);
            stdin.end();
            stdout().should.equal(circoXdot);
        })
    });

    describe('with -T', function () {
        it('should produce the specified format', function () {
            args.T = 'svg';
            run(args);
            stdin.send(gv);
            stdin.end();
            stdout().should.equal(dotSvg);
        });
    });

    describe('with -V', function () {
        beforeEach(function () {
            args.V = true;
        });

        it('should print version information', function () {
            run(args);
            stdout().should.equal('dot - graphviz version 2.38.0 (20140413.2041)\n');
        });
        it('should print the called executable name', function () {
            args.prog = 'circo';
            run(args);
            stdout().should.equal('circo - graphviz version 2.38.0 (20140413.2041)\n');
        });
    });
});
