const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth-routes');

const keys = require('./config/keys');

const app = express();


app.use(bodyParser.json());

// cors
const corsOptions = {
  origin: 'http://localhost:8080',
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

//connect to mongodb
mongoose.connect(process.env.MONGODB_URI || keys.mongodb.dbURI);

mongoose.connection.on('connected', () => {
  console.log('Connected to db');
})

mongoose.connection.on('error', (err) => {
  console.log('failed to connect to db. Error: ' + err);
})


//set up routes
app.use('/auth', authRoutes);


const port = 3000;
app.listen(process.env.PORT || port, () => {
  console.log(`Server up and running on port ${process.env.PORT ? process.env.PORT : port}`);
});