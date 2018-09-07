/**
 * Main SDK entry point.
 */

'use strict';

// redefinition of plugin option example
// require('spa-plugin-static/config').default.port = 8000;

var webpack  = require('magsdk/node_modules/webpack'),
    pkgInfo = require('./package.json'),
    util    = require('util'),
    webpackDevPlugins = require('magsdk/node_modules/stb-plugin-webpack/config').develop.webpack.plugins;

require('magsdk/node_modules/spa-plugin-gettext/config').default.languages =
    ['ru', 'uk'];

webpackDevPlugins.push(
    new webpack.BannerPlugin(util.format(
        '*/(function(){var gettext = function(){};gettext("%s");gettext("%s");})()\n/*',
        pkgInfo.config.name, pkgInfo.config.description
    ))
);

// load default plugins
// and run default tasks
module.exports = require('magsdk/default');

// redefinition of default task example
// module.exports.runner.task('default', module.exports.runner.serial('build'));
