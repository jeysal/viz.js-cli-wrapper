module.exports = function (args) {
    'use strict';

    if (args.V)
        return console.log(args.prog + ' - graphviz version 2.40.1 (20161225.0304)');

    const generate = require('./generate');
    const write = require('./write');
    const exit = require('./exit');

    const fs = require('fs');

    if (args.inputs.length)
        args.inputs.forEach(function (file, i) {
            let input;
            try {
                input = fs.readFileSync(file, 'utf8');
            } catch (err) {
                console.error(err);
                return exit(exit.codes.readErr);
            }
            write(generate(input, args), i, args);
        });
    else {
        let input = '';
        process.stdin.on('data', function (data) {
            input += data;
        });
        process.stdin.on('end', function () {
            write(generate(input, args), 0, args);
        });
    }
};
