Meteor.methods({
  sendMail: (to, subject, html) => {
    check([to, subject, html], [String]);
    // verify if this.ublock is a function
    //this.unblock();
    const from = "R7Auto <info.r7auto@gmail.com>";
    Email.send({ to,from,subject, html });
  }
});
