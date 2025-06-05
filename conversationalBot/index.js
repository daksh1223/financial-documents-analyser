const getFinalAnswer = require("./finalAnswerGenerator");
const { getConversation, addConversation } = require("./conversationManager");

const getResponseForConversation = async (conversationId, userQuery) => {
  const conversationDetails = await getConversation(conversationId);
  const response = await getFinalAnswer({
    previousHistory: conversationDetails.history,
    previousSummary: conversationDetails.summary,
    userQuery
  });
  addConversation({ id: conversationId, systemResponse: response, userQuery });
  return response;
};

module.exports = { getResponseForConversation };
