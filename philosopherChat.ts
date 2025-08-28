import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import * as readline from 'node:readline/promises';
import { vectorStore } from "./ingest.ts";
import {SYSTEM_PROMPT} from './constants.ts';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const systemPrompt = ["system", SYSTEM_PROMPT];
const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: "gemini-2.0-flash",
    temperature: 0,
    maxRetries: 2,
});

while (true) {
    const prompt = [systemPrompt];

    const userPrompt = await rl.question('You: ');
    if (userPrompt === '/exit') {
        break;
    }
    prompt.push(["user", userPrompt]);

    const similaritySearchResults = await vectorStore.similaritySearch(userPrompt, 3);
    const contexts = similaritySearchResults.map(_ => _.pageContent).join('\n\n');
    prompt.push(["context", contexts]);

    console.log(prompt);

    //const aiMsg = await model.invoke(prompt);


    //console.log('Philosopher: ' + aiMsg.content);
};
rl.close();

