const PORT = 3000;
const app = require('./middlewares');
require('./mongo');

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
