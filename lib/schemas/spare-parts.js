export default (sparePartsSchema = new SimpleSchema({
  UserId: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        return Meteor.userId();
      }
    },
    autoform: {
      type: "hidden"
    }
  },
  Title: {
    type: String
  },
  Description: {
    type: String,
    autoform: {
      type: "summernote"
    }
  },
  Image: {
    type: String,
    autoform: {
      type: "cloudinary"
    }
  },
  Category: {
    type: String,
    allowedValues: ["as-icon-car-parts-29"]
  },

  Price: {
    type: Number
  },

  PromoPrice: {
    type: Number,
    optional: true
  },

  Quantity: {
    type: Number
  },

  Vendor: {
    type: String,
    optional: true
  },
  Rating: {
    type: String,
    optional: true
  },
  Gallery: {
    type: [String],
    optional: true,
    autoform: {
      type: "cloudinary"
    }
  },
  Reviews: {
    type: [String],
    optional: true
  },
  RelatedProducts: {
    type: [String],
    optional: true
  },
  Tags: {
    type: [String],
    optional: true
  },

  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    },
    autoform: {
      type: "hidden"
    }
  }
}));
