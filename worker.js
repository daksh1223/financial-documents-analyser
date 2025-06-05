const { parentPort, workerData: filePath } = require("worker_threads");
const analyseDocument = require("./analyseDocument");

analyseDocument(filePath).then(() => {
  parentPort.postMessage(`${filePath} successfully added in RAG!`);
});
