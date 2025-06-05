require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Dispatcher = require("./dispatcher");
const fs = require("fs");
const app = express();

const jobDispatcher = new Dispatcher(5);

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(cors());

app.post("/file", (req, res) => {
  const { bytes: fileBytes, name: fileName } = req.body;
  const base64Data = fileBytes
    .replace(/^data:.*;base64,/, "")
    .replace(/\s/g, "");

  const filePath = `attachments/${fileName}`;
  const buffer = Buffer.from(base64Data, "base64");

  console.log("Attachment Received", filePath);
  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      console.error("Error writing to file", err);
      return res.status(500).send("Internal Server Error");
    }
    jobDispatcher.submit(filePath);
    res.status(200).send("Attachment received and written to file");
  });
});

app.listen(process.env.INGESTION_PORT, () => {
  console.log(
    ` Server running at http://localhost:${process.env.INGESTION_PORT}⁠`
  );
});
