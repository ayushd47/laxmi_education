// Database store for enquiries using MongoDB

import { getCollection } from '@/lib/db';
import { ObjectId } from 'mongodb';

export interface EnquiryData {
  _id?: ObjectId;
  id: string;
  name: string;
  email: string;
  phone: string;
  phoneCountryCode: string;
  nearestOffice: string;
  message: string;
  status: 'new' | 'read' | 'contacted' | 'resolved';
  createdAt: string;
  updatedAt: string;
}

const COLLECTION_NAME = 'enquiries';

// Get the enquiries collection
async function getEnquiriesCollection() {
  return getCollection<EnquiryData>(COLLECTION_NAME);
}

// Convert MongoDB document to EnquiryData (with id field)
function toEnquiryData(doc: any): EnquiryData {
  const { _id, ...rest } = doc;
  return {
    ...rest,
    id: _id?.toString() || rest.id || '',
  };
}

// Convert EnquiryData to MongoDB document (remove id, use _id)
function toMongoDoc(data: Partial<EnquiryData>): any {
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
export const enquiriesDB = {
  // Get all enquiries
  async findAll(): Promise<EnquiryData[]> {
    try {
      const collection = await getEnquiriesCollection();
      const docs = await collection.find({}).toArray();
      return docs.map(toEnquiryData);
    } catch (error) {
      console.error('Error fetching enquiries from database:', error);
      return [];
    }
  },

  // Find enquiry by ID
  async findById(id: string): Promise<EnquiryData | null> {
    try {
      const collection = await getEnquiriesCollection();
      let doc;
      try {
        doc = await collection.findOne({ _id: new ObjectId(id) });
      } catch {
        // If ObjectId is invalid, try finding by id field
        doc = await collection.findOne({ id });
      }
      return doc ? toEnquiryData(doc) : null;
    } catch (error) {
      console.error('Error finding enquiry by ID:', error);
      return null;
    }
  },

  // Create a new enquiry
  async create(data: Omit<EnquiryData, '_id' | 'id' | 'createdAt' | 'updatedAt'>): Promise<EnquiryData> {
    try {
      const collection = await getEnquiriesCollection();
      const now = new Date().toISOString();
      const doc = {
        ...toMongoDoc(data),
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now,
      };
      const result = await collection.insertOne(doc);
      return toEnquiryData({ ...doc, _id: result.insertedId });
    } catch (error) {
      console.error('Error creating enquiry:', error);
      throw error;
    }
  },

  // Update an enquiry
  async update(id: string, data: Partial<EnquiryData>): Promise<EnquiryData | null> {
    try {
      const collection = await getEnquiriesCollection();
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

      return result ? toEnquiryData(result) : null;
    } catch (error) {
      console.error('Error updating enquiry:', error);
      throw error;
    }
  },

  // Delete an enquiry
  async delete(id: string): Promise<boolean> {
    try {
      const collection = await getEnquiriesCollection();
      let result;
      try {
        result = await collection.deleteOne({ _id: new ObjectId(id) });
      } catch {
        // If ObjectId is invalid, try deleting by id field
        result = await collection.deleteOne({ id });
      }
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      throw error;
    }
  },

  // Filter enquiries
  async filter(filters: {
    status?: string;
    search?: string;
    sort?: string;
  }): Promise<EnquiryData[]> {
    try {
      const collection = await getEnquiriesCollection();
      const query: any = {};

      if (filters.status && filters.status !== 'all') {
        query.status = filters.status;
      }

      if (filters.search) {
        const searchRegex = { $regex: filters.search, $options: 'i' };
        query.$or = [
          { name: searchRegex },
          { email: searchRegex },
          { phone: searchRegex },
          { message: searchRegex },
        ];
      }

      let cursor = collection.find(query);

      // Sort enquiries
      if (filters.sort === 'newest') {
        cursor = cursor.sort({ createdAt: -1 });
      } else if (filters.sort === 'oldest') {
        cursor = cursor.sort({ createdAt: 1 });
      } else {
        cursor = cursor.sort({ createdAt: -1 }); // Default to newest
      }

      const docs = await cursor.toArray();
      return docs.map(toEnquiryData);
    } catch (error) {
      console.error('Error filtering enquiries:', error);
      return [];
    }
  },
};

// Legacy compatibility - export a proxy that uses the database
export const enquiriesStore = {
  async findAll() {
    return enquiriesDB.findAll();
  },
  async findById(id: string) {
    return enquiriesDB.findById(id);
  },
  async create(data: Omit<EnquiryData, '_id' | 'id' | 'createdAt' | 'updatedAt'>) {
    return enquiriesDB.create(data);
  },
  async update(id: string, data: Partial<EnquiryData>) {
    return enquiriesDB.update(id, data);
  },
  async delete(id: string) {
    return enquiriesDB.delete(id);
  },
  async filter(filters: any) {
    return enquiriesDB.filter(filters);
  },
  // Array-like methods for backward compatibility
  push: async function(item: EnquiryData) {
    return enquiriesDB.create(item);
  },
  findIndex: async function(callback: (item: EnquiryData) => boolean) {
    const all = await enquiriesDB.findAll();
    return all.findIndex(callback);
  },
  find: async function(callback: (item: EnquiryData) => boolean) {
    const all = await enquiriesDB.findAll();
    return all.find(callback);
  },
  splice: async function(start: number, deleteCount?: number, ...items: EnquiryData[]) {
    const all = await enquiriesDB.findAll();
    const deleted = all.splice(start, deleteCount || 0);
    // Delete from database
    for (const item of deleted) {
      await enquiriesDB.delete(item.id);
    }
    // Add new items
    for (const item of items) {
      await enquiriesDB.create(item);
    }
    return deleted;
  },
  map: async function(callback: (item: EnquiryData, index: number) => any) {
    const all = await enquiriesDB.findAll();
    return all.map(callback);
  },
};
