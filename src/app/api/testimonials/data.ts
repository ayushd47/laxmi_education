// Database store for testimonials using MongoDB

import { getCollection } from '@/lib/db';
import { ObjectId } from 'mongodb';

export interface TestimonialData {
  _id?: ObjectId;
  id: string;
  name: string;
  university: string;
  country: string;
  program: string;
  rating: number;
  text: string;
  image?: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

const COLLECTION_NAME = 'testimonials';

// Get the testimonials collection
async function getTestimonialsCollection() {
  return getCollection<TestimonialData>(COLLECTION_NAME);
}

// Convert MongoDB document to TestimonialData (with id field)
function toTestimonialData(doc: any): TestimonialData {
  const { _id, ...rest } = doc;
  return {
    ...rest,
    id: _id?.toString() || rest.id || '',
  };
}

// Convert TestimonialData to MongoDB document (remove id, use _id)
function toMongoDoc(data: Partial<TestimonialData>): any {
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
export const testimonialsDB = {
  // Get all testimonials
  async findAll(): Promise<TestimonialData[]> {
    try {
      const collection = await getTestimonialsCollection();
      const docs = await collection.find({}).toArray();
      return docs.map(toTestimonialData);
    } catch (error) {
      console.error('Error fetching testimonials from database:', error);
      return [];
    }
  },

  // Get published testimonials only
  async findPublished(): Promise<TestimonialData[]> {
    try {
      const collection = await getTestimonialsCollection();
      const docs = await collection.find({ status: 'published' }).toArray();
      return docs.map(toTestimonialData);
    } catch (error) {
      console.error('Error fetching published testimonials:', error);
      return [];
    }
  },

  // Find testimonial by ID
  async findById(id: string): Promise<TestimonialData | null> {
    try {
      const collection = await getTestimonialsCollection();
      let doc;
      try {
        doc = await collection.findOne({ _id: new ObjectId(id) });
      } catch {
        // If ObjectId is invalid, try finding by id field
        doc = await collection.findOne({ id });
      }
      return doc ? toTestimonialData(doc) : null;
    } catch (error) {
      console.error('Error finding testimonial by ID:', error);
      return null;
    }
  },

  // Create a new testimonial
  async create(data: Omit<TestimonialData, '_id' | 'id' | 'createdAt' | 'updatedAt'>): Promise<TestimonialData> {
    try {
      const collection = await getTestimonialsCollection();
      const now = new Date().toISOString();
      const doc = {
        ...toMongoDoc(data),
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now,
      };
      const result = await collection.insertOne(doc);
      return toTestimonialData({ ...doc, _id: result.insertedId });
    } catch (error) {
      console.error('Error creating testimonial:', error);
      throw error;
    }
  },

  // Update a testimonial
  async update(id: string, data: Partial<TestimonialData>): Promise<TestimonialData | null> {
    try {
      const collection = await getTestimonialsCollection();
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

      return result ? toTestimonialData(result) : null;
    } catch (error) {
      console.error('Error updating testimonial:', error);
      throw error;
    }
  },

  // Delete a testimonial
  async delete(id: string): Promise<boolean> {
    try {
      const collection = await getTestimonialsCollection();
      let result;
      try {
        result = await collection.deleteOne({ _id: new ObjectId(id) });
      } catch {
        // If ObjectId is invalid, try deleting by id field
        result = await collection.deleteOne({ id });
      }
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      throw error;
    }
  },
};

// Legacy compatibility - export a proxy that uses the database
export const testimonialsStore = {
  async findAll() {
    return testimonialsDB.findAll();
  },
  async findPublished() {
    return testimonialsDB.findPublished();
  },
  async findById(id: string) {
    return testimonialsDB.findById(id);
  },
  async create(data: Omit<TestimonialData, '_id' | 'id' | 'createdAt' | 'updatedAt'>) {
    return testimonialsDB.create(data);
  },
  async update(id: string, data: Partial<TestimonialData>) {
    return testimonialsDB.update(id, data);
  },
  async delete(id: string) {
    return testimonialsDB.delete(id);
  },
};





