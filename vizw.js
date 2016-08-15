#!/usr/bin/env node
'use strict';

var args = require('./parse.js')();
require('./run.js')(args);
