const express = require('express');
const app = express();
const feedback = require('./routes/feedback.js');
const mongoose = require('mongoose');


app.use(express.json());

app.use('/api/feedbacks', feedback);

mongoose.connect("mongodb://localhost/feedback_database")
    .then(() => console.log('connected to mongo DB....'))
    .catch(error => console.log('Didnot connect to DB',error));


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`listing at ${port}`);
});

