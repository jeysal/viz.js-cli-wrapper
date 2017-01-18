#!/usr/bin/env node
'use strict';

const args = require('../parse')();
require('../run')(args);
