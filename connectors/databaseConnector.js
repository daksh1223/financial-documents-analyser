const { MongoClient } = require("mongodb");

const uri = `mongodb://localhost:${process.env.DATABASE_PORT}`;
const dbName = "conversationsDB";
const collectionName = "conversations";

let client, db;

const collectionsMap = {};

const init = async () => {
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  collectionsMap.conversations = db.collection(collectionName);
};

module.exports = {
  init,
  db,
  collectionsMap
};
