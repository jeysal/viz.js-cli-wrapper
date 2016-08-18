module.exports = function (data, index, args) {
    'use strict';

    var file = index === 0 && args.o;

    if (file)
        try {
            require('fs').writeFileSync(file, data, 'utf8');
        } catch (err) {
            console.error(err);
            process.exit(require('./exit-codes').writeErr);
        }
    else
        process.stdout.write(data);
};
