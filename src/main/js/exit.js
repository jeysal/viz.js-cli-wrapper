function exit(code) {
    exit.fake ? exit.records.push(code) : process.exit(code);
}

exit.fake = false;
exit.records = [];

exit.codes = {
    readErr: 70,
    writeErr: 80
};

module.exports = exit;
