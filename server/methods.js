Meteor.methods({
  sendMail: (to, subject, text) => {
    check([to, subject, text], [String]);
    // Let other method calls from the same client start running, without
    // waiting for the email sending to complete.
    //this.unblock();
    const from = "R7Auto <info.r7auto@gmail.com>";
    Email.send({ to,from,subject, text });
  }
});
