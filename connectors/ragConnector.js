const axios = require("axios");
const openAIConnector = require("./openAIConnector");
const { extractFilterObjectFromText } = require("../filterObjectExtractor");
const { v4: uuid } = require("uuid");

const COLLECTION_NAME = "sec_chunks";

const headerObject = {
  headers: {
    "Content-Type": "application/json",
    "api-key": process.env.QDRANT_API_KEY
  }
};

const upload = async (chunks, commonMetadata) => {
  const enrichedChunks = chunks.map((chunk) => ({
    id: uuid(),
    vector: chunk.embedding,
    payload: {
      ...commonMetadata,
      ...chunk.metadata
    }
  }));
  try {
    const response = await axios.put(
      `${process.env.QDRANT_CLUSTER_URL}/collections/${COLLECTION_NAME}/points`,
      { points: enrichedChunks },
      headerObject
    );
    console.log("Upload success:", response.data);
  } catch (err) {
    console.error("Upload error:", err.response?.data || err.message);
  }
};

const generateFilterObject = (filter) =>
  Object.entries(filter).reduce(
    (reducer, [key, value]) => {
      reducer.must.push({
        key,
        match: { value }
      });
      return reducer;
    },
    {
      must: []
    }
  );

const retrieve = async (query) => {
  const filter = await extractFilterObjectFromText(query);

  const response = await axios.post(
    `${process.env.QDRANT_CLUSTER_URL}/collections/${COLLECTION_NAME}/points/search`,
    {
      vector: await openAIConnector.generateEmbedding(query),
      top: 15,
      with_payload: true,
      filter: generateFilterObject(filter)
    },
    headerObject
  );

  return response.data.result;
};

module.exports = {
  upload,
  retrieve
};
