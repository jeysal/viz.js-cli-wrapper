module.exports = function () {
    'use strict';

    var argparse = require('argparse');
    var ArgumentParser = argparse.ArgumentParser;
    var Const = argparse.Const;

    var parser = new ArgumentParser({
        addHelp: true
    });

    var layouts = ['circo', 'dot', 'fdp', 'neato', 'osage', 'twopi'];
    var formats = ['svg', 'xdot', 'plain', 'ps'];

    // flags
    parser.addArgument('-K', {
        choices: layouts,
        metavar: 'layout',
        help: 'Specifies which default layout algorithm to use, overriding the default from the executable. ' +
        'circo, dot, fdp, neato, osage and twopi are supported.'
    });
    parser.addArgument('-T', {
        choices: formats,
        defaultValue: 'xdot',
        metavar: 'format',
        help: 'Set output language to one of the supported formats svg, xdot, plain and ps. ' +
        'By default, xdot is produced. GraphViz\' additional renderer and formatter options are not supported.'
    });
    parser.addArgument('-V', {
        action: 'storeTrue',
        help: 'Emit version information and exit. viz.js-cli-wrapper will pretend to be version 2.38.0 (20140413.2041).'
    });
    parser.addArgument('-o', {
        metavar: 'outfile',
        help: 'Write output to file outfile. By default, output goes to stdout.'
    });

    // pos args
    parser.addArgument('inputs', {
        nargs: Const.ZERO_OR_MORE,
        metavar: 'input file',
        help: 'Specifies an input file. If no input files are supplied, the program reads from stdin.'
    });

    var args = parser.parseArgs();
    args.prog = parser.prog;
    return args;
};
