'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Save } from 'lucide-react';

interface CollegeFormProps {
  college?: {
    id: string;
    name: string;
    type: 'public' | 'private';
    imageUrl: string;
    website: string;
    description: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
  };
  onSave: (collegeData: any) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export default function CollegeForm({ college, onSave, onCancel, isOpen }: CollegeFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'public' as 'public' | 'private',
    imageUrl: '',
    website: '',
    description: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: [] as string[]
  });

  const [newKeyword, setNewKeyword] = useState('');

  useEffect(() => {
    if (college) {
      setFormData({
        name: college.name || '',
        type: college.type || 'public',
        imageUrl: college.imageUrl || '',
        website: college.website || '',
        description: college.description || '',
        seoTitle: college.seoTitle || '',
        seoDescription: college.seoDescription || '',
        seoKeywords: college.seoKeywords || []
      });
    } else {
      setFormData({
        name: '',
        type: 'public',
        imageUrl: '',
        website: '',
        description: '',
        seoTitle: '',
        seoDescription: '',
        seoKeywords: []
      });
    }
  }, [college]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !formData.seoKeywords.includes(newKeyword.trim())) {
      setFormData(prev => ({
        ...prev,
        seoKeywords: [...prev.seoKeywords, newKeyword.trim()]
      }));
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      seoKeywords: prev.seoKeywords.filter(keyword => keyword !== keywordToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add default values for required fields that are not in the form
    const collegeData = {
      ...formData,
      country: 'India',
      city: '',
      ranking: 999,
      established: new Date().getFullYear(),
      students: 0,
      tuitionFee: {
        undergraduate: 0,
        graduate: 0
      },
      programs: [],
      requirements: [],
      applicationDeadline: new Date().toISOString().split('T')[0],
      status: 'active',
      // Include SEO fields
      seoTitle: formData.seoTitle || undefined,
      seoDescription: formData.seoDescription || undefined,
      seoKeywords: formData.seoKeywords.length > 0 ? formData.seoKeywords : undefined
    };
    onSave(collegeData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {college ? 'Edit University' : 'Add New University'}
            </h2>
            <Button variant="ghost" onClick={onCancel}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter university title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                required
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <Input
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="Enter image URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <Input
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="Enter website URL"
                type="url"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Details *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter university details"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                rows={6}
                required
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">SEO Settings</CardTitle>
                <CardDescription>Optimize your university page for search engines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SEO Title
                  </label>
                  <Input
                    name="seoTitle"
                    value={formData.seoTitle}
                    onChange={handleInputChange}
                    placeholder="Enter SEO title (defaults to university name if empty)"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended: 50-60 characters
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SEO Description
                  </label>
                  <textarea
                    name="seoDescription"
                    value={formData.seoDescription}
                    onChange={handleInputChange}
                    placeholder="Enter SEO description (defaults to description if empty)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended: 150-160 characters
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SEO Keywords
                  </label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      placeholder="Add a keyword"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
                    />
                    <Button type="button" onClick={handleAddKeyword} variant="outline">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.seoKeywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-1"
                      >
                        {keyword}
                        <button
                          type="button"
                          onClick={() => handleRemoveKeyword(keyword)}
                          className="ml-1 text-green-600 hover:text-green-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Add relevant keywords to help search engines find this university
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" className="bg-royal-blue hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                {college ? 'Update' : 'Create'} University
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
