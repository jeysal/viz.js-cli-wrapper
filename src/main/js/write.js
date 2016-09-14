module.exports = function (data, index, args) {
    'use strict';

    var file = index === 0 && args.o;

    if (file)
        try {
            var mkdirp = require('mkdirp');
            var fs = require('fs');
            var dirname = require('path').dirname;

            // Make sure the parent directory exists
            mkdirp.sync(dirname(file));

            fs.writeFileSync(file, data, 'utf8');
        } catch (err) {
            console.error(err);
            var exit = require('./exit');
            return exit(exit.codes.writeErr);
        }
    else
        process.stdout.write(data);
};
