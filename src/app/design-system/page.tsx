'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const designSystemSections = [
  {
    name: 'Colors',
    description: 'Color palette and usage guidelines for the application',
    href: '/design-system/colors',
    icon: (
      <div className="flex space-x-1">
        <div className="w-4 h-4 rounded-full bg-brand-500"></div>
        <div className="w-4 h-4 rounded-full bg-gray-500"></div>
        <div className="w-4 h-4 rounded-full bg-error-500"></div>
      </div>
    ),
  },
  {
    name: 'Typography',
    description: 'Text styles, headings, and font guidelines',
    href: '/design-system/typography',
    icon: (
      <div className="flex flex-col space-y-1">
        <div className="w-10 h-1 bg-gray-900"></div>
        <div className="w-8 h-0.5 bg-gray-700"></div>
        <div className="w-12 h-0.5 bg-gray-500"></div>
      </div>
    ),
  },
  {
    name: 'Components',
    description: 'UI components and usage examples',
    href: '/design-system/components',
    icon: (
      <div className="flex flex-col space-y-1">
        <div className="w-8 h-4 rounded-sm border border-gray-400"></div>
        <div className="w-10 h-2 rounded-sm bg-gray-300"></div>
      </div>
    ),
  },
  {
    name: 'Spacing',
    description: 'Spacing system and layout guidelines',
    href: '/design-system/spacing',
    icon: (
      <div className="flex space-x-1">
        <div className="w-2 h-4 bg-gray-300"></div>
        <div className="w-4 h-4 bg-gray-300"></div>
        <div className="w-6 h-4 bg-gray-300"></div>
      </div>
    ),
  },
];

export default function DesignSystemPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Design System</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive guide to design patterns, components, and styles used throughout the application
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
          {designSystemSections.map((section) => (
            <Link
              key={section.name}
              href={section.href}
              className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gray-100 p-3 rounded-lg">{section.icon}</div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{section.name}</h3>
                <p className="text-sm text-gray-600">{section.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">About the Design System</h2>
          </div>
          <div className="p-6">
            <div className="prose prose-brand max-w-none">
              <p>
                This design system serves as a central source of truth for the application's visual language and component library. 
                It provides guidelines, best practices, and reusable components to ensure consistency across the application.
              </p>
              <h3>Principles</h3>
              <ul>
                <li><strong>Consistency:</strong> Maintain visual and functional consistency across the application</li>
                <li><strong>Accessibility:</strong> Ensure all components meet WCAG 2.1 AA standards</li>
                <li><strong>Flexibility:</strong> Components should be adaptable to various contexts and requirements</li>
                <li><strong>Efficiency:</strong> Reduce development time by providing reusable, well-documented components</li>
              </ul>
              <h3>How to Use</h3>
              <p>
                Browse through the different sections to learn about our design guidelines and components. 
                Each component includes usage examples, props documentation, and best practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
