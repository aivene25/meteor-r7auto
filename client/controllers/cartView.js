import plugins from '../plugins';

Template.cartView.onCreated( function(){
  this.data = Session.get("cartItems");
})

Template.cartView.helpers({
  cartItems: function(){
    return Session.get("cartItems");
  },
  cartLength: function() {
    if (Session.get("cartItems")) {
      return Session.get("cartItems").length;
    } else {
      return 0;
    }
  },

  totalPrice: function() {
    var item = Session.get("cartItems");
    var totalPrice = 0;
    if (item) {
      item.forEach(item => {
        let price = parseInt(item.product.Price);
        let quant = item.quantity;
        totalPrice += parseInt(price * quant);
      });
    }
    return totalPrice;
  },
  formatPrice: function(price) {
    let val = price.toLocaleString("en");
    return val;
  },
  subtotal: function(item){
    let price =  item.product.Price * item.quantity;
    return price.toLocaleString("en");
  }

})

Template.cartView.events({
  "change .quantity":function(event){
    event.preventDefault();
    let quantity = event.currentTarget.value;
    let cartItems = Session.get("cartItems");
    let res = cartItems.filter( (item)=>{
      if(item.productId === this.productId){
        item.quantity = quantity;
        return item;
      }
      else{
        return item;
      }
    });
    Session.update("cartItems", res);
  },
  "click #remove-cart-item": function(event, template) {
    event.preventDefault();
    let cartItems = Session.get("cartItems");
    let res = cartItems.filter( item => {
      if (item.productId != this.productId) {
        return item
      }
    });
    Session.update("cartItems", res);
  }
})

Template.cartView.onRendered( function(){
  plugins()
})