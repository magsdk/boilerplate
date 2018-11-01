/**
 * Runner config
 */

'use strict';

var generate = require('../../tasks'),
    vars     = {
        DEVELOP:  process.env.DEVELOP,
        PLATFORM: process.env.PLATFORM,
        TARGET:   process.env.TARGET
    },
    packages = {
        webos: {},
        tizen: {}
    };


generate({
    type: 'app',
    vars: vars,
    package: packages[vars.TARGET]
});
