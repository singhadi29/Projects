const express = require('express');
const mongoose = require('mongoose')
const categories = require('./Routes/categories');
const students = require('./Routes/students');
const courses = require('./Routes/courses');
const app = express();

mongoose.connect('mongodb://127.0.0.1/learningPlatform')
.then(() => console.log('Connection to database is successful.'))
.catch(err => console.error('Could not connect to MongoDB', err))

app.use(express.json());
app.use('/api/categories', categories);
app.use('/api/students', students);
app.use('/api/courses', courses);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}.`));