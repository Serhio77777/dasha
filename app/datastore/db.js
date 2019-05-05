const mysql = require('mysql')
const config = require('../config/config')

const connection = mysql.createConnection(config.sqlDB)

connection.connect((error) => {
    if (error) {
        console.error('error connecting: ' + error.stack);
        return;
    }
})

module.exports = connection