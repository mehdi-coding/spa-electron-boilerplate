// The build File
const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')
const fs = require('fs')
let template = require('./templating.js');
let appData = require('../config/appData.js')

template.tempDef = require('../config/templateDef.js');

// Function to Check if the passed path is a directory
const isDirectory = source => lstatSync(join(__dirname, source)).isDirectory()

// Function to get all directories inside a given source directory
const getDirectories = source => readdirSync(join(__dirname, source)).filter(name => isDirectory(join(source, name)))

// ********************* Global Variables ***********************
// To check for duplication
let globCss = [];
let globJs = [];
let nav = false;

let windowsDir, srcDir, rscDir, vcsDir, modulesDir, libsDir;

try {
    // ******************************** SPA Build ******************************************
    // *************************************************************************************
    if (appData.spa) {
        // relative windows and src directories to this build file
        windowsDir = '../windows/';
        srcDir = '../';

        // Resources, VCs & libs directory relative to the window being built
        rscDir = '../../resources/';
        vcsDir = '../../vcs/';
        libsDir = '../../libs/';

        // Get all the windows/directories that are inside the windows directory "SPA mode"
        let windows = getDirectories(windowsDir);

        // ------ Build Each Window -----------------
        windows.forEach(win => {
            // Resest Global variables To check for duplication
            globCss = [];
            globJs = [];
            nav = false;

            // Get the config file of the window
            let winConfig = require(windowsDir + win + '/config.js');

            // Init the page variable where all the output will be saved
            let pg = '';

            // ------ Prepare the string containing HTML of the pages to be passed for template --------
            let strHTML = loadClosingHead(winConfig);

            winConfig.vcs.forEach(mod => {
                let assets = require(srcDir + 'vcs/' + mod + '/assets.js');
                // Check if the Nav Bar is already included
                if (!nav) {
                    // check if the current VC has navbars
                    if (assets.navBar) {
                        strHTML += '<ezspanav style="display: none;">'
                        strHTML += loadNavBars(assets);
                        strHTML += "</ezspanav>"
                        nav = true;
                    }
                }

                strHTML += `<ezspapage id='ezspapage_${mod}' `;

                // Check if this VC is the main default entry in order to show it and the nav bar if it has
                if (winConfig.main === mod) {
                    strHTML += '>';
                    if (assets.navBar) {
                        let temporary = strHTML.split('<ezspanav style="display: none;">').join('<ezspanav>')
                        strHTML = temporary;
                    }
                }
                else strHTML += ' style="display: none;">'

                // strHTML += `<ezspapage id='ezspapage_${mod}' style="display: none;">`;
                strHTML += loadHtml(assets, mod);
                strHTML += '</ezspapage>';
            })

            // ------- Prepare the footer HTML String to be passed to template ------
            let strFooter = loadFooter(winConfig);

            // ************* --------- Start The Build Process --------- ***********************
            // *********************************************************************************

            // ------ Load the Head part of the HTML from templates Once for each window ---
            pg += loadHead(winConfig);

            // ------------ Load CSS from Resources Directory for each vc ----------------
            winConfig.vcs.forEach(mod => {
                let assets = require(srcDir + 'vcs/' + mod + '/assets.js');
                pg += loadRscCss(assets);
            })

            // ----------- Load Template's Needed CSS From resources ------------------------
            let templ = {}

            templ.css = template.getCSS(strHTML + strFooter);
            pg += loadRscCss(templ);

            // --------- Load The HTML already Prepared above --------------
            pg += strHTML;

            // ------------ Load Scripts from Resources Directory ----------------
            winConfig.vcs.forEach(mod => {
                let assets = require(srcDir + 'vcs/' + mod + '/assets.js');
                pg += loadRscJs(assets);
            })

            // ---------- Load Scripts used by Template -------------------------
            templ.rscScrits = template.getJS(strHTML + strFooter);
            pg += loadRscJs(templ);

            // ---------------- Load Scripts from Libs Dirctory for each VC ---------
            winConfig.vcs.forEach(mod => {
                let assets = require(srcDir + 'vcs/' + mod + '/assets.js');
                pg += loadLibs(assets);
            })

            // ---------------- Load Scripts from JS Dirctory for each VC ---------
            winConfig.vcs.forEach(mod => {
                let assets = require(srcDir + 'vcs/' + mod + '/assets.js');
                pg += loadAppJs(assets, mod + '/');
            })

            // -------------- Load the Footer from templates directory -----------------
            pg += strFooter;

            // ---------- Load the Routing Lib ------------------------------
            pg += '<script src="../../ezspa/routing.js"></script>';

            // --------- Close the body and HTML tag ----------------------
            pg += "</body></html>";

            // ************* --------- Start The Templating Process --------- ******************
            // *********************************************************************************
            // --------- Templating -----------------------------
            let rendredHTML = template.render(pg);

            // --------- Create the built file ------------------
            fs.writeFileSync(join(__dirname, windowsDir + win + '/index.html'), rendredHTML)

        })
    }
    // ******************************** Modular Build ***************************************
    // **************************************************************************************
    else {
        // relative windows and src directories to this build file
        modulesDir = '../vcs/';
        srcDir = '../';

        // Resources, VCs & libs directory relative to the window being built
        rscDir = '../../resources/';
        vcsDir = '';
        libsDir = '../../libs/';

        // Get all the windows/directories that are inside the windows directory "SPA mode"
        let windows = getDirectories(modulesDir);

        // ------ Build Each Window -----------------
        windows.forEach(mod => {

            // Resest Global variables To check for duplication
            globCss = [];
            globJs = [];
            nav = false;

            // Get the config file of the window
            let assets = require(modulesDir + mod + '/assets.js');

            // Init the page variable where all the output will be saved
            let pg = '';

            // ------ Prepare the string containing HTML of the pages to be passed for template --------
            let strHTML = loadClosingHead(assets);

            // check if the current VC has navbars
            if (assets.navBar) {
                strHTML += loadNavBars(assets);
            }

            strHTML += loadHtml(assets, mod);

            // ------- Prepare the footer HTML String to be passed to template ------
            let strFooter = loadFooter(assets);

            // ************* --------- Start The Build Process --------- ***********************
            // *********************************************************************************

            // ------ Load the Head part of the HTML from templates Once for each window ---
            pg += loadHead(assets);

            // ------------ Load CSS from Resources Directory for each vc ----------------
            pg += loadRscCss(assets);

            // ----------- Load Template's Needed CSS From resources ------------------------
            let templ = {}

            templ.css = template.getCSS(strHTML + strFooter);
            pg += loadRscCss(templ);

            // --------- Load The HTML already Prepared above --------------
            pg += strHTML;

            // ------------ Load Scripts from Resources Directory ----------------
            pg += loadRscJs(assets);

            // ---------- Load Scripts used by Template -------------------------
            templ.rscScrits = template.getJS(strHTML + strFooter);
            pg += loadRscJs(templ);

            // ---------------- Load Scripts from Libs Dirctory for each VC ---------
            pg += loadLibs(assets);

            // ---------------- Load Scripts from JS Dirctory for each VC ---------
            pg += loadAppJs(assets, '');

            // -------------- Load the Footer from templates directory -----------------
            pg += strFooter;

            // ---------- Load the Routing Lib ------------------------------
            pg += '<script src="../../ezspa/routing.js"></script>';

            // --------- Close the body and HTML tag ----------------------
            pg += "</body></html>";

            // ************* --------- Start The Templating Process --------- ******************
            // *********************************************************************************
            // --------- Templating -----------------------------
            let rendredHTML = template.render(pg);

            // --------- Create the built file ------------------
            fs.writeFileSync(join(__dirname, modulesDir + mod + '/index.html'), rendredHTML)
        })
    }
} catch (error) {
    throw error;
}

// ***************************************************************************************
// ******************************** Building Functions ***********************************
// ***************************************************************************************

// ------------ Load the head HTML from Template
function loadHead(assets) {
    let pg = '';

    if (assets.head === null) {
        try {
            pg = fs.readFileSync(join(__dirname, srcDir + 'templates/head.html'), 'utf8')
        } catch (error) {
            throw error
        }
    } else {
        try {
            pg = fs.readFileSync(join(__dirname, srcDir + 'templates/') + assets.head, 'utf8')
        } catch (error) {
            throw error
        }
    }
    return pg;
}

// ------------ Function to Load CSS from Resources Directory ------------
function loadRscCss(assets) {
    let pg = '';
    assets.css.forEach(src => {
        if (globCss.indexOf(src) === -1) {
            globCss.push(src);
            src = rscDir + src;
            pg += `<link href="${src}" rel="stylesheet">
            `;
        }
    })
    return pg;
}

// ------------ Function to Load Scripts from Resources Directory ----------------
function loadRscJs(assets) {
    let pg = '';
    assets.rscScrits.forEach(src => {
        if (globJs.indexOf('rsc/' + src) === -1) {
            globJs.push('rsc/' + src);
            src = rscDir + src;
            pg += `<script src="${src}"></script>
            `;
        }
    })
    return pg;
}

// ------------ Function to Load Closing Head and opening Body from templates ----------------
function loadClosingHead(assets) {
    let pg = '';
    if (assets.headBody == null) {
        try {
            pg += fs.readFileSync(join(__dirname, srcDir + 'templates/headBody.html'), 'utf8')
        } catch (error) {
            throw error
        }
    } else {
        try {
            pg += fs.readFileSync(join(__dirname, srcDir + 'templates/' + assets.headBody), 'utf8')
        } catch (error) {
            throw error
        }
    }
    return pg;
}

// ---------------- Function to Load Nav Bar HTML -------------------------------
function loadNavBars(assets) {
    let pg = '';
    if (assets.navBar === true) {
        try {
            pg += fs.readFileSync(join(__dirname, srcDir + 'templates/sideBar.html'), 'utf8')
            pg += fs.readFileSync(join(__dirname, srcDir + 'templates/headerBar.html'), 'utf8')
        } catch (error) {
            throw error
        }
    }
    return pg;
}

// ---------------- Function to Load HTML from HTML Dirctory of the app ---------
function loadHtml(assets, mod) {
    let pg = '';
    assets.HTMLs.forEach(html => {
        pg += fs.readFileSync(join(__dirname, srcDir + 'vcs/' + mod + '/HTML/' + html), 'utf8')
    })
    return pg;
}

// -------------- Function to Load the Footer from templates directory -----------------
function loadFooter(assets) {
    let pg = '';
    if (assets.footer == null) {
        try {
            pg += fs.readFileSync(join(__dirname, srcDir + 'templates/footer.html'), 'utf8')
        } catch (error) {
            throw error
        }
    } else {
        try {
            pg += fs.readFileSync(join(__dirname, srcDir + 'templates/' + assets.footer), 'utf8')
        } catch (error) {
            throw error
        }
    }
    return pg;
}

// ---------------- Function to Load Scripts from JS Dirctory of the app ---------
function loadAppJs(assets, mod) {
    let pg = '';
    assets.Scripts.forEach(src => {
        src = vcsDir + mod + 'JS/' + src;
        pg += `<script src="${src}"></script>
        `;
    })
    return pg;
}

function loadLibs(assets) {
    let pg = '';
    assets.libs.forEach(src => {
        if (globJs.indexOf('libs/' + src) === -1) {
            globJs.push('libs/' + src);
            src = libsDir + src;
            pg += `<script src="${src}"></script>
            `;
        }
    })
    return pg;
}