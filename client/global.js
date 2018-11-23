Template.registerHelper("formatPrice", price => {
  if (price) {
    return price.toLocaleString("en");
  }
});
