import { Meteor } from 'meteor/meteor';
/*
var Ravepay = require('ravepay');
var rave = new Ravepay("FLWPUBK-bbc0e4adaa9cdcb7fb2e00ebd461533f-X", "FLWSECK-ef898b252aea071611c60903cd75ef24-X", false);

console.log(rave);
*/

Meteor.startup(() => {
  // code to run on server at startup
  Cloudinary.config({
    cloud_name: 'divk5nutg',
    api_key: '563392565759232',
    api_secret: 'UsPa5uDyP02a2oHcCQDB9ftLkTI'
  });
});