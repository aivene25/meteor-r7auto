import { shuffle, dateFormatter } from "./utils";

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

Template.registerHelper("shuffle", data => {
  if (data) {
    return shuffle(data);
  }
});

Template.registerHelper("formatDate", data => {
  if (data) {
    return dateFormatter(data);
  }
});

Template.registerHelper("reduceText", function(args) {
  if (args.length > 350) {
    const maxLength = 350;
    var trimmedString = args.substr(0, maxLength);

    //re-trim if we are in the middle of a word
    trimmedString = trimmedString.substr(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
    );

    return trimmedString;
  } else {
    return args;
  }
});
