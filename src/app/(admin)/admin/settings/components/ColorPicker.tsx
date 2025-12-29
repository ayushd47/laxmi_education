'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Palette, Check } from 'lucide-react';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label: string;
  description?: string;
}

const predefinedColors = [
  '#1e40af', // Royal Blue
  '#dc2626', // Red
  '#059669', // Green
  '#0057A5', // Brand Royal Blue
  '#ea580c', // Orange
  '#0891b2', // Cyan
  '#be185d', // Pink
  '#65a30d', // Lime
  '#0f172a', // Dark
  '#64748b', // Gray
];

export default function ColorPicker({ value, onChange, label, description }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
      
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#1e40af"
            className="font-mono"
          />
        </div>
        
        <div className="relative">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
            className="px-3"
          >
            <Palette className="h-4 w-4" />
          </Button>
          
          {isOpen && (
            <div className="absolute top-full left-0 mt-2 p-3 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <div className="grid grid-cols-5 gap-2">
                {predefinedColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      onChange(color);
                      setIsOpen(false);
                    }}
                    className="w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    title={color}
                  >
                    {value === color && (
                      <Check className="h-4 w-4 text-white mx-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div 
          className="w-10 h-10 rounded border border-gray-300 flex-shrink-0"
          style={{ backgroundColor: value }}
          title={value}
        />
      </div>
    </div>
  );
}
