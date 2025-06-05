const { MESSAGER_TYPE } = require("../constants");
const {
  CHUNK_GENERATOR_FOOTER_PROMPT,
  CHUNK_GENERATOR_PROMPT,
  TRANSCRIPT_CHUNK_GENERATOR_PROMPT
} = require("./constants");

const generateChunkGeneratorMessages = (text, isDocumentTranscript) => [
  {
    role: MESSAGER_TYPE.SYSTEM,
    content: isDocumentTranscript
      ? TRANSCRIPT_CHUNK_GENERATOR_PROMPT
      : CHUNK_GENERATOR_PROMPT
  },
  {
    role: MESSAGER_TYPE.USER,
    content: text
  },
  {
    role: MESSAGER_TYPE.SYSTEM,
    content: CHUNK_GENERATOR_FOOTER_PROMPT
  }
];

module.exports = {
  generateChunkGeneratorMessages
};
