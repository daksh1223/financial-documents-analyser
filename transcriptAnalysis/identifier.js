const { getTranscriptIdentifierMessages } = require("./utility");
const openAIConnector = require("../connectors/openAIConnector");

const isDocumentTranscript = async (documentText) => {
  const documentType = await openAIConnector.getText(
    getTranscriptIdentifierMessages(documentText)
  );
  return documentType.toLowerCase() === "transcript";
};

module.exports = isDocumentTranscript;
