import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

process.env.PINECONE_INDEX = process.env.PINECONE_INDEX || "ds-dense-768";
const pinecone = new PineconeClient();
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
    model: "text-embedding-004", // 768 dimensions
});

export const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    maxConcurrency: 5,
});