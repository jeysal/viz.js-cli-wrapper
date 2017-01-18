module.exports = function (data, args) {
    'use strict';

    // viz.js function cannot be used more than once
    delete require.cache[require.resolve('viz.js')];

    try {
        return require('viz.js')(data, {
            engine: args.K || args.prog,
            format: args.T
        });
    } catch (err) {
        console.error(err);
        const exit = require('./exit');
        return exit(exit.codes.genErr);
    }
};
