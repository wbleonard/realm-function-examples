/* 
 * This Trigger function demonstrates how to mirror changes from one collection to another. To properly work:
 *   Operation Type Insert, Update, Delete and Replace must be selected
 *   Full Document must be set to ON
 */
exports = function(changeEvent) {

    // Get a handle to the mirror collection
    const mirror_collection = context.services.get("SA-SHARED-DEMO").db("sample_analytics").collection("accounts_mirror");
    
    // Access the _id of the changed document:
    const docId = changeEvent.documentKey._id;
    
    // Get the complete updated document
    const fullDocument = changeEvent.fullDocument;
    
    if (typeof fullDocument !== 'undefined') {
      
      const result = mirror_collection.replaceOne({_id:docId}, fullDocument, {upsert:true});    
      console.log(result);
      
    } else { // The document was deleted
      
      const result = mirror_collection.deleteOne({_id:docId});
      console.log(result);
    }
  };