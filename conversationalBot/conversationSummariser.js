const openAIConnector = require("../connectors/openAIConnector");
const { MESSAGER_TYPE } = require("../constants");

const generateSummaryPrompt = (previousSummary, conversations) => `
You are a helpful assistant summarizing a conversation between a user and an AI assistant.

You will be given:
    - A current conversation (formatted as "role: content")
    - A previously summarized conversation
Your task is to generate a concise, structured, and cumulative summary that merges the new information with the previously summarized content.

Focus on:
    - Key topics discussed
    - Important facts mentioned
    - Any conclusions, resolutions, or pending issues
Use the same "role: content" format in your summary. Avoid repeating exact phrases or redundant information from the past. Ensure the result is informative and easy to follow, suitable for context continuation in future tasks.

Previous Summary:
${previousSummary}

Conversation:
${conversations}`;

const summariseConversation = async (previousSummary, conversations) => {
  const updatedSummary = await openAIConnector.get({
    role: MESSAGER_TYPE.SYSTEM,
    content: generateSummaryPrompt(previousSummary, conversations)
  });
  return updatedSummary;
};

module.exports = summariseConversation;
