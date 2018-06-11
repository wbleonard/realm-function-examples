exports = function(arg){
  
  console.log ("Entering function updateBooks");

  //Accessing a mongodb service:
  var collection = context.services.get("mongodb-atlas").db("library").collection("books");
  
  // An array to hold the update result promises
  var updateResults = [];
  
  return collection.find({}).toArray()
    .then(books => {
      
      books.forEach(book => {
        console.log(book._id, book.title, book.publisher);
  
        updateResult = collection.updateOne({"_id": book._id}, {"$set": {"publisher": "Pearson Education"}});
        updateResults.push(updateResult);   // Push Promise from updateOne into the results array
        
      });
      
      return Promise.all(updateResults);
      
    })  
    
    .then(updateResults => {
      
      returnString = "Updated " + updateResults.length + " documents"; 
      return Promise.resolve(returnString);
      
    })

    .catch(error => {
      console.log("Update error", error);
      return error ;
    });     

};
