import plugins from '../plugins';
import states from './../states.json'

Template.checkout.onCreated( function(){
  this.country = new ReactiveVar("Nigeria");
})

Template.checkout.onRendered( function(){
  plugins()
})

Template.checkout.helpers({
  country: function(){
    return states;    
  },
  state: function(){
    args = Template.instance().country.get();
    let res = states.filter( function(val){
      if(val.country === args){
        return val;
      }
    });
    return res[0].states;
  }
})

Template.checkout.events({
  "change #country":function(event, template){
    let country = event.currentTarget.value;
    template.country.set(country);
  }
})