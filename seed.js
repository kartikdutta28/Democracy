require('mongoose').connect('mongodb://localhost/democracy');

const topics = [
       "Is Ram mandir really an agenda for coming ellection",
       "who is a better leader Rahul Gandhi or Narendra Modi"
  ];
   let Poll = require('./models/poll');

   // empty the collection first
   Poll.remove({})
       .then(() => {
           let polls = [];
           for (let i = 0; i < 2; i++) {
               polls.push({
                   topic: topics[i],
                   choices: [
                       {
                           value: "Yes",
                           votes: Math.round(Math.random() * 20)
                       },
                       {
                           value: "No",
                           votes: Math.round(Math.random() * 20)
                       },
                       {
                           value: "I really don't care",
                           votes: Math.round(Math.random() * 20)
                       }
                   ]
               });
           }
           return Poll.create(polls);
       })
       .then(() => {
           process.exit();
       })
       .catch((e) => {
           console.log(e);
           process.exit(1);
       });
