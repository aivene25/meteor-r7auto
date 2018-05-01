Template.serviceItem.onCreated(function() {
    this.subscribe("services.all");
  });
  
  Template.serviceItem.helpers({
    data: () => {
        console.log(Services.findOne({_id: Router.current().params.id} ));
        return Services.findOne({_id: Router.current().params.id} );
    }
  });
  