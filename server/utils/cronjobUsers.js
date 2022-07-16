const cronjob = require('node-cron');
var User = require('../models/userSchema');


// cronjob.schedule('10 45 19 * * *', () => { // run this at 7:45:10pm every day
    // const now =  new Date(Date.now() - 5*60*60 * 1000);   //remove if not confirmed in 5 hours

    cronjob.schedule('0 0 3 2 * *', () => { // run this at 3:00:00am every 2 days
    const now =  new Date(Date.now() - 24*60*60 * 1000);   //remove if not confirmed in 1 day
    User.deleteMany({"$and": [{isVerified: false}, { createdAt: { $lt: now } }]})
    .then(() =>{
        console.log("users deleted from db")
    })
});

module.exports = cronjob;