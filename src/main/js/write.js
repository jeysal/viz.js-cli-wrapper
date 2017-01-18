module.exports = function (data, index, args) {
    'use strict';

    const file = index === 0 && args.o;

    if (file)
        try {
            const mkdirp = require('mkdirp');
            const fs = require('fs');
            const dirname = require('path').dirname;

            // Make sure the parent directory exists
            mkdirp.sync(dirname(file));

            fs.writeFileSync(file, data, 'utf8');
        } catch (err) {
            console.error(err);
            const exit = require('./exit');
            return exit(exit.codes.writeErr);
        }
    else
        process.stdout.write(data);
};
