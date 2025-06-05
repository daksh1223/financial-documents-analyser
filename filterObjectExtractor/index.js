const { getFilterObjectExtractionMessages } = require("./utility");
const openAIConnector = require("../connectors/openAIConnector");

const extractFilterObjectFromText = async (text) =>
  openAIConnector.get(getFilterObjectExtractionMessages(text));

module.exports = {
  extractFilterObjectFromText
};
