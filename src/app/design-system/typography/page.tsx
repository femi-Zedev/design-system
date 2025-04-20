'use client';

import { cn } from '@/lib/utils';

interface FontSample {
  name: string;
  description: string;
  className: string;
  sampleText: string;
  fontFamily: string;
  fontWeight: string;
  fontSize: string;
  lineHeight: string;
}

interface TypeScale {
  name: string;
  description: string;
  className: string;
  cssVar?: string;
  size: string;
  lineHeight: string;
  fontWeight: string;
  sampleText: string;
}

const fontFamilies = [
  {
    name: 'Inter',
    description: 'Primary font used for all UI text, paragraphs, and most headings.',
    weights: [
      { weight: '400', name: 'Regular' },
      { weight: '500', name: 'Medium' },
      { weight: '600', name: 'Semibold' },
      { weight: '700', name: 'Bold' },
    ],
    sampleText: 'The quick brown fox jumps over the lazy dog.',
  },
  {
    name: 'Space Grotesk',
    description: 'Secondary font used for special headings and accent text.',
    weights: [
      { weight: '400', name: 'Regular' },
      { weight: '500', name: 'Medium' },
      { weight: '700', name: 'Bold' },
    ],
    sampleText: 'The quick brown fox jumps over the lazy dog.',
  },
  {
    name: 'Bricolage Grotesque',
    description: 'Accent font used for special elements and emphasis.',
    weights: [
      { weight: '400', name: 'Regular' },
      { weight: '500', name: 'Medium' },
      { weight: '700', name: 'Bold' },
    ],
    sampleText: 'The quick brown fox jumps over the lazy dog.',
  },
];

const textStyles: TypeScale[] = [
  {
    name: 'Display 2XL',
    description: 'Used for hero headlines and major section headers',
    className: 'text-display-2xl',
    cssVar: '--font-size-display-2xl',
    size: '72px',
    lineHeight: '90px',
    fontWeight: '700',
    sampleText: 'Hero Headline',
  },
  {
    name: 'Display XL',
    description: 'Used for main page titles and major section headers',
    className: 'text-display-xl',
    cssVar: '--font-size-display-xl',
    size: '60px',
    lineHeight: '72px',
    fontWeight: '700',
    sampleText: 'Page Title',
  },
  {
    name: 'Display LG',
    description: 'Used for section titles and important headings',
    className: 'text-display-lg',
    cssVar: '--font-size-display-lg',
    size: '48px',
    lineHeight: '60px',
    fontWeight: '700',
    sampleText: 'Section Title',
  },
  {
    name: 'Display MD',
    description: 'Used for subsection titles and card headings',
    className: 'text-display-md',
    cssVar: '--font-size-display-md',
    size: '36px',
    lineHeight: '44px',
    fontWeight: '600',
    sampleText: 'Subsection Title',
  },
  {
    name: 'Display SM',
    description: 'Used for card titles and smaller headings',
    className: 'text-display-sm',
    cssVar: '--font-size-display-sm',
    size: '30px',
    lineHeight: '38px',
    fontWeight: '600',
    sampleText: 'Card Title',
  },
  {
    name: 'Display XS',
    description: 'Used for smaller headings and emphasized text',
    className: 'text-display-xs',
    cssVar: '--font-size-display-xs',
    size: '24px',
    lineHeight: '32px',
    fontWeight: '600',
    sampleText: 'Small Heading',
  },
  {
    name: 'Text XL',
    description: 'Used for lead paragraphs and emphasized text',
    className: 'text-xl',
    cssVar: '--font-size-text-xl',
    size: '20px',
    lineHeight: '30px',
    fontWeight: '500',
    sampleText: 'Lead paragraph text that introduces a section or concept.',
  },
  {
    name: 'Text LG',
    description: 'Used for important body text and subheadings',
    className: 'text-lg',
    cssVar: '--font-size-text-lg',
    size: '18px',
    lineHeight: '28px',
    fontWeight: '500',
    sampleText: 'Important body text that needs more emphasis than standard text.',
  },
  {
    name: 'Text MD',
    description: 'Used for standard body text',
    className: 'text-md',
    cssVar: '--font-size-text-md',
    size: '16px',
    lineHeight: '24px',
    fontWeight: '400',
    sampleText: 'Standard body text used for most paragraph content throughout the application.',
  },
  {
    name: 'Text SM',
    description: 'Used for secondary text, captions, and UI elements',
    className: 'text-sm',
    cssVar: '--font-size-text-sm',
    size: '14px',
    lineHeight: '20px',
    fontWeight: '400',
    sampleText: 'Secondary text used for captions, labels, and smaller UI elements.',
  },
  {
    name: 'Text XS',
    description: 'Used for small labels, metadata, and legal text',
    className: 'text-xs',
    cssVar: '--font-size-text-xs',
    size: '12px',
    lineHeight: '18px',
    fontWeight: '400',
    sampleText: 'Small text used for metadata, footnotes, and legal information.',
  },
];

function FontWeightSample({ 
  fontFamily, 
  weight, 
  name, 
  sampleText 
}: { 
  fontFamily: string; 
  weight: string; 
  name: string; 
  sampleText: string; 
}) {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{name}</span>
        <span className="text-xs text-gray-500">{weight}</span>
      </div>
      <p 
        className="text-lg" 
        style={{ 
          fontFamily: `'${fontFamily}', sans-serif`, 
          fontWeight: weight 
        }}
      >
        {sampleText}
      </p>
    </div>
  );
}

function TypeScaleItem({ item }: { item: TypeScale }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.description}</p>
        </div>
        <div className="mt-2 md:mt-0 text-right">
          <div className="text-xs text-gray-500">Size: {item.size}</div>
          <div className="text-xs text-gray-500">Line Height: {item.lineHeight}</div>
          <div className="text-xs text-gray-500">Weight: {item.fontWeight}</div>
          {item.cssVar && (
            <div className="text-xs text-gray-500">CSS Var: {item.cssVar}</div>
          )}
        </div>
      </div>
      <div 
        className="mt-3 p-3 bg-gray-50 rounded border border-gray-100"
        style={{ 
          fontSize: item.size, 
          lineHeight: item.lineHeight, 
          fontWeight: item.fontWeight 
        }}
      >
        {item.sampleText}
      </div>
    </div>
  );
}

export default function TypographyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Typography System</h1>
          <p className="text-lg text-gray-600">
            Font families, text styles, and typographic guidelines for the application
          </p>
        </div>

        {/* Font Families */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Font Families</h2>
            <p className="mt-1 text-sm text-gray-500">Primary and secondary typefaces used in the application</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fontFamilies.map((font) => (
                <div key={font.name} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{font.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{font.description}</p>
                  </div>
                  <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                    {font.weights.map((weight) => (
                      <FontWeightSample 
                        key={`${font.name}-${weight.weight}`}
                        fontFamily={font.name}
                        weight={weight.weight}
                        name={weight.name}
                        sampleText={font.sampleText}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Type Scale */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Type Scale</h2>
            <p className="mt-1 text-sm text-gray-500">Text sizes and styles for different purposes</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6">
              {textStyles.map((style) => (
                <TypeScaleItem key={style.name} item={style} />
              ))}
            </div>
          </div>
        </div>

        {/* Typography Guidelines */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Typography Guidelines</h2>
            <p className="mt-1 text-sm text-gray-500">Best practices for using typography in your application</p>
          </div>
          <div className="p-6">
            <div className="prose prose-brand max-w-none">
              <h3>Hierarchy</h3>
              <p>
                Establish a clear visual hierarchy by using different text sizes, weights, and styles.
                Use larger sizes and bolder weights for more important content, and smaller sizes and 
                lighter weights for supporting content.
              </p>
              
              <h3>Line Length</h3>
              <p>
                Aim for 50-75 characters per line for optimal readability. For mobile devices, 
                this may be reduced to 35-50 characters. Use container widths and padding to 
                control line length.
              </p>
              
              <h3>Line Height</h3>
              <p>
                Use appropriate line heights to improve readability. Smaller text typically 
                needs more line height (1.5-1.6), while larger headings can use tighter 
                line heights (1.2-1.3).
              </p>
              
              <h3>Font Pairing</h3>
              <p>
                When using multiple font families, establish clear roles for each. In this design system, 
                Inter is used for UI and body text, while Space Grotesk and Bricolage Grotesque 
                are reserved for special headings and accent text.
              </p>
              
              <h3>Accessibility</h3>
              <p>
                Ensure text has sufficient contrast against its background. Body text should 
                have a contrast ratio of at least 4.5:1, and large text should have a ratio 
                of at least 3:1. Avoid using font sizes smaller than 12px.
              </p>
              
              <h3>Responsive Typography</h3>
              <p>
                Adjust font sizes for different screen sizes. Headings should be smaller on 
                mobile devices, while body text can remain relatively consistent. Use relative 
                units (rem) for font sizes to respect user preferences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
