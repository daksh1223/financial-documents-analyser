const { generateChunkGeneratorMessages } = require("./utility");
const openAIConnector = require("../connectors/openAIConnector");

const generateChunksFromDocument = async (text, isDocumentTranscript) => {
  const promptMesages = generateChunkGeneratorMessages(
    text,
    isDocumentTranscript
  );
  return openAIConnector.get(promptMesages);
};

const generateRagPointsFromDocument = async (text, isDocumentTranscript) => {
  const documentChunks = await generateChunksFromDocument(
    text,
    isDocumentTranscript
  );
  return await Promise.all(
    documentChunks.map(async (chunk) => ({
      metadata: chunk,
      embedding: await openAIConnector.generateEmbedding(
        `${chunk.title}\n${chunk.content}`
      )
    }))
  );
};

module.exports = {
  generateRagPointsFromDocument
};
