const openAIConnector = require("../connectors/openAIConnector");
const ragConnector = require("../connectors/ragConnector");
const { MESSAGER_TYPE } = require("../constants");

const getDecompositionPrompt = (userQuery) => `
You are a decomposition engine that transforms a user's complex query into smaller, independent sub-queries to improve document retrieval.
Your job:
    - Break down the query into minimal, focused sub-questions.
    - Each sub-question should stand on its own.
    - Avoid repeating information or merging multiple questions.
    - Don't unnecessarily break down the query, if it's not required and on it's own is independent
    - Don't return empty array ever, return the current user query inside an array in the worst case

Only return the list of sub-queries in JSON format as an array of strings. No formatting, no metadata.
User query: ${userQuery}
`;

const decomposeUserQuery = async (userQuery) => {
  const result = await openAIConnector.get([
    {
      role: MESSAGER_TYPE.SYSTEM,
      content: getDecompositionPrompt(userQuery)
    }
  ]);
  return result;
};

const retrieveRequiredRagPoints = async (userQuery) => {
  const subQueries = await decomposeUserQuery(userQuery);
  const allChunks = {};
  for (const subQuery of subQueries) {
    const retrievedDocs = await ragConnector.retrieve(subQuery);
    retrievedDocs.forEach((element) => {
      allChunks[element.id] = element.payload;
    });
  }

  return Object.values(allChunks);
};

module.exports = retrieveRequiredRagPoints;
