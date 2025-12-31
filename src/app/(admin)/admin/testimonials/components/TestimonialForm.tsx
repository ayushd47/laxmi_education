'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Save, Star } from 'lucide-react';

interface TestimonialFormProps {
  testimonial?: {
    id: string;
    name: string;
    university: string;
    country: string;
    program: string;
    rating: number;
    text: string;
    image?: string;
    status: 'published' | 'draft';
  };
  onSave: (testimonialData: any) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export default function TestimonialForm({ testimonial, onSave, onCancel, isOpen }: TestimonialFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    university: '',
    country: '',
    program: '',
    rating: 5,
    text: '',
    image: '',
    status: 'published' as 'published' | 'draft',
  });

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name,
        university: testimonial.university,
        country: testimonial.country,
        program: testimonial.program,
        rating: testimonial.rating,
        text: testimonial.text,
        image: testimonial.image || '',
        status: testimonial.status,
      });
    } else {
      setFormData({
        name: '',
        university: '',
        country: '',
        program: '',
        rating: 5,
        text: '',
        image: '',
        status: 'published',
      });
    }
  }, [testimonial]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) || 5 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {testimonial ? 'Edit Testimonial' : 'Create New Testimonial'}
            </h2>
            <Button variant="ghost" onClick={onCancel}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Name *
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter student name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  University *
                </label>
                <Input
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  placeholder="Enter university name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <Input
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Enter country"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Program *
                </label>
                <Input
                  name="program"
                  value={formData.program}
                  onChange={handleInputChange}
                  placeholder="e.g., Master's in Computer Science"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating *
              </label>
              <div className="flex items-center gap-4">
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                  required
                >
                  <option value={1}>1 Star</option>
                  <option value={2}>2 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={5}>5 Stars</option>
                </select>
                <div className="flex items-center gap-1">
                  {renderStars(formData.rating)}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Testimonial Text *
              </label>
              <textarea
                name="text"
                value={formData.text}
                onChange={handleInputChange}
                placeholder="Enter the student's testimonial"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                rows={6}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL (Optional)
                </label>
                <Input
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" className="bg-royal-blue hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                {testimonial ? 'Update' : 'Create'} Testimonial
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}







