const { collectionsMap } = require("../connectors/databaseConnector");
const summariseConversation = require("./conversationSummariser");
const { MESSAGER_TYPE } = require("../constants");

const MAX_HISTORY_LENGTH = 6;

const addConversation = async ({ systemResponse, userQuery, id }) => {
  try {
    const existing = await collectionsMap.conversations.findOne({ _id: id });
    const conversation = [
      `${MESSAGER_TYPE.USER}:${userQuery}`,
      `${MESSAGER_TYPE.SYSTEM}:${systemResponse}`
    ];
    if (existing) {
      if (existing.history.length >= MAX_HISTORY_LENGTH) {
        const updatedSummary = await summariseConversation(
          existing.summary,
          existing.history
        );
        await collectionsMap.conversations.updateOne(
          { _id: id },
          { $set: { summary: updatedSummary, history: conversation } }
        );
      }
      const newHistory = [...existing.history, ...conversation];
      await collectionsMap.conversations.updateOne(
        { _id: id },
        {
          $set: { history: newHistory }
        }
      );
    } else {
      await collectionsMap.conversations.insertOne({
        _id: id,
        summary: "",
        history: conversation
      });
    }
  } catch (err) {
    console.error("Unable to update the conversation", err);
  }
};

const getConversation = async (id) => {
  const existing = await collectionsMap.conversations.findOne({ _id: id });
  return existing || { summary: "", history: [] };
};

module.exports = {
  addConversation,
  getConversation
};
