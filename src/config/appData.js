// Configuration File for the entire app.
let appData =

    {
        "spa": true,                // If true it will be SPA ("Single Page App") 
                                    // False it will modular (VCs)
        "defaultWindow": "mainWin", // The entry window for SPA Mode (Production only)
        "defaultVC": "main",        // The entry VC for modular Mode (Production only)
        "devWindow": "mainWin",     // The entry Window for SPA Mode (dev only)
        "devVC": "main",            // The entry VC in for modular Mode (dev only)
        "dev": true                 // If true, it will be in Develeopement mode 
                                    // where all the VCs or Windows will be built 
                                    // before relocating to them
    }

module.exports = appData;