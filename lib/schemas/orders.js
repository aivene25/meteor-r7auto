export default (ordersSchema = new SimpleSchema({
  user_id: {
    type: String,
    autoform: {
      type: "hidden",
      readOnly: true
    }
  },
  status: {
    type: String,
    allowedValues: [
      "ORDER_PENDING",
      "ORDER_PENDING_PAYMENT",
      "ORDER_PAYMENT_FAILED",
      "ORDER_PAYMENT_RECEIVED",
      "ORDER_PENDING_PICKUP",
      "ORDER_ENROUTE",
      "ORDER_DELIVERED",
      "ORDER_COMPLETE",
      "ORDER_CANCELED"
    ]
  },
  delivery_method: {
    type: String,
    autoform: {
      readOnly: true
    }
  },
  delivery_charge: {
    type: String,
    autoform: {
      readOnly: true
    }
  },
  delivery_date: {
    type: Date,
    autoform: {
      readOnly: true
    }
  },
  pickup_location: {
    type: String,
    optional: true,
    autoform: {
      readOnly: true
    }
  },
  payment_method: {
    type: String,
    autoform: {
      readOnly: true
    }
  },
  products: {
    type: Array,
    autoform: {
      readOnly: true
    }
  },
  "products.$": {
    type: Object,
    autoform: {
      readOnly: true
    }
  },
  "products.$._id": {
    type: String,
    autoform: {
      readOnly: true
    }
  },
  "products.$.title": {
    type: String,
    autoform: {
      readOnly: true
    }
  },
  "products.$.price": {
    type: Number,
    autoform: {
      readOnly: true
    }
  },
  "products.$.quantity": {
    type: Number,
    autoform: {
      readOnly: true
    }
  },
  "products.$.category": {
    type: String,
    autoform: {
      readOnly: true
    }
  },
  "products.$.description": {
    type: String,
    autoform: {
      readOnly: true
    }
  },
  "products.$.image": {
    type: String,
    autoform: {
      readOnly: true
    }
  },
  gateway_transaction_ref: {
    type: String,
    optional: true,
    autoform: {
      readOnly: true
    }
  },
  gateway_status: {
    type: String,
    optional: true,
    autoform: {
      readOnly: true
    }
  },
  date_added: {
    type: Date,
    optional: true,
    autoform: {
      readOnly: true
    }
  }
}));
