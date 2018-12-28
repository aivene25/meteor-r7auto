export function enquiryLayout(data) {
  const emailTextHead =
    '<style type="text/css"> @font-face{font-family: Futura; src: url(http://artoja-stage.herokuapp.com/fonts/futura/FTR45_C.ttf); font-weight: 400;}@font-face{font-family: Futura; src: url(http://artoja-stage.herokuapp.com/fonts/futura/futur.ttf); font-weight: 400; font-style: italic;}@font-face{font-family: Futura; src: url(http://artoja-stage.herokuapp.com/fonts/futura/FUTURA-N.ttf); font-weight: 600;}body{font-family: "Futura", Sans-Serif;}a{color: #1c63b8;}#prodTable{width: 100%;}#prodTable td p{line-height: 1.5;}#prodTable td img{width: 145px; margin: 5% auto; vertical-align: super;}</style><div style="padding:2% 5%"> <img src="http://www.r7auto.com/assets/img/r7auto-logo.png" style="display:block;width:120px;max-width:85%;margin:auto auto 5%;"/> <div style="border-top:5px solid #1c63b8;padding:2% 0;"> <h1 style="color:#1c63b8;font-size:25px;">Service Reservation</h1> <br/><!-- <h4 style="margin-top:0px"> ARTOJA is an online marketplace and creative production company for contemporary art and design in Africa. We are here to help with your contemporary art needs - whether you are an experienced collector, a first time buyer or a corporate client. </h4> --> <h4>Hi <strong>' +
    data.first_name +
    '</strong>, thank you for reaching out to us</h4> <h4>A member of our team would reach out to you as soon as possible</h4> <h3 style="margin-top:50px; text-decoration: underline">Your request details</h3>';

  const emailTextFoot =
    '<div style="border-top:3px solid #000;padding:2% 0;"> <p>CUSTOMER SERVICE</p><p> We would love to hear from you! Please email us at <a href="mailto:info.r7auto@gmail.com">info.r7auto@gmail.com</a> with any other questions or call us at <a href="tel:+2349099828744">+234 909 982 8744</a></p></p></div></div>';

  const emailTextBody =
    "<p >Service Type: <strong>" +
    "Vehicle Enquiry" +
    "</strong></p><p>Vehicle Make : <strong>" +
    data.vehicle_make +
    "</strong></p><p>Vehicle Model : <strong>" +
    data.vehicle_model +
    "</strong></p><p>Vehicle Year : <strong>" +
    data.vehicle_year +
    "</strong></p><p>Request Number : <strong>" +
    data.request_number +
    "</strong></p></div>";

  return (emailText = emailTextHead + emailTextBody + emailTextFoot);
}