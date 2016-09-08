/**
 * Main application entry point.
 */

'use strict';

var app = require('mag-app');


// everything is ready
app.once('load', function () {
    // load pages
    app.pages = {
        init: require('./pages/init'),
        main: require('./pages/main')
    };

    // show splash screen
    //app.route(app.pages.init);

    // show main page
    app.route(app.pages.main);
});
