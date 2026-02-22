import { Mistral } from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({ apiKey });
const model = 'mistral-small-latest';

export const generateReview = async (diff) => {
    const prompt = `You are an expert code reviewer. Analyze the following pull request diff and provide a constructive, concise review. Focus on code quality, potential bugs, and best practices.

Diff:
${diff}`;

    const chatResponse = await client.chat.complete({
        model: model,
        messages: [{ role: 'user', content: prompt }],
    });

    return chatResponse.choices[0].message.content;
};

export const assessRisk = async (diff) => {
    const prompt = `Analyze the following pull request diff and assess its risk level. Risk level must be exactly one of: "low", "medium", or "high". 
Return ONLY a valid JSON object matching this schema:
{
  "riskLevel": "low" | "medium" | "high",
  "reason": "Brief explanation of the risk assessment"
}

Diff:
${diff}`;

    const chatResponse = await client.chat.complete({
        model: model,
        messages: [{ role: 'user', content: prompt }],
        responseFormat: { type: "json_object" }
    });

    try {
        return JSON.parse(chatResponse.choices[0].message.content);
    } catch (e) {
        return { riskLevel: "high", reason: "Failed to parse risk assessment from AI." };
    }
};

export const detectSecurity = async (diff) => {
    const prompt = `Analyze the following pull request diff for security vulnerabilities.
Return ONLY a valid JSON object matching this schema:
{
  "status": "clean" | "flagged",
  "flags": ["list of brief descriptions of vulnerabilities found, if any"]
}

Diff:
${diff}`;

    const chatResponse = await client.chat.complete({
        model: model,
        messages: [{ role: 'user', content: prompt }],
        responseFormat: { type: "json_object" }
    });

    try {
        return JSON.parse(chatResponse.choices[0].message.content);
    } catch (e) {
        return { status: "flagged", flags: ["Failed to parse security assessment from AI."] };
    }
};
