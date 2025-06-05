const { LlamaParseReader } = require("@llamaindex/cloud");

const reader = new LlamaParseReader({
  apiKey: process.env.LLAMA_PARSER_API_KEY
});

module.exports = {
  reader
};
