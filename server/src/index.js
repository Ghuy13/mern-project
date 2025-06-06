const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();


const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Hello World');
})

console.log('Connecting to MongoDB...', process.env.MONGO_DB);

mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_DB}@cluster0.0bxl8dn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

app.listen(port, () => {
    console.log(`Server is running on port:`, + port);
});


