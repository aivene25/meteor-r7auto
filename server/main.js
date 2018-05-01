import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Cloudinary.config({
    cloud_name: 'divk5nutg',
    api_key: '563392565759232',
    api_secret: 'UsPa5uDyP02a2oHcCQDB9ftLkTI'
  });
});
