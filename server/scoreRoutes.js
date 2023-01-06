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
    select l.id, u.username as name, l.difficulty, l.score, l.guesses, l.feedbacks
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
      res.status(400).send(err)
    })
}

module.exports.submitScore = (req, res) => {
  let body = req.body
  console.log(body);
  let query = `
    insert into leaderboards (user_id,difficulty,score,guesses,feedbacks) values($1,$2,$3,$4,$5)
  `;
  let values = [body.name, body.difficulty, body.score, body.guesses, body.feedbacks];
  pool.query(query,values)
    .then((response) => {
      res.send('score submitted successfully');
    })
    .catch((err) => {
      res.status(400).send(err);
    })
}