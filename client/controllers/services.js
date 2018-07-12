
import plugins from '../plugins';

Template.services.onCreated(function() {
  this.subscribe("services.all");
});

Template.services.onRendered(function() {
  plugins();
});

Template.services.helpers({
  service: () => {
    return Services.find({}, {}).fetch();
  }
});

Template.services.onDestroyed( function(){
  
})