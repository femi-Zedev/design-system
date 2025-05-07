'use client';

import Link from 'next/link';

// Component category interface
interface ComponentCategory {
  title: string;
  description: string;
  components: {
    name: string;
    description: string;
    href: string;
    icon?: React.ReactNode;
  }[];
}

export default function ComponentsPage() {
  
  // Define component categories
  const categories: ComponentCategory[] = [
    {
      title: 'Navigation',
      description: 'Components for navigating through the application',
      components: [
        {
          name: 'Breadcrumb',
          description: 'Show navigation hierarchy',
          href: '/design-system/components/breadcrumb',
        },
        {
          name: 'Tabs',
          description: 'Organize content into selectable sections',
          href: '/design-system/components/tabs',
        },
      ],
    },
    {
      title: 'Feedback & Overlays',
      description: 'Components for user feedback and overlaid content',
      components: [
        {
          name: 'Dialog',
          description: 'Modal dialogs for focused interactions',
          href: '/design-system/components/dialog',
        },
        {
          name: 'Toast',
          description: 'Brief notifications for user feedback',
          href: '/design-system/components/toast',
        },
        {
          name: 'Tooltip',
          description: 'Contextual information on hover',
          href: '/design-system/components/tooltip',
        },
        {
          name: 'Confirmation Modal',
          description: 'Confirm user actions',
          href: '/design-system/components/confirmation-modal',
        },
      ],
    },
    {
      title: 'Data Display',
      description: 'Components for displaying data and content',
      components: [
        {
          name: 'Card',
          description: 'Container for related content',
          href: '/design-system/components/card',
        },
        {
          name: 'SimpleTable',
          description: 'Lightweight table for simple data display without headers',
          href: '/design-system/components/simple-table',
        },
        {
          name: 'DataTable',
          description: 'Advanced table with sorting and pagination',
          href: '/design-system/components/datatable',
        },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Components</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Our design system provides a comprehensive set of reusable components to build consistent
          and accessible user interfaces. Each component is designed to be flexible, customizable,
          and follows best practices.
        </p>
      </div>



      {/* Component Categories */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Component Categories</h2>
        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category.title} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-2">{category.title}</h3>
              <p className="text-gray-600 mb-6">{category.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.components.map((component) => (
                  <Link
                    key={component.name}
                    href={component.href}
                    className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <h4 className="font-medium text-gray-900">{component.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{component.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
