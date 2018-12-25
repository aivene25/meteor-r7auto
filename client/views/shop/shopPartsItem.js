import plugins from "../../plugins";
import Cart from "./Cart";
import { Failure, Success, Loading } from "../../utils";

Template.shopPartsItem.onCreated(function() {
  this.loading = new ReactiveVar(false);
  this.error = new ReactiveVar(false);
  this.success = new ReactiveVar(false);
  this.subscribe("parts.all");
});

Template.shopPartsItem.helpers({
  relatedProducts: () => SpareParts.find().fetch(),
  loading: () => Template.instance().loading.get(),
  error: () => Template.instance().error.get(),
  success: () => Template.instance().success.get()
});

Template.shopPartsItem.events({
  "click #add-to-cart": (event, template) => {
    event.preventDefault();
    Loading(template);
    const quantity = $("#quantity").val();
    const product = template.data;
    try {
      const CartItem = new Cart(product).addToCart(quantity);
      if (CartItem) {
        Success(template, "Item added to cart");
      } else {
        Failure(template, "Error in adding item to cart");
      }
    } catch (ex) {
      Failure(template, "Error in adding item to cart");
      console.log(ex);
    }
  }
});

Template.shopPartsItem.onRendered(function() {
  plugins();
});
