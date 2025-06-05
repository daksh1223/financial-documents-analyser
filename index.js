require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const databaseConnector = require("./connectors/databaseConnector");
const { getResponseForConversation } = require("./conversationalBot");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(cors());

app.post("/getAiResponse", async (req, res) => {
  const { userRequest, id } = req.body;
  try {
    const response = await getResponseForConversation(id, userRequest);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetch failed", detail: err.message });
  }
});

databaseConnector.init().then(() => {
  app.listen(process.env.RETRIEVAL_PORT, () => {
    console.log(
      ` Server running at http://localhost:${process.env.RETRIEVAL_PORT}⁠`
    );
  });
});
