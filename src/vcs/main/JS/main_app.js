// Routing inside a function using ezspa_router

function mainToAllUsers() {
    // Route to allUsers
    ezspa_router.relocate('allUsers')
}

function openNewWinC() {
    // Open a window and close current
    ezspa_router.newWin({ window : 'newWin', closeCurrent : true})
}

function openNewWin() {
    // Open a window and let both accessible
    ezspa_router.newWin({ window : 'mainWin'})
}