const { MESSAGER_TYPE } = require("../constants");
const {
  FILTER_OBJECT_EXTRACTOR_PROMPT,
  FILTER_OBJECT_EXTRACTOR_FOOTER_PROMPT
} = require("./constants");

const getFilterObjectExtractionMessages = (text) => [
  {
    role: MESSAGER_TYPE.SYSTEM,
    content: FILTER_OBJECT_EXTRACTOR_PROMPT
  },
  {
    role: MESSAGER_TYPE.USER,
    content: text
  },
  {
    role: MESSAGER_TYPE.SYSTEM,
    content: FILTER_OBJECT_EXTRACTOR_FOOTER_PROMPT
  }
];

module.exports = {
  getFilterObjectExtractionMessages
};
