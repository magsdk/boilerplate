/**
 * Develop application entry point.
 */

'use strict';

if ( window.top === window ) {
    // require core wrapper for non-frame
    require('magcore-core');
}

// main entry
require('./main');
