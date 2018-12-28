Template.footer.events({
  "click #pay": function() {
    const API_publicKey = "FLWPUBK-bbc0e4adaa9cdcb7fb2e00ebd461533f-X";

    var x = getpaidSetup({
      PBFPubKey: API_publicKey,
      customer_email: "user@example.com",
      amount: 2000,
      customer_phone: "234099940409",
      currency: "NGN",
      payment_method: "both",
      txref: "rave-123456",
      meta: [
        {
          metaname: "flightID",
          metavalue: "AP1234"
        }
      ],
      onclose: function() {},
      callback: function(response) {
        var txref = response.tx.txRef; // collect flwRef returned and pass to a 					server page to complete status check.
        console.log("This is the response returned after a charge", response);
        if (
          response.tx.chargeResponseCode == "00" ||
          response.tx.chargeResponseCode == "0"
        ) {
          // redirect to a success page
        } else {
          // redirect to a failure page.
        }

        x.close(); // use this to close the modal immediately after payment.
      }
    });
  },
  'click #open-modal': function(event){
    event.preventDefault();
    console.log("Open Modal here");
    $("#inspectionRequestForm").modal("show");
    
  }
});
