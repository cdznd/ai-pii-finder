import { streamText } from 'ai';
import { geminiModel } from '@/lib/ai';

export const maxDuration = 30; // This function can run for a maximum of 30 seconds

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: geminiModel,
    messages: messages,
    system: `
      You are a helpful AI assistant specializing in identifying personally identifiable information (PII) in documents.
      Common PII types to look for:
      - Names, addresses, phone numbers, email addresses
      - Social security numbers, passport numbers
      - Credit card numbers, bank account details
      - Date of birth, place of birth
      - Medical information and health records
      - Login credentials
      Be conversational, educational and helpful. Your goal is to help users identify and protect sensitive information.
    `,
    onError({ error }) {
      console.error('Error from the streamText: ' + error);
    },
  });

  return result.toDataStreamResponse();
}