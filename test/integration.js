'use strict';

describe('The CLI called with', function () {
    var run = require('../src/run.js');
    var args;

    // chai
    require('chai').should();

    // std-mocks
    var stdMocks = require('std-mocks');

    function stdout() {
        return stdMocks.flush().stdout.join('');
    }

    // resources
    var fs = require('fs');
    var gv = fs.readFileSync('test/resources/source.gv', 'utf8');

    beforeEach(function () {
        args = {K: null, T: 'xdot', V: false, o: null, files: [], prog: 'dot'};

        stdMocks.use();
    });

    afterEach(function () {
        stdMocks.restore();
        stdMocks.flush();
    });

    describe('-V', function () {
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