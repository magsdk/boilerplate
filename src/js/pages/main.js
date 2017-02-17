/**
 * Main page implementation.
 */

'use strict';

var app        = require('mag-app'),
    Page       = require('stb-component-page'),
    dom        = require('spa-dom'),
    keys       = require('stb-keys'),
    Footer     = require('mag-component-footer'),
    Panel      = require('mag-component-panel'),
    PanelSet   = require('mag-component-panel-set'),
    LayoutList = require('mag-component-layout-list'),
    appExit    = require('../modules/app.exit'),
    page       = new Page({$node: window.pageMain});


page.once('show', function () {
    page.footer = new Footer({
        parent: page,
        visible: true,
        data: {
            left: {code: keys.menu},
            middle: [
                {code: keys.f1, title: _('Action')},
                {code: keys.f2, title: _('Action')},
                {code: keys.f3, title: _('Action')},
                {code: keys.f4, title: _('Action')}
            ],
            right: {code: keys.frame}
        }
    });

    page.add(
        app.panelSet = new PanelSet({
            panels: [
                new Panel({
                    size: 1,
                    title: [
                        {
                            value: _('menu'),
                            className: 'some class'
                        }
                    ],
                    children: [
                        new LayoutList({
                            focusIndex: 0,
                            cycle: true,
                            size: 4,
                            data: [
                                {
                                    items: [
                                        {
                                            className: 'theme-icon theme-icon-folder'
                                        },
                                        _('Item')
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            className: 'theme-icon theme-icon-folder'
                                        },
                                        _('Item')
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            className: 'theme-icon theme-icon-folder'
                                        },
                                        _('Item')
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            className: 'theme-icon theme-icon-exit'
                                        },
                                        _('Exit')
                                    ],
                                    click: appExit.goExit
                                }
                            ]
                        })
                    ]
                }),
                new Panel({
                    size: 1,
                    title: [
                        {
                            value: _('files'),
                            className: 'some class'
                        },
                        dom.tag('div', {className: 'amountContainer'}, dom.tag('div', {className: 'amount'}, 4))
                    ],
                    main: true,
                    children: [
                        new LayoutList({
                            focusIndex: 0,
                            cycle: true,
                            size: 4,
                            data: [
                                {
                                    items: [
                                        {
                                            className: 'theme-icon theme-icon-file'
                                        },
                                        _('Item')
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            className: 'theme-icon theme-icon-file'
                                        },
                                        _('Item')
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            className: 'theme-icon theme-icon-file'
                                        },
                                        _('Item')
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            className: 'theme-icon theme-icon-file'
                                        },
                                        _('Item')
                                    ]
                                }
                            ]
                        })
                    ]
                }),
                new Panel({
                    size: 1,
                    title: [
                        {
                            value: _('info'),
                            className: 'some class'
                        }
                    ],
                    children: []
                })
            ]
        })
    );

    app.panelSet.panels[1].focus();
});

page.addListener('keydown', function ( event ) {
    if ( event.code === keys.back ) {
        appExit.goBack();
    }
});


// public
module.exports = page;
