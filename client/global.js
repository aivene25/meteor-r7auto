Template.registerHelper("formatPrice", price => {
  if (price) {
    return price.toLocaleString("en");
  }
});

Template.registerHelper("dataCount", data => {
  if (data) {
    return data.length;
  }
});
