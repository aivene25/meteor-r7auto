import plugins from "../plugins";

Template.register.onRendered(function() {
  plugins();
});

Template.register.events({
  "submit #register": function(event) {
    event.preventDefault();
    let fname = event.target.fname.value;
    let lname = event.target.lname.value;
    let phone = event.target.phone.value;
    let email = event.target.email.value;
    let pass = event.target.pass.value;
    let con_pass = event.target.con_pass.value;
    console.log(fname, lname, email);

    if(pass.trim() !== con_pass.trim()){
      console.log("Passwords do not match");
      return;
    }
    if(!email || !fname || !lname || !phone || !pass){
      console.log("Kindly fill in the proper values");
      return;
    }
    console.log(pass);
    let username = fname + " " + lname;
    options ={};
    options.email = email;
    options.password= pass;
    options.profile= {first_name: fname, last_name: lname, phone: phone}

    Accounts.createUser( options, (err, res) => {
        if(err){
          console.log(err.reason)
        }else{
          console.log(res)
        }
      }
    );

    // give user feedback;
    // show loading screens
  },

  "submit #login": function(event){
    event.preventDefault();
    let email = event.target.email.value;
    let pass = event.target.pass.value;

    if( !email || ! pass){
      console.log("Please fill in the proper forms");
      return; 
    }

    Meteor.loginWithPassword(email, pass, (err,res)=>{
      if(err){
        console.log(err.reason);
      }else{
        console.log(res);
      }
    })
    // give appriporate fedback
  }
});
