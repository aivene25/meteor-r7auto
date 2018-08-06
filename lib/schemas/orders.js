export default ordersSchema = new SimpleSchema({
  user_id: {
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
    ]
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
    type: Date,
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
  payment_method: {
    type: String,
    optional: true,
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
  "products.$.product_id": {
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
  
})


/**
 * "products.$.quantity": {
    type: String,
    autoform: {
      readOnly: true
    }
  },
  "products.$.price": {
    type: String,
    autoform: {
      readOnly: true
    }
  },
  
 */