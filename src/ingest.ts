import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";
import { vectorStore } from "./vectorStoreClient.ts";
import { FILE_PATH } from './constants.ts';

async function ingestDocument(filePath: string) {
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

    await vectorStore.addDocuments(documents); //Costly op. comment if not ready to insert to vector DB.
}

ingestDocument(FILE_PATH);