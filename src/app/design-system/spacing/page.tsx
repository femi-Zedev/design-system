'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// Define spacing scale
const spacingScale = [
  { name: 'px', value: '1px', description: 'Used for borders and fine details' },
  { name: '0.5', value: '0.125rem (2px)', description: 'Used for very tight spacing' },
  { name: '1', value: '0.25rem (4px)', description: 'Used for tight spacing between related elements' },
  { name: '1.5', value: '0.375rem (6px)', description: 'Used for spacing between closely related elements' },
  { name: '2', value: '0.5rem (8px)', description: 'Base spacing unit, used for general spacing' },
  { name: '2.5', value: '0.625rem (10px)', description: 'Used for spacing between related elements' },
  { name: '3', value: '0.75rem (12px)', description: 'Used for spacing between related elements' },
  { name: '3.5', value: '0.875rem (14px)', description: 'Used for spacing between related elements' },
  { name: '4', value: '1rem (16px)', description: 'Used for spacing between distinct elements' },
  { name: '5', value: '1.25rem (20px)', description: 'Used for spacing between distinct elements' },
  { name: '6', value: '1.5rem (24px)', description: 'Used for spacing between distinct elements' },
  { name: '7', value: '1.75rem (28px)', description: 'Used for spacing between distinct sections' },
  { name: '8', value: '2rem (32px)', description: 'Used for spacing between distinct sections' },
  { name: '9', value: '2.25rem (36px)', description: 'Used for spacing between distinct sections' },
  { name: '10', value: '2.5rem (40px)', description: 'Used for spacing between distinct sections' },
  { name: '11', value: '2.75rem (44px)', description: 'Used for spacing between major sections' },
  { name: '12', value: '3rem (48px)', description: 'Used for spacing between major sections' },
  { name: '14', value: '3.5rem (56px)', description: 'Used for spacing between major sections' },
  { name: '16', value: '4rem (64px)', description: 'Used for spacing between major sections' },
  { name: '20', value: '5rem (80px)', description: 'Used for spacing between major sections' },
  { name: '24', value: '6rem (96px)', description: 'Used for spacing between major sections' },
  { name: '28', value: '7rem (112px)', description: 'Used for large layout spacing' },
  { name: '32', value: '8rem (128px)', description: 'Used for large layout spacing' },
  { name: '36', value: '9rem (144px)', description: 'Used for large layout spacing' },
  { name: '40', value: '10rem (160px)', description: 'Used for large layout spacing' },
  { name: '44', value: '11rem (176px)', description: 'Used for large layout spacing' },
  { name: '48', value: '12rem (192px)', description: 'Used for large layout spacing' },
  { name: '52', value: '13rem (208px)', description: 'Used for large layout spacing' },
  { name: '56', value: '14rem (224px)', description: 'Used for large layout spacing' },
  { name: '60', value: '15rem (240px)', description: 'Used for large layout spacing' },
  { name: '64', value: '16rem (256px)', description: 'Used for large layout spacing' },
  { name: '72', value: '18rem (288px)', description: 'Used for large layout spacing' },
  { name: '80', value: '20rem (320px)', description: 'Used for large layout spacing' },
  { name: '96', value: '24rem (384px)', description: 'Used for large layout spacing' },
];

// Define spacing categories for demonstration
const spacingCategories = [
  {
    name: 'Inset (Padding)',
    description: 'Padding applied to all sides of an element',
    examples: [
      { name: 'p-2', value: '0.5rem (8px)', visual: 'p-2' },
      { name: 'p-4', value: '1rem (16px)', visual: 'p-4' },
      { name: 'p-6', value: '1.5rem (24px)', visual: 'p-6' },
      { name: 'p-8', value: '2rem (32px)', visual: 'p-8' },
    ],
  },
  {
    name: 'Inline (Horizontal)',
    description: 'Spacing applied horizontally between elements',
    examples: [
      { name: 'space-x-2', value: '0.5rem (8px)', visual: 'space-x-2' },
      { name: 'space-x-4', value: '1rem (16px)', visual: 'space-x-4' },
      { name: 'space-x-6', value: '1.5rem (24px)', visual: 'space-x-6' },
      { name: 'space-x-8', value: '2rem (32px)', visual: 'space-x-8' },
    ],
  },
  {
    name: 'Stack (Vertical)',
    description: 'Spacing applied vertically between elements',
    examples: [
      { name: 'space-y-2', value: '0.5rem (8px)', visual: 'space-y-2' },
      { name: 'space-y-4', value: '1rem (16px)', visual: 'space-y-4' },
      { name: 'space-y-6', value: '1.5rem (24px)', visual: 'space-y-6' },
      { name: 'space-y-8', value: '2rem (32px)', visual: 'space-y-8' },
    ],
  },
  {
    name: 'Margin',
    description: 'Spacing applied outside of an element',
    examples: [
      { name: 'm-2', value: '0.5rem (8px)', visual: 'm-2' },
      { name: 'm-4', value: '1rem (16px)', visual: 'm-4' },
      { name: 'm-6', value: '1.5rem (24px)', visual: 'm-6' },
      { name: 'm-8', value: '2rem (32px)', visual: 'm-8' },
    ],
  },
  {
    name: 'Gap',
    description: 'Spacing between grid and flex items',
    examples: [
      { name: 'gap-2', value: '0.5rem (8px)', visual: 'gap-2' },
      { name: 'gap-4', value: '1rem (16px)', visual: 'gap-4' },
      { name: 'gap-6', value: '1.5rem (24px)', visual: 'gap-6' },
      { name: 'gap-8', value: '2rem (32px)', visual: 'gap-8' },
    ],
  },
];

// Components for visualizing spacing
function SpacingBlock({ size, label }: { size: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div 
        className={cn(
          "bg-gray-100 border border-gray-200 flex items-center justify-center", 
          `w-${size} h-${size}`
        )}
      >
        <span className="text-xs text-gray-500">{size}</span>
      </div>
      <span className="text-xs text-gray-500 mt-1">{label}</span>
    </div>
  );
}

function InsetExample({ className }: { className: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-100 border border-gray-200">
        <div 
          className={cn(
            "bg-gray-100 border border-gray-300 flex items-center justify-center text-xs text-gray-500",
            className
          )}
        >
          {className}
        </div>
      </div>
    </div>
  );
}

function InlineExample({ className }: { className: string }) {
  return (
    <div className="flex flex-col items-center">
      <div 
        className={cn(
          "flex bg-gray-100 border border-gray-200 p-2",
          className
        )}
      >
        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs text-white">1</div>
        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs text-white">2</div>
        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs text-white">3</div>
      </div>
    </div>
  );
}

function StackExample({ className }: { className: string }) {
  return (
    <div className="flex flex-col items-center">
      <div 
        className={cn(
          "flex flex-col bg-gray-100 border border-gray-200 p-2",
          className
        )}
      >
        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs text-white">1</div>
        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs text-white">2</div>
        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs text-white">3</div>
      </div>
    </div>
  );
}

function MarginExample({ className }: { className: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-200 border border-gray-300 p-8">
        <div 
          className={cn(
            "bg-gray-100 border border-gray-300 w-12 h-12 flex items-center justify-center text-xs text-gray-500",
            className
          )}
        >
          {className}
        </div>
      </div>
    </div>
  );
}

function GapExample({ className }: { className: string }) {
  return (
    <div className="flex flex-col items-center">
      <div 
        className={cn(
          "grid grid-cols-2 bg-gray-100 border border-gray-200 p-2",
          className
        )}
      >
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs text-white">1</div>
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs text-white">2</div>
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs text-white">3</div>
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs text-white">4</div>
      </div>
    </div>
  );
}

function SpacingExample({ category, example }: { category: string; example: { name: string; value: string; visual: string } }) {
  const renderExample = () => {
    switch (category) {
      case 'Inset (Padding)':
        return <InsetExample className={example.visual} />;
      case 'Inline (Horizontal)':
        return <InlineExample className={example.visual} />;
      case 'Stack (Vertical)':
        return <StackExample className={example.visual} />;
      case 'Margin':
        return <MarginExample className={example.visual} />;
      case 'Gap':
        return <GapExample className={example.visual} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4 w-full">
        {renderExample()}
        <div className="mt-3 text-center">
          <p className="font-medium text-sm text-gray-800">{example.name}</p>
          <p className="text-xs text-gray-500">{example.value}</p>
        </div>
      </div>
    </div>
  );
}

export default function SpacingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Spacing System</h1>
          <p className="text-lg text-gray-600">
            Spacing scale and layout guidelines for the application
          </p>
        </div>

        {/* Spacing Scale */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Spacing Scale</h2>
            <p className="mt-1 text-sm text-gray-500">The base spacing units used throughout the application</p>
          </div>
          <div className="p-6">
            <div className="prose prose-brand max-w-none mb-6">
              <p>
                This design system uses a spacing scale based on a 4px (0.25rem) unit. This consistent scale ensures 
                harmonious spacing throughout the application. The scale follows Tailwind CSS's default spacing scale.
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Scale
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usage
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {spacingScale.map((item, index) => (
                    <tr key={item.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.value}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Spacing Categories */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Spacing Categories</h2>
            <p className="mt-1 text-sm text-gray-500">Different ways to apply spacing in your layouts</p>
          </div>
          <div className="p-6">
            <div className="space-y-12">
              {spacingCategories.map((category) => (
                <div key={category.name} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.description}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {category.examples.map((example) => (
                      <SpacingExample 
                        key={example.name} 
                        category={category.name} 
                        example={example} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Layout Guidelines */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Layout Guidelines</h2>
            <p className="mt-1 text-sm text-gray-500">Best practices for using spacing in your layouts</p>
          </div>
          <div className="p-6">
            <div className="prose prose-brand max-w-none">
              <h3>Consistent Spacing</h3>
              <p>
                Use consistent spacing throughout your application to create visual harmony. 
                Stick to the spacing scale and avoid arbitrary values.
              </p>
              
              <h3>Hierarchy</h3>
              <p>
                Use larger spacing to separate distinct sections and smaller spacing for related elements:
              </p>
              <ul>
                <li>Large spacing (24px-64px) between major sections</li>
                <li>Medium spacing (16px-24px) between related groups</li>
                <li>Small spacing (4px-12px) between related elements</li>
              </ul>
              
              <h3>Responsive Spacing</h3>
              <p>
                Adjust spacing based on screen size:
              </p>
              <ul>
                <li>Use smaller spacing on mobile devices</li>
                <li>Increase spacing proportionally on larger screens</li>
                <li>Use Tailwind's responsive prefixes (sm:, md:, lg:, xl:) to adjust spacing at different breakpoints</li>
              </ul>
              
              <h3>Whitespace</h3>
              <p>
                Don't be afraid of whitespace. Generous spacing improves readability and focus:
              </p>
              <ul>
                <li>Use ample padding around content areas</li>
                <li>Ensure sufficient spacing between text elements</li>
                <li>Add extra spacing around important UI elements to draw attention</li>
              </ul>
              
              <h3>Grid System</h3>
              <p>
                Use Tailwind's grid system with consistent gap values:
              </p>
              <ul>
                <li>Use <code>grid-cols-*</code> for column layouts</li>
                <li>Use <code>gap-*</code> for consistent spacing between grid items</li>
                <li>Adjust the number of columns responsively based on screen size</li>
              </ul>
              
              <h3>Container Padding</h3>
              <p>
                Use consistent padding for containers:
              </p>
              <ul>
                <li>Small screens: 16px (p-4)</li>
                <li>Medium screens: 24px (p-6)</li>
                <li>Large screens: 32px (p-8)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
