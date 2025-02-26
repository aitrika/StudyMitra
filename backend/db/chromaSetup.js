import { ChromaClient } from "chromadb";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const CHROMA_URL = process.env.CHROMA_URL || "http://localhost:8000"; // Update if needed
const client = new ChromaClient({ path: CHROMA_URL });

const COLLECTION_NAME = "study_mitra_docs"; // Change as per need

// Function to create or get collection
export const getCollection = async () => {
  try {
    return await client.getOrCreateCollection({ name: COLLECTION_NAME });
  } catch (error) {
    console.error("Error getting collection:", error);
  }
};

// Function to add documents (text chunks) with embeddings
export const addDocuments = async (docs) => {
  try {
    const collection = await getCollection();
    const ids = docs.map((_, index) => `doc_${Date.now()}_${index}`);
    
    // Get embeddings from OpenAI/Groq
    const embeddings = await Promise.all(docs.map(getEmbeddings));
    
    await collection.add({ ids, documents: docs, embeddings });
    console.log("Documents added successfully!");
  } catch (error) {
    console.error("Error adding documents:", error);
  }
};

// Function to query the most relevant chunk
export const queryDocument = async (query, topK = 3) => {
  try {
    const collection = await getCollection();
    const queryEmbedding = await getEmbeddings(query);

    const results = await collection.query({
      queryEmbeddings: [queryEmbedding],
      nResults: topK,
    });

    console.log("Relevant Chunks:", results.documents);
    return results.documents;
  } catch (error) {
    console.error("Error querying document:", error);
  }
};

// Function to get OpenAI/Groq embeddings
async function getEmbeddings(text) {
    try {
        const response = await axios.post(
            "https://api.jina.ai/v1/embeddings",
            {
                model: "jina-embeddings-v2-base-en",
                input: text
            },
            {
                headers: {
                    Authorization: `Bearer jina_ea564f4d374347908855fba8ae9694eetFb0vSUCWYKdc1EW6boz3zQdmts4`,
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data.data[0].embedding;
    } catch (error) {
        console.error("Error fetching embeddings:", error.response?.data || error.message);
        return null;
    }
}

// Function to get all documents from a collection
export const getAllDocuments = async () => {
    try {
        const collection = await getCollection();
        const results = await collection.get();
        return results.documents;
    } catch (error) {
        console.error("Error getting all documents:", error);
        return [];
    }
};
// Function to list all collections
export const listCollections = async () => {
  try {
    const collections = await client.listCollections();
    console.log("Collections:", collections);
  } catch (error) {
    console.error("Error listing collections:", error);
  }
};


const docs = [
    "Aitrika likes abhi",
    "Aitrika learns to code very fast",
    
  ];

//   await addDocuments(docs);
  
// Function to delete documents from collection


const res = await  getAllDocuments()
console.log(res);

