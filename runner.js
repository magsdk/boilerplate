/**
 * Runner config
 */

'use strict';

var generate = require('mag-runner'),
    target   = config.vars.TARGET || (config.vars.PLATFORM || 'TARGET').toLowerCase(),
    vars     = {
        DEVELOP: process.env.DEVELOP,
        PLATFORM: process.env.PLATFORM,
        TARGET: target
    },
    packages = {
        webos: {},
        tizen: {}
    };


generate({
    type: 'app',
    vars: vars,
    package: packages[target]
});
