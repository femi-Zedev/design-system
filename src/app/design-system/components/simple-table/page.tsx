"use client";

import { Card } from "@/components/ui/card";
import SimpleTable from "@/app/_components/SimpleTable";
import { ColumnDef } from "@tanstack/react-table";
import { Tabs } from "@mantine/core";
import { useState, useEffect } from "react";
import { CodeHighlight, CodeHighlightTabs } from "@mantine/code-highlight";

// Example data types
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type Transaction = {
  id: string;
  amount: number;
  date: string;
  status: string;
};

// Client-side only component

export default function SimpleTablePage() {
  const [activeTab, setActiveTab] = useState<string | null>("basic");
  const [isClient, setIsClient] = useState(false);

  // This ensures the component only renders on the client side
  useEffect(() => {
    setIsClient(true);

    // Force re-render of code highlight components
    setTimeout(() => {
      const codeBlocks = document.querySelectorAll("pre code");
      if (codeBlocks.length > 0) {
        codeBlocks.forEach((block) => {
          block.classList.add("language-tsx");
        });
      }
    }, 100);
  }, []);

  // Basic example data
  const users: User[] = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
  ];

  // Transaction example data
  const transactions: Transaction[] = [
    { id: "1", amount: 100.0, date: "2025-05-01", status: "Completed" },
    { id: "2", amount: 75.5, date: "2025-05-03", status: "Pending" },
    { id: "3", amount: 250.0, date: "2025-05-05", status: "Completed" },
    { id: "4", amount: 30.25, date: "2025-05-07", status: "Failed" },
  ];

  // Basic columns
  const userColumns: ColumnDef<User, any>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: (info) => <div className="font-medium">{info.getValue()}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: (info) => (
        <div className="text-sm text-gray-500">{info.getValue()}</div>
      ),
    },
  ];

  // Transaction columns
  const transactionColumns: ColumnDef<Transaction, any>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: (info) => <div>{info.getValue()}</div>,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: (info) => <div className="font-medium">${info.getValue()}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => {
        const status = info.getValue() as string;
        return (
          <div
            className={`px-2 py-1 text-xs rounded-full text-center w-24 ${
              status === "Completed"
                ? "bg-green-100 text-green-800"
                : status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {status}
          </div>
        );
      },
    },
  ];

  // Code examples
  const basicExample = `import SimpleTable from '@/app/_components/SimpleTable';
import { ColumnDef } from '@tanstack/react-table';

// Define your data type
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

// Sample data
const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
];

// Define columns
const columns: ColumnDef<User, any>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: info => <div className="font-medium">{info.getValue()}</div>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
];

// Use the SimpleTable component
export default function MyComponent() {
  return <SimpleTable data={users} columns={columns} />;
}`;

  const customCellExample = `import SimpleTable from '@/app/_components/SimpleTable';
import { ColumnDef } from '@tanstack/react-table';

type Transaction = {
  id: string;
  amount: number;
  date: string;
  status: string;
};

const transactions = [
  { id: '1', amount: 100.00, date: '2025-05-01', status: 'Completed' },
  { id: '2', amount: 75.50, date: '2025-05-03', status: 'Pending' },
  { id: '3', amount: 250.00, date: '2025-05-05', status: 'Completed' },
  { id: '4', amount: 30.25, date: '2025-05-07', status: 'Failed' },
];

const columns: ColumnDef<Transaction, any>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: (info) => <div className="font-medium">${"$"}{info.getValue()}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => {
      const status = info.getValue() as string;
      return (
        <div
          className={\`px-2 py-1 text-xs rounded-full text-center w-24 \${
            status === 'Completed'
              ? 'bg-green-100 text-green-800'
              : status === 'Pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }\`}
        >
          {status}
        </div>
      );
    },
  },
];

export default function TransactionsComponent() {
  return <SimpleTable data={transactions} columns={columns} />;
}`;

  const apiReference = `interface SimpleTableProps<TData, TValue> {
  data: TData[];                    // Array of data items to display
  columns: ColumnDef<TData, TValue>[]; // Column definitions from TanStack Table
}`;

  // If not client-side yet, return a loading state or nothing
  if (!isClient) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">SimpleTable</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          A lightweight table component built on top of TanStack Table
          (react-table) for displaying simple data without headers. Perfect for
          profile information, settings, or any data that benefits from a clean,
          minimal presentation.
        </p>
      </div>

      <Tabs value={activeTab} onChange={setActiveTab} className="mb-8">
        <Tabs.List>
          <Tabs.Tab value="basic">Basic Usage</Tabs.Tab>
          <Tabs.Tab value="custom-cells">Custom Cells</Tabs.Tab>
          <Tabs.Tab value="api">API Reference</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="basic" pt="md">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Basic Usage</h2>
            <p className="text-gray-600">
              SimpleTable is designed for displaying data in a clean, minimal
              format without headers. It's perfect for profile information,
              settings, or any data that benefits from a simple presentation.
            </p>

            <Card className="p-6 mb-6">
              <SimpleTable data={users} columns={userColumns} />
            </Card>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Code Example
              </h3>
              <div className="relative overflow-hidden bg-gray-50 rounded-md border border-gray-200">
                <CodeHighlightTabs
                  withExpandButton
                  defaultExpanded={false}
                  expandCodeLabel="Show full code"
                  collapseCodeLabel="Show less"
                  code={[
                    {
                      fileName: "SimpleTable.tsx",
                      code: basicExample,
                      language: "tsx",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="custom-cells" pt="md">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Custom Cell Rendering
            </h2>
            <p className="text-gray-600">
              You can customize how each cell is rendered by providing a custom
              cell renderer function in your column definitions. This allows for
              rich formatting, conditional styling, and interactive elements
              within your table cells.
            </p>

            <Card className="p-6 mb-6">
              <SimpleTable data={transactions} columns={transactionColumns} />
            </Card>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Code Example
              </h3>
              <div className="relative overflow-hidden bg-gray-50 rounded-md border border-gray-200">
                <CodeHighlightTabs
                  withExpandButton
                  defaultExpanded={false}
                  expandCodeLabel="Show full code"
                  collapseCodeLabel="Show less"
                  code={[
                    {
                      fileName: "CustomCells.tsx",
                      code: customCellExample,
                      language: "tsx",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="api" pt="md">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              API Reference
            </h2>
            <p className="text-gray-600">
              The SimpleTable component accepts the following props:
            </p>

            <div className="relative overflow-hidden bg-gray-50 rounded-md border border-gray-200">
              <CodeHighlightTabs
                code={[
                  {
                    fileName: "SimpleTableProps.tsx",
                    code: apiReference,
                    language: "tsx",
                  },
                ]}
              />
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Props</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>
                  <strong>data</strong>: An array of data objects to be
                  displayed in the table.
                </li>
                <li>
                  <strong>columns</strong>: An array of column definitions
                  following the TanStack Table (react-table) API.
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Column Definition
              </h3>
              <p className="text-gray-600">
                Column definitions follow the TanStack Table API. The most
                common properties include:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 mt-2">
                <li>
                  <strong>accessorKey</strong>: The key to access the data from
                  your data object.
                </li>
                <li>
                  <strong>header</strong>: The header text (not displayed in
                  SimpleTable).
                </li>
                <li>
                  <strong>cell</strong>: A function to customize the rendering
                  of the cell.
                </li>
              </ul>
            </div>
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
