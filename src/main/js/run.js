module.exports = function (args) {
    'use strict';

    if (args.V)
        return console.log(args.prog + ' - graphviz version 2.38.0 (20140413.2041)');

    var generate = require('./generate');
    var write = require('./write');
    var exit = require('./exit');

    var fs = require('fs');

    if (args.inputs.length)
        args.inputs.forEach(function (file, i) {
            try {
                var input = fs.readFileSync(file, 'utf8');
            } catch (err) {
                console.error(err);
                process.exit(exit.codes.readErr);
            }
            write(generate(input, args), i, args);
        });
    else {
        var input = '';
        process.stdin.on('data', function (data) {
            input += data;
        });
        process.stdin.on('end', function () {
            write(generate(input, args), 0, args);
        });
    }
};
