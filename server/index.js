const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const compression = require('compression');
const minify = require('express-minify');

const cf = require('../config.js');

const controllers = require('./controllers.js');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

app.use(express.json());

app.options('*', cors());

app.use(compression())
app.use(minify())
app.use(express.static(path.join(__dirname,"../public",)));

app.post('/guess', (req,res) => {
  console.log(req.body)
  res.send('guess received')
})

app.get('/ping', ((req, res) => res.send(`pinged`)))

app.get('/u*', controllers.getUser)

app.get('/scores',controllers.getLeaderboards)

app.post('/submit', controllers.submitScore);

app.listen(cf.port, () => {
  console.log(`listening on port ${cf.port}`);
})