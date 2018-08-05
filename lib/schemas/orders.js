export default ordersSchema = new SimpleSchema({
  UserId: {
    type: String,
    autoValue : function(){
      if( this.isInsert ){
        return Meteor.userId();
      }
    },
    autoform:{
      type: "hidden",
      readOnly: true
    },
    
  },
  status: {
    type: String,
    allowedValues: [
      "STATUS_PENDING",
      "STATUS_PENDING_PAYMENT",
      "STATUS_PAYMENT_FAILED",
      "STATUS_PAYMENT_RECEIVED",
      "STATUS_PREPARING",
      "STATUS_PENDING_PICKUP",
      "STATUS_ENROUTE",
      "STATUS_DELIVERED",
      "STATUS_COMPLETE",
      "STATUS_CANCELED"
    ],
    optional: true
  },
  order_number: {
    type: String,
    autoform: {
      readOnly: true
    }
  },
  delivery_method: {
    type: String,
    optional: true,
    autoform: {
      readOnly: true
    }
  },
  delivery_charge: {
    type: String,
    optional: true,
    autoform: {
      readOnly: true
    }
  },
  delivery_date: {
    type: String,
    optional: true,
    autoform: {
      readOnly: true
    }
  },
  order_number: {
    type: String,
    optional: false,
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
    optional: true,
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
  status: {
    type: String,
  },
  items: {
    type: Array,
    autoform: {
      readOnly: true
    }
  },
  "items.$": {
    type: Object,
    autoform: {
      readOnly: true
    }
  },
  "items.$.product": {
    type: Object,
    autoform: {
      readOnly: true
    }
  },
  "items.$.product._id": {
    type: String,
    autoform: {
      readOnly: true
    }
  },
  "items.$.product.title": {
    type: String,
    autoform: {
      readOnly: true
    }
  },
  "items.$.product.categories": {
    type: [String],
    autoform: {
      readOnly: true
    }
  },
  "items.$.product.price": {
    type: Number,
    autoform: {
      readOnly: true
    }
  },
  "items.$.product.image_url": {
    type: String,
    autoform: {
      readOnly: true
    }
  },
  "items.$.product.status": {
    type: String,
    autoform: {
      readOnly: true
    }
  },
  "items.$.product.date_added": {
    type: Date,
    autoform: {
      readOnly: true
    }
  },
  "items.$.quantity": {
    type: Number,
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
  gateway_string: {
    type: String,
    optional: true,
    autoform: {
      readOnly: true
    }
  },
  gateway_resp_code: {
    type: String,
    optional: true,
    autoform: {
      readOnly: true
    }
  },
  gateway_payment_ref: {
    type: String,
    optional: true,
    autoform: {
      readOnly: true
    }
  },
  date_added: {
    type: Date,
    optional: false,
    autoform: {
      readOnly: true
    }
  }
  
})