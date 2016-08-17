'use strict';

describe('The CLI called with', function () {
    var run = require('../src/run.js');
    var args;

    require('chai').should();

    var stdMocks = require('std-mocks');

    function stdout() {
        return stdMocks.flush().stdout.join('');
    }

    beforeEach(function () {
        args = {K: null, T: 'xdot', V: false, o: null, files: [], prog: 'dot'};

        stdMocks.use();
    });

    afterEach(function () {
        stdMocks.restore();
        stdMocks.flush();
    });
});
