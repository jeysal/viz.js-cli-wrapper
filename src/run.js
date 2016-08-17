module.exports = function (args) {
    'use strict';

    if (args.V)
        return console.log(args.prog + ' - graphviz version 2.38.0 (20140413.2041)');

    var generate = require('./generate.js');
    var write = require('./write.js');

    var fs = require('fs');
    // Write to output file only once, the other results go to stdout
    var firstTarget = args.o ? fs.createWriteStream(args.o) : process.stdout;

    if (args.files.length)
        args.files.forEach(function (file, i) {
            try {
                var input = fs.readFileSync(file, 'utf8');
                write(generate(input, args), i > 0 ? process.stdout : firstTarget);
            } catch (err) {
                console.error(err);
            }
        });
    else {
        var input = '';
        process.stdin.on('data', function (data) {
            input += data;
        });
        process.stdin.on('end', function () {
            try {
                write(generate(input, args), firstTarget);
            } catch (err) {
                console.error(err);
            }
        });
    }
};
