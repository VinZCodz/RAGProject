RAG'ed Mankuthimmana Kagga GPT 📜
------------------------

Your Personal Philosopher:This project is a Retrieval-Augmented Generation (RAG) system that uses a Large Language Model (LLM) to provide philosophical insights from Mankuthimmana Kagga. It leverages a curated knowledge base to ground the LLM's responses, making them contextually accurate and relevant.

--------------------

Tech Stack for my experiments with LLM augmentation using RAG, vector embeddings, and vector DB store involves:
- Agent Framework: **LangChain** for orchestrating the RAG workflow.
- Vector Embeddings: A **Google embedding model** to convert text into vector representations.
- Vector Database: **Pinecone** for high-performance storage and retrieval of embeddings.
- Generative Model: **Gemini on LangChain** for generating coherent responses.
- Language: **TypeScript** for a robust and type-safe application.

-----------------------

How It Works:The system follows a standard RAG pipeline:
- Unstructured data source from pdf, docs, etc. is loaded, chunked, and embedded using Lanchain tools and Google embedding model.
- These embeddings are stored in a Pinecone vector database and indexed.
- When a user query is received, the system retrieves the most relevant text chunks from the database.
- The retrieved context is then provided to the Gemini LLM, which uses this information to generate a grounded and insightful response, ergo ur Philosopher. 

------------------

Getting Started
Prerequisites:
- Pinecone and Google API keys.
- Installation:
```
git clone <repository-url>
npm install
```
- Configuration: Create a .env file and add your keys:
```
PINECONE_API_KEY=YOUR_PINECONE_API_KEY
GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
```
- Running:
```
npm run ingest to populate the database.
npm start to run the application.
```
----------------------
Acknowledgments:
Although this project is for my understanding of RAG-based augmentation, it's also a tribute to D. V. Gundappa, whose timeless wisdom serves as a cornerstone for many. His work continues to inspire generations.

**_Trying to bring code and art-storytelling together._**

