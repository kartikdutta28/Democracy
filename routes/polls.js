const express = require('express');
const router =express.Router();
let Poll =require('../models/poll');
var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '695685',
  key: '5e1bf950f632c8c82386',
  secret: 'e5cd75bfff6ffaa060c7',
  cluster: 'ap2',
  encrypted: true
});

router.get('/', (req, res, next) => {
        Poll.find().exec((err, polls) => {
            res.render('poll', { polls: polls });
        });
    });
router.post('/:pollId/vote', (req, res, next) => {
  const choice = req.body.choice;
  const identifier = `choices.${choice}.votes`;
  Poll.update({_id: req.params.pollId}, {$inc: {[identifier]: 1}}, {}, (err, numberAffected) => {
    let Pusher = require('pusher');
    let pusher = new Pusher({
      appId:'695685',
      key:'5e1bf950f632c8c82386',
      secret:'e5cd75bfff6ffaa060c7',
      cluster: 'ap2'
    });
    let payload = { pollId: req.params.pollId, choice: choice };
    pusher.trigger('poll-events', 'vote', payload, req.body.socketId);
    res.send('');
  });
});

module.exports = router;
