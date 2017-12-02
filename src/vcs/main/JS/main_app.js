// Routing inside a function using ezspa_router

function mainToAddUser() {
    // Route to addUser
    ezspa_router.relocate('addUser')
}

function mainToAllUsers() {
    // Route to allUsers
    ezspa_router.relocate('allUsers')
}

function openNewWin() {
    console.log('Good Working ...');
}