import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config()
// Replace the uri string with your connection string.

// console.log(process.env)
// const uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

console.log(process.env.MONGO_DB_USERNAME)
console.log(process.env.MONGO_DB_PASSWORD)
console.log(process.env.MONGO_DB_URL)

const db_username = process.env.MONGO_DB_USERNAME;
const db_password = process.env.MONGO_DB_PASSWORD;
const db_url = process.env.MONGO_DB_URL;

const uri =
  `mongodb+srv://${db_username}:${db_password}@${db_url}?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie);
} catch (error) {
  console.log(error)  
} finally {
    // Ensures that the client will close when you finish/error
    await client.close();
}
