// This is the configuration of your database that will be used by models
const path = require('path');

var dbConfig =
  {
    format: "JSON",
    filename: path.join(__dirname, '../resources/test_db.json')
  };

module.exports = dbConfig;