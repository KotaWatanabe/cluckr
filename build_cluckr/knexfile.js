// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'build_cluckr'
    },
    migrations:{
      directory:"./db/migrations"
    }
  }

};
