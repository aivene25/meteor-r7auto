Meteor.methods({
  sendMail: (to, subject, html) => {
    check([to, subject, html], [String]);
    const from = "R7Auto <info.r7auto@gmail.com>";
    Meteor.defer(() => {
      Email.send({ to, from, subject, html });
    });
  }
});
