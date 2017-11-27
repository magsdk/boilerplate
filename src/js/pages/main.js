/**
 * Main page implementation.
 */

'use strict';

var app              = require('mag-app'),
    Page             = require('stb-component-page'),
    keys             = require('stb-keys'),
    Footer           = require('mag-component-footer'),
    Panel            = require('mag-component-panel'),
    PanelSet         = require('mag-component-panel-set'),
    LayoutList       = require('mag-component-layout-list'),
    page             = new Page({$node: window.pageMain}),
    $amountContainer = document.createElement('div');


$amountContainer.className = 'amountContainer';
$amountContainer.appendChild(document.createElement('div'));
$amountContainer.firstChild.className = 'amount';
$amountContainer.firstChild.innerText = '4';

app.footer = new Footer({
    parent: page,
    visible: true,
    data: {
        left: {code: keys.menu, action: function () {
            // do something
        }},
        middle: [
            {code: keys.f1, title: _('Action'), action: function () {
                // do something
            }},
            {code: keys.f2, title: _('Action'), action: function () {
                // do something
            }},
            {code: keys.f3, title: _('Action'), action: function () {
                // do something
            }},
            {code: keys.f4, title: _('Action'), action: function () {
                // do something
            }}
        ],
        right: {code: keys.frame, action: function () {
            // do something
        }}
    }
});

page.add(
    app.panelSet = new PanelSet({
        panels: [
            new Panel({
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
                                        className: 'theme-icon theme-icon-folder'
                                    },
                                    _('Item')
                                ]
                            }
                        ]
                    })
                ]
            }),
            new Panel({
                title: [
                    {
                         value: _('files'),
                         className: 'some class'
                    },
                    $amountContainer
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

page.addListener('keydown', function ( event ) {
    if ( event.code === keys.back ) {
        window.core.call('stop');
    }
});

page.once('show', function () {
    app.panelSet.panels[1].focus();
});

// public
module.exports = page;
