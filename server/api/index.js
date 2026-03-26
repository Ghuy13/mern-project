const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('../../src/routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

routes(app);

// MongoDB connection
mongoose.connect(process.env.MONGO_DB || 'mongodb://localhost:27017/ecommerce')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

module.exports = app;
