const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const services = require("./Data/services.json");
// /////////////////Database start////////////////////////////

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.g5zarfc.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

// ////////////////////////////////////////////////////////////////////////////////

app.get("/services", (req, res) => {
  res.send(services);
});

app.get("/services/:id", (req, res) => {
  const id = req.params.id;
  const allServices = services.find((service) => service._id === id);
  res.send(allServices);
});

app.get("/", (req, res) => {
  res.send("Travelsphere server is running");
});

app.listen(port, () => {
  console.log(`Travelsphere server is running on port, ${port}`);
});
