const { MESSAGER_TYPE } = require("../constants");
const {
  TRANSCRIPT_IDENTIFIER_FOOTER_PROMPT,
  TRANSCRIPT_IDENTIFIER_PROMPT
} = require("./constants");

const getTranscriptIdentifierMessages = (text) => [
  {
    role: MESSAGER_TYPE.SYSTEM,
    content: TRANSCRIPT_IDENTIFIER_PROMPT
  },
  {
    role: MESSAGER_TYPE.USER,
    content: text
  },
  {
    role: MESSAGER_TYPE.SYSTEM,
    content: TRANSCRIPT_IDENTIFIER_FOOTER_PROMPT
  }
];

module.exports = {
  getTranscriptIdentifierMessages
};
