const mysql = require('mysql')
const config = require('../config/config')

const connection = mysql.createConnection(config.sqlDB)

function handleDisconnect(conn) {
    connection.on('error', function(err) {
        if (!err.fatal) {
            return;
        }

        if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
            console.log(11111)
            throw err;
        }
        console.log('Re-connecting lost connection: ' + err.stack);
        connection = mysql.createConnection(config.CLEARDB_DATABASE_URL);
        handleDisconnect(connection);
        connection.connect();
    });
}
handleDisconnect(connection);
module.exports = connection