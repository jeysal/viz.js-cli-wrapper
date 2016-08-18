#!/usr/bin/env node
'use strict';

var args = require('./parse')();
require('./run')(args);
