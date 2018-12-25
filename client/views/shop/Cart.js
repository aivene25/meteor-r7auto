export default class Cart {
  constructor(product) {
    this.product = product;
  }

  addToCart(quantity) {
    this.validate();

    let itemIsInCart = false;
    const CurrentCart = Session.get("r7Cart") || [];
    const newCart = CurrentCart.map(item => {
      if (item._id === this.product._id) {
        item.quantity = parseInt(item.quantity) + parseInt(quantity);
        itemIsInCart = true;
        return item;
      } else {
        return item;
      }
    });

    if (itemIsInCart) {
      Session.setPersistent("r7Cart", newCart);
    } else {
      const prod = Object.assign({}, this.product, { quantity });
      newCart.push(prod);
      Session.setPersistent("r7Cart", newCart);
    }
    return true;
  }

  static cartCount() {
    let quantity = 0;
    Session.get("r7Cart").forEach(item => {
      quantity += parseInt(item.quantity);
    });
    return quantity;
  }

  static cartPrice() {
    let price = 0;
    Session.get("r7Cart").forEach(item => {
      price += item.price * parseInt(item.quantity);
    });
    return price;
  }

  static cartItems() {
    return Session.get("r7Cart");
  }

  static cartTotal(delivery = false) {
    let total = this.cartPrice() + this.vat();
    if (delivery) {
      total = total + parseInt(Session.get("delivery_charge"));
    }
    return total;
  }

  vat() {
    // 5% vat
    const vat = this.cartPrice() * 0.05;
    return vat;
  }

  static removeItem(id) {
    const newCart = Session.get("r7Cart").filter(item => {
      if (item._id !== id) {
        return item;
      }
    });
    Session.update("r7Cart", newCart);
    return true;
  }

  validate() {
    //check if data entered contains certain keys directly;
    const product = this.product;
    if (!product.hasOwnProperty("_id")) {
      throw new Error("Product must have an ID");
    }
    if (!product.hasOwnProperty("title")) {
      throw new Error("Product must have a Title");
    }
    if (!product.hasOwnProperty("price")) {
      throw new Error("Product must have a price");
    }
    if (!product.hasOwnProperty("created_at")) {
      throw new Error("Product must have a date");
    }
  }
}
