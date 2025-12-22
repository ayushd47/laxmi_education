import { MongoClient, Db, Collection, Document } from 'mongodb';

// Support both MONGODB_URI and DATABASE_URL environment variables
const uri = process.env.MONGODB_URI || process.env.DATABASE_URL;

if (!uri) {
  const errorMsg = 'MONGODB_URI or DATABASE_URL is not set. Please add it to your environment variables.';
  console.error('❌', errorMsg);
  if (process.env.NODE_ENV === 'production') {
    console.error('⚠️  Database operations will fail in production without this variable!');
  }
}

const options = {
  // Add connection timeout and retry options
  serverSelectionTimeoutMS: 5000, // 5 seconds
  socketTimeoutMS: 45000, // 45 seconds
};

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
      globalWithMongo._mongoClientPromise = client.connect().catch((error) => {
        console.error('❌ MongoDB connection error:', error.message);
        console.error('💡 Make sure your MONGODB_URI is correct and the database is accessible.');
        throw error;
      });
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect().catch((error) => {
      console.error('❌ MongoDB connection error:', error.message);
      console.error('💡 Make sure your MONGODB_URI is correct and the database is accessible.');
      throw error;
    });
  }
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

// Helper function to get database
export async function getDatabase(): Promise<Db> {
  if (!clientPromise) {
    const error = new Error('MongoDB connection not initialized. Please set MONGODB_URI or DATABASE_URL environment variable.');
    console.error('❌', error.message);
    throw error;
  }
  
  try {
    const client = await clientPromise;
    // Test the connection
    await client.db().admin().ping();
    return client.db();
  } catch (error: any) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.error('💡 Check your MONGODB_URI and ensure the database is accessible.');
    throw new Error(`Database connection failed: ${error.message}`);
  }
}

// Helper function to get a collection
export async function getCollection<T extends Document = Document>(collectionName: string): Promise<Collection<T>> {
  try {
    const db = await getDatabase();
    return db.collection<T>(collectionName);
  } catch (error: any) {
    console.error(`❌ Failed to get collection "${collectionName}":`, error.message);
    throw error;
  }
}

