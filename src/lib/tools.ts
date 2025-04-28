import { tool } from 'ai';
import { z } from 'zod';

export const listSuppliers = tool({
    description: 'Return a few suppliers. Optionally specify how many to return.',
    parameters: z.object({
        limit: z.number().min(1).max(100).optional(),
    }),
    execute: async ({ limit }) => {
        console.log('...');
    },
});
