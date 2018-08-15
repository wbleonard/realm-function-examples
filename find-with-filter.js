exports = function(arg){
  console.log('Filter received: ' + arg);

  // Simplify testing
  arg = (arg == 'Hello world!' ? 'Baseball' : arg);  

  // Fetch all records containing filter. If no filter provided, fetch all records
  var filter = ((typeof arg !== 'undefined') ? {name:new BSON.BSONRegExp(arg, 'i')} : {});

  //Accessing a mongodb service:
  var collection = context.services.get("mongodb-atlas").db("store").collection("products");
  
  var results = collection.find(filter).toArray();  
  return results;
};
