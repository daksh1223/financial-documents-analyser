const fs = require("fs");
const pdf = require("pdf-parse");
const { generateMetadataExtractionMessages } = require("./utility");
const openAIConnector = require("../connectors/openAIConnector");

const getFirstPageFromDocument = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  const firstPageText = data.text.split(" ").slice(0, 2000).join(" ");
  return firstPageText.trim();
};

const extractMetadataFromDocument = async (filePath, isDocumentTranscript) => {
  const firstPageText = await getFirstPageFromDocument(filePath);
  return openAIConnector.get(
    generateMetadataExtractionMessages(firstPageText, isDocumentTranscript)
  );
};

module.exports = {
  extractMetadataFromDocument,
  getFirstPageFromDocument
};
