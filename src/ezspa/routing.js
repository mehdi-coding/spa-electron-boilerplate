// Routing file
const path = require('path');
const remote = require('electron').remote;
const main = remote.require('./index.js')
var appData = require('../../config/appData.js')
let routings = require('../../config/routes.js')

// The variable for jquery
let $$ = {};

// Check Jquery is already Loaded
if (window.jQuery) {
    // jQuery is loaded no need to load it again
    $$ = $;
} else {
    // jQuery is not loaded need to be loaded
    $$ = require('jquery');
}

$$(document).ready(() => {
    try {
        routings.forEach(rt => {
            if (rt.id) {
                if (Array.isArray(rt.id)) {
                    rt.id.forEach(id => {
                        addRouteClick($$('#' + id), rt.module, rt.win, rt.init)
                    })
                } else {
                    addRouteClick($$('#' + rt.id), rt.module, rt.win, rt.init)
                }
            }

            if (rt.class) {
                if (Array.isArray(rt.class)) {
                    rt.class.forEach(cla => {
                        addRouteClick($$('.' + cla), rt.module, rt.win, rt.init)
                    })
                } else {
                    addRouteClick($$('.' + rt.class), rt.module, rt.win, rt.init)
                }
            }
        });
    } catch (error) {
        console.log('error')
    }
})

function addRouteClick(element, module, win, init) {
    element.on("click", function (event) {
        event.preventDefault();
        if (init && appData.spa) {
            init();
        };

        if (module) ezspa_router.relocate(module);
        if (win) ezspa_router.newWin(win);
    })
}

let ezspa_router = {};

ezspa_router.relocate = (location) => {
    try {
        if (appData.spa) {
            let winConf = require('../../vcs/' + location + '/assets.js');
            $$('ezspapage').hide();
            $$('ezspanav').hide();
            $$('ezspapage#ezspapage_' + location).show();
            if (winConf.navBar) $$('ezspanav').show();
        }
        else {
            let pth;

            if (appData.dev) pth = '../' + location + '/build.html';
            else pth = '../' + location + '/index.html';

            pth = path.join(__dirname, pth);

            window.location = pth;
        }
    } catch (error) {
        console.log(error);
    }
}

ezspa_router.newWin = (win) => {
    try {
        win.parent = remote.getCurrentWindow();
        main.newWindow(win);
        if (win.closeCurrent && !win.modal) win.parent.close();
    } catch (error) {
        console.log('error');
    }
}

ezspa_router.closeThis = () => {
    try {
        let win = remote.getCurrentWindow();
        win.close();
    } catch (error) {
        console.log('error');
    }
}