const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost/Portfolio',
  { useNewUrlParser: true, useFindAndModify: false },
  err => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
    console.log('Connected to Mongo');
  }
);
