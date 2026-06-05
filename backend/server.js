const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const authRoutes = require('./routes/authRoutes');


app.get('/', (req,res) => {
    res.send("hello world");
});

app.use('/register', authRoutes);
app.use('/login',authRoutes);


module.exports = app;