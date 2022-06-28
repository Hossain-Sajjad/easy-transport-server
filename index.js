const express = require('express')
const cors = require('cors');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://hossain:VuVWAJJNkXJTYZgP@cluster0.ogo91.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });



async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('express').collection('service');

        app.post('/service', async (req, res) => {
            const data = req.body;
            console.log(data)
            const result = await serviceCollection.insertOne(data);
            res.send(result);
        });

        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        })
    }
    finally {

    }
}

run().catch(console.dir)

app.get('/', (req, res) => {
    res.send("Bismillah")
})

app.listen(port, () => console.log("Hoise"))