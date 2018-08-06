Meteor.methods({
  sendMail: (to, subject, text) => {
    check([to, subject, text], [String]);
    // Let other method calls from the same client start running, without
    // waiting for the email sending to complete.
    //this.unblock();
    let from = "eneroakerele@gmail.com";
    let cc = "aivene25@gmail.com";
    console.log("sending mail");
    Email.send({ to,cc,from,subject, text });
  }
});
