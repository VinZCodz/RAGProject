import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import * as readline from 'node:readline/promises';
import { vectorStore } from "./vectorStoreClient.ts";
import { SYSTEM_PROMPT } from './constants.ts';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: "gemini-2.0-flash",
    temperature: 0,
    maxRetries: 2,
});

while (true) {
    const userPrompt = await rl.question('You: ');
    if (userPrompt === '/exit') {
        break;
    }

    const similaritySearchResults = await vectorStore.similaritySearch(userPrompt, 3);
    const contexts = similaritySearchResults.map(_ => _.pageContent).join('\n\n');

    const philosopher = await model.invoke([
        ["system", SYSTEM_PROMPT],
        ["human", `Question: ${userPrompt}; Contexts: ${contexts}`]
    ]);

    console.log('Philosophical AI: ' + philosopher.content);
};
rl.close();