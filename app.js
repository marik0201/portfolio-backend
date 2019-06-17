const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost/Portofolio', err => {
  if (err) {
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
  console.log('Подключено к монге <3');
  
}); 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
  
});
