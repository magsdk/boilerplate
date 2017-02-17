/**
 * Exit from an app in three ways.
 *
 * @module app.exit
 * @author Yaroslav Surilov <y.surilov@infomir.com>
 */

'use strict';

var app  = require('mag-app');


module.exports = {
    /**
     * Go back to Launcher from an app, app is saved in Task Manager's list.
     */
    goBack: function () {
        core.call('stop');
    },

    /**
     * Hide an app and exit to Launcher.
     */
    goHome: function () {
        core.call('hide');
    },

    /**
     * Exit from an app to Launcher, app isn't saved in Task Manager's list.
     * Destroy application instance.
     * If callback function provided, and callback returns boolean 'true', application will stay alive.
     *
     * @param [callback] provide callback if you want to handle exit result, or cancel it
     */
    goExit: function ( callback ) {
        var ModalMessage  = require('mag-component-modal'),
            LayoutList    = require('mag-component-layout-list'),
            keys          = require('stb-keys'),
            previousFocus = app.activePage.activeComponent,
            exitModal;

        app.activePage.add(exitModal = new ModalMessage({
            title: _('Exit'),
            events: {
                show: function () {
                    app.panelSet.blur();
                    this.children[0].focus();
                },
                hide: function () {
                    previousFocus.focus();
                }
            },
            children: [
                new LayoutList({
                    className: 'padded',
                    size: 2,
                    focusIndex: 0,
                    cycle: true,
                    data: [
                        {
                            items: [
                                {
                                    value: _('Exit')
                                }
                            ],
                            click: function () {
                                if ( typeof callback === 'function' ) {
                                    if ( callback(true) ) {
                                        exitModal.hide();
                                        exitModal.remove();
                                        return;
                                    }
                                }

                                exitModal.hide();
                                exitModal.remove();
                                core.call('exit');
                            }
                        },
                        {
                            items: [
                                {
                                    value: _('Cancel')
                                }
                            ],
                            click: function () {
                                if ( typeof callback === 'function' ) {
                                    callback(false);
                                }
                                exitModal.hide();
                                exitModal.remove();
                                app.panelSet.focus();
                            }
                        }
                    ],
                    events: {
                        keydown: function ( event ) {
                            LayoutList.prototype.defaultEvents.keydown.call(this, event);
                            if ( event.code === keys.back ) {
                                event.stop = true;
                                if ( typeof callback === 'function' ) {
                                    callback(false);
                                }
                                exitModal.hide();
                                exitModal.remove();
                                app.panelSet.focus();
                            }
                        }
                    }
                })
            ]
        }));

        exitModal.show();
        exitModal.focus();
    }
};
