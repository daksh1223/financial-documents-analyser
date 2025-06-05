const openAIConnector = require("../connectors/openAIConnector");
const { MESSAGER_TYPE } = require("../constants");
const retrieveRequiredRagPoints = require("./decompositionEngine");

const getFinalAnswerPrompt = ({
  previousSummary,
  previousHistory,
  retrievedChunks,
  userQuery
}) => `
You are an intelligent assistant answering user queries using a combination of:
- Retrieved document content (from retrieval-augmented generation)
- Previous conversation summary
- Prior conversation history

Instructions:
1. Use the retrieved content to find facts and relevant details.
2. Maintain consistency with the previous conversation summary.
3. If context from history is important, use it to refine your response.
4. Focus on accuracy, clarity, and coherence.
5. If the entire information is not present, then return the content which you can atleast provide relevant to it, don't hallucinate!

### Previous Summary:
${previousSummary}

### Previous History:
${previousHistory}

### Retrieved Chunks:
${retrievedChunks
  .map((chunk, i) => `Title: ${chunk.title}\nContent:${chunk.content}`)
  .join("\n\n")}

### User Query:
${userQuery}

Important:
    - Do not make up facts or speculate beyond what is provided.
    - If the entire information is not present, then return the content which you can atleast provide relevant to it, don't hallucinate!
    - Prefer grounded, traceable answers over fluent but fabricated ones.
`;

const getFinalAnswer = async ({
  previousSummary,
  previousHistory,
  userQuery
}) => {
  const retrievedChunks = await retrieveRequiredRagPoints(userQuery);
  const answer = openAIConnector.getText([
    {
      role: MESSAGER_TYPE.SYSTEM,
      content: getFinalAnswerPrompt({
        previousSummary,
        previousHistory,
        retrievedChunks,
        userQuery
      })
    }
  ]);
  return answer;
};

module.exports = getFinalAnswer;
