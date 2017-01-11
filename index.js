/**
 * Main SDK entry point.
 */

'use strict';

// redefinition of plugin option example
// require('spa-plugin-static/config').default.port = 8000;

// activate gettext languages
// require('spa-plugin-gettext/config').default.languages = ['ru', 'fr'];

// load default plugins
// and run default tasks
module.exports = require('magsdk/default');

// redefinition of default task example
// module.exports.runner.task('default', module.exports.runner.serial('build'));
