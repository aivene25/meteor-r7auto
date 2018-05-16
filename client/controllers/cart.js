Template.cart.helpers({
  data: () => {
    let data = Session.get("cartItems");
    if (data) {
      return data;
    } else {
      return 0;
    }
  },
  cartLength: function() {
    if (Session.get("cartItems")) {
      return Session.get("cartItems").length;
    } else {
      return 0;
    }
  },

  totalPrice:()=>{
    //var cur = Session.get('currency');
    var item = Session.get("cartItems");
    var totalPrice = 0;
    if (item){
      item.forEach( (item)=>{
        let price = parseInt(item.product.Price);
        let quant = item.quantity;
        totalPrice += parseInt(price*quant);
      });
    }
    return totalPrice;
  },
});

Template.cart.events({
  "click #remove-cart-item span": function(event, template) {
    event.preventDefault();
    console.log('data rempved');
    let cartItems = Session.get("cartItems");
    let arr = [];
    console.log(cartItems);
    cartItems.forEach( ( item)=>{
      if( item.productId != event.currentTarget.id){
        arr.push(item);
      }
    });
    Session.setPersistent("cartItems", arr)
  }
})