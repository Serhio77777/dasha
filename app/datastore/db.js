const mysql = require('mysql')
const config = require('../config/config')

let connection = mysql.createConnection(config.sqlDB)
// remove that
// function handleDisconnect(conn) {
//     connection.on('error', function(err) {
//         if (!err.fatal) {
//             return;
//         }

//         if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
//             console.log(11111)
//             throw err;
//         }
//         console.log('Re-connecting lost connection: ' + err.stack);
//         connection = mysql.createConnection(config.CLEARDB_DATABASE_URL);
//         handleDisconnect(connection);
//         connection.connect();
//     });
// }

function handleDisconnect() {
  connection = mysql.createConnection(config.sqlDB);
  const del = connection._protocol._delegateError;
  connection._protocol._delegateError = function(err, sequence){
    if (err.fatal) {
        console.trace('fatal error: ' + err.message);
    }
    return del.call(this, err, sequence);
  };
  connection.connect(function(err) {             
    if (err) {                                  
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); 
    }                                     
  });                                     

  connection.on('error', function(err) {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') { 
      handleDisconnect();                         
    } else {                                      
      throw err;                                  
    }
  });
}

handleDisconnect();
// remove that
// setInterval(function () {
//     connection.query('SELECT 1');
// }, 5000);
module.exports = connection