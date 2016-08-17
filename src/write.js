module.exports = function (data, target) {
    'use strict';

    target.on('error', function (err) {
        console.error(err);
    });

    target.write(data, 'utf8');
};
