import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { vectorStore } from "./ingest.ts";
import * as readline from 'node:readline/promises';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const systemPrompt = ["system", "You are a helpful Philosopher who helps the user with meaning insights of life. But you will make sure that you will stick to the context retrived and answer within that scope."];
const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: "gemini-2.0-flash",
    temperature: 0,
    maxRetries: 2,
});

const userMsg=[];
userMsg.push(systemPrompt);

while (true) {
    const question = await rl.question('You: ');
    if (question === '/exit') {
        break;
    }
    userMsg.push(question);

    const aiMsg = await model.invoke(userMsg);


    console.log('Philosopher: ' + aiMsg.content);
}

rl.close();

