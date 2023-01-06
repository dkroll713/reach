const cf = require('../config.js')
const {Pool} = require('pg');
const pool = new Pool({
  user: cf.user,
  password: cf.password,
  host: cf.host,
  port: cf.db_port,
  database: cf.db
})

module.exports.getUser = (req, res) => {
  let user = req.query.user;
  console.log(req.url);
  let query = `select * from users u where u.username=$1`
  let values = [user]
  pool.query(query,values).then((results) => {
    if (results.rows.length === 0) {
      query = `insert into "users" (username) values($1) returning user_id`
      pool.query(query,values).then((results) => {
        res.send(results.rows[0])
      })
    } else {
      res.send(results.rows[0]);
    }
  })
}