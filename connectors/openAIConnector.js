const OpenAIApi = require("openai");

const openai = new OpenAIApi({
  apiKey: process.env.OPEN_AI_KEY
});

const GPT_MODEL = "gpt-4o",
  EMBEDDING_MODEL = "text-embedding-3-large";

function cleanJsonMarkdownBlock(responseText) {
  return (responseText || "")
    .replace(/^```json\s*/i, "")
    .replace(/^```/, "")
    .replace(/```$/, "")
    .replace(/\\(?!["\\/bfnrtu])/g, "")
    .trim();
}

const get = async (messages) => {
  if (!messages?.length) return null;
  const result = await openai.chat.completions.create({
    model: GPT_MODEL,
    messages
  });
  let response = null;
  const messageContent = cleanJsonMarkdownBlock(
    result.choices[0].message.content
  );

  try {
    response = JSON.parse(messageContent);
  } catch (err) {
    console.error(err);
  }

  return response;
};
const getText = async (messages) => {
  if (!messages?.length) return null;
  const result = await openai.chat.completions.create({
    model: GPT_MODEL,
    messages
  });

  return result.choices[0].message.content;
};

const generateEmbedding = async (text) => {
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text
  });
  return response.data[0].embedding;
};

module.exports = {
  get,
  getText,
  generateEmbedding
};
