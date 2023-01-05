const cf = require('../config.js')
const {Pool} = require('pg');
const pool = new Pool({
  user: cf.user,
  password: cf.password,
  host: cf.host,
  port: cf.db_port,
  database: cf.db
})

module.exports.getLeaderboards = (req, res) => {
  console.log(req.query)
  let query = `
    select u.username as name, l.difficulty, l.score
    from users u, leaderboards l
    where l.user_id = u.user_id and difficulty=$1
    order by l.score asc
    limit 10
  `
  let values = [req.query.difficulty]
  pool.query(query,values)
    .then((response) => {
      res.send(response.rows)
    })
    .catch((err) => {
      res.send('error fetching scores:', err)
    })
}

module.exports.submitScore = (req, res) => {
  let body = req.body
  console.log(body);
  let query = `
    insert into leaderboards (user_id,difficulty,score) values($1,$2,$3)
  `
  let values = [body.name, body.difficulty,body.score]
  pool.query(query,values)
    .then((response) => {
      res.send('score submitted successfully')
    })
    .catch((err) => {
      res.send('error submitting score:', err)
    })
}