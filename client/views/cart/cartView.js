import plugins from "../../plugins";
import Cart from "../shop/Cart";

Template.cartView.onCreated(function() {
  this.data = Session.get("cartItems");
});

Template.cartView.helpers({
  cartItems: () => Cart.cartItems(),
  totalPrice: () => Cart.cartPrice(),
  cartTotal: () => Cart.cartTotal(),
  subtotal: function(item) {
    let price = item.price * item.quantity;
    return price.toLocaleString("en");
  }
});

Template.cartView.events({
  "change .quantity": function(event) {
    event.preventDefault();
    let quantity = event.currentTarget.value;
    let cartItems = Session.get("cartItems");
    let res = cartItems.filter(item => {
      if (item.product_id === this.product_id) {
        item.quantity = quantity;
        return item;
      } else {
        return item;
      }
    });
    Session.update("cartItems", res);
  },
  "click #remove-cart-item": function(event, template) {
    event.preventDefault();
    try {
      Cart.removeItem(this._id);
    } catch (ex) {
      console.log(ex);
    }
  }
});

Template.cartView.onRendered(function() {
  plugins();
});
