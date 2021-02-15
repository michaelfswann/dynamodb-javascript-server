// External Modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// App Variables
const app = express();
const port = process.env.SERVER_PORT || "8000";
const incrementCounter = require("./db/models/incrementCounter");
const getCounter = require("./db/models/readCounter");

//  App Configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes Definitions
app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "<h1>Cloud Resume Challenge</h1><p>Server is listening for requests...</p>"
    );
});

app.get("/counter", async (req, res) => {
  const result = await getCounter();

  res.status(200).send(result);
});

app.get("/incrementCounter", async (req, res) => {
  const result = await incrementCounter();
  res.status(200).send();
});

// Server Activation
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
