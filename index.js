const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// /////////////////Database start////////////////////////////

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.g5zarfc.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const serviceCollection = client.db("travelSphere").collection("services");
    const reviewCollection = client.db("travelSphere").collection("reviews");

    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.limit(3).toArray();
      res.send(services);
    });
    app.get("/allServices", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const alLServices = await cursor.toArray();
      res.send(alLServices);
    });
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await serviceCollection.findOne(query);
      res.send(result);
    });

    // //////Review API///////////////

    app.get("/reviews", async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = {
          email: req.query.email,
        };
      }
      const cursor = reviewCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/reviews", async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.send(result);
    });

    // Delete method

    app.delete("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await reviewCollection.deleteOne(query);
      res.send(result);
    });

    // Add services

    app.post("/addService", async (req, res) => {
      const addService = req.body;
      const result = await serviceCollection.insertOne(addService);
      res.send(result);
    });
  } finally {
  }
}
run().catch((error) => console.error(error));

// ////////////////////////////////////////////////////////////////////////////////

app.get("/", (req, res) => {
  res.send("Travelsphere server is running");
});

app.listen(port, () => {
  console.log(`Travelsphere server is running on port, ${port}`);
});
