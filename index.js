const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const services = require("./Data/services.json");
// /////////////////Database start////////////////////////////

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

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
