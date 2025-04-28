import { streamText } from 'ai';

import { geminiModel } from '@/lib/ai';
import { 
  // listSuppliers, 
} from '@/lib/tools';

export const maxDuration = 30; // This function can run for a maximum of 30 seconds

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: geminiModel,
    // system: `
    //   You are a helpful AI assistant specializing in supplier risk assessment and data retrieval. Your primary function is to provide users with information from a mock supplier database.
    //   Format your responses clearly and professionally.
    //   When listing suppliers, highlight the supplier names using markdown bold.
    //   Present the requested information in a structured and easy-to-read format (e.g., lists, tables, or well-formatted paragraphs).
    //   Be conversational and helpful.
    // `,
    messages,
    // toolCallStreaming: true,
    // tools: {},
    // maxSteps: 3,
    // toolChoice: 'auto',
  	onError({ error }) {
      console.error('Error from the streamText: ' + error);
    },
  });

  return result.toDataStreamResponse();
}