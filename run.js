module.exports = function (args) {
    'use strict';

    if (args.V)
        console.log(args.prog + ' - graphviz version 2.38.0 (20140413.2041)');

    var generate = require('./generate.js');
    var write = require('./write.js');

    var fs = require('fs');
    var target = args.o ? fs.createWriteStream(args.o) : process.stdout;

    if (args.files.length)
        args.files.forEach(function (file) {
            var input = fs.readFileSync(file, 'utf8');
            write(generate(input, args), target);
        });
    else {
        var input = '';
        process.stdin.on('data', function (data) {
            input += data;
        });
        process.stdin.on('end', function () {
            write(generate(input, args), target);
        });
    }
};
