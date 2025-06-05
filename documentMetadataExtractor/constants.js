const METADATA_EXTRACTION_PROMPT = `
    You are an expert at interpreting SEC Form 10-Q, 10-K filings.
    Given the first page text of a 10-Q, 10-K, extract these details:

    1. The company’s ticker symbol (e.g., MSFT, AAPL).
    2. The fiscal year of the report.
    3. The fiscal quarter number (1, 2, 3, or 4).

    Notes:
        - The fiscal year may differ from the calendar year depending on the company’s fiscal year start month.
        - Use your intelligence to decipher the correct quarter number.

    Calculate fiscal year and fiscal quarter (in case of quaterly fillings) based on the period end date and fiscal year start month.
    Return your answer in this JSON format ONLY:
    {
        "ticker": "string",
        "fiscal_year": number,
        "fiscal_quarter": number
    }
`;

const METADATA_EXTRACTION_FOOTER_PROMPT = `
    Notes:
        - The fiscal year may differ from the calendar year depending on the company’s fiscal year start month.
        - Use your intelligence to decipher the correct quarter number.
    Calculate fiscal year and fiscal quarter (in case of quaterly fillings) based on the period end date and fiscal year start month.
    IMPORTANT: In case of yearly reports, set fiscal_quarter as 0
    Remember you need to return the data in the below JSON format only!
    {
        "ticker": "string",
        "fiscal_year": number,
        "fiscal_quarter": number
    }
    IMPORTANT: Respond only with a valid JSON object. Do not include any markdown, code fences, or explanations.
`;

const TRANSCRIPT_METADATA_EXTRACTION_PROMPT = `
    You are an expert at analyzing earnings call transcripts.
    Given the full or partial text of an earnings call transcript, extract the following key details:

    1. The company’s ticker symbol (e.g., MSFT, AAPL).
    2. The fiscal year of the report.
    3. The fiscal quarter number (1, 2, 3, or 4).

    Notes:
        - The transcript will typically mention phrases like “Q1 2024 earnings call,” “second quarter results,” or “fiscal year ending June 30, 2024.”
        - The fiscal year may differ from the calendar year depending on the company.
        - Use your intelligence to decipher the correct quarter number.

    Return your answer in this JSON format ONLY:
        {
            "ticker": "string",
            "fiscal_year": number,
            "fiscal_quarter": number
        }
`;

module.exports = {
  TRANSCRIPT_METADATA_EXTRACTION_PROMPT,
  METADATA_EXTRACTION_PROMPT,
  METADATA_EXTRACTION_FOOTER_PROMPT
};
