import carsSchema from "./schemas/cars";
import sparePartsSchema from "./schemas/spare-parts";
import postsSchema from "./schemas/posts";
import servicesSchema from "./schemas/services";
import serviceRequestsSchema from "./schemas/serviceRequests";
import inspectionRequestsSchema from "./schemas/inspectionRequests";
import ordersSchema from "./schemas/orders";


if (Meteor.isServer) {
  
  let database = new MongoInternals.RemoteCollectionDriver(
    "mongodb://heroku_zjkh19d6:k3nkb1gaite3dq031jdipk333p@ds263759.mlab.com:63759/heroku_zjkh19d6"
  );
  
  //let database = "";
  Posts = new Mongo.Collection("posts", { _driver: database });
  SpareParts = new Mongo.Collection("spareparts", { _driver: database });
  Cars = new Mongo.Collection("cars", { _driver: database });
  Services = new Mongo.Collection("services", { _driver: database });
  Orders = new Mongo.Collection("orders", {
    _driver: database
  });
  InspectionRequests = new Mongo.Collection("inspection-requests", {
    _driver: database
  });
  ServiceRequests = new Mongo.Collection("service-requests", {
    _driver: database
  });
} else {
  Cars = new Mongo.Collection("cars");
  Orders = new Mongo.Collection("orders");
  Posts = new Mongo.Collection("posts");
  SpareParts = new Mongo.Collection("spareparts");
  Services = new Mongo.Collection("services");
  InspectionRequests = new Mongo.Collection("inspection-requests");
  ServiceRequests = new Mongo.Collection("service-requests");
}

Cars.attachSchema(carsSchema);
Orders.attachSchema(ordersSchema);
Posts.attachSchema(postsSchema);
SpareParts.attachSchema(sparePartsSchema);
Services.attachSchema(servicesSchema);
InspectionRequests.attachSchema(inspectionRequestsSchema);
ServiceRequests.attachSchema(serviceRequestsSchema);


Services.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  }
});

ServiceRequests.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  }
});

InspectionRequests.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  }
});

Orders.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  }
});

