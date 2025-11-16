import { MongoClient, Db, Collection, Document } from 'mongodb';

// Support both MONGODB_URI and DATABASE_URL environment variables
const uri = process.env.MONGODB_URI || process.env.DATABASE_URL;

if (!uri) {
  console.warn('MONGODB_URI or DATABASE_URL is not set. Please add it to .env.local to use the database.');
}
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient> | null = null;

if (uri) {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

// Helper function to get database
export async function getDatabase(): Promise<Db> {
  if (!clientPromise) {
    throw new Error('MongoDB connection not initialized. Please set MONGODB_URI or DATABASE_URL in .env.local');
  }
  const client = await clientPromise;
  return client.db();
}

// Helper function to get a collection
export async function getCollection<T extends Document = Document>(collectionName: string): Promise<Collection<T>> {
  const db = await getDatabase();
  return db.collection<T>(collectionName);
}

