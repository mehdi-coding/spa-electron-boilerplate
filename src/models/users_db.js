// Example Model Where will be the interraction with th database
// *************************************************************
let fs = require('fs');
// Get the configurations from '../config/db.js'
let db = require('../config/db.js');

// Init the object that will be exported
let exampleDb = {};

// Function to return all the users
exampleDb.getAllUsers = () => {
    try {
        // Get the fake data using the filename from the config/db.js
        let fakeData = require(db.filename);

        // Return The users
        return fakeData.users;

    } catch (e) {
        console.lof(e);
        return false;
    }
}

// Function to add a user
exampleDb.addUser = (user) => {
    try {
        // Get the fake data using the filename from the config/db.js
        let fakeData = require(db.filename);

        // Add the user to the db object than stringify it
        fakeData.users.push(user);
        let newDataStr = JSON.stringify(fakeData);

        // Write the data back to the JSON File
        fs.writeFileSync(db.filename, newDataStr);

        return true;

    } catch (e) {
        console.lof(e);
        return false;
    }
}

module.exports = exampleDb;

// JSON data in test_db.json were generated from http://www.mockaroo.com/