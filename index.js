/**
 * Main SDK entry point.
 */

'use strict';

// redefinition of plugin option example
require('spa-plugin-jade/config').release.target = 'app/index.html';

// load default plugins
// and run default tasks
module.exports = require('stbsdk/default');

// redefinition of default task example
// module.exports.runner.task('default', module.exports.runner.serial('build'));
