const fs = require("fs");
const {
  extractMetadataFromDocument,
  getFirstPageFromDocument
} = require("./documentMetadataExtractor");
const { generateRagPointsFromDocument } = require("./documentChunkGenerator");
const { reader } = require("./connectors/llamaConnector");
const ragConnector = require("./connectors/ragConnector");
const { isDocumentTranscript } = require("./transcriptAnalysis");

const analyseDocument = async (filePath) => {
  try {
    console.log("ANALYSING", filePath);

    const firstPageText = await getFirstPageFromDocument(filePath);
    const _isDocumentTranscript = await isDocumentTranscript(firstPageText);

    const [documentsChunks, documentMetadata] = await Promise.all([
      reader.loadData(filePath),
      extractMetadataFromDocument(filePath, _isDocumentTranscript)
    ]);
    await Promise.all(
      documentsChunks.map(async (documentsChunk) => {
        const ragPoints = await generateRagPointsFromDocument(
          documentsChunk.text,
          _isDocumentTranscript
        );

        if (ragPoints?.length)
          await ragConnector.upload(ragPoints, documentMetadata);
      })
    );
    console.log("Analysed!", filePath);
  } catch (err) {
    console.log(err);
    return err;
  } finally {
    await fs.unlink(filePath, () => undefined);
  }
};

module.exports = analyseDocument;
