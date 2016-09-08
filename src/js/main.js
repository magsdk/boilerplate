/**
 * Main application entry point.
 */

'use strict';

var app = require('mag-app');


// everything is ready
app.once('load', function () {
    // load pages
    app.pages = {
        main: require('./pages/main')
    };

    // show main page
    app.route(app.pages.main);
});
