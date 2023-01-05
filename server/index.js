const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const auth = require('./authRoutes.js')
const leaderboards = require('./scoreRoutes.js')

const cf = require('../config.js')

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

app.use(express.json());

app.options('*', cors());

app.use(express.static(path.join(__dirname,"../public",)));

app.post('/guess', (req,res) => {
  console.log(req.body)
  res.send('guess received')
})

app.get('/u*', auth.getUser)

app.get('/scores',leaderboards.getLeaderboards)

app.post('/submit', leaderboards.submitScore);

app.listen(cf.port, () => {
  console.log(`listening on port ${cf.port}`);
})