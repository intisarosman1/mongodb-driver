import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import express from "express"

dotenv.config()
// Replace the uri string with your connection string.

// console.log(process.env)
// const uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

const db_username = process.env.MONGO_DB_USERNAME;
const db_password = process.env.MONGO_DB_PASSWORD;
const db_url = process.env.MONGO_DB_URL;

const uri =
  `mongodb+srv://${db_username}:${db_password}@${db_url}?retryWrites=true&w=majority`;

const client = new MongoClient(uri);


const app = express();
app.set('port', process.env.PORT || 3000);

app.get('/findOne', async (req,res) => {
    try {
        const database = client.db('sample_airbnb');
        const coll = database.collection('listingsAndReviews');

        const filter = {property_type: req.query.property_type, bedrooms: parseInt(req.query.bedrooms), beds: parseInt(req.query.beds)};

        const listing = await coll.findOne(filter);

        console.log(req.query);

        res.type('json');
        res.status(200);
        res.json({
          listing: listing['_id'], 
          listing_url: listing['listing_url'], 
          name: listing['name'], 
          summary: listing['summary'], 
          property_type: listing['property_type'], 
          bedrooms: listing['bedrooms'], 
          beds: listing['beds']
        });

    } catch (error) {
      console.log(error)  
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }


    
  });

app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});


app.listen(app.get('port'), () => {
    console.log('Express started');
});