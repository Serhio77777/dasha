const mysql = require('mysql')
const config = require('../config/config')

if (process.env.INSTANCE_CONNECTION_NAME) {
  config.sqlDB.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}
let connection = mysql.createConnection(config.sqlDB)

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

module.exports = connection