import plugins from "../plugins";

Template.shopCarsItem.onCreated(function() {});

Template.shopPartsItem.helpers({
  relatedProducts: () => {
    return SpareParts.find().fetch();
  },
  formatPrice(price) {
    let val = price.toLocaleString("en");
    return val;
  }
});

Template.shopPartsItem.events({
  "click #add-to-cart": (event, template) => {
    event.preventDefault();
    let quan = $("#quantity").val();
    let cartItems = Session.get("cartItems") || [];
    let contains = false;

    if (cartItems.length > 0) {
      cartItems.forEach(item => {
        if (template.data._id == item.product_id) {
          item.quantity = parseInt(item.quantity) + parseInt(quan);
          contains = true;
        }
      });

      if (contains == false) {
        let data = {
          product_id: template.data._id,
          title: template.data.title,
          price: template.data.price,
          category: template.data.category,
          description: template.data.description,
          image: template.data.image,
          quantity: quan
        };
        cartItems.push(data);
      }
    } else {
      let data = {
        product_id: template.data._id,
        title: template.data.title,
        price: template.data.price,
        category: template.data.category,
        description: template.data.description,
        image: template.data.image,
        quantity: quan
      };
      cartItems.push(data);
    }
    alert("Item added to cart");
    Session.setPersistent("cartItems", cartItems);
  }
});

Template.shopPartsItem.onRendered(function() {
  plugins();
});
