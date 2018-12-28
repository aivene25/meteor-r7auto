import Cart from "../shop/Cart";

Template.cart.helpers({
  data: () => Cart.cartItems(),
  cartLength: () => Cart.cartCount(),
  totalPrice: () => Cart.cartPrice()
});

Template.cart.events({
  "click #remove-cart-item": function(event) {
    event.preventDefault();
    try {
      Cart.removeItem(this._id);
    } catch (ex) {
      console.log(ex);
    }
  }
});
