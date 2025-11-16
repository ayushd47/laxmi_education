// Shared data store for enquiries
// In production, this would be replaced with a database

export interface EnquiryData {
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

// In-memory storage - in production, use a database
export const enquiriesStore: EnquiryData[] = [];




