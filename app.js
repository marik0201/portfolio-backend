const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const PORT = 3000;
const mongo = require('./mongo');

const parseGitHub = require('./services/git-parsing');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

// parseGitHub();

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
