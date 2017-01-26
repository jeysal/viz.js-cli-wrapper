'use strict';

describe('The CLI called', function () {
    const run = require('../../main/js/run');
    const exit = require('../../main/js/exit');
    let args;

    this.timeout(10000);

    // chai
    require('chai').should();

    // std-mocks
    const stdMocks = require('std-mocks');

    function stdout() {
        return stdMocks.flush().stdout.join('');
    }

    // mock-stdin
    const stdin = require('mock-stdin').stdin();

    // tmp
    const tmp = require('tmp');

    // resources
    const fs = require('fs');
    const resourcePath = 'src/test/resources/';

    const resources = [0, 1].map(function (e) {
        const basePath = resourcePath + e + '/';
        return {
            gv: fs.readFileSync(basePath + 'source.gv', 'utf8'),
            dotXdot: fs.readFileSync(basePath + 'dot.xdot', 'utf8'),
            circoXdot: fs.readFileSync(basePath + 'circo.xdot', 'utf8'),
            dotSvg: fs.readFileSync(basePath + 'dot.svg', 'utf8'),
            circoSvg: fs.readFileSync(basePath + 'circo.svg', 'utf8')
        };
    });

    beforeEach(function () {
        args = { K: null, T: 'xdot', V: false, o: null, inputs: [], prog: 'dot' };

        stdMocks.use();
    });

    afterEach(function () {
        exit.reset();

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
        it('should produce empty stdout from empty stdin', function () {
            run(args);
            stdin.end();

            stdout().should.have.length(0);
        });
        it('should exit with genErr when passed invalid input', function () {
            exit.fake = true;

            run(args);
            stdin.send('asdf');
            stdin.end();

            exit.records.should.eql([exit.codes.genErr]);
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
        });
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

            stdout().should.equal('dot - graphviz version 2.40.1 (20161225.0304)\n');
        });
        it('should print the called executable name', function () {
            args.prog = 'circo';

            run(args);

            stdout().should.equal('circo - graphviz version 2.40.1 (20161225.0304)\n');
        });
        it('should return quickly', function () {
            this.timeout(100);

            run(args);
        });
    });

    describe('with -o', function () {
        it('should write to the output file', function () {
            const file = tmp.fileSync();
            args.o = file.name;

            run(args);
            stdin.send(resources[0].gv);
            stdin.end();

            fs.readFileSync(file.name, 'utf8').should.equal(resources[0].dotXdot);
        });
        it('should not write to stdout', function () {
            const file = tmp.fileSync();
            args.o = file.name;

            run(args);
            stdin.send(resources[0].gv);
            stdin.end();

            stdout().should.equal('');
        });
        it('should create any necessary parent directories', function () {
            const path = require('path');

            const dir = tmp.tmpNameSync();
            const file = path.join(dir, 'asdf');
            args.o = file;

            run(args);
            stdin.send(resources[0].gv);
            stdin.end();

            fs.readFileSync(file, 'utf8').should.equal(resources[0].dotXdot);
        });
        it('should exit with writeErr when passed a directory path', function () {
            exit.fake = true;
            args.o = '.';

            run(args);
            stdin.end();

            exit.records.should.eql([exit.codes.writeErr]);
        });
        it('should exit with writeErr when passed an unwritable path', function () {
            exit.fake = true;
            const file = tmp.fileSync({ mode: 0o444 });
            args.o = file.name;

            run(args);
            stdin.end();

            exit.records.should.eql([exit.codes.writeErr]);
        });
    });

    describe('with input files', function () {
        it('should read from a single input file', function () {
            args.inputs.push(resourcePath + '0/source.gv');

            run(args);

            stdout().should.equal(resources[0].dotXdot);
        });
        it('should read from multiple input files and print their results to stdout', function () {
            args.inputs.push(resourcePath + '0/source.gv', resourcePath + '1/source.gv');

            run(args);

            stdout().should.equal(resources[0].dotXdot + resources[1].dotXdot);
        });
        it('should exit with readErr when passed a directory path', function () {
            exit.fake = true;
            args.inputs.push('.');

            run(args);

            exit.records.should.eql([exit.codes.readErr]);
        });
        it('should exit with readErr when passed a nonexistent path', function () {
            exit.fake = true;
            args.inputs.push(tmp.tmpNameSync());

            run(args);

            exit.records.should.eql([exit.codes.readErr]);
        });
    });

    describe('with multiple arguments', function () {
        it('should read from multiple input files and write the first to the output file and the following to stdout ' +
            'in the specified format, using the specified layout regardless of the called executable', function () {
            args.prog = 'fdp';
            args.K = 'circo';
            args.T = 'svg';
            const file = tmp.fileSync();
            args.o = file.name;
            args.inputs.push(resourcePath + '0/source.gv', resourcePath + '1/source.gv');

            run(args);

            fs.readFileSync(file.name, 'utf8').should.equal(resources[0].circoSvg);
            stdout().should.equal(resources[1].circoSvg);
        });
    });
});
