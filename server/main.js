import { Meteor } from "meteor/meteor";

Meteor.startup(() => {
  // code to run on server at startup
  Cloudinary.config({
    cloud_name: "divk5nutg",
    api_key: "563392565759232",
    api_secret: "UsPa5uDyP02a2oHcCQDB9ftLkTI"
  });

  smtp = {
    username: "info.r7auto@gmail.com",
    password: "info.r7auto2018",
    server: "smtp.gmail.com",
    port: 465
  };
  process.env.MAIL_URL =
    "smtps://" +
    encodeURIComponent(smtp.username) +
    ":" +
    encodeURIComponent(smtp.password) +
    "@" +
    encodeURIComponent(smtp.server) +
    ":" +
    smtp.port;
  //process.env.MAIL_URL = 'smtp://postmaster@3wp.io:Rule#M4Car81n3@smtp.mailgun.org:465';
});
