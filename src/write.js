module.exports = function (data, target) {
    'use strict';

    target.on('error', function (err) {
        console.error(err);
        process.exit(80);
    });

    target.write(data, 'utf8');
};
