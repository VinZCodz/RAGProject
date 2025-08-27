import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

//process.env.PINECONE_INDEX = "ds-dense-768";
const pinecone = new PineconeClient();
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
    model: "text-embedding-004", // 768 dimensions
});

const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    maxConcurrency: 5,
});

export async function indexDocument(filePath: string) {
    const loader = new PDFLoader(filePath, { splitPages: false });
    const document = await loader.load();

    const textSplitter = new CharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 100,
    });

    const texts = await textSplitter.splitText(document[0]?.pageContent ?? "");

    const documents = texts.map((chunk) => {
        return {
            pageContent: chunk,
            metadata: document[0]?.metadata[0]
        }
    });

    //await vectorStore.addDocuments(documents);
}



