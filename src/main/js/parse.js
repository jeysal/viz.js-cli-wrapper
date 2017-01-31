module.exports = function () {
    'use strict';

    const argparse = require('argparse');
    const ArgumentParser = argparse.ArgumentParser;
    const Const = argparse.Const;

    const parser = new ArgumentParser({
        addHelp: true
    });

    const layouts = ['circo', 'dot', 'fdp', 'neato', 'osage', 'twopi'];
    const formats = ['svg', 'xdot', 'plain', 'ps', 'json'];

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
        help: 'Set output language to one of the supported formats svg, xdot, plain, ps and json. ' +
        'By default, xdot is produced. GraphViz\' additional renderer and formatter options are not supported.'
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
    parser.addArgument('inputs', {
        nargs: Const.ZERO_OR_MORE,
        metavar: 'input file',
        help: 'Specifies an input file. If no input files are supplied, the program reads from stdin.'
    });

    const args = parser.parseArgs();
    args.prog = require('path').parse(parser.prog).name;
    return args;
};
