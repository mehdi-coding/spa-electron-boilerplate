function addUser() {
    // Import the users model to be used for db operations 
    let users_db = require('../../models/users_db.js');

    let user = {};

    user.name = document.getElementById('name').value;
    user.email = document.getElementById('email').value;

    // Insert the user
    if (users_db.addUser(user)) 
        alert('User Succesfully Added ...')
    else 
        alert('Error While adding the user ... Sorry')

}