const { MESSAGER_TYPE } = require("../constants");
const {
  TRANSCRIPT_METADATA_EXTRACTION_PROMPT,
  METADATA_EXTRACTION_PROMPT,
  METADATA_EXTRACTION_FOOTER_PROMPT
} = require("./constants");

const generateMetadataExtractionMessages = (text, isDocumentTranscript) => [
  {
    role: MESSAGER_TYPE.SYSTEM,
    content: isDocumentTranscript
      ? TRANSCRIPT_METADATA_EXTRACTION_PROMPT
      : METADATA_EXTRACTION_PROMPT
  },
  {
    role: MESSAGER_TYPE.USER,
    content: text
  },
  {
    role: MESSAGER_TYPE.SYSTEM,
    content: METADATA_EXTRACTION_FOOTER_PROMPT
  }
];

module.exports = {
  generateMetadataExtractionMessages
};
