require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_DB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
.then(() => console.log('Database connected :D'))
.catch(err => console.log(err));

