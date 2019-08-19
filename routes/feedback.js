const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Feedback = mongoose.model('Feedback', mongoose.Schema({
    vendorName: {type: String},
    quality: {type: Number},
    taste: {type: Number},
    variety: {type: Number},
    presentation: {type: Number},
    comments: {type: String}
}));

const addFeedback = async (feedbackObj) => {
    const {vendorName, quality, taste, variety, presentation, comments} = {...feedbackObj};
    console.log('********'+JSON.stringify(feedbackObj));
    const feedback = new Feedback({
        vendorName,
        quality,
        taste,
        variety,
        presentation,
        comments
    });
    try {
        const result = await feedback.save();
        return result;
    } catch(ex) {
        console.log(JSON.stringify(ex));
        return ex.message;
    }
}


router.get('/:id', async (req, res) => {
    console.log(req.params);
    const movies = await Feedback.find({vendorName: req.params.id});
    res.send(movies);
});

router.get('/', async (req, res) => {
    console.log("********get ALll***********");
    console.log("req.query"+req.query);
    console.log("req.param"+req.params);
    if (req.query && req.query.vendorName) {
        const movies = await Feedback.find({vendorName: req.query.vendorName});
        res.send(movies);
    } else {
        const movies = await Feedback.find();
        res.send(movies);
    }
});


router.post('/', (req, res) => {
    console.log('*******Post Req*************');
    const result = addFeedback(req.body);
    res.send(result);
});


module.exports = router;