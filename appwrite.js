

// const database_id=import.meta.env.VITE_APPWRITE_database
// const project_id=import.meta.env.
// VITE_APPWRITE_PROJECT_ID ;
// const collection_id=import.meta.env.
// VITE_APPWRITE_metrics
// //from the apppwrite which is in the env file

// // setEndpoint() → tells Appwrite which cloud/server URL to connect to.
// // setProject(PROJECT_ID) → links requests to your project.
// const client = new Client()
//   .setEndpoint('https://fra.cloud.appwrite.io/v1')
//   .setProject(project_id)

// const database = new Databases(client);
// // Creates a database object so you can read, write, and update documents  


// // Takes two inputs:
// // searchTerm → the text user searched (e.g. "Avengers").
// // movie → the movie object (with id, poster_path, etc.).
// export const updateSearchCount = async(searchTerm,movie)=>{
//  //1.use appwrite a
//    try{
//      const result = await database.listDocuments(database_id,collection_id, [
//     Query.equal('searchTerm', searchTerm),
//      ])
//      //This one....database.listDocuments(...)

// // This is an Appwrite SDK function.

// // It asks Appwrite: “Give me all the documents inside this collection that match some filters.”
// // You must provide:
// // DATABASE_ID → which database to look in.
// // COLLECTION_ID → which collection in that database to look in.
// // A list of queries → what conditions to filter documents by.
// // Query.equal('searchTerm', searchTerm)
// // This creates a filter condition.
// // It means: “Find documents where the field searchTerm equals the value stored in the variable searchTerm.”
// // Example:
// // If your database has documents like
// // { "searchTerm": "Avengers", "count": 5 }
// // { "searchTerm": "Batman", "count": 2 }
// // And you call Query.equal('searchTerm', 'Avengers'),
// // It will only return the Avengers document

// if(result.documents.length > 0) {
//    const doc = result.documents[0];

//    await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
//       count: doc.count + 1,
//    })
// // //    {
// //   "$id": "123",
// //   "searchTerm": "apple",
// //   "count": 5
// // }
// // ➡️ User searches "apple" again.

// // Query finds the document (apple with count 5).

// // You grab it as doc.

// // You run doc.count + 1 → 5 + 1 = 6.

// // updateDocument updates the record to:

// // json
// // Copy code
// // {
// //   "$id": "123",
// //   "searchTerm": "apple",
// //   "count": 6
// // }
// // 👉 So basically, this code means:
// // "If the search term already exists in the DB, update its counter by +1."

// // If no document is found, usually you’d insert a new one with count =1.
// // }
// }else{
// //     The else block runs only if no document exists for the given searchTerm.

// // That means nobody has searched this movie before.

// // database.createDocument(...) is called.

// // This adds a brand new record to your database.

// // Parameters passed:

// // DATABASE_ID → which database you’re storing in.

// // COLLECTION_ID → which collection (like a table).

// // ID.unique() → generates a unique ID for the document (so each entry is unique).

// // Document fields being stored:

// // searchTerm → the text the user searched for.

// // count: 1 → since it’s the first time, we start count at 1.

// // movie_id: movie.id → store the movie’s unique ID from TMDB API.

// // poster_url → saves the poster image URL (so you can easily show it later without refetching).

// // 💡 In short:

// // If search exists → increment count.

// // If not → create a new record with count = 1 and movie details.
//      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
//     searchTerm,
//     count: 1,
//     movie_id: movie.id,
//     poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
//    })
// }}catch(err){
//    console.error(err)
// }
// }
import { Client, Databases, ID, Query } from 'appwrite'

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_database
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_metrics

// Connect to Appwrite project
const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject(PROJECT_ID)

// Creates a database object so you can read/write/update documents
const database = new Databases(client);

export const updateSearchCount = async (searchterm, movie) => {
  try {
    console.log(searchterm)
    // 1. Look for existing document with same search term
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchterm', searchterm),
    ])

    // 2. If found → update the count
    if (result.documents.length > 0) {
      const doc = result.documents[0]

      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      })
    }
    // 3. If not found → create a new document
    else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchterm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      })
    }
  } catch (err) {
    console.error('Error in updateSearchCount:', err)
  }
}


export const getTrendingmoives = async () => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.limit(5),
    Query.orderDesc("count")

    ])
     console.log("this"+result.documents);
    return result.documents;
  }catch(err){
    console.log(err);
  }
}