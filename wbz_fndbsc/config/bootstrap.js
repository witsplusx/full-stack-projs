/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return done();
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  const path = require('path');
  const fs=require('fs');
  const file = path.join(__dirname, '../assets/gisdatas/oradata_exp_gasep.json');
  let gasEqups = fs.readFileSync(file, 'utf-8');
  if(null!=gasEqups) {
    // gasEqups = JSON.parse(gasEqups);
    sails.config.custom.gasEPDatas.equipments = JSON.parse(gasEqups);
    // console.log('data==============' + sails.config.custom.gasEPDatas.equipments);
  }
  // const custom = sails.global;
  // console.log('gasdatas=====' + sails.custom);
  // sails.custom.gasEPDatas.equipments = gasEqups;

  let actions = sails.getActions();
  console.log('----' + actions);

  let CronJob = require('cron').CronJob;
  new CronJob('*/5 * * * * *', function() {
    console.log('You will see this message every second');
    sails.sockets.broadcast('funSockets', 'wshello', {howdy: 'hi there!'});
  }, null, true, 'Asia/Shanghai');


  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
