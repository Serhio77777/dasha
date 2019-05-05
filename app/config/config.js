const config = {
    web: {
      port: process.env.PORT || 27182
    },
    sqlDB:  {
      host: 'localhost',
      user: 'salat',
      password: 'dambldor',
      database: 'tourism'
    }
  }
  
  module.exports = config
  