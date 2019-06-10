const config = {
    web: {
      port: process.env.PORT || 27182
    },
    sqlDB:  {
      host: 'us-cdbr-iron-east-02.cleardb.net',
      // host: 'mysql://b157485e0db97e:5ad60993@us-cdbr-iron-east-02.cleardb.net/heroku_fcb1b4e6abecbe4?reconnect=true',
      user: 'ba00ce890dedc6',
      password: 'b6702ab6',
      database: 'heroku_b8e13114a25c918'
    },
    // sqlDB:  {
    //   // host: '35.222.88.203',
    //   sockePath: '/cloudsql/my-project-1474294752715:us-central1:mysqlconnection',
    //   user: 'salat',
    //   password: 'dambldor',
    //   database: 'tourism'
    // },
    // my-project-1474294752715:us-central1:mysqlconnection
    // sqlDB:  {
    //   host: 'localhost',
    //   // host: 'mysql://b157485e0db97e:5ad60993@us-cdbr-iron-east-02.cleardb.net/heroku_fcb1b4e6abecbe4?reconnect=true',
    //   user: 'salat',
    //   password: 'dambldor',
    //   database: 'tourism'
    // }
  }
  
// CREATE TABLE IF NOT EXISTS User (id int(11) NOT NULL AUTO_INCREMENT, role varchar(15) DEFAULT NULL, email varchar(100) DEFAULT NULL, password varchar(200) DEFAULT NULL, firstName varchar(100) DEFAULT NULL, surName varchar(100) DEFAULT NULL, image varchar(200) DEFAULT NULL, userHash varchar(100) NOT NULL UNIQUE, apiKey varhcar(100) DEFAULT NULL, PRIMARY KEY(id));
// CREATE TABLE IF NOT EXISTS Trip (id int(11) NOT NULL AUTO_INCREMENT, name varchar(100) DEFAULT NULL, description text DEFAULT NULL, userId int(11) DEFAULT NULL, places text, PRIMARY KEY(id));

// CREATE TABLE IF NOT EXISTS Tip (id int(11) NOT NULL AUTO_INCREMENT, cityId int(11) DEFAULT NULL, tips text, PRIMARY KEY(id));
// CREATE TABLE IF NOT EXISTS Place (id int(11) NOT NULL AUTO_INCREMENT, cityId int(11) DEFAULT NULL, name varchar(100) DEFAULT NULL, description text DEFAULT NULL, rate text, images text, coords text, PRIMARY KEY(id));
// CREATE TABLE IF NOT EXISTS Image (id int(11) NOT NULL AUTO_INCREMENT, image longtext, PRIMARY KEY(id));
// CREATE TABLE IF NOT EXISTS Discount (id int(11) NOT NULL AUTO_INCREMENT, cityId int(11) DEFAULT NULL, image varchar(100) DEFAULT NULL, name varchar(100) DEFAULT NULL, description text DEFAULT NULL, site text DEFAULT NULL, companyId int(11) DEFAULT NULL, places text, PRIMARY KEY(id));
// CREATE TABLE IF NOT EXISTS Country (id int(11) NOT NULL AUTO_INCREMENT, name varchar(100), PRIMARY KEY(id));
// CREATE TABLE IF NOT EXISTS City (id int(11) NOT NULL AUTO_INCREMENT, name varchar(100), countryId int(11) DEFAULT NULL, PRIMARY KEY(id));
// CREATE TABLE IF NOT EXISTS Company (id int(11) NOT NULL AUTO_INCREMENT, name varchar(100) DEFAULT NULL, image varchar(100) DEFAULT NULL, discount text, PRIMARY KEY(id));
  module.exports = config
  