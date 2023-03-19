import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

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
app.use(cors());
app.set('port', process.env.PORT || 3000);

app.get('/findOne', async (req,res) => {
    try {
        const database = client.db('sample_weatherdata');
        const coll = database.collection('data');

        const filter = { type: req.query.type, callLetters: req.query.callLetters};

        const weatherdata = await coll.findOne(filter);

        console.log(req.query);

        res.type('json');
        res.status(200);
        res.json({
            weatherdata: weatherdata['_id'],
            st: weatherdata['st'],
            ts: weatherdata['ts'],
            elevation: weatherdata['elevation'],
            callLetters: weatherdata['callLetters'],
            qualityControlProcess: weatherdata['qualityControlProcess'],
            dataSource: weatherdata['dataSource'],
            type: weatherdata['type']
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