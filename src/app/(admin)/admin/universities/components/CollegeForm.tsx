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
    country: string;
    city: string;
    type: 'public' | 'private';
    programs: string[];
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
    country: '',
    city: '',
    type: 'public' as 'public' | 'private',
    programs: [] as string[],
    imageUrl: '',
    website: '',
    description: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: [] as string[]
  });

  const [newKeyword, setNewKeyword] = useState('');
  const [newProgram, setNewProgram] = useState('');
  const [availableCountries, setAvailableCountries] = useState<string[]>([]);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [availablePrograms, setAvailablePrograms] = useState<string[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);

  // Fetch existing universities to populate dropdowns
  useEffect(() => {
    const fetchOptions = async () => {
      if (!isOpen) return;
      
      setIsLoadingOptions(true);
      try {
        const response = await fetch('/api/colleges');
        if (response.ok) {
          const universities = await response.json();
          const countries = [...new Set(universities.map((u: any) => u.country).filter(Boolean))].sort() as string[];
          const cities = [...new Set(universities.map((u: any) => u.city).filter(Boolean))].sort() as string[];
          const programs = [...new Set(universities.flatMap((u: any) => u.programs || []).filter(Boolean))].sort() as string[];
          
          setAvailableCountries(countries);
          setAvailableCities(cities);
          setAvailablePrograms(programs);
        }
      } catch (error) {
        console.error('Error fetching options:', error);
      } finally {
        setIsLoadingOptions(false);
      }
    };

    fetchOptions();
  }, [isOpen]);

  useEffect(() => {
    if (college) {
      setFormData({
        name: college.name || '',
        country: college.country || '',
        city: college.city || '',
        type: college.type || 'public',
        programs: college.programs || [],
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
        country: '',
        city: '',
        type: 'public',
        programs: [],
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

  const handleAddProgram = () => {
    if (newProgram.trim() && !formData.programs.includes(newProgram.trim())) {
      setFormData(prev => ({
        ...prev,
        programs: [...prev.programs, newProgram.trim()]
      }));
      setNewProgram('');
    }
  };

  const handleRemoveProgram = (programToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      programs: prev.programs.filter(program => program !== programToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.country || !formData.city) {
      alert('Please fill in country and city fields');
      return;
    }
    
    if (formData.programs.length === 0) {
      alert('Please add at least one program/course');
      return;
    }
    
    // Add default values for required fields that are not in the form
    const collegeData = {
      ...formData,
      ranking: (college as any)?.ranking || 999,
      established: (college as any)?.established || new Date().getFullYear(),
      students: (college as any)?.students || 0,
      tuitionFee: (college as any)?.tuitionFee || {
        undergraduate: 0,
        graduate: 0
      },
      requirements: (college as any)?.requirements || [],
      applicationDeadline: (college as any)?.applicationDeadline || new Date().toISOString().split('T')[0],
      status: (college as any)?.status || 'active',
      // Include SEO fields - send empty string if not provided, let API handle undefined
      seoTitle: formData.seoTitle.trim() || undefined,
      seoDescription: formData.seoDescription.trim() || undefined,
      seoKeywords: formData.seoKeywords.length > 0 ? formData.seoKeywords : undefined
    };
    
    console.log('Submitting college data with SEO fields:', {
      seoTitle: collegeData.seoTitle,
      seoDescription: collegeData.seoDescription,
      seoKeywords: collegeData.seoKeywords
    });
    
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <Input
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Enter or select country"
                  list="countries-list"
                  required
                />
                <datalist id="countries-list">
                  {availableCountries.map((country) => (
                    <option key={country} value={country} />
                  ))}
                </datalist>
                {!isLoadingOptions && availableCountries.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">Select from existing or type a new country</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter or select city"
                  list="cities-list"
                  required
                />
                <datalist id="cities-list">
                  {availableCities.map((city) => (
                    <option key={city} value={city} />
                  ))}
                </datalist>
                {!isLoadingOptions && availableCities.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">Select from existing or type a new city</p>
                )}
              </div>
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
                Programs/Courses *
              </label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newProgram}
                  onChange={(e) => setNewProgram(e.target.value)}
                  placeholder="Add a program/course"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddProgram())}
                  list="programs-list"
                />
                <datalist id="programs-list">
                  {availablePrograms.map((program) => (
                    <option key={program} value={program} />
                  ))}
                </datalist>
                <Button type="button" onClick={handleAddProgram} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.programs.map((program, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1"
                  >
                    {program}
                    <button
                      type="button"
                      onClick={() => handleRemoveProgram(program)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              {formData.programs.length === 0 && (
                <p className="text-xs text-red-500 mt-1">At least one program is required</p>
              )}
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
