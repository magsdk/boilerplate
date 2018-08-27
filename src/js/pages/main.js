/**
 * Main page implementation.
 */

'use strict';

var app            = require('mag-app'),
    Page           = require('stb-component-page'),
    dom            = require('spa-dom'),
    keys           = require('stb-keys'),
    Footer         = require('mag-component-footer'),
    Panel          = require('mag-component-panel'),
    PanelSet       = require('mag-component-panel-set'),
    LayoutList     = require('mag-component-layout-list'),
    ModalMessage   = require('mag-component-modal'),
    RadioList      = require('mag-component-radio-list'),
    ModalCheckList = require('mag-component-modal-check-list'),
    Scroll         = require('stb-component-scrollbar'),
    ScrollArea     = require('mag-component-scroll-area'),

    appExit    = require('../modules/app.exit'),
    longText   = require('../modules/text'),
    page       = new Page({$node: document.getElementById('pageMain')}),

    scroll = new Scroll({}),
    scrollArea = new ScrollArea({
        propagate: true,
        step: 5,
        scroll: scroll
    }),

    panelSet, mainPanel, footer,
    mainList, modalCheckList, headerAmount,
    modalRadio, modalScroll,

    footerData = [
        {
            items: [
                {
                    className: 'theme-icon theme-icon-menu'
                },
                _('Show')
            ],
            click: function () {
                footer.show();
            },
            value: _('Show footer')
        },
        {
            items: [
                {
                    className: 'theme-icon theme-icon-menu'
                },
                _('Hide')
            ],
            click: function () {
                footer.hide();
            },
            value: _('Hide footer')
        }
    ],

    playData = [
        {
            items: [
                {
                    className: 'theme-icon theme-icon-video'
                },
                _('Play video file 1')
            ],
            value: _('You need add url to your test file in code.'),
            data: {
                play: true,
                name: 'Video file 1',
                // Add url to your test video file
                url: '',
                type: 'video'
            }
        },
        {
            items: [
                {
                    className: 'theme-icon theme-icon-video'
                },
                _('Play video file 2')
            ],
            value: _('You need add url to your test file in code.') + '<p>' + _('Some long text:') + '</p>' + longText,
            data: {
                play: true,
                name: 'Video file 2',
                /// Add url to your test video file
                url: '',
                type: 'video'
            }
        },
        {
            items: [
                {
                    className: 'theme-icon theme-icon-audio'
                },
                _('Play audio file 1')
            ],
            value: _('You need add url to your test file in code.') + '<p>' + _('Some long text:') + '</p>' + longText,
            data: {
                play: true,
                name: 'Audio file 1',
                // Add url to your test audio file
                url: '',
                type: 'audio'
            }
        }
    ],

    notificationData = [
        {
            items: [
                {
                    className: 'theme-icon theme-icon-warning'
                },
                _('Show warning notification')
            ],
            click: function () {
                window.core.notify({
                    title: 'Warning notification',
                    icon: 'info',
                    type: 'warning',
                    timeout: 5000
                });

            },
            value: _('Show warning notification. Closed by timeout.')
        },
        {
            items: [
                {
                    className: 'theme-icon theme-icon-ok'
                },
                _('Show success notification')
            ],
            click: function () {
                window.core.notify({
                    title: 'Confirm message.',
                    icon: 'info',
                    type: 'success',
                    buttons: [
                        {
                            value: _('Cancel'),
                            click: function () {
                                console.log('pressed cancel');
                            }
                        },
                        {
                            value: _('Ok'),
                            click: function () {
                                console.log('pressed ok');
                            }
                        }
                    ]
                });

            },
            value: _('Show confirm. Closed by button click or "back" press.')
        },
        {
            items: [
                {
                    className: 'theme-icon theme-icon-warning'
                },
                _('Show error notification')
            ],
            click: function () {
                window.core.notify({
                    title: 'Error alert',
                    icon: 'alert',
                    type: 'error',
                    buttons: [
                        {
                            value: _('Close'),
                            click: function () {
                                console.log('pressed close');
                            }
                        }
                    ]
                });

            },
            value: _('Show error alert. Closed by button click or "back" press.')
        }
    ],

    modalsData = [
        {
            items: [
                {
                    className: 'theme-icon theme-icon-menu'
                },
                _('Show modal check list')
            ],
            click: function () {
                panelSet.blur();
                modalCheckList.show();
            },
            value: _('Show modal check list. Used mag-component-modal-check-list.')
        },
        {
            items: [
                {
                    className: 'theme-icon theme-icon-menu'
                },
                _('Show modal radio list')
            ],
            click: function () {
                panelSet.blur();
                modalRadio.show();
            },
            value: _('Show modal with radio list. Used mag-component-modal and mag-component-radio-list.')
        }
    ];

function play ( data, playerContext ) {
    var intent;

    //play intent
    intent = core.intent({
        action: 'play',
        mime: 'content/' + data.type,
        data: {
            title: data.name,
            uri: data.url
        },
        events: {
            end: function () {
                console.log('playing end');
                // cycling playing this file
                play(data, playerContext);
            },
            stop: function () {
                console.log('playing stop');
                playerContext = null;
                intent.close();
            },
            error: function () {
                console.log('playing error');
                playerContext = null;
                intent.close();
            }
        },
        context: playerContext
    }, function ( error, context ) {
        if ( error ) {
            debug.fail('Play error', error);
        }
        // you can save context and start play next file in this player
        playerContext = context;
        console.log(context);
    });
}

page.once('show', function () {
    panelSet.panels[1].focus();

    app.ready();
});

page.addListener('keydown', function ( event ) {
    if ( event.code === keys.back ) {
        appExit.goBack();
    }
});


panelSet = new PanelSet({
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
                    size: 7,
                    data: [
                        {
                            items: [
                                {
                                    className: 'theme-icon theme-icon-menu'
                                },
                                _('Footer')
                            ],
                            click: function () {
                                mainPanel.$title.$node.children[0].innerText = _('Footer');
                                headerAmount.innerText = footerData.length;
                                mainList.setData({data: footerData, focusIndex: 0});
                            }
                        },
                        {
                            items: [
                                {
                                    className: 'theme-icon theme-icon-rc-vk'
                                },
                                _('Virtual keyboard')
                            ],
                            click: function () {
                                window.core.intent({
                                    action: 'keyboard',
                                    data: {
                                        value: 'current value',
                                        title: _('Title text')
                                    },
                                    events: {
                                        done: function ( data ) {
                                            console.log(data);
                                        }
                                    }
                                }, function ( error ) {
                                    debug.fail('Keyboard return', error);
                                });
                            }
                        },
                        {
                            items: [
                                {
                                    className: 'theme-icon theme-icon-menu'
                                },
                                _('Modals')
                            ],
                            click: function () {
                                mainPanel.$title.$node.children[0].innerText = _('Modals');
                                headerAmount.innerText = modalsData.length;
                                mainList.setData({data: modalsData, focusIndex: 0});
                            }
                        },
                        {
                            items: [
                                {
                                    className: 'theme-icon theme-icon-rc-play-pause'
                                },
                                _('Play')
                            ],
                            click: function () {
                                mainPanel.$title.$node.children[0].innerText = _('Play');
                                headerAmount.innerText = playData.length;
                                mainList.setData({data: playData, focusIndex: 0});
                            }
                        },
                        {
                            items: [
                                {
                                    className: 'theme-icon theme-icon-warning'
                                },
                                _('Notifications')
                            ],
                            click: function () {
                                mainPanel.$title.$node.children[0].innerText = _('Notifications');
                                headerAmount.innerText = notificationData.length;
                                mainList.setData({data: notificationData, focusIndex: 0});
                            }
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
        mainPanel = new Panel({
            size: 1,
            title: [
                {
                    value: _('Footer')
                },
                dom.tag('div', {className: 'amountContainer'}, headerAmount = dom.tag('div', {className: 'amount'}, footerData.length))
            ],
            main: true,
            children: [
                mainList = new LayoutList({
                    focusIndex: 0,
                    cycle: true,
                    size: 7,
                    data: footerData,
                    events: {
                        'focus:item': function ( event ) {
                            console.log(event);
                            scrollArea.$body.innerHTML = event.$curr.value;
                            scrollArea.init();
                        },
                        // you can use click event in item or this event
                        'click:item': function ( event ) {
                            if ( event.$item.data.data && event.$item.data.data.play ) {
                                play(event.$item.data.data);
                            }
                        }
                    }
                })
            ]
        }),
        new Panel({
            size: 1,
            title: [
                {
                    value: _('info')
                }
            ],
            children: [scrollArea, scroll]
        })
    ]
});
page.add(panelSet);

footer = new Footer({
    parent: page,
    visible: true,
    data: {
        left: {
            code: keys.menu,
            action: function () {
                console.log('pressed menu');
            }
        },
        middle: [
            {
                code: keys.f1,
                title: _('Action 1'),
                action: function () {
                    console.log('pressed f1');
                }
            },
            {
                code: keys.f2,
                title: _('Action 2'),
                action: function () {
                    console.log('pressed f2');
                }
            },
            {
                code: keys.f3,
                title: _('Action 3'),
                action: function () {
                    console.log('pressed f3');
                }
            },
            {
                code: keys.f4,
                title: _('Action 4'),
                action: function () {
                    console.log('pressed f4');
                }
            }
        ],
        right: {
            code: keys.frame,
            action: function () {
                console.log('pressed frame');
            }
        }
    }
});


modalCheckList = new ModalCheckList({
    title: _('Modal check list'),
    titleCounter: false,
    className: 'sort',
    events: {
        show: function () {
            this.focus();
        },
        hide: function () {
            panelSet.focus();
        },
        'checked:change': function ( event ) {
            console.log(event);
        }
    },
    list: {
        focusIndex: 0,
        size: 3,
        events: {
            keydown: function ( event ) {
                LayoutList.prototype.defaultEvents.keydown.call(this, event);
                switch ( event.code ) {
                    case keys.back:
                        modalCheckList.hide();
                        // stop event propagation
                        event.stop = true;
                        break;
                }
            }
        },
        data: [
            // unique item
            {state: true, title: 'Unique item', value: 1, unique: true},
            {state: false, title: 'Item 1', value: 2},
            {state: false, title: 'Item 2', value: 3}
        ]
    }
});
page.add(modalCheckList);


modalScroll = new Scroll({});
modalRadio = new ModalMessage({
    visible: false,
    title: _('Modal radio list'),
    events: {
        show: function () {
            this.children[0].focus();
        },
        hide: function () {
            panelSet.focus();
        }
    },
    children: [
        new RadioList({
            focusIndex: 0,
            size: 5,
            data: [
                {state: false, title: 'Some title 1', value: 1},
                {state: true, title: 'Some title 2', value: 2},
                {state: false, title: 'Some title 3', value: 3},
                {state: false, title: 'Some title 4', value: 4},
                {state: false, title: 'Some title 5', value: 5},
                {state: false, title: 'Some title 6', value: 6},
                {state: false, title: 'Some title 7', value: 7},
                {state: false, title: 'Some title 8', value: 8},
                {state: false, title: 'Some title 9', value: 9}
            ],
            cycle: true,
            scroll: modalScroll,
            events: {
                select: function ( data ) {
                    console.log(data);
                },
                keydown: function ( event ) {
                    RadioList.prototype.defaultEvents.keydown.call(this, event);
                    switch ( event.code ) {
                        case keys.back:
                            modalRadio.hide();
                            // stop event propagation
                            event.stop = true;
                            break;
                    }
                }
            }
        }),
        modalScroll
    ]
});
page.add(modalRadio);

if ( DEVELOP ) {
    window.mainPanel = mainPanel;
    window.mainList = mainList;
    window.panelSet = panelSet;
    window.modalCheckList = modalCheckList;
    window.scrollArea = scrollArea;
    window.modalRadio = modalRadio;
    window.longText = longText;
}


// public
module.exports = page;
