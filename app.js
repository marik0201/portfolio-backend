const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const session = require('express-session');
const PORT = 3000;
const mongo = require('./mongo');

const parseGitHub = require('./services/git-parsing');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: 'secrettttt',
    resave: false,
    saveUninitialized: true
  })
);
app.use(routes);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
