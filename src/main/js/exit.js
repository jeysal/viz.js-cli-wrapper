function exit(code) {
    exit.fake ? exit.records.push(code) : process.exit(code);
}

exit.reset = function () {
    exit.fake = false;
    exit.records = [];
};
exit.reset();

exit.codes = {
    readErr: 70,
    writeErr: 80,
    genErr: 100
};

module.exports = exit;
