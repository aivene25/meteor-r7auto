export default (sparePartsSchema = new SimpleSchema({
  uploaded_by: {
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
  title: {
    type: String
  },
  description: {
    type: String,
    autoform: {
      type: "summernote"
    }
  },
  image: {
    type: String,
    autoform: {
      type: "cloudinary"
    }
  },
  category: {
    type: String,
    allowedValues: ["Transmission", "Fluid", "Engine"]
  },

  price: {
    type: Number
  },

  promo_price: {
    type: Number,
    optional: true
  },

  quantity: {
    type: Number
  },

  vendor: {
    type: String,
    optional: true
  },
  rating: {
    type: String,
    optional: true
  },
  gallery: {
    type: [String],
    optional: true,
    autoform: {
      type: "cloudinary"
    }
  },
  reviews: {
    type: [String],
    optional: true
  },
  related_products: {
    type: [String],
    optional: true
  },
  tags: {
    type: [String],
    optional: true
  },

  created_at: {
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

//check for camel case and curent case differences in backend or underscore