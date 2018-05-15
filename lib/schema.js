import carsSchema from './schemas/cars';
import sparePartsSchema from './schemas/spare-parts';
import postsSchema from './schemas/posts';
import servicesSchema from './schemas/services';

if (Meteor.isServer) {
  /* var database = new MongoInternals.RemoteCollectionDriver(
    "mongodb://heroku_zjkh19d6:k3nkb1gaite3dq031jdipk333p@ds263759.mlab.com:63759/heroku_zjkh19d6"
  );
  */
 var database = '';
  Posts = new Mongo.Collection("posts", { _driver: database });
  SpareParts = new Mongo.Collection("spareparts", {_driver: database});
  Cars = new Mongo.Collection("cars", {_driver: database});
  Services = new Mongo.Collection("services", { _driver: database });

} else {
  Cars = new Mongo.Collection("cars");
  Posts = new Mongo.Collection("posts");
  SpareParts = new Mongo.Collection("spareparts");
  Services = new Mongo.Collection("services");
  
}

Posts.attachSchema(postsSchema);
Cars.attachSchema(carsSchema);
SpareParts.attachSchema(sparePartsSchema);
Services.attachSchema(servicesSchema);