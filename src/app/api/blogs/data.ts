// Database store for blogs using MongoDB

import { getCollection } from '@/lib/db';
import { ObjectId } from 'mongodb';

export interface BlogData {
  _id?: ObjectId;
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorId: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  featuredImage: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  comments: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

const COLLECTION_NAME = 'blogs';

// Get the blogs collection
async function getBlogsCollection() {
  return getCollection<BlogData>(COLLECTION_NAME);
}

// Convert MongoDB document to BlogData (with id field)
function toBlogData(doc: any): BlogData {
  const { _id, ...rest } = doc;
  return {
    ...rest,
    id: _id?.toString() || rest.id || '',
  };
}

// Convert BlogData to MongoDB document (remove id, use _id)
function toMongoDoc(data: Partial<BlogData>): any {
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
export const blogsDB = {
  // Get all blogs
  async findAll(): Promise<BlogData[]> {
    try {
      const collection = await getBlogsCollection();
      const docs = await collection.find({}).toArray();
      return docs.map(toBlogData);
    } catch (error) {
      console.error('Error fetching blogs from database:', error);
      return [];
    }
  },

  // Find blog by ID
  async findById(id: string): Promise<BlogData | null> {
    try {
      const collection = await getBlogsCollection();
      let doc;
      try {
        doc = await collection.findOne({ _id: new ObjectId(id) });
      } catch {
        // If ObjectId is invalid, try finding by id field
        doc = await collection.findOne({ id });
      }
      return doc ? toBlogData(doc) : null;
    } catch (error) {
      console.error('Error finding blog by ID:', error);
      return null;
    }
  },

  // Find blog by slug
  async findBySlug(slug: string): Promise<BlogData | null> {
    try {
      const collection = await getBlogsCollection();
      const doc = await collection.findOne({ slug });
      return doc ? toBlogData(doc) : null;
    } catch (error) {
      console.error('Error finding blog by slug:', error);
      return null;
    }
  },

  // Create a new blog
  async create(data: Omit<BlogData, '_id' | 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogData> {
    try {
      const collection = await getBlogsCollection();
      const now = new Date().toISOString();
      const doc = {
        ...toMongoDoc(data),
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now,
      };
      const result = await collection.insertOne(doc);
      return toBlogData({ ...doc, _id: result.insertedId });
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  },

  // Update a blog
  async update(id: string, data: Partial<BlogData>): Promise<BlogData | null> {
    try {
      const collection = await getBlogsCollection();
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

      return result ? toBlogData(result) : null;
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  },

  // Delete a blog
  async delete(id: string): Promise<boolean> {
    try {
      const collection = await getBlogsCollection();
      let result;
      try {
        result = await collection.deleteOne({ _id: new ObjectId(id) });
      } catch {
        // If ObjectId is invalid, try deleting by id field
        result = await collection.deleteOne({ id });
      }
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }
  },

  // Filter blogs
  async filter(filters: {
    status?: string;
    category?: string;
    search?: string;
  }): Promise<BlogData[]> {
    try {
      const collection = await getBlogsCollection();
      const query: any = {};

      if (filters.status && filters.status !== 'all') {
        query.status = filters.status;
      }

      if (filters.category && filters.category !== 'all') {
        query.category = filters.category;
      }

      if (filters.search) {
        const searchRegex = { $regex: filters.search, $options: 'i' };
        query.$or = [
          { title: searchRegex },
          { excerpt: searchRegex },
          { author: searchRegex },
          { tags: { $in: [new RegExp(filters.search, 'i')] } },
        ];
      }

      const docs = await collection.find(query).toArray();
      return docs.map(toBlogData);
    } catch (error) {
      console.error('Error filtering blogs:', error);
      return [];
    }
  },
};

// Legacy compatibility - export a proxy that uses the database
// This allows existing code to work with minimal changes
export const blogsStore = {
  async findAll() {
    return blogsDB.findAll();
  },
  async findById(id: string) {
    return blogsDB.findById(id);
  },
  async findBySlug(slug: string) {
    return blogsDB.findBySlug(slug);
  },
  async create(data: Omit<BlogData, '_id' | 'id' | 'createdAt' | 'updatedAt'>) {
    return blogsDB.create(data);
  },
  async update(id: string, data: Partial<BlogData>) {
    return blogsDB.update(id, data);
  },
  async delete(id: string) {
    return blogsDB.delete(id);
  },
  async filter(filters: any) {
    return blogsDB.filter(filters);
  },
  // Array-like methods for backward compatibility
  get length() {
    // This won't work synchronously, but we'll handle it in the route
    return 0;
  },
  push: async function(item: BlogData) {
    return blogsDB.create(item);
  },
  findIndex: async function(callback: (item: BlogData) => boolean) {
    const all = await blogsDB.findAll();
    return all.findIndex(callback);
  },
  find: async function(callback: (item: BlogData) => boolean) {
    const all = await blogsDB.findAll();
    return all.find(callback);
  },
  splice: async function(start: number, deleteCount?: number, ...items: BlogData[]) {
    const all = await blogsDB.findAll();
    const deleted = all.splice(start, deleteCount || 0);
    // Delete from database
    for (const item of deleted) {
      await blogsDB.delete(item.id);
    }
    // Add new items
    for (const item of items) {
      await blogsDB.create(item);
    }
    return deleted;
  },
  map: async function(callback: (item: BlogData, index: number) => any) {
    const all = await blogsDB.findAll();
    return all.map(callback);
  },
};
