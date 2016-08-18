'use strict';

describe('The CLI called', function () {
    var run = require('../../main/js/run');
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
    var resourcePath = 'src/test/resources/';

    var resources = [0, 1].map(function (e) {
        var basePath = resourcePath + e + '/';
        return {
            gv: fs.readFileSync(basePath + 'source.gv', 'utf8'),
            dotXdot: fs.readFileSync(basePath + 'dot.xdot', 'utf8'),
            circoXdot: fs.readFileSync(basePath + 'circo.xdot', 'utf8'),
            dotSvg: fs.readFileSync(basePath + 'dot.svg', 'utf8')
        };
    });

    beforeEach(function () {
        args = {K: null, T: 'xdot', V: false, o: null, inputs: [], prog: 'dot'};

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
            stdin.send(resources[0].gv);
            stdin.end();

            stdout().should.equal(resources[0].dotXdot);
        });
        it('should use the layout of the called executable', function () {
            args.prog = 'circo';

            run(args);
            stdin.send(resources[0].gv);
            stdin.end();

            stdout().should.equal(resources[0].circoXdot);
        });
    });

    describe('with -K', function () {
        it('should use the specified layout regardless of the called executable', function () {
            args.prog = 'fdp';
            args.K = 'circo';

            run(args);
            stdin.send(resources[0].gv);
            stdin.end();

            stdout().should.equal(resources[0].circoXdot);
        })
    });

    describe('with -T', function () {
        it('should produce the specified format', function () {
            args.T = 'svg';

            run(args);
            stdin.send(resources[0].gv);
            stdin.end();

            stdout().should.equal(resources[0].dotSvg);
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
        it('should return quickly', function () {
            this.timeout(100);

            run(args);
        });
    });

    describe('with -o', function () {
        it('should write to the output file', function () {
            var file = tmp.fileSync();
            args.o = file.name;

            run(args);
            stdin.send(resources[0].gv);
            stdin.end();

            fs.readFileSync(file.name, 'utf8').should.equal(resources[0].dotXdot);
        });
        it('should not write to stdout', function () {
            var file = tmp.fileSync();
            args.o = file.name;

            run(args);
            stdin.send(resources[0].gv);
            stdin.end();

            stdout().should.equal('');
        });
    });

    describe('with input files', function () {
        it('should read from a single input file', function () {
            args.inputs.push(resourcePath + '0/source.gv');

            run(args);
            stdout().should.equal(resources[0].dotXdot);
        });
    });
});
