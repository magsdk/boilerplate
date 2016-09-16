/**
 * Main SDK entry point.
 */

'use strict';

// redefinition of plugin option example

// load default plugins
// and run default tasks
module.exports = require('magsdk/default');

// redefinition of default task example
// module.exports.runner.task('default', module.exports.runner.serial('build'));
