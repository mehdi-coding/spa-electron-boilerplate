// Import The users Model for db operations
let users_db = require('../../models/users_db.js');
var table = {};

$(document).ready(function () {
    // Get all users from db
    let users = users_db.getAllUsers();

    // Init the Table
    table = $('#allUsersTable').DataTable(
        {
            data: users,
            columns: [
                { data: 'name' },
                { data: 'email' }
            ],
            "lengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]]
        }        
    );
})

// This function will be called to init the allUsers view in SPA mode
// in case a user is added the table is updated when relocating to the view
function updateTable() {
    // Get The users
    let users = users_db.getAllUsers();
    // Update the table ...
    table.clear();
    table.rows.add(users);
    table.draw();

    console.log('Table updated ...');
}