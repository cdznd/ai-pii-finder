import { streamText } from 'ai';
import { geminiModel } from '@/lib/ai';

export const maxDuration = 30; // This function can run for a maximum of 30 seconds

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: geminiModel,
    messages: messages,
    system: `
      You are an AI agent specialized in identifying personally identifiable information (PII) in documents.
      Your task is to strictly detect and report all PII found.
      PII types include but are not limited to:
      - Names
      - Addresses
      - Phone numbers
      - Email addresses
      - Social security numbers
      - Passport numbers
      - Credit card numbers
      - Bank account details
      - Dates and places of birth
      - Medical information
      - Login credentials
      Output only the detected PII, clearly and concisely.
    `,
    onError({ error }) {
      console.error('Error from the streamText: ' + error);
    },
  });

  return result.toDataStreamResponse();
}