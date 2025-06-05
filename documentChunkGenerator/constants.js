const CHUNK_GENERATOR_PROMPT = `
    You are an expert in analyzing SEC filings such as Form 10-K and Form 10-Q.
    Given the following section of such a filing, segment it into multiple blocks, each containing 300–500 words.
    Each block must:
        Be topically coherent, covering only one major point or section.
        Be self-contained, meaning it makes sense without needing to read other blocks.
        Avoid cutting off sentences or ideas mid-way.
        Preserve context necessary for understanding, especially references to financials or risks.
        Label each block with a clear, descriptive title summarizing its content.
    Output Format:
        Return only an array of blocks where each block will have a summarised title and it's content, i.e.
        {
            title: string,
            content: string,
        }[]
`;

const TRANSCRIPT_CHUNK_GENERATOR_PROMPT = `
You are an expert in analyzing corporate earnings call transcripts.

Given the following section of a transcript, segment it into multiple coherent, report-style blocks, each containing 300–500 words.
Each block must:
    - Be topically focused, covering one clear subject (e.g., revenue drivers, guidance, market trends, product updates, Q&A insights).
    - Be self-contained and understandable on its own.
    - Do NOT present the content as a dialogue (e.g., no “John: …” / “Analyst: …”). Instead, generalize the conversation into clean, factual summaries.
    - Combine scattered points from the same topic (even if they appear in different speaker turns) into one concise block.
    - Omit introductions, pleasantries, and any non-informative or repetitive content.
    - Extract and preserve core financial or strategic insights, including numbers, direction of change, and executive perspectives.
    - Use your judgment to paraphrase and rewrite conversational segments into a formal, analytical tone.

Output Format:
    Return only an array of blocks where each block will have a summarised title and it's content, i.e.
    {
        title: string,
        content: string,
    }[]
`;

const CHUNK_GENERATOR_FOOTER_PROMPT = `
    Return only an array of blocks where each block will have a summarised title and it's content, i.e.
    Remember you need to return the data in the below JSON format only!
    {
        title: string,
        content: string,
    }[]
    IMPORTANT: Respond only with a valid JSON object. Do not include any markdown, code fences, or explanations.
`;

module.exports = {
  CHUNK_GENERATOR_PROMPT,
  CHUNK_GENERATOR_FOOTER_PROMPT,
  TRANSCRIPT_CHUNK_GENERATOR_PROMPT
};
