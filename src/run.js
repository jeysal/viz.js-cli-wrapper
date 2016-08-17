module.exports = function (args) {
    'use strict';

    if (args.V)
        return console.log(args.prog + ' - graphviz version 2.38.0 (20140413.2041)');

    var generate = require('./generate.js');
    var write = require('./write.js');
    var exitCodes = require('./exit-codes.js');

    var fs = require('fs');
    // Write to output file only once, the other results go to stdout
    var firstTarget = args.o ? fs.createWriteStream(args.o) : process.stdout;

    firstTarget.on('error', function (err) {
        console.error(err);
        process.exit(exitCodes.writeErr);
    });

    if (args.files.length)
        args.files.forEach(function (file, i) {
            try {
                var input = fs.readFileSync(file, 'utf8');
            } catch (err) {
                console.error(err);
                process.exit(exitCodes.readErr);
            }
            write(generate(input, args), i > 0 ? process.stdout : firstTarget);
        });
    else {
        var input = '';
        process.stdin.on('data', function (data) {
            input += data;
        });
        process.stdin.on('end', function () {
            write(generate(input, args), firstTarget);
        });
    }
};
