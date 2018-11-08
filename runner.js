/**
 * Runner config
 */

'use strict';

var generate = require('../../tasks/package'),
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
    vars: vars,
    package: packages[vars.TARGET]
});
