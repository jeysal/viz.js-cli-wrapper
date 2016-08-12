module.exports = function () {
    'use strict';

    var ArgumentParser = require('argparse').ArgumentParser;
    var parser = new ArgumentParser({
        addHelp: true
    });

    // flags
    parser.addArgument('-K', {
        choices: ['circo', 'dot', 'fdp', 'neato', 'osage', 'twopi'],
        metavar: 'layout',
        help: 'Specifies which default layout algorithm to use, overriding the default from the executable.'
    });
    parser.addArgument('-T', {
        choices: ['svg', 'xdot', 'plain', 'ps'],
        metavar: 'format',
        help: 'Set output language to one of the supported formats. By default, svg is produced.'
    });
    parser.addArgument('-V', {
        action: 'storeTrue',
        help: 'Emit version information and exit.'
    });
    parser.addArgument('-o', {
        metavar: 'outfile',
        help: 'Write output to file outfile. By default, output goes to stdout.'
    });

    // pos args
    parser.addArgument('files', {
        nargs: '*',
        metavar: 'file',
        help: 'Specifies the input files. If no input files are supplied, the program reads from stdin.'
    });

    var args = parser.parseArgs();
    args.prog = parser.prog;
    return args;
};
