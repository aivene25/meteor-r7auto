import plugins from '../plugins';

Template.cartView.helpers({
  data: function(){
    return [1,2];
  }
})

Template.cartView.onRendered( function(){
  plugins()
})