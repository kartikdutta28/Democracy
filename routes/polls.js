const express = require('express');
const router =express.Router();
let Poll =require('../models/poll');

router.get('/', (req, res, next) => {
        Poll.find().exec((err, polls) => {
            res.render('poll', { polls: polls });
        });
    });
module.exports = router;
