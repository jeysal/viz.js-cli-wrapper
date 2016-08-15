module.exports = function (data, args) {
    'use strict';

    return require('viz.js')(data, {
        engine: args.K || args.prog,
        format: args.T || 'svg'
    });
};
