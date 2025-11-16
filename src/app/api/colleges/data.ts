// Database store for colleges/universities using MongoDB

import { getCollection } from '@/lib/db';
import { ObjectId } from 'mongodb';

export interface CollegeData {
  _id?: ObjectId;
  id: string;
  name: string;
  country: string;
  city: string;
  ranking: number;
  type: 'public' | 'private';
  established: number;
  students: number;
  tuitionFee: {
    undergraduate: number;
    graduate: number;
  };
  programs: string[];
  requirements: string[];
  applicationDeadline: string;
  imageUrl: string;
  website: string;
  description: string;
  status: 'active' | 'inactive';
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  createdAt: string;
  updatedAt: string;
}

const COLLECTION_NAME = 'colleges';

// Get the colleges collection
async function getCollegesCollection() {
  return getCollection<CollegeData>(COLLECTION_NAME);
}

// Convert MongoDB document to CollegeData (with id field)
function toCollegeData(doc: any): CollegeData {
  const { _id, ...rest } = doc;
  return {
    ...rest,
    id: _id?.toString() || rest.id || '',
  };
}

// Convert CollegeData to MongoDB document (remove id, use _id)
function toMongoDoc(data: Partial<CollegeData>): any {
  const { id, _id, ...rest } = data;
  const doc: any = { ...rest };
  if (id && !_id) {
    try {
      doc._id = new ObjectId(id);
    } catch {
      // Invalid ObjectId, let MongoDB generate a new one
    }
  }
  return doc;
}

// Database operations
export const collegesDB = {
  // Get all colleges
  async findAll(): Promise<CollegeData[]> {
    try {
      const collection = await getCollegesCollection();
      const docs = await collection.find({}).toArray();
      return docs.map(toCollegeData);
    } catch (error) {
      console.error('Error fetching colleges from database:', error);
      return [];
    }
  },

  // Find college by ID
  async findById(id: string): Promise<CollegeData | null> {
    try {
      const collection = await getCollegesCollection();
      let doc;
      try {
        doc = await collection.findOne({ _id: new ObjectId(id) });
      } catch {
        // If ObjectId is invalid, try finding by id field
        doc = await collection.findOne({ id });
      }
      return doc ? toCollegeData(doc) : null;
    } catch (error) {
      console.error('Error finding college by ID:', error);
      return null;
    }
  },

  // Create a new college
  async create(data: Omit<CollegeData, '_id' | 'id' | 'createdAt' | 'updatedAt'>): Promise<CollegeData> {
    try {
      const collection = await getCollegesCollection();
      const now = new Date().toISOString();
      const doc = {
        ...toMongoDoc(data),
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now,
      };
      const result = await collection.insertOne(doc);
      return toCollegeData({ ...doc, _id: result.insertedId });
    } catch (error) {
      console.error('Error creating college:', error);
      throw error;
    }
  },

  // Update a college
  async update(id: string, data: Partial<CollegeData>): Promise<CollegeData | null> {
    try {
      const collection = await getCollegesCollection();
      const updateDoc = {
        ...toMongoDoc(data),
        updatedAt: new Date().toISOString(),
      };
      // Remove _id from update to avoid conflicts
      delete updateDoc._id;
      delete updateDoc.id;

      let result;
      try {
        result = await collection.findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: updateDoc },
          { returnDocument: 'after' }
        );
      } catch {
        // If ObjectId is invalid, try updating by id field
        result = await collection.findOneAndUpdate(
          { id },
          { $set: updateDoc },
          { returnDocument: 'after' }
        );
      }

      return result ? toCollegeData(result) : null;
    } catch (error) {
      console.error('Error updating college:', error);
      throw error;
    }
  },

  // Delete a college
  async delete(id: string): Promise<boolean> {
    try {
      const collection = await getCollegesCollection();
      let result;
      try {
        result = await collection.deleteOne({ _id: new ObjectId(id) });
      } catch {
        // If ObjectId is invalid, try deleting by id field
        result = await collection.deleteOne({ id });
      }
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting college:', error);
      throw error;
    }
  },

  // Filter colleges
  async filter(filters: {
    status?: string;
    type?: string;
    country?: string;
    search?: string;
  }): Promise<CollegeData[]> {
    try {
      const collection = await getCollegesCollection();
      const query: any = {};

      if (filters.status && filters.status !== 'all') {
        query.status = filters.status;
      }

      if (filters.type && filters.type !== 'all') {
        query.type = filters.type;
      }

      if (filters.country && filters.country !== 'all') {
        query.country = filters.country;
      }

      if (filters.search) {
        const searchRegex = { $regex: filters.search, $options: 'i' };
        query.$or = [
          { name: searchRegex },
          { country: searchRegex },
          { city: searchRegex },
          { description: searchRegex },
          { programs: { $in: [new RegExp(filters.search, 'i')] } },
        ];
      }

      const docs = await collection.find(query).toArray();
      return docs.map(toCollegeData);
    } catch (error) {
      console.error('Error filtering colleges:', error);
      return [];
    }
  },
};

// Legacy compatibility - export a proxy that uses the database
// This allows existing code to work with minimal changes
export const collegesStore = {
  async findAll() {
    return collegesDB.findAll();
  },
  async findById(id: string) {
    return collegesDB.findById(id);
  },
  async create(data: Omit<CollegeData, '_id' | 'id' | 'createdAt' | 'updatedAt'>) {
    return collegesDB.create(data);
  },
  async update(id: string, data: Partial<CollegeData>) {
    return collegesDB.update(id, data);
  },
  async delete(id: string) {
    return collegesDB.delete(id);
  },
  async filter(filters: any) {
    return collegesDB.filter(filters);
  },
};

// No longer needed, but kept for compatibility
export async function ensureStoreInitialized(): Promise<void> {
  // Database is always initialized, no action needed
}
