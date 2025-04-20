'use client';

import { colors } from '@/app/colors';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ColorSwatch {
  name: string;
  value: string;
  textColor: string;
}

interface ColorCategory {
  name: string;
  description: string;
  colors: Record<string, string>;
}

const colorCategories: ColorCategory[] = [
  {
    name: 'Brand',
    description: 'Primary brand colors used for main UI elements, buttons, and accents.',
    colors: colors.brand,
  },
  {
    name: 'Gray',
    description: 'Neutral colors used for text, backgrounds, and borders.',
    colors: colors.gray,
  },
  {
    name: 'Error',
    description: 'Used to indicate errors, warnings, and destructive actions.',
    colors: colors.error,
  },
  {
    name: 'Success',
    description: 'Used to indicate successful actions and positive states.',
    colors: colors.success,
  },
  {
    name: 'Warning',
    description: 'Used to indicate warnings and cautionary states.',
    colors: colors.warning,
  },
];

function getTextColor(hexColor: string): string {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Calculate luminance (perceived brightness)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return white for dark colors, black for light colors
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

function ColorSwatchCard({ name, value, textColor }: ColorSwatch) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div 
      className="flex flex-col h-24 rounded-md overflow-hidden cursor-pointer transition-transform hover:scale-105 shadow-sm"
      onClick={copyToClipboard}
    >
      <div 
        className="flex-1 flex items-center justify-center" 
        style={{ backgroundColor: value, color: textColor }}
      >
        <span className={cn("font-mono text-sm", copied ? "opacity-100" : "opacity-70")}>
          {copied ? "Copied!" : value}
        </span>
      </div>
      <div className="bg-white px-3 py-2 text-xs font-medium text-gray-700">
        {name}
      </div>
    </div>
  );
}

export default function ColorsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Color System</h1>
          <p className="text-lg text-gray-600">
            A comprehensive guide to the color palette used throughout the application
          </p>
        </div>

        <div className="space-y-16">
          {colorCategories.map((category) => (
            <div key={category.name} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">{category.name}</h2>
                <p className="mt-1 text-sm text-gray-500">{category.description}</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
                  {Object.entries(category.colors).map(([shade, value]) => (
                    <ColorSwatchCard 
                      key={`${category.name}-${shade}`}
                      name={shade}
                      value={value}
                      textColor={getTextColor(value)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Usage Guidelines</h2>
            <p className="mt-1 text-sm text-gray-500">Best practices for using colors in your application</p>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Brand Colors</h3>
                <p className="text-gray-600 text-sm">
                  Use brand-500 as the primary color for buttons, links, and other interactive elements.
                  Lighter shades (brand-100, brand-200) work well for backgrounds and highlights.
                  Darker shades (brand-700, brand-800) are suitable for hover states and text.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Gray Scale</h3>
                <p className="text-gray-600 text-sm">
                  Use gray-900 for primary text, gray-600 for secondary text, and gray-400 for placeholder text.
                  Gray-100 and gray-200 are ideal for subtle backgrounds and borders.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Semantic Colors</h3>
                <p className="text-gray-600 text-sm">
                  Use error-500 for error states, success-500 for success states, and warning-500 for warning states.
                  Lighter variants can be used for backgrounds with the darker shades for text to maintain proper contrast.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Accessibility</h3>
                <p className="text-gray-600 text-sm">
                  Always ensure sufficient contrast between text and background colors.
                  For text on colored backgrounds, aim for a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
